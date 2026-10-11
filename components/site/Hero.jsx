import DropToWin from './DropToWin';

export default function Hero() {
  return (
    <>
<section className="hero">
  <svg className="sparkle" style={{top:'60px',left:'6%'}} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#FFD23F"/></svg>
  <svg className="sparkle" style={{top:'220px',right:'4%',animationDelay:'1.2s'}} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#A3E635"/></svg>
  <svg className="sparkle" style={{bottom:'40px',left:'14%',animationDelay:'2s'}} width="14" height="14" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#22D3EE"/></svg>
  <div className="wrap">
    <div>
      <span className="eyebrow">for agencies who are done duct-taping</span>
      <h1><span className="w" style={{'--i':0}}>your</span> <span className="w" style={{'--i':1}}>stack,</span> <span className="w" style={{'--i':2}}>finally</span><br /><span className="hl"><span className="w" style={{'--i':3}}>four</span> <span className="w" style={{'--i':4}}>in</span> <span className="w" style={{'--i':5}}>a</span> <span className="w" style={{'--i':6}}>row</span></span></h1>
      <p className="lede">we run the tracking, data, reporting and automation behind your client work. your logo on it, not ours.</p>
      <div className="cta-row">
        <a href="#contact" className="btn btn-primary">drop your first connection</a>
        <a href="#pillars" className="btn btn-ghost">see what we connect</a>
      </div>
      <div className="pillar-legend">
        <span><span className="dot" style={{background:'var(--cy)'}}></span>tracking</span>
        <span><span className="dot" style={{background:'var(--lm)'}}></span>data</span>
        <span><span className="dot" style={{background:'var(--am)'}}></span>reporting</span>
        <span><span className="dot" style={{background:'var(--mg)'}}></span>automation</span>
      </div>
    </div>
    <div>
      <DropToWin />
      
    </div>
  </div>
</section>
    </>
  );
}
