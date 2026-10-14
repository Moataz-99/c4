import { COLS, Label } from './bits';

const BTN = ['btn-ghost', 'btn-lime', 'btn-primary', 'btn-light'];

export default function Pricing({ c }) {
  return (
    <section className="pricing-bg" id="pricing" data-move="4">
      <div className="wrap">
        <div className="section-head reveal">
          <Label move={4} text={c.label} />
          <h2>{c.title}</h2>
        </div>
        <div className="price-row reveal stagger">
          {c.tiers.map((p, i) => (
            <div key={i} className={`price${p.badge ? ' featured' : ''}`}>
              {p.badge && <span className="badge">{p.badge}</span>}
              <div className="price-board">{[0, 1, 2, 3].map((k) => <i key={k} style={k <= i ? { background: COLS[k] } : undefined} />)}</div>
              <h3>{p.name}</h3>
              <p className="desc">{p.desc}</p>
              <ul>{p.features.map((f, k) => <li key={k}>{f}</li>)}</ul>
              <a href="#contact" data-plan={p.name} className={`btn ${BTN[i % 4]} btn-md`}>{p.button}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
