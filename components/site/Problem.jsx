import { COLS, Label, Sparkle } from './bits';

export default function Problem({ c }) {
  return (
    <section className="problem-bg" id="problem" data-move="1">
      <Sparkle style={{ top: '20px', right: '8%' }} size={16} fill="#FF3D8B" />
      <Sparkle style={{ bottom: '30px', left: '5%', animationDelay: '1.4s' }} size={14} fill="#22D3EE" />
      <div className="wrap">
        <div className="section-head left reveal">
          <Label move={1} text={c.label} />
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </div>
        <div className="grid-4 reveal stagger">
          {c.cards.map((k, i) => (
            <div key={i} className="pcard"><div className="chip" style={{ background: COLS[i % 4] }} /><h3>{k.title}</h3><p>{k.text}</p></div>
          ))}
        </div>
        {c.closer && <p className="closer reveal">{c.closer}</p>}
      </div>
    </section>
  );
}
