'use client';
import { useEffect, useRef, useState } from 'react';

const PICKS = [['tracking', 'var(--cy)'], ['data', 'var(--lm)'], ['reporting', 'var(--am)'], ['automation', 'var(--mg)']];

export default function ContactForm({ c }) {
  const [state, setState] = useState('idle'); // idle · sending · sent
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const msgRef = useRef(null);

  // pricing buttons carry data-plan; pre-fill the message with the plan they picked
  useEffect(() => {
    const onClick = (e) => {
      const b = e.target.closest('[data-plan]');
      if (b && msgRef.current && !msgRef.current.value.trim()) msgRef.current.value = `we're interested in the ${b.dataset.plan} board.`;
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  async function submit(e) {
    e.preventDefault();
    const f = new FormData(formRef.current);
    const data = {
      name: f.get('name'), agency: f.get('agency'), email: f.get('email'),
      message: f.get('message'), website: f.get('website'), pillars: f.getAll('pillar')
    };
    if (!String(data.name).trim() || !/^\S+@\S+\.\S+$/.test(String(data.email))) {
      setError('we need your name and a valid email.');
      return;
    }
    setError('');
    setState('sending');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'failed');
      setState('sent');
    } catch (err) {
      setState('idle');
      setError(err.message && err.message !== 'failed' ? err.message : 'that one bounced — email us directly instead.');
    }
  }

  return (
    <div className={`c-form reveal${state === 'sent' ? ' sent' : ''}`} id="contactBox">
      <form ref={formRef} noValidate onSubmit={submit}>
        <h3>{c.formTitle}</h3>
        <p className="sub">{c.formSub}</p>
        <div className="f-row">
          <div className="f-field"><label htmlFor="fName">your name</label><input id="fName" name="name" autoComplete="name" required /></div>
          <div className="f-field"><label htmlFor="fAgency">agency</label><input id="fAgency" name="agency" autoComplete="organization" /></div>
        </div>
        <div className="f-field"><label htmlFor="fEmail">email</label><input id="fEmail" name="email" type="email" autoComplete="email" required /></div>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
        <span className="f-label">what do you want to connect?</span>
        <div className="pick">
          {PICKS.map(([p, c]) => (
            <label key={p}><input type="checkbox" name="pillar" value={p} /><span className="hole" style={{ '--c': c }} />{p}</label>
          ))}
        </div>
        <div className="f-field"><label htmlFor="fMsg">what's going on?</label><textarea id="fMsg" name="message" ref={msgRef} placeholder="e.g. our conversions stopped matching meta three weeks ago…" /></div>
        <div className="f-err" role="alert">{error}</div>
        <div className="f-submit">
          <button type="submit" className="btn btn-light btn-md" disabled={state === 'sending'}>{state === 'sending' ? 'dropping…' : c.formButton}</button>
          {c.email && <small>or email {c.email} directly.</small>}
        </div>
      </form>
      <div className="c-done" role="status">
        <div className="row"><i style={{ background: 'var(--cy)' }} /><i style={{ background: 'var(--lm)' }} /><i style={{ background: 'var(--am)' }} /><i style={{ background: 'var(--mg)' }} /></div>
        <h3>{c.sentTitle}</h3>
        <p>{c.sentText}</p>
        <button type="button" className="btn btn-ghost btn-md" style={{ marginTop: 20 }} onClick={() => { formRef.current.reset(); setState('idle'); }}>send another</button>
      </div>
    </div>
  );
}
