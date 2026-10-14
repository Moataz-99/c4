import { Label } from './bits';

export default function WhiteLabel({ c }) {
  return (
    <section id="white-label" data-move="2">
      <div className="wrap">
        <div className="wl reveal">
          <div className="wl-inner">
            <div>
              <Label move={2} text={c.label} />
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              {c.closing && <p style={{ marginTop: '14px', color: '#fff', fontWeight: '600' }}>{c.closing}</p>}
            </div>
            <div className="wl-board">
              <svg width="240" viewBox="0 0 264 264" aria-hidden="true"><rect x="8" y="8" width="248" height="248" rx="28" fill="#4C36C9" stroke="#0F0A2E" strokeWidth="4"/><circle cx="48" cy="56" r="21" fill="#241A5C"/><circle cx="104" cy="56" r="21" fill="#241A5C"/><circle cx="160" cy="56" r="21" fill="#241A5C"/><circle cx="216" cy="56" r="21" fill="#241A5C"/><circle cx="48" cy="112" r="21" fill="#241A5C"/><circle cx="104" cy="112" r="21" fill="#241A5C"/><circle cx="160" cy="112" r="21" fill="#241A5C"/><circle cx="216" cy="112" r="21" fill="#241A5C"/><circle cx="48" cy="168" r="21" fill="#241A5C"/><circle cx="104" cy="168" r="21" fill="#241A5C"/><circle cx="160" cy="168" r="21" fill="#241A5C"/><circle cx="216" cy="168" r="21" fill="#241A5C"/><circle cx="48" cy="218" r="21" fill="#22D3EE" stroke="#0F0A2E" strokeWidth="3"/><circle cx="104" cy="218" r="21" fill="#A3E635" stroke="#0F0A2E" strokeWidth="3"/><circle cx="160" cy="218" r="21" fill="#FFD23F" stroke="#0F0A2E" strokeWidth="3"/><circle cx="216" cy="218" r="21" fill="#FF3D8B" stroke="#0F0A2E" strokeWidth="3"/><path d="M48 218L216 218" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" opacity=".7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
