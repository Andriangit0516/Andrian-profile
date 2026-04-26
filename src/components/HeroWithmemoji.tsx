import { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/profile.png';
import memojiImg  from '../assets/animated.png';

// ── Typing Animation ───────────────────────────────────────────────────────

const roles = [
  'Internal Auditor',
  'Data Analyst',
  'Accounting Specialist',
  'Inventory Accountant',
  'Bookkeeper',
];

interface TypingAnimationProps {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
}

function TypingAnimation({ typingSpeed = 80, deletingSpeed = 45, pauseDelay = 2200 }: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused]     = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, pauseDelay);
      return () => clearTimeout(t);
    }
    if (!isDeleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else { setIsPaused(true); }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed);
        return () => clearTimeout(t);
      } else { setIsDeleting(false); setRoleIndex(prev => (prev + 1) % roles.length); }
    }
  }, [displayed, isDeleting, isPaused, roleIndex, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', minHeight: '1.4em' }}>
      <span>{displayed}</span>
      <span style={{
        display: 'inline-block', width: '2px', height: '1em',
        background: 'var(--accent-primary, #00f5d4)', marginLeft: '2px',
        verticalAlign: 'middle', animation: 'blink 1s step-start infinite',
      }} />
    </h2>
  );
}

// ── Memoji with mouse tracking ─────────────────────────────────────────────

function MemojiTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef      = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | null>(null);
  const targetRef    = useRef({ x: 0, y: 0 });
  const currentRef   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const strength = Math.min(dist / 120, 1);
      targetRef.current.x = Math.cos(angle) * strength * 7;
      targetRef.current.y = Math.sin(angle) * strength * 7;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x = lerp(cur.x, tgt.x, 0.07);
      cur.y = lerp(cur.y, tgt.y, 0.07);
      if (headRef.current) {
        headRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={headRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <img
          src={memojiImg}
          alt="Animated memoji"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

export default function Hero() {
  const [isMemoji, setIsMemoji] = useState(false);
  const [flipping, setFlipping] = useState(false);

  const handleFlip = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setIsMemoji(prev => !prev);
      setFlipping(false);
    }, 300);
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes cardFlip {
          0%   { transform: rotateY(0deg)  scale(1);    }
          50%  { transform: rotateY(90deg) scale(0.92); }
          100% { transform: rotateY(0deg)  scale(1);    }
        }
        .hexagon-flipping {
          animation: cardFlip 0.6s ease-in-out !important;
        }
        .toggle-hint {
          position: absolute;
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.72rem;
          font-family: 'DM Sans', sans-serif;
          color: var(--text-secondary);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          letter-spacing: 0.03em;
        }
        .hexagon-container:hover .toggle-hint {
          opacity: 0.8;
        }
      `}</style>

      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Andrian Dayag</h1>
            <TypingAnimation typingSpeed={75} deletingSpeed={40} pauseDelay={2500} />
            <p>
              Internal Auditor with hands-on experience in inventory audit, financial analysis, and process optimization—focused on ensuring accuracy, strengthening compliance, and maintaining reliable financial reporting.
            </p>
            <div className="hero-buttons">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Hire me
              </a>
              <a href="/resume.pdf" className="btn" download="Andrian_Dayag_Resume.pdf">Download CV</a>
            </div>
          </div>

          <div className="hero-image">
            <div
              className={`hexagon-container${flipping ? ' hexagon-flipping' : ''}`}
              style={{
                animation: flipping ? undefined : 'floatUpDown 4s ease-in-out infinite',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={handleFlip}
              title={isMemoji ? 'Click to show real photo' : 'Click to show memoji'}
            >
              <div className="glow-effect" />
              <div className="hexagon">
                <div className="hexagon-inner">
                  {isMemoji
                    ? <MemojiTracker />
                    : <img src={profileImg} alt="Andrian Dayag" className="profile-img" />
                  }
                </div>
              </div>
              <span className="toggle-hint">
                {isMemoji ? '👤 Click for real photo' : '✨ Click for memoji'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
