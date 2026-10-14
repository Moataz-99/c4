
export default function Footer({ c }) {
  return (
    <>
<footer>
  <div className="wrap foot-row">
    <div className="logo" style={{fontSize:'16px'}}>
      <span>connect</span>
      <svg width="20" height="20" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" rx="9" fill="#4C36C9" stroke="#17103A" strokeWidth="2.2"/><path d="M19 6L8 18L19 18M19 6L19 26" fill="none" stroke="#FFD23F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="19" cy="6" r="3.8" fill="#FF3D8B" stroke="#17103A" strokeWidth="1.3"/><circle cx="17.6" cy="4.6" r=".9" fill="#fff" opacity=".55"/><circle cx="8" cy="18" r="3.8" fill="#22D3EE" stroke="#17103A" strokeWidth="1.3"/><circle cx="6.6" cy="16.6" r=".9" fill="#fff" opacity=".55"/><circle cx="19" cy="18" r="3.8" fill="#A3E635" stroke="#17103A" strokeWidth="1.3"/><circle cx="17.6" cy="16.6" r=".9" fill="#fff" opacity=".55"/><circle cx="19" cy="26" r="3.8" fill="#FFD23F" stroke="#17103A" strokeWidth="1.3"/><circle cx="17.6" cy="24.6" r=".9" fill="#fff" opacity=".55"/></svg>
    </div>
    <div className="foot-links">
      <a href="#problem">what we fix</a>
      <a href="#white-label">white label</a>
      <a href="#demos">demos</a>
      <a href="#work">work</a>
      <a href="#ai">AI</a>
      <a href="#audit">tracking audit</a>
      <a href="#pricing">pricing</a>
      <a href="#contact">contact</a>
    </div>
    <span style={{fontSize:'12px',color:'var(--muted)'}}>{c.footer}</span>
  </div>
</footer>
    </>
  );
}
