import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <>
<section className="contact-bg" id="contact" data-move="4">
  <div className="wrap contact-grid">
    <div className="reveal">
      <div className="section-label"><span className="move"><i style={{background:'var(--cy)'}}></i><i style={{background:'var(--lm)'}}></i><i style={{background:'var(--am)'}}></i><i style={{background:'var(--mg)'}}></i></span>move 4 of 4 · contact</div>
      <h2 style={{fontSize:'clamp(28px,3.6vw,42px)',marginBottom:'12px'}}>your move.</h2>
      <p style={{color:'var(--muted)',fontSize:'16px',maxWidth:'44ch'}}>tell us what's broken, or just say hi. four ways to reach us — pick the one you'd actually use.</p>
      <div className="c-methods">
        <a className="c-method" href="mailto:hello@connect4.tech" style={{'--c':'var(--cy)'}}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg></span><span style={{minWidth:'0'}}><small>email</small><b>hello@connect4.tech</b></span></a>
        <a className="c-method" href="https://wa.me/20XXXXXXXXXX" target="_blank" rel="noopener" style={{'--c':'var(--lm)'}}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/></svg></span><span style={{minWidth:'0'}}><small>whatsapp</small><b>+20 1XX XXX XXXX</b></span></a>
        <div className="c-method" style={{'--c':'var(--am)'}}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><span style={{minWidth:'0'}}><small>based in</small><b>Cairo, Egypt</b></span></div>
        <a className="c-method" href="https://www.linkedin.com/" target="_blank" rel="noopener" style={{'--c':'var(--mg)'}}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/></svg></span><span style={{minWidth:'0'}}><small>linkedin</small><b>connect 4 digital tech</b></span></a>
      </div>
      <p className="c-note"><i></i>we reply within one working day.</p>
    </div>

    <ContactForm />
  </div>
</section>
    </>
  );
}
