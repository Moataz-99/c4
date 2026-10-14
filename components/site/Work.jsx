import { COLS, Label } from './bits';

const BUILD_COLS = ['var(--cy)', 'var(--am)', 'var(--mg)', 'var(--lm)'];

export default function Work({ c }) {
  return (
    <section id="work" data-move="2">
      <div className="wrap">
        <div className="section-head left reveal">
          <Label move={2} text={c.label} />
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </div>
        <div className="shipped-grid reveal stagger">
          {c.builds.map((b, i) => {
            const col = BUILD_COLS[i % 4];
            return (
              <div key={i} className="ship-card" style={{ '--c': col }}>
                <span className="ship-disc" style={{ background: col }} />
                <h3>{b.title}</h3>
                {b.who && <div className="ship-who">{b.who}</div>}
                <p>{b.text}</p>
                {b.stack && <div className="ship-stack">{b.stack}</div>}
                {b.win && <div className="ship-win">{b.win}</div>}
              </div>
            );
          })}
          {c.slotTitle && (
            <div className="ship-card slot-card">
              <span className="ship-disc" />
              <h3>{c.slotTitle}</h3>
              <div className="ship-who">{c.slotWho}</div>
              <p>{c.slotText}</p>
              <a href="#audit">{c.slotLink}</a>
            </div>
          )}
        </div>
        {c.note && <p className="ship-note reveal">{c.note}</p>}
      </div>
    </section>
  );
}
