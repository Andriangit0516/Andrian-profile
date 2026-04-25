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

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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
              Internal Auditor with hands-on experience in inventory, financial analysis, and process optimization—focused on making accounting faster and more reliable.
            </p>
            <div className="hero-buttons">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Get In Touch
              </a>
              <a href="/resume.pdf" className="btn" download="Andrian_Dayag_Resume.pdf">Download CV</a>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter / X"><TwitterXIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
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
