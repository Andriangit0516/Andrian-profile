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
import About from './components/About';

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

      // ── Skills floating — handled entirely in Skills.tsx via useLayoutEffect ──

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

      // ── Education section ─────────────────────────────────────────
      gsap.fromTo('.edu-card',
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.edu-card',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo('.edu-left > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.edu-card',
            start: 'top 82%',
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
      <About /> 
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <footer>
        <p>Designed &amp; Built by Andrian Dayag © 2026</p>
      </footer>
    </>
  );
}
