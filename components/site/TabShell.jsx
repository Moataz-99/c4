'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TABS } from './tabs';
import Header from './Header';
import CoinNav from './CoinNav';
import DropBar from './DropBar';
import Hero from './Hero';
import About from './About';
import Problem from './Problem';
import Pillars from './Pillars';
import BoardStrip from './BoardStrip';
import WhiteLabel from './WhiteLabel';
import Demos from './Demos';
import Work from './Work';
import Ai from './Ai';
import Audit from './Audit';
import How from './How';
import Pricing from './Pricing';
import Cta from './Cta';
import Contact from './Contact';
import Footer from './Footer';



function NextMove({ i, tabs, t }) {
  const next = tabs[i + 1], prev = tabs[i - 1];
  return (
    <div className="next-move wrap">
      <div className="nm-board" aria-hidden="true">
        {tabs.map((x, k) => <i key={k} style={k <= i ? { background: x.c } : undefined} />)}
      </div>
      {next ? (
        <>
          <p className="nm-text">move {i + 1} of 4 done. {t.nextLead} <b style={{ color: next.c }}>{next.label}</b></p>
          <a href={`#tab-${next.id}`} className={`btn ${next.btn} btn-lg`}>{next.label} →</a>
        </>
      ) : (
        <>
          <p className="nm-text"><b>{t.finalLine}</b></p>
          <a href="#tab-problem" className="btn btn-ghost btn-lg">{t.restart}</a>
        </>
      )}
      {prev && <a href={`#tab-${prev.id}`} className="nm-back">← back to {prev.label}</a>}
    </div>
  );
}

export default function TabShell({ content: c }) {
  /* tab colours and ids are fixed; their names come from the editable content */
  const tabs = TABS.map((x, i) => ({ ...x, ...(c.tabs.items[i] || {}) }));
  const PANELS = [
    <><Hero c={c.hero} game={c.game} /><About c={c.about} /><Problem c={c.problem} /><Pillars c={c.pillars} /></>,
    <><BoardStrip move={2} title={tabs[1].label} /><WhiteLabel c={c.whiteLabel} /><Demos c={c.demos} /><Work c={c.work} /></>,
    <><BoardStrip move={3} title={tabs[2].label} /><Ai c={c.ai} /><Audit c={c.audit} /></>,
    <><BoardStrip move={4} title={tabs[3].label} win /><How c={c.how} /><Pricing c={c.pricing} /><Cta c={c.cta} /><Contact c={c.contact} /></>
  ];
  const [active, setActive] = useState(0);
  const pending = useRef(null);

  /* any #hash can open a tab: #tab-proof opens that tab, #pricing opens the tab that holds #pricing */
  const resolve = useCallback((hash) => {
    const id = (hash || '').slice(1);
    if (id.startsWith('/')) return; // preview-only admin route
    if (!id) { setActive(0); return; }
    const t = TABS.findIndex((x) => `tab-${x.id}` === id);
    if (t >= 0) { setActive(t); pending.current = 'top'; return; }
    const panel = document.getElementById(id)?.closest('.tab-panel');
    if (panel) { setActive(Number(panel.dataset.index)); pending.current = id; }
  }, []);

  useEffect(() => {
    resolve(location.hash);
    const onHash = () => resolve(location.hash);
    // clicking a link whose hash is already in the address bar fires no hashchange — handle it directly
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); resolve(location.hash); }
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', onHash); document.removeEventListener('click', onClick); };
  }, [resolve]);

  /* every real tab switch pulls the release lever */
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    window.dispatchEvent(new Event('c4:release'));
  }, [active]);

  /* after a tab opens, scroll to the top or to the requested section */
  useEffect(() => {
    const target = pending.current;
    if (!target) return;
    pending.current = null;
    requestAnimationFrame(() => {
      if (target === 'top') window.scrollTo({ top: 0, behavior: 'instant' });
      else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  return (
    <>
      <span className="board-rail l" aria-hidden="true" /><span className="board-rail r" aria-hidden="true" />
      <Header active={active} tabs={tabs} brand={c.brand} />
      <CoinNav active={active} tabs={tabs} />
      <DropBar c={c.dropbar} />
      <main>
        {PANELS.map((content, i) => (
          <div key={TABS[i].id} id={`tab-${TABS[i].id}`} className="tab-panel" data-index={i}
               role="tabpanel" aria-label={tabs[i].label} hidden={active !== i}>
            {content}
            <NextMove i={i} tabs={tabs} t={c.tabs} />
          </div>
        ))}
      </main>
      <Footer c={c.brand} />
    </>
  );
}
