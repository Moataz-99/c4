import { Label } from './bits';

const VISUALS = [
  <div className="pulse-row" key="p"><span className="pulse-dot" /><span className="pulse-dot" /><span className="pulse-dot live" /></div>,
  <div className="bar-chart" key="b"><span style={{ height: '30%', background: 'var(--cy)' }} /><span style={{ height: '55%' }} /><span style={{ height: '40%', background: 'var(--lm)' }} /><span style={{ height: '70%' }} /><span style={{ height: '50%', background: 'var(--mg)' }} /></div>,
  <div className="flow-row" key="f"><span className="flow-dot" style={{ background: 'var(--cy)' }} /><span className="flow-line" /><span className="flow-dot" style={{ background: 'var(--am)' }} /><span className="flow-line" /><span className="flow-dot" style={{ background: 'var(--mg)' }} /></div>
];

export default function Demos({ c }) {
  return (
    <section className="demos-bg" id="demos" data-move="2">
      <div className="wrap">
        <div className="section-head left reveal">
          <Label move={2} text={c.label} />
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </div>
        <div className="demo-grid reveal stagger">
          <div className="demo-card">
            <div className="demo-card-label">{c.dashTitle}</div>
            <div className="dash-mock">
          <div className="dash-top"><div className="dash-dots"><span></span><span></span><span></span></div><div className="dash-title">connect4 / admin</div></div>
          <div className="dash-body">
            <div className="dash-side">
              <div className="dash-side-item active"></div>
              <div className="dash-side-item" style={{background:'#22D3EE'}}></div>
              <div className="dash-side-item" style={{background:'#A3E635'}}></div>
              <div className="dash-side-item" style={{background:'#FFD23F'}}></div>
              <div className="dash-side-item" style={{background:'#FF3D8B'}}></div>
            </div>
            <div className="dash-main">
              <div className="dash-stats">
                <div className="dash-stat"><span className="dash-stat-dot" style={{background:'#22D3EE'}}></span><div><div className="dash-stat-num">18.2k</div><div className="dash-stat-label">events today</div></div></div>
                <div className="dash-stat"><span className="dash-stat-dot" style={{background:'#A3E635'}}></span><div><div className="dash-stat-num">42</div><div className="dash-stat-label">clients synced</div></div></div>
                <div className="dash-stat"><span className="dash-stat-dot" style={{background:'#FFD23F'}}></span><div><div className="dash-stat-num">7</div><div className="dash-stat-label">reports sent</div></div></div>
                <div className="dash-stat"><span className="dash-stat-dot" style={{background:'#FF3D8B'}}></span><div><div className="dash-stat-num">3</div><div className="dash-stat-label">automations run</div></div></div>
              </div>
              <div className="dash-table">
                <div className="dash-row"><span className="dash-row-name">Aster Digital</span><span className="dash-row-tag" style={{background:'#E4FAFD',color:'#0E7C90'}}>tracking</span><span className="dash-row-status ok">● connected</span></div>
                <div className="dash-row"><span className="dash-row-name">Northbound Agency</span><span className="dash-row-tag" style={{background:'#FFF7E0',color:'#9A7405'}}>reporting</span><span className="dash-row-status ok">● connected</span></div>
                <div className="dash-row"><span className="dash-row-name">Fernwood Media</span><span className="dash-row-tag" style={{background:'#F1FBE0',color:'#5A8014'}}>data</span><span className="dash-row-status pending">● syncing</span></div>
              </div>
            </div>
          </div>
        </div>
            <p className="demo-card-desc">{c.dashText}</p>
            <a href="/admin" style={{ fontWeight: '600', color: 'var(--mg-dark)', fontSize: '14px' }}>{c.dashLink}</a>
          </div>
          {c.cards.map((k, i) => (
            <div key={i} className="demo-card">
              <div className="demo-card-label">{k.title}</div>
              <div className="demo-mini-visual">{VISUALS[i % 3]}</div>
              <p className="demo-card-desc">{k.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
