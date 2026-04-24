import ParticlesBg from './ParticlesBg';

const skills = [
  'Bookkeeping', 'Analytical & Problem Solving', 'Basic Accounting', 'Inventory Audit', 'Data Entry',
  'Financial Statement Audit', 'Advanced Excel', 'Power Query', 'Power BI',
  'Data Modeling', 'Basic DAX', 'Accounts Payable', 'Accounts Receivable', 'Reconciliation',
  'Data Validation', 'Confidentiality', 'Documentation Control', 'Record Keeping',
  'Variance Analysis', 'Process Improvement', 'Compliance', 'Risk Assessment',
  'Supply Chain Management', 'Customer Relations', 'People Management', 'Microsoft Excel',
  'Attention to details', 'Time Management', 'AI-Assisted App Development',
];

const weights = ['weight-light', 'weight-regular', 'weight-medium', 'weight-semibold', 'weight-bold'] as const;

export default function Skills() {
  return (
    <section className="skills" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Particles background — sits behind everything */}
      <ParticlesBg />
    
      {/* Content sits on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Skills</h2>
        <div className="skills-container" id="skillsContainer">
          {skills.map((skill, i) => (
            <div key={skill} className={`skill-item ${weights[Math.floor(i * 13.7 % weights.length)]}`}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
