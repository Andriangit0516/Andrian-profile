const experiences = [
  {
    date: 'February 2025 – Present',
    title: 'Junior Internal Auditor',
    company: 'Brigada Distribution Inc. – Central Support Group',
    bullets: [
      'Conducted inventory audits across business units, including physical count, reconciliation, and documentation review.',
      'Performed variance analysis, identifying discrepancies between system records, physical inventory, and financial reports.',
      'Participated in financial statement audit of inventory accounts, ensuring accuracy, completeness, and proper valuation.',
      "Assessment of business units' performance using the company's Quality Rubrics framework covering Accounting & Finance, People Management, Supply Chain, and Customer Relations Management.",
      'Documented audit findings, risks, and compliance gaps, and provided recommendations for process improvement.',
      'Utilized Excel-based working papers and audit schedules to support conclusions and reporting.',
    ],
  },
  {
    date: 'October 2019 – February 2025',
    title: 'Accounts Payable Specialist',
    company: 'Klee Trading Corporation',
    bullets: [
      'Processed and monitored payments to major principal suppliers including Petron Corporation and San Miguel Foods, Inc.',
      'Maintained accurate records of trade purchases and accounts payable balances.',
      'Prepared billing and claims related to pricing discrepancies and promotional activities.',
      'Reconciled supplier statements and ensured timely settlement of obligations.',
    ],
  },
  {
    date: 'August 2017 – October 2019',
    title: 'Administrative Assistant - Data Encoder',
    company: 'Klee Trading Corporation (Salesforce)',
    bullets: [
      'Accurately encoded hundreds of sales invoices data into Salesforce database daily and maintained records for future reference.',
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline" id="timeline">
        <div className="timeline-line" />
        <div className="timeline-glow-orb" id="timelineOrb" />
        {experiences.map((exp, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-content">
              <div className="timeline-date">{exp.date}</div>
              <h3 className="timeline-title">{exp.title}</h3>
              <div className="timeline-company">{exp.company}</div>
              <div className="timeline-desc">
                <ul>{exp.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
