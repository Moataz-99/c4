const PAL = ['#22D3EE', '#A3E635', '#FFD23F', '#FF3D8B'];
const SCATTER = { 3: 0, 9: 1, 14: 2, 31: 3, 36: 0, 41: 2 };

export default function BoardStrip({ move, title, win = false }) {
  return (
    <div className="board-strip anim" aria-hidden="true">
      <div className="holes">
        {Array.from({ length: 48 }, (_, k) => {
          if (win && k >= 26 && k <= 29) return <i key={k} className="f glow" style={{ background: PAL[k - 26], '--k': k - 26 }} />;
          if (!win && k in SCATTER) return <i key={k} className="f" style={{ background: PAL[SCATTER[k]], '--k': Object.keys(SCATTER).indexOf(String(k)) }} />;
          return <i key={k} />;
        })}
      </div>
      <div className="strip-badge">move {move} of 4 · {title}</div>
    </div>
  );
}
