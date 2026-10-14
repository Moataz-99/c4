import { TABS } from './tabs';

export default function Header({ active = 0, tabs = TABS, brand }) {
  return (
    <>
<header>
<nav className="wrap">
  <div className="logo">
    <span>connect</span>
    <svg width="26" height="26" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" rx="9" fill="#4C36C9" stroke="#17103A" strokeWidth="2.2"/><path d="M19 6L8 18L19 18M19 6L19 26" fill="none" stroke="#FFD23F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="19" cy="6" r="3.8" fill="#FF3D8B" stroke="#17103A" strokeWidth="1.3"/><circle cx="17.6" cy="4.6" r=".9" fill="#fff" opacity=".55"/><circle cx="8" cy="18" r="3.8" fill="#22D3EE" stroke="#17103A" strokeWidth="1.3"/><circle cx="6.6" cy="16.6" r=".9" fill="#fff" opacity=".55"/><circle cx="19" cy="18" r="3.8" fill="#A3E635" stroke="#17103A" strokeWidth="1.3"/><circle cx="17.6" cy="16.6" r=".9" fill="#fff" opacity=".55"/><circle cx="19" cy="26" r="3.8" fill="#FFD23F" stroke="#17103A" strokeWidth="1.3"/><circle cx="17.6" cy="24.6" r=".9" fill="#fff" opacity=".55"/></svg>
    <span className="logo-tag">{brand.tagline}</span>
  </div>
  <div className="navlinks" role="tablist" aria-label="site sections">
    {tabs.map((t, i) => (
      <a key={t.id} href={`#tab-${t.id}`} role="tab" aria-selected={active === i}
         className={`tab-link${active === i ? ' active' : ''}`} style={{ '--c': t.c }}>
        <i aria-hidden="true" />{t.label}
      </a>
    ))}
    <a href="#contact" className="btn btn-primary btn-sm">{brand.demoButton}</a>
  </div>
</nav>
</header>
    </>
  );
}
