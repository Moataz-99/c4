
export default function Ai() {
  return (
    <>
<section className="ai-section" id="ai" data-move="3">
  <div className="wrap">
    <div className="section-head left reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i style={{background:'var(--am)'}}></i><i></i></span>move 3 of 4 · private AI</div>
      <h2>AI power, without the AI bill</h2>
      <p>we run open AI models on our own servers. your clients get the capability — without per-message costs or their data leaving home.</p>
    </div>
    <div className="ai-wrap reveal">
      <div className="ai-server">
        <div className="kicker">OUR SERVER</div>
        <h3>running open models</h3>
        <div className="model-grid">
          <div className="model"><span className="d" style={{background:'var(--cy)'}}></span>Llama</div>
          <div className="model"><span className="d" style={{background:'var(--lm)'}}></span>Qwen</div>
          <div className="model"><span className="d" style={{background:'var(--am)'}}></span>Mistral</div>
          <div className="model"><span className="d" style={{background:'var(--mg)'}}></span>Gemma</div>
          <div className="model"><span className="d" style={{background:'var(--cy)'}}></span>Whisper</div>
          <div className="model next"><span className="d"></span>+ next</div>
        </div>
      </div>
      <div>
        <div className="ai-reasons">
          <div className="ai-reason"><span className="d" style={{background:'var(--cy)'}}></span><div><h4>flat cost, not per message</h4><p>one fixed monthly bill. the ten-thousandth message costs the same as the first.</p></div></div>
          <div className="ai-reason"><span className="d" style={{background:'var(--lm)'}}></span><div><h4>client data stays home</h4><p>briefs, comments and customer data never leave our infrastructure.</p></div></div>
          <div className="ai-reason"><span className="d" style={{background:'var(--am)'}}></span><div><h4>arabic-capable</h4><p>open models handle Arabic well and can be tuned on each brand's own content.</p></div></div>
          <div className="ai-reason"><span className="d" style={{background:'var(--mg)'}}></span><div><h4>no lock-in</h4><p>when a better model ships, we swap it in. nothing gets rebuilt.</p></div></div>
        </div>
        <div className="ai-routing"><b>smart routing.</b> local models handle the volume; premium AI is called only for the cases worth paying for.</div>
      </div>
    </div>

    <div className="idea-grid reveal stagger">
      <div className="idea"><h4><i style={{background:'var(--cy)'}}></i>crisis alarm</h4><p>flags a brand's comment sentiment turning — dialect-aware — before it trends.</p></div>
      <div className="idea"><h4><i style={{background:'var(--am)'}}></i>report narrator</h4><p>turns the numbers into a plain-language summary a client actually reads.</p></div>
      <div className="idea"><h4><i style={{background:'var(--mg)'}}></i>competitor ad radar</h4><p>watches competitors' live ads and surfaces what changed each week.</p></div>
      <div className="idea"><h4><i style={{background:'var(--lm)'}}></i>creator concierge</h4><p>booking, payments and follow-ups for personal brands — built once, reused across the roster.</p></div>
    </div>
    <p className="ai-principle reveal">AI does the heavy lifting. a person approves anything a client sees.</p>
  </div>
</section>
    </>
  );
}
