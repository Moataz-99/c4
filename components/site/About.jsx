import { COLS, Lines } from './bits';

export default function About({ c }) {
  return (
    <section className="about-strip">
      <div className="wrap">
        <p>{c.text}</p>
        <div className="four-row anim">
          {c.counters.map((k, i) => (
            <div key={i} className="four-item">
              <b style={{ background: COLS[i % 4], color: i % 4 === 3 ? '#fff' : undefined }}>{k.num}</b>
              <span><Lines text={k.label} /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
