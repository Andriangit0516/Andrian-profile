import { useEffect, useRef } from 'react';

interface ThemeToggleProps {
  isDark: boolean;
  onClick: () => void;
}

export default function ThemeToggle({ isDark, onClick }: ThemeToggleProps) {
  const sunRef = useRef<SVGGElement>(null);
  const moonRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sunRef.current || !moonRef.current) return;
    if (isDark) {
      sunRef.current.style.opacity = '0';
      sunRef.current.style.transform = 'scale(0) rotate(90deg)';
      moonRef.current.style.opacity = '1';
      moonRef.current.style.transform = 'scale(1) rotate(0deg)';
    } else {
      sunRef.current.style.opacity = '1';
      sunRef.current.style.transform = 'scale(1) rotate(0deg)';
      moonRef.current.style.opacity = '0';
      moonRef.current.style.transform = 'scale(0) rotate(-90deg)';
    }
  }, [isDark]);

  return (
    <button
      className="theme-toggle"
      onClick={onClick}
      aria-label="Toggle theme"
      style={{ cursor: 'none' }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Sun icon */}
        <g
          ref={sunRef}
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(0deg)',
            transformOrigin: '12.5px 12.5px',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <circle cx="12.4" cy="12.76" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12.4" y1="1.76" x2="12.4" y2="3.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12.4" y1="21.76" x2="12.4" y2="23.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.63" y1="4.98" x2="6.05" y2="6.40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.77" y1="19.12" x2="20.19" y2="20.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="1.41" y1="12.76" x2="3.41" y2="12.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21.41" y1="12.76" x2="23.41" y2="12.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.63" y1="20.54" x2="6.05" y2="19.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.77" y1="6.40" x2="20.19" y2="4.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Moon icon */}
        <path
          ref={moonRef}
          d="M21.1918 13.2013C21.0345 14.9035 20.3957 16.5257 19.35 17.8781C18.3044 19.2305 16.8953 20.2571 15.2875 20.8379C13.6797 21.4186 11.9398 21.5294 10.2713 21.1574C8.60281 20.7854 7.07479 19.9459 5.86602 18.7371C4.65725 17.5283 3.81774 16.0003 3.4457 14.3318C3.07367 12.6633 3.18451 10.9234 3.76526 9.31561C4.346 7.70783 5.37263 6.29868 6.72501 5.25307C8.07739 4.20746 9.69959 3.56862 11.4018 3.41132C10.4052 4.75958 9.92564 6.42077 10.0503 8.09273C10.175 9.76469 10.8957 11.3364 12.0812 12.5219C13.2667 13.7075 14.8384 14.4281 16.5104 14.5528C18.1823 14.6775 19.8435 14.1979 21.1918 13.2013Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
            transformOrigin: '12.5px 12.5px',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        />
      </svg>
    </button>
  );
}
