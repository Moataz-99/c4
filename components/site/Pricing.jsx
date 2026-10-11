
export default function Pricing() {
  return (
    <>
<section className="pricing-bg" id="pricing" data-move="4">
  <div className="wrap">
    <div className="section-head reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i style={{background:'var(--am)'}}></i><i style={{background:'var(--mg)'}}></i></span>move 4 of 4 · pricing</div>
      <h2>pick your board size</h2>
    </div>
    <div className="price-row reveal stagger">
      <div className="price">
        <div className="price-board"><i style={{background:'var(--cy)'}}></i><i></i><i></i><i></i></div>
        <h3>solo</h3>
        <p className="desc">one client, one connection. for testing us.</p>
        <ul><li>one active client</li><li>one pillar of your choice</li><li>email support</li></ul>
        <a href="#contact" data-plan="solo" className="btn btn-ghost btn-md">drop a disc</a>
      </div>
      <div className="price">
        <div className="price-board"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i></i><i></i></div>
        <h3>duo</h3>
        <p className="desc">a handful of clients, full stack.</p>
        <ul><li>up to 5 clients</li><li>all four pillars</li><li>priority support</li></ul>
        <a href="#contact" data-plan="duo" className="btn btn-lime btn-md">drop a disc</a>
      </div>
      <div className="price featured">
        <span className="badge">most popular</span>
        <div className="price-board"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i style={{background:'var(--am)'}}></i><i></i></div>
        <h3>tournament</h3>
        <p className="desc">unlimited clients, white-label, your brand everywhere.</p>
        <ul><li>unlimited clients</li><li>all four pillars</li><li>full white-label</li><li>priority support</li></ul>
        <a href="#contact" data-plan="tournament" className="btn btn-primary btn-md">drop a disc</a>
      </div>
      <div className="price">
        <div className="price-board"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i style={{background:'var(--am)'}}></i><i style={{background:'var(--mg)'}}></i></div>
        <h3>league</h3>
        <p className="desc">agency groups and multi-brand networks.</p>
        <ul><li>multiple agencies or brands</li><li>custom integrations</li><li>dedicated engineer</li><li>agreed SLAs</li></ul>
        <a href="#contact" data-plan="league" className="btn btn-light btn-md">talk to us</a>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
