
export default function Work() {
  return (
    <>
<section id="work" data-move="2">
  <div className="wrap">
    <div className="section-head left reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i></i><i></i></span>move 2 of 4 · not theory</div>
      <h2>things we've already shipped</h2>
      <p>real builds, running in production for real businesses.</p>
    </div>
    <div className="shipped-grid reveal stagger">
      <div className="ship-card" style={{'--c':'var(--cy)'}}>
        <span className="ship-disc" style={{background:'var(--cy)'}}></span>
        <h3>comment-to-lead engine</h3>
        <div className="ship-who">retail brand, social-led</div>
        <p>comments on organic and paid posts captured automatically, intent extracted, enriched into a qualified lead list and routed into a follow-up campaign.</p>
        <div className="ship-stack">n8n · Firecrawl · self-hosted AI</div>
        <div className="ship-win">cost per lead a fraction of the SaaS equivalent.</div>
      </div>
      <div className="ship-card" style={{'--c':'var(--am)'}}>
        <span className="ship-disc" style={{background:'var(--am)'}}></span>
        <h3>receipts straight into the ERP</h3>
        <div className="ship-who">distribution business on Odoo</div>
        <p>receipts read automatically, line items and totals extracted, and written into Odoo with pricing and reconciliation logic applied on the way in.</p>
        <div className="ship-stack">OCR pipeline · n8n · Odoo API</div>
        <div className="ship-win">manual data entry gone. numbers finally agree.</div>
      </div>
      <div className="ship-card" style={{'--c':'var(--mg)'}}>
        <span className="ship-disc" style={{background:'var(--mg)'}}></span>
        <h3>one dashboard, every channel</h3>
        <div className="ship-who">multi-channel advertiser</div>
        <p>TikTok, Facebook, Instagram and WhatsApp performance in a single live view — spend, reach and response on one screen.</p>
        <div className="ship-stack">platform APIs · n8n · custom dashboard</div>
        <div className="ship-win">five tabs and a spreadsheet became one link.</div>
      </div>
      <div className="ship-card slot-card">
        <span className="ship-disc"></span>
        <h3>your build</h3>
        <div className="ship-who">the fourth slot is open</div>
        <p>three pieces down. the next thing we ship could be the one that completes your row.</p>
        <a href="#audit">start with the audit →</a>
      </div>
    </div>
    <p className="ship-note reveal">client names withheld — the same discretion your clients get from us.</p>
  </div>
</section>
    </>
  );
}
