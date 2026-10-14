'use client';
import { useEffect } from 'react';

const COLORS = ['#22D3EE', '#A3E635', '#FFD23F', '#FF3D8B'];
const SKIP = 'a, button, input, textarea, select, label, summary, [role="tab"], .c4-game, .c-form, .coin-nav, .dropbar, .toy-hint';

export default function SiteEffects({ hint = 'psst — click anywhere to drop a disc' }) {
  useEffect(() => {
    /* sections, card grids, counters and board strips drop in as they scroll into view */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    const watch = () => document.querySelectorAll('.reveal:not(.in), .anim:not(.in)').forEach((el) => io.observe(el));
    watch();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const layer = document.createElement('div');
    layer.className = 'drop-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    let n = 0;

    const spawn = (x, y, color, cls = 'toy-disc', delay = 0) => {
      if (layer.childElementCount > 40) return;
      const d = document.createElement('span');
      d.className = cls;
      d.style.left = x - 17 + 'px';
      d.style.top = y - 17 + 'px';
      d.style.background = color;
      d.style.setProperty('--fall', Math.max(40, window.innerHeight - y - 24) + 'px');
      d.style.setProperty('--drift', (Math.random() * 90 - 45) + 'px');
      d.style.setProperty('--spin', (Math.random() * 300 - 150) + 'deg');
      d.style.animationDelay = delay + 'ms';
      layer.appendChild(d);
      d.addEventListener('animationend', () => d.remove());
    };

    /* click anywhere that isn't a control and a disc drops from that spot, lands, bounces and rolls away */
    const onDown = (e) => {
      if (reduce || e.button !== 0 || e.target.closest(SKIP)) return;
      if (window.getSelection()?.toString()) return;
      spawn(e.clientX, e.clientY, COLORS[n++ % 4]);
    };

    /* switching tabs pulls the board's release lever: a row of discs falls through the screen */
    const onRelease = () => {
      if (reduce) return;
      const w = window.innerWidth, cols = Math.min(12, Math.floor(w / 110));
      for (let i = 0; i < cols; i++) {
        spawn((w / cols) * (i + 0.5), 96, COLORS[(i + n) % 4], 'toy-disc rain', i * 45 + Math.random() * 60);
      }
      n++;
      setTimeout(watch, 50);
    };

    document.addEventListener('pointerdown', onDown);
    window.addEventListener('c4:release', onRelease);

    /* a one-time hint so people find the toy */
    let hintT;
    try {
      if (!reduce && !sessionStorage.getItem('c4-hint')) {
        hintT = setTimeout(() => {
          const h = document.createElement('div');
          h.className = 'toy-hint';
          h.innerHTML = '<i></i>';
          h.appendChild(document.createTextNode(hint));
          document.body.appendChild(h);
          setTimeout(() => h.classList.add('out'), 4600);
          setTimeout(() => h.remove(), 5200);
          sessionStorage.setItem('c4-hint', '1');
        }, 5000);
      }
    } catch { /* storage blocked — skip the hint */ }

    return () => {
      io.disconnect(); clearTimeout(hintT);
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('c4:release', onRelease);
      layer.remove();
    };
  }, [hint]);
  return null;
}
