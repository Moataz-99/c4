import ContactForm from './ContactForm';
import { Label } from './bits';

/* digits only, for the wa.me link */
const waLink = (n) => `https://wa.me/${String(n || '').replace(/[^0-9]/g, '')}`;

export default function Contact({ c }) {
  const hasWa = /[0-9]{6,}/.test(String(c.whatsapp || '').replace(/[^0-9]/g, ''));
  return (
    <section className="contact-bg" id="contact" data-move="4">
      <div className="wrap contact-grid">
        <div className="reveal">
          <Label move={4} text={c.label} />
          <h2 style={{ fontSize: 'clamp(28px,3.6vw,42px)', marginBottom: '12px' }}>{c.title}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', maxWidth: '44ch' }}>{c.text}</p>
          <div className="c-methods">
            {c.email && <a className="c-method" href={`mailto:${c.email}`} style={{ '--c': 'var(--cy)' }}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg></span><span style={{ minWidth: '0' }}><small>email</small><b>{c.email}</b></span></a>}
            {c.whatsapp && (hasWa
              ? <a className="c-method" href={waLink(c.whatsapp)} target="_blank" rel="noopener" style={{ '--c': 'var(--lm)' }}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/></svg></span><span style={{ minWidth: '0' }}><small>whatsapp</small><b>{c.whatsapp}</b></span></a>
              : <div className="c-method" style={{ '--c': 'var(--lm)' }}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/></svg></span><span style={{ minWidth: '0' }}><small>whatsapp</small><b>{c.whatsapp}</b></span></div>)}
            {c.location && <div className="c-method" style={{ '--c': 'var(--am)' }}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#17103A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><span style={{ minWidth: '0' }}><small>based in</small><b>{c.location}</b></span></div>}
            {c.linkedinLabel && <a className="c-method" href={c.linkedinUrl || '#'} target="_blank" rel="noopener" style={{ '--c': 'var(--mg)' }}><span className="d"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/></svg></span><span style={{ minWidth: '0' }}><small>linkedin</small><b>{c.linkedinLabel}</b></span></a>}
          </div>
          {c.replyNote && <p className="c-note"><i />{c.replyNote}</p>}
        </div>
        <ContactForm c={c} />
      </div>
    </section>
  );
}
