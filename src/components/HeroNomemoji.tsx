import { useEffect, useState } from 'react';
import profileImg from '../assets/profile.png';

// ── Typing Animation Component ─────────────────────────────────────────────

const roles = [
  'Internal Auditor',
  'Data Analyst',
  'Accounting Specialist',
  'Inventory Accountant',
  'Bookkeeper',
];

interface TypingAnimationProps {
  typingSpeed?: number;   // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseDelay?: number;    // ms to pause after fully typed
}

function TypingAnimation({
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDelay = 2200,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDelay);
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      if (displayed.length < current.length) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, deletingSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }
  }, [displayed, isDeleting, isPaused, roleIndex, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', minHeight: '1.4em' }}>
      <span>{displayed}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'var(--accent-primary, #00f5d4)',
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'blink 1s step-start infinite',
        }}
      />
    </h2>
  );
}

// ── SVG icon components ────────────────────────────────────────────────────

// ── Hero ───────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
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
            <div className="hexagon-container" style={{ animation: 'floatUpDown 4s ease-in-out infinite' }}>
              <div className="glow-effect" />
              <div className="hexagon">
                <div className="hexagon-inner">
                  <img
                    src={profileImg}
                    alt="Andrian Dayag"
                    className="profile-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
