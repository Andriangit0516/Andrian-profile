import invtyImg from '../assets/invty-recon.png';
import qualityImg from '../assets/quality-rubrics.png';

const projects = [
  {
    img: invtyImg,
    alt: 'Inventory Recon App',
    title: 'Invty Recon App',
    desc: 'Internal Accounting Reconciliation System designed to reconcile records in just a second. Automates variance detection and saves valuable audit time.',
    tags: ['Excel VBA', 'Power Query', 'Data Analysis', 'Automation'],
    link: 'https://inventoryrecon-andriandayag.vercel.app/',
  },
  {
    img: qualityImg,
    alt: 'Quality Rubrics App',
    title: 'Quality Rubrics App',
    desc: 'Comprehensive quality assessment tool for Brigada Group of Companies covering Accounting & Finance, People Management, Supply Chain, and Customer Relations.',
    tags: ['Power BI', 'Data Modeling', 'DAX', 'Reporting'],
    link: 'https://bgoc-quality-rubrics-2026.vercel.app/',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Projects and Applications</h2>
      <div className="projects-grid">
        {projects.map(p => (
          <div className="project-card" key={p.title}>
            <div className="project-preview">
              <img src={p.img} alt={p.alt} />
            </div>
            <div className="project-content">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tech">
                {p.tags.map(tag => <span className="tech-tag" key={tag}>{tag}</span>)}
              </div>
              <div className="project-links">
                <a href={p.link} target="_blank" rel="noopener noreferrer">Live Demo →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
