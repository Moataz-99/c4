'use client';
import { useEffect, useRef, useState } from 'react';

const DISCS = [
  { word: 'tracking', c: 'var(--cy)', ring: '#0E7C90' },
  { word: 'data', c: 'var(--lm)', ring: '#5A8014' },
  { word: 'reporting', c: 'var(--am)', ring: '#9A7405' },
  { word: 'automation', c: 'var(--mg)', ring: '#B31E5E' }
];


/* a tiny self-playing game: four discs drop, the row lights up, the lever releases them, repeat */
export default function DropBar({ c }) {
  const WINS = c.wins.length ? c.wins : [''];
  const [filled, setFilled] = useState(0);        // discs in the row (0–4)
  const [phase, setPhase] = useState('filling');  // filling · win · release
  const [round, setRound] = useState(0);          // rows completed this visit
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFilled(4); setPhase('win'); setRound(1);
      return;
    }
    let t, n = 0, alive = true;
    const wait = (ms, fn) => { t = setTimeout(() => (paused.current ? wait(400, fn) : alive && fn()), ms); };
    const next = () => {
      if (n < 4) {
        n += 1; setFilled(n);
        if (n === 4) { setPhase('win'); setRound((r) => r + 1); wait(2600, release); }
        else wait(950, next);
      }
    };
    const release = () => {
      setPhase('release');
      wait(900, () => { n = 0; setFilled(0); setPhase('filling'); wait(700, next); });
    };
    wait(800, next);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  const win = phase === 'win';
  let msg;
  if (phase === 'release') msg = <>{c.cleared} <b style={{ color: '#fff' }}>{c.next}</b></>;
  else if (win) msg = <><b style={{ color: 'var(--am)' }}>four in a row</b>{WINS[(round - 1 + WINS.length) % WINS.length] && <span className="db-tail"> — {WINS[(round - 1 + WINS.length) % WINS.length]}</span>}</>;
  else if (filled === 0) msg = <>{c.idle}<span className="db-cursor">_</span></>;
  else msg = <><b style={{ color: DISCS[filled - 1].c }}>{DISCS[filled - 1].word}</b> dropped in{filled < 4 ? '…' : ''}</>;

  return (
    <div className="dropbar" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="dropbar-inner">
        <div className="db-slot" aria-hidden="true"><span className={`db-coin${filled === 0 && phase === 'filling' ? ' go' : ''}`} /></div>

        <div className={`db-row${win ? ' win' : ''}${phase === 'release' ? ' release' : ''}`} aria-hidden="true">
          {DISCS.map((d, i) => (
            <span key={i} className="db-hole">
              {i < filled && <span className="db-disc" style={{ background: d.c, '--ring': d.ring }} />}
            </span>
          ))}
        </div>

        <p className="db-msg" key={`${phase}-${filled}`} aria-live="polite">{msg}</p>

        <div className="db-score" aria-label={`${c.score}: ${round}`}>
          <span>{c.score}</span><b>{String(round).padStart(2, '0')}</b>
        </div>
      </div>
    </div>
  );
}
