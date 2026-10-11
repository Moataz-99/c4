
export default function Problem() {
  return (
    <>
<section className="problem-bg" id="problem" data-move="1">
  <svg className="sparkle" style={{top:'20px',right:'8%'}} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#FF3D8B"/></svg>
  <svg className="sparkle" style={{bottom:'30px',left:'5%',animationDelay:'1.4s'}} width="14" height="14" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#22D3EE"/></svg>
  <div className="wrap">
    <div className="section-head left reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i></i><i></i><i></i></span>move 1 of 4 · what we fix</div>
      <h2>four things break, and none of them are your job</h2>
      <p>every agency backend has the same four failure points. you didn't sign up to debug pixels — we did.</p>
    </div>
    <div className="grid-4 reveal stagger">
      <div className="pcard"><div className="chip" style={{background:'var(--cy)'}}></div><h3>tracking</h3><p>conversions stopped matching the ad platform three weeks ago and nobody can say why.</p></div>
      <div className="pcard"><div className="chip" style={{background:'var(--lm)'}}></div><h3>data</h3><p>every client sits in a different set of tools and none of them talk to each other.</p></div>
      <div className="pcard"><div className="chip" style={{background:'var(--am)'}}></div><h3>reporting</h3><p>someone on your team spends two days a month copying numbers into slides.</p></div>
      <div className="pcard"><div className="chip" style={{background:'var(--mg)'}}></div><h3>automation</h3><p>the workflow only works because one person remembers to click the thing.</p></div>
    </div>
    <p className="closer reveal">you sell strategy. you shouldn't be debugging pixels at 11pm.</p>
  </div>
</section>
    </>
  );
}
