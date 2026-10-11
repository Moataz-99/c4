
export default function Demos() {
  return (
    <>
<section className="demos-bg" id="demos" data-move="2">
  <div className="wrap">
    <div className="section-head left reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i></i><i></i></span>move 2 of 4 · see it in action</div>
      <h2>what you'll actually be looking at</h2>
      <p>a quick look at the screens behind the pitch — including the admin dashboard your team runs day to day.</p>
    </div>
    <div className="demo-grid reveal stagger">
      <div className="demo-card">
        <div className="demo-card-label">admin dashboard</div>
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
        <p className="demo-card-desc">one calm screen for every client — connections, activity, and status at a glance. the agency admin console — sign in to see the live board.</p>
        <a href="/admin" style={{fontWeight:'600',color:'var(--mg-dark)',fontSize:'14px'}}>open the full dashboard →</a>
      </div>
      <div className="demo-card">
        <div className="demo-card-label">tracking</div>
        <div className="demo-mini-visual">
          <div className="pulse-row">
            <span className="pulse-dot"></span><span className="pulse-dot"></span><span className="pulse-dot live"></span>
          </div>
        </div>
        <p className="demo-card-desc">server-side events landing in real time, even when the browser blocks the pixel.</p>
      </div>
      <div className="demo-card">
        <div className="demo-card-label">reporting</div>
        <div className="demo-mini-visual">
          <div className="bar-chart"><span style={{height:'30%',background:'var(--cy)'}}></span><span style={{height:'55%'}}></span><span style={{height:'40%',background:'var(--lm)'}}></span><span style={{height:'70%'}}></span><span style={{height:'50%',background:'var(--mg)'}}></span></div>
        </div>
        <p className="demo-card-desc">dashboards your client opens themselves — no monthly export.</p>
      </div>
      <div className="demo-card">
        <div className="demo-card-label">automation</div>
        <div className="demo-mini-visual">
          <div className="flow-row"><span className="flow-dot" style={{background:'var(--cy)'}}></span><span className="flow-line"></span><span className="flow-dot" style={{background:'var(--am)'}}></span><span className="flow-line"></span><span className="flow-dot" style={{background:'var(--mg)'}}></span></div>
        </div>
        <p className="demo-card-desc">the handoffs and alerts, built once, running quietly since.</p>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
