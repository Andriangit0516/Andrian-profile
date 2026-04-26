import { useEffect, useRef } from 'react';

export default function Education() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('edu-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="education" id="education">
      <style>{`
        .edu-slide {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .edu-slide-left  { transform: translateX(-40px); }
        .edu-slide-right { transform: translateX( 40px); }
        .edu-slide.edu-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .edu-slide-right.edu-visible {
          transition-delay: 0.15s;
        }
      `}</style>

      <h2 className="section-title">Education</h2>

      <div className="edu-wrapper">
        <div className="edu-card">

          <img
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
            className="edu-bg-img"
          />
          <div className="edu-scrim" />

          <div className="edu-content">

            <div className="edu-left edu-slide edu-slide-left" ref={leftRef}>
              <h3 className="edu-title">
                BS Accounting<br />Technology
              </h3>
              <p className="edu-subtitle">
                Gensantos Foundation College Inc. &nbsp;·&nbsp; 2013 – 2017
              </p>
            </div>

            <div className="edu-right edu-slide edu-slide-right" ref={rightRef}>
              <p className="edu-desc">
                Built a strong foundation in financial accounting, bookkeeping,
                and business processes — the bedrock of every audit and data
                analysis role since.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
