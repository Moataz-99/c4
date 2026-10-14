'use client';
import { useRef, useState } from 'react';
import LogoMark from './LogoMark';

const CONFETTI = ['#22D3EE', '#A3E635', '#FFD23F', '#FF3D8B', '#FFFFFF'];

export default function DropToWin({ c }) {
  const [phase, setPhase] = useState('ready'); // ready → dropping → glowing → won
  const [confetti, setConfetti] = useState([]);
  const timers = useRef([]);

  function drop() {
    setPhase('dropping');
    timers.current.push(setTimeout(() => {
      setPhase('glowing');
      setConfetti(Array.from({ length: 26 }, (_, i) => ({
        id: Date.now() + i,
        left: 35 + Math.random() * 30 + '%',
        bg: CONFETTI[i % CONFETTI.length],
        x: Math.random() * 160 - 80 + 'px',
        r: Math.random() * 360 + 'deg',
        delay: Math.random() * 0.2 + 's'
      })));
      timers.current.push(setTimeout(() => setConfetti([]), 1400));
    }, 1400));
    timers.current.push(setTimeout(() => setPhase('won'), 2800));
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setConfetti([]);
    setPhase('ready');
  }

  const dropped = phase !== 'ready';
  const glow = phase === 'glowing' || phase === 'won';

  return (
    <div className="c4-game">
      <p className="c4-hint">{c.hint}</p>
      <svg className={`c4-demo${dropped ? ' dropped' : ''}${glow ? ' glow' : ''}`} width="100%" viewBox="52 36 226 242" role="img" aria-label="Connect 4 board with three discs already placed diagonally and one winning slot open at the top">
        <circle cx="94" cy="74" r="16" fill="#241A5C" /><circle cx="138" cy="74" r="16" fill="#241A5C" /><circle cx="182" cy="74" r="16" fill="#241A5C" />
        <circle cx="94" cy="118" r="16" fill="#241A5C" /><circle cx="138" cy="118" r="16" fill="#241A5C" /><circle cx="226" cy="118" r="16" fill="#241A5C" />
        <circle cx="94" cy="162" r="16" fill="#241A5C" /><circle cx="182" cy="162" r="16" fill="#241A5C" /><circle cx="226" cy="162" r="16" fill="#241A5C" />
        <circle cx="138" cy="206" r="16" fill="#241A5C" /><circle cx="182" cy="206" r="16" fill="#241A5C" /><circle cx="226" cy="206" r="16" fill="#241A5C" />
        <path className="winline" d="M94 206L226 74" stroke="#FFD23F" strokeWidth="8" strokeLinecap="round" fill="none" />
        <g className="disc-fixed"><circle cx="94" cy="206" r="16" fill="#22D3EE" /><circle cx="94" cy="206" r="6.5" fill="none" stroke="#0E7C90" strokeWidth="3" /></g>
        <g className="disc-fixed"><circle cx="138" cy="162" r="16" fill="#A3E635" /><circle cx="138" cy="162" r="6.5" fill="none" stroke="#5A8014" strokeWidth="3" /></g>
        <g className="disc-fixed"><circle cx="182" cy="118" r="16" fill="#FFD23F" /><circle cx="182" cy="118" r="6.5" fill="none" stroke="#9A7405" strokeWidth="3" /></g>
        {!dropped && <circle className="target-ring" cx="226" cy="74" r="16" fill="none" stroke="#FFD23F" strokeWidth="3" />}
        <g className="disc-winner" style={glow ? { opacity: 1, transform: 'translateY(0)' } : undefined}>
          <circle cx="226" cy="74" r="16" fill="#FF3D8B" /><circle cx="226" cy="74" r="6.5" fill="none" stroke="#B31E5E" strokeWidth="3" />
        </g>
      </svg>

      {!dropped && <button className="btn btn-primary btn-md" id="c4DropBtn" onClick={drop}>{c.button}</button>}

      {confetti.map((p) => (
        <span key={p.id} className="confetti-piece" style={{ left: p.left, background: p.bg, '--x': p.x, '--r': p.r, animationDelay: p.delay }} />
      ))}

      {phase === 'won' && (
        <div className="c4-msg">
          <div className="c4-msg-card">
            <div className="c4-logo-pop"><LogoMark size={52} /></div>
            <strong>{c.winTitle}</strong>
            <p className="c4-story">{c.winStory}</p>
            <div className="c4-pillars-mini">
              <span><span className="dot" style={{ background: '#22D3EE' }} />tracking</span>
              <span><span className="dot" style={{ background: '#A3E635' }} />data</span>
              <span><span className="dot" style={{ background: '#FFD23F' }} />reporting</span>
              <span><span className="dot" style={{ background: '#FF3D8B' }} />automation</span>
            </div>
            <div className="c4-msg-actions">
              <button className="btn btn-ghost btn-md" onClick={reset}>{c.again}</button>
              <a href="#contact" className="btn btn-primary btn-md">{c.real}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
