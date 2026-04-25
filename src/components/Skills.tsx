import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticlesBg from './ParticlesBg';

const skills = [
  'Bookkeeping', 'Compliance', 'Basic Accounting', 'Inventory Audit', 'Financial Statement Audit', 
  'Data Entry', 'Power Query', 'Power BI',
  'Data Modeling', 'Basic DAX', 'Accounts Payable', 'Accounts Receivable', 'Advanced Excel', 'Reconciliation',
  'Data Validation', 'Confidentiality', 'Documentation Control', 'Record Keeping',
  'Variance Analysis', 'Process Improvement', 'Analytical & Problem Solving', 'Risk Assessment',
  'Supply Chain Management', 'Customer Relations', 'People Management', 'Microsoft Excel',
  'Attention to details', 'AI-Assisted App Development', 'Time Management',
];

const weights = ['weight-light', 'weight-regular', 'weight-medium', 'weight-semibold', 'weight-bold'] as const;

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initiated = false;

    const init = () => {
      if (initiated) return;

      const W = container.offsetWidth;
      const H = container.offsetHeight;
      if (W < 100 || H < 100) return;
      initiated = true;

      const els = Array.from(container.querySelectorAll<HTMLElement>('.skill-item'));

      // Each word gets its own physics state
      type Particle = {
        el: HTMLElement;
        x: number;
        y: number;
        vx: number;
        vy: number;
        w: number;
        h: number;
      };

      const particles: Particle[] = els.map((el, i) => {
        // Measure the element
        el.style.opacity = '0';
        const w = el.offsetWidth  || 120;
        const h = el.offsetHeight || 28;

        // Fully random starting position within bounds
        const x = Math.random() * (W - w);
        const y = Math.random() * (H - h);

        el.style.left = `${x}px`;
        el.style.top  = `${y}px`;

        // Random speed between 0.4 and 1.4 px/frame, random direction
        const speed = 0.4 + Math.random() * 1.0;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Fade in with stagger
        const t = gsap.fromTo(el,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.55, delay: i * 0.04, ease: 'power2.out' }
        );
        tweensRef.current.push(t);

        return { el, x, y, vx, vy, w, h };
      });

      // Animation loop — move each word and bounce off walls
      const tick = () => {
        const cW = container.offsetWidth;
        const cH = container.offsetHeight;

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off right / left
          if (p.x + p.w >= cW) { p.x = cW - p.w; p.vx = -Math.abs(p.vx); }
          if (p.x <= 0)         { p.x = 0;         p.vx =  Math.abs(p.vx); }

          // Bounce off bottom / top
          if (p.y + p.h >= cH) { p.y = cH - p.h; p.vy = -Math.abs(p.vy); }
          if (p.y <= 0)         { p.y = 0;         p.vy =  Math.abs(p.vy); }

          p.el.style.left = `${p.x}px`;
          p.el.style.top  = `${p.y}px`;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    init();

    const ro = new ResizeObserver(() => init());
    ro.observe(container);

    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      tweensRef.current.forEach(t => t.kill());
      tweensRef.current = [];
    };
  }, []);

  return (
    <section className="skills" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticlesBg />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <h2 className="section-title">Skills</h2>
        <div
          className="skills-container"
          ref={containerRef}
          id="skillsContainer"
          style={{ width: '100%' }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill}
              className={`skill-item ${weights[Math.floor(i * 13.7 % weights.length)]}`}
              style={{ opacity: 0 }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
