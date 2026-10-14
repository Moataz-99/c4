'use client';
import { useEffect, useState } from 'react';
import { TABS } from './tabs';

/* the four coins on the right are the tab switcher (a bottom tab bar on phones) */
export default function CoinNav({ active = 0, tabs = TABS }) {
  const [won, setWon] = useState(false);
  useEffect(() => {
    if (active !== 3) return;
    setWon(false);
    const t = requestAnimationFrame(() => setWon(true));
    return () => cancelAnimationFrame(t);
  }, [active]);

  return (
    <nav className={`coin-nav${won ? ' won' : ''}`} aria-label="site sections">
      {tabs.map((t, i) => (
        <a key={t.id} href={`#tab-${t.id}`} aria-current={active === i ? 'page' : undefined}
           className={`coin${active === i ? ' active' : ''}`}
           style={{ '--c': t.c, '--r': t.r, color: t.light ? '#fff' : undefined }}>
          {t.label}<em>{t.detail}</em>
        </a>
      ))}
    </nav>
  );
}
