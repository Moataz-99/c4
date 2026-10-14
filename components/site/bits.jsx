/* small shared pieces for the editable sections */
export const COLS = ['var(--cy)', 'var(--lm)', 'var(--am)', 'var(--mg)'];
export const SOFT = ['#E4FAFD', '#F1FBE0', '#FFF7E0', '#FFE9F2'];
export const DARK = ['var(--cy-dark)', 'var(--lm-dark)', 'var(--am-dark)', 'var(--mg-dark)'];

export function Label({ move, text }) {
  return (
    <div className="section-label">
      <span className="move">{[0, 1, 2, 3].map((i) => <i key={i} style={i < move ? { background: COLS[i] } : undefined} />)}</span>
      move {move} of 4 · {text}
    </div>
  );
}

/* turns line breaks typed in the editor into real line breaks */
export function Lines({ text }) {
  const parts = String(text ?? '').split('\n');
  return parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <br />}</span>);
}

export const Sparkle = ({ style, size, fill }) => (
  <svg className="sparkle" style={style} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill={fill} /></svg>
);
