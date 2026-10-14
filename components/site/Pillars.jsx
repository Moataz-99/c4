import { DARK, Label, SOFT, Sparkle } from './bits';

export default function Pillars({ c }) {
  return (
    <section id="pillars" data-move="1">
      <Sparkle style={{ top: '10px', left: '6%' }} size={15} fill="#FFD23F" />
      <Sparkle style={{ bottom: '10px', right: '8%', animationDelay: '1.8s' }} size={14} fill="#A3E635" />
      <div className="wrap">
        <div className="section-head left reveal">
          <Label move={1} text={c.label} />
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </div>
        <div className="pillar-row reveal stagger">
          {c.cards.map((k, i) => (
            <div key={i} className="pillar" style={{ background: SOFT[i % 4] }}>
              <span className="num" style={{ color: DARK[i % 4] }}>{String(i + 1).padStart(2, '0')}</span><h3>{k.title}</h3><p>{k.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
