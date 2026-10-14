import { COLS, Label } from './bits';

export default function How({ c }) {
  return (
    <section id="how" data-move="4">
      <div className="wrap">
        <div className="section-head reveal">
          <Label move={4} text={c.label} />
          <h2>{c.title}</h2>
        </div>
        <div className="steps reveal stagger">
          {c.steps.map((s, i) => (
            <div key={i} className="step"><div className="coin" style={{ background: COLS[i % 4] }}>{i + 1}</div><div><h3>{s.title}</h3><p>{s.text}</p></div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
