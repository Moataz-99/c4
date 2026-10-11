'use client';
import { useEffect } from 'react';

const COLORS = ['#22D3EE', '#A3E635', '#FFD23F', '#FF3D8B'];

export default function SiteEffects() {
  useEffect(() => {
    /* sections, card grids, counters and board strips drop in as they scroll into view */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, .anim').forEach((el) => io.observe(el));

    /* a little toy: click empty space in the hero and a disc falls from that spot */
    const hero = document.querySelector('.hero');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let n = 0;
    const drop = (e) => {
      if (reduce || e.button !== 0 || e.target.closest('a, button, input, .c4-game, h1, p')) return;
      if (hero.querySelectorAll('.toy-disc').length > 14) return;
      const r = hero.getBoundingClientRect();
      const d = document.createElement('span');
      d.className = 'toy-disc';
      d.style.left = e.clientX - r.left - 17 + 'px';
      d.style.top = e.clientY - r.top - 17 + 'px';
      d.style.background = COLORS[n++ % 4];
      d.style.setProperty('--fall', r.bottom - e.clientY + 60 + 'px');
      d.style.setProperty('--spin', (Math.random() * 300 - 150) + 'deg');
      hero.appendChild(d);
      d.addEventListener('animationend', () => d.remove());
    };
    hero?.addEventListener('pointerdown', drop);
    return () => { io.disconnect(); hero?.removeEventListener('pointerdown', drop); };
  }, []);
  return null;
}
