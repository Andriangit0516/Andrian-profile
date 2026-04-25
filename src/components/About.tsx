export default function About() {
  return (
    <section className="about experience" id="about">
      <h2 className="section-title">About Me</h2>

      <div className="edu-wrapper">
        <div className="edu-card fade-in">

          {/* Same background image as Education */}
          <img
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
            className="edu-bg-img"
          />
          <div className="edu-scrim" />

          <div className="edu-content">

            {/* LEFT — bold heading like Education */}
            <div className="edu-left">
              <h3 className="edu-title">
                Who I<br />Am
              </h3>
              <p className="edu-subtitle">
                Andrian Dayag &nbsp;·&nbsp; General Santos City
              </p>
            </div>

            {/* RIGHT — bio paragraph */}
            <div className="edu-right">
              <p className="edu-desc" style={{ fontSize: '1rem', lineHeight: '1.85' }}>
                Detail-oriented auditor with hands-on experience in inventory audits, variance analysis,
                and financial statement audit of inventory accounts under a centralized audit function.
                Strong background in accounts payable and operational finance, with advanced proficiency
                in Microsoft Excel and working knowledge of Power BI.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
