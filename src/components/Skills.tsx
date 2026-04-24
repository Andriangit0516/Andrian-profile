import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticlesBg from './ParticlesBg';

const skills = [
  'Bookkeeping', 'Analytical & Problem Solving', 'Basic Accounting', 'Inventory Audit', 'Data Entry',
  'Financial Statement Audit', 'Advanced Excel', 'Power Query', 'Power BI',
  'Data Modeling', 'Basic DAX', 'Accounts Payable', 'Accounts Receivable', 'Reconciliation',
  'Data Validation', 'Confidentiality', 'Documentation Control', 'Record Keeping',
  'Variance Analysis', 'Process Improvement', 'Compliance', 'Risk Assessment',
  'Supply Chain Management', 'Customer Relations', 'People Management', 'Microsoft Excel',
  'Attention to details', 'Time Management', 'AI-Assisted App Development',
];

const weights = ['weight-light', 'weight-regular', 'weight-medium', 'weight-semibold', 'weight-bold'] as const;

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    // Use ResizeObserver so we always get the final rendered dimensions,
    // even if the flex/grid parent resolves after the first paint.
    const container = containerRef.current;
    if (!container) return;

    let initiated = false;

    const init = () => {
      if (initiated) return;

      const W = container.offsetWidth;
      const H = container.offsetHeight;

      // Guard: don't run until the container has real size
      if (W < 100 || H < 100) return;
      initiated = true;

      const els = Array.from(container.querySelectorAll<HTMLElement>('.skill-item'));

      // ── Grid-based placement ──────────────────────────────────────────
      // Divide the canvas into a grid of NUM_COLS × NUM_ROWS cells so
      // every word gets its own zone, preventing clusters.
      const NUM_COLS = 6;
      const NUM_ROWS = Math.ceil(els.length / NUM_COLS);
      const cellW = W / NUM_COLS;
      const cellH = H / NUM_ROWS;

      // We need each element's real rendered size BEFORE positioning it,
      // so briefly make it visible (opacity still 0 but not display:none).
      els.forEach((el, i) => {
        const col = i % NUM_COLS;
        const row = Math.floor(i / NUM_COLS);

        // Measure the element (it's in the DOM, just opacity:0)
        const elW = el.offsetWidth  || 120;
        const elH = el.offsetHeight || 28;

        // Cell centre ± up to 30% of cell size as jitter
        const jX = (Math.random() - 0.5) * cellW * 0.6;
        const jY = (Math.random() - 0.5) * cellH * 0.6;

        const cx = col * cellW + cellW / 2 - elW / 2 + jX;
        const cy = row * cellH + cellH / 2 - elH / 2 + jY;

        // Clamp so words never bleed outside the container
        el.style.left = `${Math.max(4, Math.min(W - elW - 4, cx))}px`;
        el.style.top  = `${Math.max(4, Math.min(H - elH - 4, cy))}px`;

        // Fade-in stagger, then start floating
        const tween = gsap.fromTo(el,
          { opacity: 0, scale: 0.75 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            delay: i * 0.045,
            ease: 'power2.out',
            onComplete: () => {
              const drift = gsap.to(el, {
                x: `random(${-cellW * 0.18}, ${cellW * 0.18})`,
                y: `random(${-cellH * 0.18}, ${cellH * 0.18})`,
                duration: gsap.utils.random(6, 12),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2,
              });
              animationsRef.current.push(drift);
            },
          }
        );
        animationsRef.current.push(tween);
      });
    };

    // Try immediately (handles cases where layout is already resolved)
    init();

    // Also watch for size changes (handles deferred flex/grid layout)
    const ro = new ResizeObserver(() => init());
    ro.observe(container);

    return () => {
      ro.disconnect();
      animationsRef.current.forEach(t => t.kill());
      animationsRef.current = [];
    };
  }, []);

  return (
    <section className="skills" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticlesBg />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <h2 className="section-title">Skills</h2>
        {/* 
          Key fix: explicit width: 100% on the container so it always
          stretches to fill the section, not just its inline content.
          Height is already set in CSS (.skills-container { height: 750px }).
        */}
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
