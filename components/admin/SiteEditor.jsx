'use client';
import { useEffect, useId, useMemo, useState } from 'react';
import { SECTIONS, mergeContent } from '@/lib/content';

const TAB_INFO = {
  problem: ['the problem', 'var(--cy)'],
  proof: ['the proof', 'var(--lm)'],
  edge: ['the edge', 'var(--am)'],
  win: ['the win', 'var(--mg)']
};
const GROUPS = [
  ['everywhere', ['contact', 'brand', 'tabs', 'dropbar']],
  ['the problem', ['hero', 'game', 'about', 'problem', 'pillars']],
  ['the proof', ['whiteLabel', 'demos', 'work']],
  ['the edge', ['ai', 'audit']],
  ['the win', ['how', 'pricing', 'cta']]
];
const byKey = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

/* "lines" fields are edited as plain text, one item per line */
function toDraft(section, value) {
  const conv = (fields, v) => Object.fromEntries(fields.map((f) => {
    const x = v?.[f.k];
    if (f.type === 'lines') return [f.k, (x || []).join('\n')];
    if (f.type === 'list') return [f.k, (x || []).map((item) => conv(f.fields, item))];
    return [f.k, x ?? ''];
  }));
  return conv(section.fields, value);
}

function Field({ f, value, onChange }) {
  const id = useId();
  if (f.type === 'list') return <ListField f={f} value={value} onChange={onChange} />;
  const multi = f.long || f.type === 'lines';
  return (
    <div className="ed-field">
      <label htmlFor={id}>{f.label}</label>
      {multi
        ? <textarea id={id} className="input" rows={f.type === 'lines' ? Math.min(8, Math.max(3, String(value).split('\n').length + 1)) : 3} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)} />}
    </div>
  );
}

function ListField({ f, value, onChange }) {
  const items = value || [];
  const set = (i, item) => onChange(items.map((x, k) => (k === i ? item : x)));
  const move = (i, d) => { const a = [...items]; [a[i], a[i + d]] = [a[i + d], a[i]]; onChange(a); };
  const blank = Object.fromEntries(f.fields.map((sf) => [sf.k, '']));
  return (
    <div className="ed-list">
      <div className="ed-list-head">
        <span>{f.label}</span>
        {!f.fixed && <small>{items.length} of up to {f.max}</small>}
      </div>
      {items.map((item, i) => (
        <div key={i} className="ed-item">
          <div className="ed-item-top">
            <b><i style={{ background: ['var(--cy)', 'var(--lm)', 'var(--am)', 'var(--mg)'][i % 4] }} />{f.itemName} {i + 1}</b>
            {!f.fixed && (
              <span className="ed-item-tools">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label="move up">↑</button>
                <button type="button" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="move down">↓</button>
                <button type="button" className="x" onClick={() => onChange(items.filter((_, k) => k !== i))}>remove</button>
              </span>
            )}
          </div>
          {f.fields.map((sf) => (
            <Field key={sf.k} f={sf} value={item[sf.k] ?? ''} onChange={(v) => set(i, { ...item, [sf.k]: v })} />
          ))}
        </div>
      ))}
      {!f.fixed && items.length < f.max && (
        <button type="button" className="ed-add" onClick={() => onChange([...items, blank])}>+ add {f.itemName}</button>
      )}
    </div>
  );
}

export default function SiteEditor({ db, act, busy, say, persistent = true }) {
  const content = useMemo(() => mergeContent(db.content), [db.content]);
  const [key, setKey] = useState('contact');
  const section = byKey[key];
  const saved = useMemo(() => toDraft(section, content[key]), [section, content, key]);
  const [draft, setDraft] = useState(saved);
  useEffect(() => setDraft(saved), [saved]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const custom = Boolean(db.content && db.content[key]);
  const pick = (k) => {
    if (k === key) return;
    if (dirty && !confirm('You have unsaved changes in this section. Leave without saving?')) return;
    setKey(k);
  };
  const viewHref = `/#${section.anchor || `tab-${section.tab}`}`;

  return (
    <div className="ed">
      <aside className="ed-nav">
        {GROUPS.map(([group, keys]) => (
          <div key={group}>
            <div className="ed-group">{group}</div>
            {keys.map((k) => (
              <button key={k} className={`ed-nav-btn${k === key ? ' on' : ''}`} onClick={() => pick(k)}>
                <i style={{ background: TAB_INFO[byKey[k].tab][1] }} />{byKey[k].title}
                {db.content?.[k] && <span className="ed-edited" title="edited">●</span>}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <form className="panel ed-form" onSubmit={async (e) => { e.preventDefault(); await act('content.set', { section: key, value: draft }, `saved — ${section.title.toLowerCase()} is live`); }}>
        <div className="panel-head">
          <div>
            <h2>{section.title}</h2>
            <span className="hint">shown in <b style={{ color: TAB_INFO[section.tab][1] }}>{TAB_INFO[section.tab][0]}</b>{key === 'contact' || key === 'brand' || key === 'tabs' || key === 'dropbar' ? ' and across the site' : ''}</span>
          </div>
          <a className="link-btn" href={viewHref} target="_blank" rel="noopener">view on site ↗</a>
        </div>

        {!persistent && (
          <div className="banner" style={{ marginBottom: 16, background: '#FFE9F2' }}>
            <i style={{ background: 'var(--mg)' }} />
            <span><b>no database yet:</b> edits save, but the live site may not show them, and they reset when the server restarts. Connect Upstash Redis in Vercel to make website editing reliable.</span>
          </div>
        )}
        {section.fields.map((f) => (
          <Field key={f.k} f={f} value={draft[f.k]} onChange={(v) => setDraft({ ...draft, [f.k]: v })} />
        ))}

        <div className="ed-bar">
          <span className="ed-state">{dirty ? '● unsaved changes' : custom ? 'saved · live on the site' : 'original wording'}</span>
          <span className="ed-bar-actions">
            {dirty && <button type="button" className="link-btn muted" onClick={() => setDraft(saved)}>undo changes</button>}
            {custom && !dirty && (
              <button type="button" className="link-btn muted" onClick={() => confirm(`Put “${section.title}” back to the original wording?`) && act('content.reset', { section: key }, 'back to the original wording')}>reset to original</button>
            )}
            <button className="btn btn-mg" disabled={busy || !dirty}>save</button>
          </span>
        </div>
      </form>
    </div>
  );
}

