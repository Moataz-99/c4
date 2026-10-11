'use client';
import { useEffect, useRef, useState } from 'react';

const COL = ['var(--cy)', 'var(--lm)', 'var(--am)', 'var(--mg)'];
const PILLARS = ['tracking', 'data', 'reporting', 'automation'];
const PLANS = ['solo', 'duo', 'tournament', 'league'];
const PLAN_SIZE = { solo: 1, duo: 2, tournament: 3, league: 4 };
const STAGES = [['intake', 'day 0'], ['review', 'days 1–8'], ['findings', 'days 9–13'], ['handed over', 'day 14']];

function ago(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
/* numbers count up from where they were (0 the first time) */
function CountUp({ value }) {
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (typeof value !== 'number' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); from.current = value; return; }
    const start = performance.now(), a = from.current, dur = 900;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(a + (value - a) * e));
      if (p < 1) raf = requestAnimationFrame(tick); else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return typeof shown === 'number' ? shown.toLocaleString('en') : shown;
}
const connected = (c) => c.pillars.filter((v) => v === 1).length;
const Mini = ({ n, colors }) => (
  <span className="mini">{[0, 1, 2, 3].map((i) => <i key={i} style={i < n ? { background: colors ? colors[i] : 'var(--v2)' } : undefined} />)}</span>
);
const Status = ({ v }) => {
  const [kind, text] = v.split(':');
  return <span className={`status ${kind}`}>{text}</span>;
};

/* ---------------- overview: the board ---------------- */
export function Overview({ db, act, go }) {
  const wins = db.clients.filter((c) => connected(c) === 4).length;
  const newLeads = db.leads.filter((l) => l.status === 'new').length;
  const waiting = db.queue.filter((q) => q.status === 'waiting').length;
  const stats = [
    ['var(--cy)', db.stats.eventsToday, 'events today', `▲ ${db.stats.eventsDelta}% vs yesterday`],
    ['var(--lm)', db.clients.length, 'clients on the board', `${wins} four in a row`],
    ['var(--am)', newLeads, 'new messages', newLeads ? 'waiting in the inbox' : 'inbox clear', 'inbox'],
    ['var(--mg)', waiting, 'AI drafts to approve', waiting ? 'a person checks each one' : 'queue clear', 'ai']
  ];
  return (
    <>
      <div className="stat-row">
        {stats.map(([c, num, label, sub, link]) => (
          <div key={label} className="stat" onClick={link ? () => go(link) : undefined} style={link ? { cursor: 'pointer' } : undefined}>
            <span className="disc" style={{ background: c }} />
            <div><div className="stat-num"><CountUp value={num} /></div><div className="stat-label">{label}</div><div className="stat-sub">{sub}</div></div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <div className="board">
            <div className="board-head"><span>client</span><span>track</span><span>data</span><span>report</span><span>auto</span><span>row</span></div>
            {db.clients.length === 0 && <p className="empty" style={{ color: '#C9C2F7' }}>no clients yet — add one with “+ new client”.</p>}
            {db.clients.map((c) => {
              const n = connected(c), win = n === 4;
              return (
                <div key={c.id} className={`board-row${win ? ' win' : ''}`}>
                  <span className="name">{c.name}<span className="plan">{c.plan}</span></span>
                  <span className="slots">
                    {c.pillars.map((v, i) => (
                      <button key={i} title={`${PILLARS[i]} — click to change`} aria-label={`${c.name} ${PILLARS[i]}`}
                        className={`slot click${v === 1 ? ' f' : v === 2 ? ' sync' : ''}`} style={v === 1 ? { background: COL[i] } : undefined}
                        onClick={() => act('client.pillar', { id: c.id, index: i })} />
                    ))}
                  </span>
                  <span className={`row-status${win ? ' win' : ''}`}>{win ? 'four in a row' : `${n} of 4`}</span>
                </div>
              );
            })}
            <div className="board-foot"><span>click a slot: empty → syncing → connected.</span><span><b>{wins} of {db.clients.length}</b> in a row</span></div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h2>event volume</h2><span className="hint">last 7 days · each disc ≈ 3k events</span></div>
          <div className="cols">
            {['wed', 'thu', 'fri', 'sat', 'sun', 'mon', 'tue'].map((d, i) => (
              <div key={d} className="col"><span>{d}</span>{Array.from({ length: 6 }, (_, k) => <i key={k} className={k < db.stats.volume[i] ? 'f' : ''} style={{ '--d': i * 2 + k }} />)}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h2>recent moves</h2><span className="hint">everything that happened, newest first</span></div>
        <div className="feed">
          {db.activity.slice(0, 8).map((a) => (
            <div key={a.id} className="feed-item"><span className="d" style={{ background: COL[a.pillar ?? 0] }} /><div>{a.text}<small>{ago(a.at)}</small></div></div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------- the four pillars ---------------- */
const PILLAR_INFO = {
  tracking: { n: 1, desc: 'server-side events that survive browser blocking.', cols: ['time', 'client', 'event', 'source', 'status'] },
  data: { n: 2, desc: 'every platform, every client, one warehouse you own.', cols: ['source', 'client', 'type', 'last synced', 'status'] },
  reporting: { n: 3, desc: 'dashboards clients open themselves — no monthly scramble.', cols: ['report', 'client', 'frequency', 'next send', 'status'] },
  automation: { n: 4, desc: 'handoffs and alerts, built once, running quietly.', cols: ['workflow', 'client', 'trigger', 'last run', 'status'] }
};
export function PillarView({ db, pillar }) {
  const info = PILLAR_INFO[pillar], i = info.n - 1;
  const rows = db.pillarData[pillar] || [];
  const on = db.clients.filter((c) => c.pillars[i] === 1).length;
  const syncing = db.clients.filter((c) => c.pillars[i] === 2).length;
  const review = rows.filter((r) => /^(pending|alert)/.test(r[4])).length;
  return (
    <>
      <div className="pillar-head" style={{ '--c': COL[i] }}>
        <div className="big">{info.n}</div>
        <div><h2>{pillar}</h2><p>pillar {info.n} of 4 · {info.desc}</p></div>
        <div className="kpis">
          <div className="kpi"><b>{on}</b><span>clients connected</span></div>
          <div className="kpi"><b>{syncing}</b><span>syncing now</span></div>
          <div className="kpi"><b>{review}</b><span>need a look</span></div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head"><h2>latest</h2><span className="hint">sample feed — wire your n8n pipelines here</span></div>
        <table>
          <thead><tr>{info.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>{rows.map((r, k) => <tr key={k}>{r.map((x, j) => <td key={j}>{j === 4 ? <Status v={x} /> : x}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </>
  );
}

/* ---------------- inbox: contact-form messages ---------------- */
export function Inbox({ db, act, busy }) {
  const [filter, setFilter] = useState('new');
  const list = db.leads.filter((l) => filter === 'all' || l.status === filter);
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>messages from the site</h2>
        <div className="filters">
          {['new', 'handled', 'all'].map((f) => <button key={f} className={`chip${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
      </div>
      {list.length === 0 && <p className="empty">{filter === 'new' ? 'no new messages — the inbox is clear.' : 'nothing here yet.'}</p>}
      <div className="leads">
        {list.map((l) => (
          <div key={l.id} className={`lead${l.status === 'handled' ? ' handled' : ''}`}>
            <div className="lead-top">
              <b>{l.agency || l.name}</b>
              {l.pillars?.map((p) => <span key={p} className="pill" style={{ '--c': COL[PILLARS.indexOf(p)] }}>{p}</span>)}
              <span className="when">{ago(l.createdAt)}</span>
            </div>
            <div className="meta">{l.name} · <a href={`mailto:${l.email}`}>{l.email}</a></div>
            {l.message && <p>{l.message}</p>}
            <div className="row-actions" style={{ justifyContent: 'flex-start' }}>
              {l.status === 'new' && <button className="btn btn-lm btn-xs" disabled={busy} onClick={() => act('lead.convert', { id: l.id }, `${l.agency || l.name} added to the board · audit opened`)}>make client</button>}
              <a className="btn btn-cy btn-xs" href={`mailto:${l.email}?subject=${encodeURIComponent('re: connect 4')}`}>reply</a>
              <button className="link-btn" onClick={() => act('lead.status', { id: l.id, status: l.status === 'new' ? 'handled' : 'new' })}>{l.status === 'new' ? 'mark handled' : 'reopen'}</button>
              <button className="link-btn muted" onClick={() => confirm('Delete this message?') && act('lead.delete', { id: l.id }, 'message deleted')}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- private AI ---------------- */
export function PrivateAI({ db, act, busy }) {
  const [editing, setEditing] = useState(null);
  const [text, setText] = useState('');
  const waiting = db.queue.filter((q) => q.status === 'waiting');
  const approved = db.queue.filter((q) => q.status === 'approved');
  const models = [['Llama', 'running', 'var(--cy)'], ['Qwen', 'running · arabic', 'var(--lm)'], ['Mistral', 'running', 'var(--am)'], ['Gemma', 'running', 'var(--mg)'], ['Whisper', 'running · audio', 'var(--cy)']];
  return (
    <>
      <div className="pillar-head" style={{ '--c': 'var(--cy)' }}>
        <div className="big">AI</div>
        <div><h2>private AI</h2><p>open models on our own servers — flat cost, data stays home.</p></div>
        <div className="kpis">
          <div className="kpi"><b>{waiting.length}</b><span>waiting for a person</span></div>
          <div className="kpi"><b>{approved.length}</b><span>approved</span></div>
          <div className="kpi"><b>flat</b><span>server cost</span></div>
        </div>
      </div>
      <div className="grid-2">
        <div className="panel">
          <div className="panel-head"><h2>our server</h2><span className="hint">5 running · 1 slot free</span></div>
          <div className="models">
            {models.map(([n, s, c]) => <div key={n} className="model"><i style={{ background: c }} />{n}<small>{s}</small></div>)}
            <div className="model idle"><i />+ next<small>open slot</small></div>
          </div>
          <h4 style={{ marginTop: 18, fontSize: 15 }}>smart routing</h4>
          <div className="route-strip">{Array.from({ length: 18 }, (_, i) => <i key={i} className={i === 17 ? 'p' : ''} />)}</div>
          <div className="legend"><span style={{ '--c': 'var(--v2)' }}>local model</span><span style={{ '--c': 'var(--am)' }}>premium AI, only when worth it</span></div>
        </div>
        <div className="panel">
          <div className="panel-head"><h2>waiting for a human</h2><span className="hint">{waiting.length ? `${waiting.length} waiting` : 'all clear'}</span></div>
          {waiting.length === 0 && <p className="empty">queue empty — every AI output has been checked by a person.</p>}
          {waiting.map((q) => (
            <div key={q.id} className="queue-item">
              <div className="q-txt">
                <span className="tag" style={{ '--c': COL[q.pillar ?? 0] }}>{q.kind}</span>
                <b>{q.client} — {q.title}</b>
                {editing === q.id
                  ? <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} />
                  : <small>{q.detail}</small>}
              </div>
              {editing === q.id ? (
                <>
                  <button className="btn btn-lm btn-xs" disabled={busy} onClick={async () => { if (await act('queue.edit', { id: q.id, detail: text }, 'draft updated')) setEditing(null); }}>save</button>
                  <button className="btn btn-ink btn-xs" onClick={() => setEditing(null)}>cancel</button>
                </>
              ) : (
                <>
                  <button className="btn btn-lm btn-xs" disabled={busy} onClick={() => act('queue.approve', { id: q.id }, `approved — ${q.client} ${q.title}`)}>approve</button>
                  <button className="btn btn-cy btn-xs" onClick={() => { setEditing(q.id); setText(q.detail); }}>edit</button>
                </>
              )}
            </div>
          ))}
          {approved.length > 0 && <p className="q-done" style={{ marginTop: 10 }}>✓ {approved.length} approved and sent</p>}
          <div className="principle">AI does the heavy lifting. a person approves anything a client sees.</div>
        </div>
      </div>
    </>
  );
}

/* ---------------- audits pipeline ---------------- */
export function Audits({ db, act, busy }) {
  const [client, setClient] = useState('');
  const inProgress = db.audits.filter((a) => a.stage < 3).length;
  const done = db.audits.length - inProgress;
  async function add(e) {
    e.preventDefault();
    if (await act('audit.add', { client }, `disc dropped — ${client} audit started`)) setClient('');
  }
  return (
    <>
      <div className="pillar-head" style={{ '--c': 'var(--mg)' }}>
        <div className="big" style={{ color: '#fff' }}>✓</div>
        <div><h2>tracking audits</h2><p>one account · two weeks · one fixed fee · the way every partnership starts.</p></div>
        <div className="kpis">
          <div className="kpi"><b>{inProgress}</b><span>in progress</span></div>
          <div className="kpi"><b>{done}</b><span>handed over</span></div>
        </div>
      </div>
      <div className="pipeline">
        {STAGES.map(([name, days], s) => (
          <div key={name} className="stage">
            <h4><i style={{ '--c': COL[s] }} />{name}<small>{days}</small></h4>
            {db.audits.filter((a) => a.stage === s).map((a) => (
              <div key={a.id} className="a-card" style={{ '--c': COL[s] }}>
                <b>{a.client}</b><small>{a.note}</small>
                <div className="prog">{[0, 1, 2, 3].map((k) => <i key={k} className={k <= s ? 'f' : ''} />)}</div>
                <div className="a-actions">
                  {s < 3 ? <button disabled={busy} onClick={() => act('audit.advance', { id: a.id }, `${a.client} → ${STAGES[s + 1][0]}`)}>next stage →</button> : <span />}
                  <button className="x" onClick={() => confirm(`Remove the ${a.client} audit?`) && act('audit.delete', { id: a.id }, 'audit removed')}>remove</button>
                </div>
              </div>
            ))}
            {s === 0 && (
              <form className="add" onSubmit={add}>
                <input className="input" placeholder="client name" value={client} onChange={(e) => setClient(e.target.value)} />
                <button className="btn btn-mg btn-xs" disabled={busy || !client.trim()}>start</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------- clients ---------------- */
export function Clients({ db, act, openModal }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>clients</h2>
        <button className="btn btn-mg btn-xs" onClick={() => openModal('client')}>+ add</button>
      </div>
      <table>
        <thead><tr><th>client</th><th>plan</th><th>board size</th><th>pillars (click to change)</th><th>status</th><th /></tr></thead>
        <tbody>
          {db.clients.map((c) => {
            const n = connected(c);
            return (
              <tr key={c.id}>
                <td><b>{c.name}</b><br /><small style={{ color: 'var(--muted)' }}>since {new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</small></td>
                <td><select className="select" value={c.plan} onChange={(e) => act('client.update', { id: c.id, plan: e.target.value }, `${c.name} → ${e.target.value}`)}>{PLANS.map((p) => <option key={p}>{p}</option>)}</select></td>
                <td><Mini n={PLAN_SIZE[c.plan]} /></td>
                <td>
                  <span className="mini" style={{ gap: 6 }}>
                    {c.pillars.map((v, i) => (
                      <button key={i} title={PILLARS[i]} onClick={() => act('client.pillar', { id: c.id, index: i })}
                        style={{ width: 20, height: 20, borderRadius: '50%', border: v === 2 ? '2px dashed var(--ink)' : '2px solid var(--ink)', background: v === 1 ? COL[i] : '#E4E0F2', padding: 0 }} />
                    ))}
                  </span> &nbsp;{n} of 4
                </td>
                <td>{n === 4 ? <span className="status ok">four in a row</span> : c.pillars.includes(2) ? <span className="status pending">syncing</span> : <span className="status off">room to grow</span>}</td>
                <td><button className="link-btn muted" onClick={() => confirm(`Remove ${c.name} from the board?`) && act('client.delete', { id: c.id }, `${c.name} removed`)}>remove</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- settings ---------------- */
const SETTINGS = [
  ['whiteLabel', 'white-label mode', "client-facing screens show your agency's brand, calm and neutral — never ours"],
  ['humanApproval', 'human approval for AI output', 'nothing AI-written reaches a client without a person approving it'],
  ['weeklyEmail', 'weekly summary email', 'sent to the agency admin every Monday'],
  ['anomalyAlerts', 'anomaly alerts', 'notify when tracking or spend looks off'],
  ['beta', 'beta features', 'early access to new pillar tools']
];
export function Settings({ db, act, say, persistent }) {
  return (
    <>
      <div className="panel">
        <div className="panel-head"><h2>settings</h2><span className="hint">account and white-label preferences</span></div>
        {SETTINGS.map(([key, label, sub]) => (
          <div key={key} className="settings-row">
            <div><div className="label">{label}</div><div className="sub">{sub}</div></div>
            <button className={`toggle${db.settings[key] ? ' on' : ''}${key === 'humanApproval' ? ' locked' : ''}`} aria-label={label} aria-pressed={db.settings[key]}
              onClick={() => key === 'humanApproval' ? say('always on — a person approves anything a client sees') : act('settings.set', { key, value: !db.settings[key] })} />
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-head"><h2>storage</h2><span className="hint">{persistent ? 'connected to Upstash Redis' : 'demo mode — in memory'}</span></div>
        <div className="danger-zone">
          <div><div className="label" style={{ fontWeight: 600 }}>reset to sample data</div><div className="sub" style={{ fontSize: 12, color: 'var(--muted)' }}>wipes clients, messages, audits and activity, and reloads the demo board</div></div>
          <button className="btn btn-ink btn-xs" onClick={() => confirm('Reset everything to the sample data? This cannot be undone.') && act('db.reset', {}, 'board reset to sample data')}>reset</button>
        </div>
      </div>
    </>
  );
}

/* ---------------- new client modal ---------------- */
export function NewClientModal({ act, busy, close }) {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('solo');
  const [pillars, setPillars] = useState([0, 0, 0, 0]);
  async function save(e) {
    e.preventDefault();
    if (await act('client.add', { name, plan, pillars }, `disc dropped — ${name} is on the board`)) close();
  }
  return (
    <div className="modal-back" onClick={(e) => e.target === e.currentTarget && close()}>
      <form className="modal" onSubmit={save}>
        <h2>drop a new client on the board</h2>
        <label htmlFor="ncName">client name</label>
        <input id="ncName" className="input" value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
        <label htmlFor="ncPlan">plan</label>
        <select id="ncPlan" className="select" value={plan} onChange={(e) => setPlan(e.target.value)}>{PLANS.map((p) => <option key={p}>{p}</option>)}</select>
        <label>already connected</label>
        <div className="pick-row">
          {PILLARS.map((p, i) => (
            <button type="button" key={p} title={p} aria-pressed={pillars[i] === 1}
              style={pillars[i] === 1 ? { background: COL[i] } : undefined}
              onClick={() => setPillars(pillars.map((v, k) => (k === i ? (v ? 0 : 1) : v)))} />
          ))}
        </div>
        <div className="modal-actions">
          <button type="button" className="link-btn muted" onClick={close}>cancel</button>
          <button className="btn btn-mg" disabled={busy || !name.trim()}>add</button>
        </div>
      </form>
    </div>
  );
}
