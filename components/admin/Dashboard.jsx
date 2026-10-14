'use client';
import { useCallback, useRef, useState } from 'react';
import LogoMark from '@/components/site/LogoMark';
import { Overview, PillarView, Inbox, PrivateAI, Audits, Clients, Settings, NewClientModal } from './views';
import SiteEditor from './SiteEditor';

export const PILLAR_COL = ['var(--cy)', 'var(--lm)', 'var(--am)', 'var(--mg)'];

const NAV = [
  { group: 'the board', move: 1, items: [['overview', 'Overview', 'var(--am)']] },
  { group: 'the four pillars', move: 2, items: [['tracking', 'Tracking', 'var(--cy)'], ['data', 'Data', 'var(--lm)'], ['reporting', 'Reporting', 'var(--am)'], ['automation', 'Automation', 'var(--mg)']] },
  { group: 'the edge', move: 3, items: [['inbox', 'Inbox', 'var(--mg)'], ['ai', 'Private AI', 'var(--cy)'], ['audits', 'Audits', 'var(--lm)']] },
  { group: 'the table', move: 4, items: [['website', 'Website', 'var(--am)'], ['clients', 'Clients', 'var(--lm)'], ['settings', 'Settings', '#C9C2F7']] }
];

export default function Dashboard({ initial, persistent, preview = false }) {
  const [db, setDb] = useState(initial);
  const [view, setView] = useState('overview');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const tt = useRef();

  const say = useCallback((text, bad = false) => {
    setToast({ text, bad, k: Date.now() });
    clearTimeout(tt.current);
    tt.current = setTimeout(() => setToast(null), 2600);
  }, []);

  /** every change goes to the server, which saves it and returns the new state */
  const act = useCallback(async (type, payload, message) => {
    setBusy(true);
    try {
      const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, payload }) });
      if (r.status === 401) { window.location.href = '/admin/login'; return false; }
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'something went wrong');
      setDb(data);
      if (message) say(message);
      return true;
    } catch (e) {
      say(e.message, true);
      return false;
    } finally {
      setBusy(false);
    }
  }, [say]);

  const group = NAV.find((g) => g.items.some(([k]) => k === view));
  const title = group.items.find(([k]) => k === view)[1];
  const newLeads = db.leads.filter((l) => l.status === 'new').length;
  const waiting = db.queue.filter((q) => q.status === 'waiting').length;
  const ctx = { db, act, say, busy, go: setView, openModal: setModal };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">connect <LogoMark size={24} tile="#17103A" edge="#fff" /></div>
        {NAV.map((g) => (
          <div key={g.group}>
            <div className="nav-group">{g.group}</div>
            {g.items.map(([key, label, c]) => (
              <button key={key} className={`nav-btn${view === key ? ' active' : ''}`} style={{ '--c': c }} onClick={() => setView(key)}>
                <span className="hole" />{label}
                {key === 'inbox' && newLeads > 0 && <span className="count">{newLeads}</span>}
                {key === 'ai' && waiting > 0 && <span className="count">{waiting}</span>}
              </button>
            ))}
          </div>
        ))}
        <div className="setup">
          <div className="setup-title">agency setup · 3 of 4</div>
          <div className="setup-sub">one more disc to finish</div>
          <div className="setup-row">
            <i className="f" style={{ background: 'var(--cy)' }} data-tip="branding ✓" />
            <i className="f" style={{ background: 'var(--lm)' }} data-tip="custom domain ✓" />
            <i className="f" style={{ background: 'var(--am)' }} data-tip="first client ✓" />
            <i data-tip="billing — to do" />
          </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div>
            <div className="crumb">
              <span className="move">{[0, 1, 2, 3].map((i) => <i key={i} style={i < group.move ? { background: PILLAR_COL[i] } : undefined} />)}</span>
              <span>{group.group}</span>
            </div>
            <h1>{title}</h1>
          </div>
          <div className="top-right">
            <span className="store-badge" style={{ '--c': persistent ? '#F1FBE0' : '#FFF7E0' }} title={persistent ? 'changes are saved to Redis' : preview ? 'changes are saved in this browser only' : 'no database connected — changes reset on restart'}>
              {persistent ? '● saved to database' : preview ? '● preview' : '● demo mode'}
            </span>
            <button className="btn btn-mg" onClick={() => setModal('client')}>+ new client</button>
            <form method="post" action="/api/auth/logout"><button className="btn btn-ink btn-xs" title="sign out">sign out</button></form>
          </div>
        </div>

        <div className="content">
          {!persistent && (
            <div className="banner" style={{ marginBottom: 20 }}>
              <i /> {preview
                ? <span><b>preview:</b> everything works, and your changes are saved in this browser only. The deployed version saves to your database and needs a password.</span>
                : <span><b>demo mode:</b> no database is connected, so changes reset when the server restarts. Add an Upstash Redis store in Vercel to keep them.</span>}
            </div>
          )}
          <div className="view active" key={view}>
            {view === 'overview' && <Overview {...ctx} />}
            {['tracking', 'data', 'reporting', 'automation'].includes(view) && <PillarView {...ctx} pillar={view} />}
            {view === 'inbox' && <Inbox {...ctx} />}
            {view === 'ai' && <PrivateAI {...ctx} />}
            {view === 'audits' && <Audits {...ctx} />}
            {view === 'website' && <SiteEditor {...ctx} persistent={persistent || preview} />}
            {view === 'clients' && <Clients {...ctx} />}
            {view === 'settings' && <Settings {...ctx} persistent={persistent} />}
          </div>
        </div>
      </div>

      {modal === 'client' && <NewClientModal {...ctx} close={() => setModal(null)} />}

      <div className={`toast${toast ? ' show' : ''}`} style={toast?.bad ? { borderColor: 'var(--mg)' } : undefined}>
        <i style={toast?.bad ? { background: 'var(--am)' } : undefined} /><span>{toast?.text}</span>
      </div>
    </div>
  );
}
