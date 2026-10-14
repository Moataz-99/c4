import { Label } from './bits';

export default function Audit({ c }) {
  return (
    <section id="audit" data-move="3">
      <div className="wrap">
        <div className="audit reveal">
          <div>
            <Label move={3} text={c.label} />
            <h2>{c.title}</h2>
            <p>{c.text}</p>
            <ul className="audit-list">{c.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <a href="#contact" className="btn btn-primary">{c.button}</a>
          </div>
          <div className="audit-facts">
            {c.facts.map((f, i) => <div key={i} className="audit-fact"><b>{f.num}</b><span>{f.label}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
