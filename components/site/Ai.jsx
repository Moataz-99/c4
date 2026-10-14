import { COLS, Label } from './bits';

const IDEA_COLS = ['var(--cy)', 'var(--am)', 'var(--mg)', 'var(--lm)'];

export default function Ai({ c }) {
  return (
    <section className="ai-section" id="ai" data-move="3">
      <div className="wrap">
        <div className="section-head left reveal">
          <Label move={3} text={c.label} />
          <h2>{c.title}</h2>
          <p>{c.lede}</p>
        </div>
        <div className="ai-wrap reveal">
          <div className="ai-server">
            <div className="kicker">{c.serverKicker}</div>
            <h3>{c.serverTitle}</h3>
            <div className="model-grid">
              {c.models.map((m, i) => <div key={i} className="model"><span className="d" style={{ background: COLS[i % 4] }} />{m}</div>)}
              <div className="model next"><span className="d" />+ next</div>
            </div>
          </div>
          <div>
            <div className="ai-reasons">
              {c.reasons.map((r, i) => (
                <div key={i} className="ai-reason"><span className="d" style={{ background: COLS[i % 4] }} /><div><h4>{r.title}</h4><p>{r.text}</p></div></div>
              ))}
            </div>
            {(c.routingTitle || c.routingText) && <div className="ai-routing"><b>{c.routingTitle}</b> {c.routingText}</div>}
          </div>
        </div>
        <div className="idea-grid reveal stagger">
          {c.ideas.map((d, i) => (
            <div key={i} className="idea"><h4><i style={{ background: IDEA_COLS[i % 4] }} />{d.title}</h4><p>{d.text}</p></div>
          ))}
        </div>
        {c.principle && <p className="ai-principle reveal">{c.principle}</p>}
      </div>
    </section>
  );
}
