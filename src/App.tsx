import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from './hooks/useTheme';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll config — tells GSAP to batch DOM reads
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Let the browser paint first, then init all animations in one batch
    const ctx = gsap.context(() => {

      // ── Hero parallax ──────────────────────────────────────────────
      gsap.to('.hero-content', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: 200, opacity: 0, ease: 'none',
      });
      gsap.to('.hero-image', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: 100, scale: 0.8, ease: 'none',
      });

      // ── Timeline items ─────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach(item => {
        gsap.fromTo(item,
          { scale: 0.85, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ── Glowing orb scrub along timeline ──────────────────────────
      const timeline = document.getElementById('timeline');
      const orb = document.getElementById('timelineOrb');
      if (timeline && orb) {
        ScrollTrigger.create({
          trigger: timeline,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: self => {
            gsap.to(orb, {
              y: self.progress * (timeline.offsetHeight - orb.offsetHeight),
              duration: 0.3,
              ease: 'power2.out',
            });
          },
        });
      }

      // ── Skills floating ────────────────────────────────────────────
      const skillEls = gsap.utils.toArray<HTMLElement>('.skill-item');
      const total = skillEls.length;
      // Divide into a grid: ~6 cols × ~5 rows to fill the full container evenly
      const numCols = 6;
      const numRows = Math.ceil(total / numCols);
      const colW = 100 / numCols;
      const rowH = 90 / numRows; // use 90% of height, leaving 5% margin top/bottom

      skillEls.forEach((el, i) => {
        const col = i % numCols;
        const row = Math.floor(i / numCols);
        // Place at grid cell center + small random jitter within the cell
        const jitterX = (Math.random() - 0.5) * (colW * 0.5);
        const jitterY = (Math.random() - 0.5) * (rowH * 0.5);
        el.style.left = `${col * colW + colW / 2 + jitterX}%`;
        el.style.top  = `${5 + row * rowH + rowH / 2 + jitterY}%`;
        // Slower duration (4-7s), farther travel (±150px)
        gsap.to(el, {
          x: `random(-150, 150)`,
          y: `random(-120, 120)`,
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.12,
        });
      });

      // ── Project cards ──────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.75,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ── Education card ─────────────────────────────────────────────
      gsap.fromTo('.education-card',
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.education-card',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // ── Fade-in observer (CSS-driven) ──────────────────────────────
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
      );
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    }); // end gsap.context

    return () => ctx.revert(); // cleanly kills every tween/trigger at once
  }, []);

  return (
    <>
      <Cursor />
      <Nav toggleTheme={toggleTheme} isDark={theme === 'dark'} />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <footer>
        <p>Designed &amp; Built by Andrian Dayag © 2025</p>
      </footer>
    </>
  );
}
