export default function Education() {
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
              
            </div>

            {/* RIGHT — email input + button (matching reference layout) */}
            <div className="edu-right">
              
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
