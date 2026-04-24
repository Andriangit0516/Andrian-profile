import { useState } from 'react';

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default function Education() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="education" id="education">
      <h2 className="section-title">Education</h2>

      <div className="edu-wrapper">
        <div className="edu-card">

          {/* Background underwater/dark image — same mood as reference */}
          <img
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
            className="edu-bg-img"
          />
          {/* Dark scrim so text is always legible */}
          <div className="edu-scrim" />

          {/* Content — two columns like the reference */}
          <div className="edu-content">

            {/* LEFT — degree info, large bold text */}
            <div className="edu-left">
              <h3 className="edu-title">
                BS Accounting<br />Technology
              </h3>
              <p className="edu-subtitle">
                Gensantos Foundation College Inc. &nbsp;·&nbsp; 2013 – 2017
              </p>
              <p className="edu-desc">
                Built a strong foundation in financial accounting, bookkeeping,
                and business processes — the bedrock of every audit and data
                analysis role since.
              </p>
            </div>

            {/* RIGHT — email input + button (matching reference layout) */}
            <div className="edu-right">
              {sent ? (
                <div className="edu-success">
                  ✓ &nbsp;Got it! I'll be in touch soon.
                </div>
              ) : (
                <form
                  className="edu-form"
                  onSubmit={e => { e.preventDefault(); if (email.trim()) setSent(true); }}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="edu-input"
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className="edu-btn">
                    Get in touch &nbsp;<ArrowRightIcon />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
