import DropToWin from './DropToWin';
import { Sparkle } from './bits';

/* each headline word drops in on its own, so the words are split here */
const words = (text, start) => text.split(/\s+/).filter(Boolean).map((w, i, arr) => (
  <span key={i}><span className="w" style={{ '--i': start + i }}>{w}</span>{i < arr.length - 1 ? ' ' : ''}</span>
));

export default function Hero({ c, game }) {
  const first = c.line1.split(/\s+/).filter(Boolean).length;
  return (
    <section className="hero">
      <Sparkle style={{ top: '60px', left: '6%' }} size={20} fill="#FFD23F" />
      <Sparkle style={{ top: '220px', right: '4%', animationDelay: '1.2s' }} size={16} fill="#A3E635" />
      <Sparkle style={{ bottom: '40px', left: '14%', animationDelay: '2s' }} size={14} fill="#22D3EE" />
      <div className="wrap">
        <div>
          {c.eyebrow && <span className="eyebrow">{c.eyebrow}</span>}
          <h1>{words(c.line1, 0)}<br /><span className="hl">{words(c.line2, first)}</span></h1>
          <p className="lede">{c.lede}</p>
          <div className="cta-row">
            <a href="#contact" className="btn btn-primary">{c.cta1}</a>
            <a href="#pillars" className="btn btn-ghost">{c.cta2}</a>
          </div>
          <div className="pillar-legend">
            <span><span className="dot" style={{ background: 'var(--cy)' }} />tracking</span>
            <span><span className="dot" style={{ background: 'var(--lm)' }} />data</span>
            <span><span className="dot" style={{ background: 'var(--am)' }} />reporting</span>
            <span><span className="dot" style={{ background: 'var(--mg)' }} />automation</span>
          </div>
        </div>
        <div><DropToWin c={game} /></div>
      </div>
    </section>
  );
}
