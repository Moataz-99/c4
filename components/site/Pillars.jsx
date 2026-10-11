
export default function Pillars() {
  return (
    <>
<section id="pillars" data-move="1">
  <svg className="sparkle" style={{top:'10px',left:'6%'}} width="15" height="15" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#FFD23F"/></svg>
  <svg className="sparkle" style={{bottom:'10px',right:'8%',animationDelay:'1.8s'}} width="14" height="14" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#A3E635"/></svg>
  <div className="wrap">
    <div className="section-head left reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i></i><i></i><i></i></span>move 1 of 4 · what we connect</div>
      <h2>drop in what's missing</h2>
      <p>pick one pillar or all four. every connection ships white-labelled under your agency's name.</p>
    </div>
    <div className="pillar-row reveal stagger">
      <div className="pillar" style={{background:'#E4FAFD'}}><span className="num" style={{color:'var(--cy-dark)'}}>01</span><h3>tracking that survives</h3><p>server-side events that don't disappear when a browser blocks them.</p></div>
      <div className="pillar" style={{background:'#F1FBE0'}}><span className="num" style={{color:'var(--lm-dark)'}}>02</span><h3>data in one place</h3><p>every platform, every client, one warehouse you actually own.</p></div>
      <div className="pillar" style={{background:'#FFF7E0'}}><span className="num" style={{color:'var(--am-dark)'}}>03</span><h3>reporting that runs itself</h3><p>dashboards your client opens themselves. no monthly scramble.</p></div>
      <div className="pillar" style={{background:'#FFE9F2'}}><span className="num" style={{color:'var(--mg-dark)'}}>04</span><h3>automation that holds</h3><p>the handoffs, the alerts, the reports. built once, runs quietly.</p></div>
    </div>
  </div>
</section>
    </>
  );
}
