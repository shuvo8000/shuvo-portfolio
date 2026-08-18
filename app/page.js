export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <svg
          className="hero-grid-bg"
          viewBox="0 0 680 291"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke="#4B5563" strokeWidth="0.5" opacity="0.12">
            <line x1="0" y1="20" x2="680" y2="20" />
            <line x1="0" y1="60" x2="680" y2="60" />
            <line x1="0" y1="100" x2="680" y2="100" />
            <line x1="0" y1="140" x2="680" y2="140" />
            <line x1="0" y1="180" x2="680" y2="180" />
            <line x1="0" y1="220" x2="680" y2="220" />
            <line x1="0" y1="260" x2="680" y2="260" />
            <line x1="40" y1="0" x2="40" y2="291" />
            <line x1="120" y1="0" x2="120" y2="291" />
            <line x1="200" y1="0" x2="200" y2="291" />
            <line x1="280" y1="0" x2="280" y2="291" />
            <line x1="360" y1="0" x2="360" y2="291" />
            <line x1="440" y1="0" x2="440" y2="291" />
            <line x1="520" y1="0" x2="520" y2="291" />
            <line x1="600" y1="0" x2="600" y2="291" />
            <line x1="660" y1="0" x2="660" y2="291" />
          </g>
          <g stroke="#2563EB" strokeWidth="0.5" opacity="0.35" fill="none">
            <line x1="120" y1="60" x2="200" y2="60" />
            <line x1="440" y1="180" x2="440" y2="220" />
            <line x1="520" y1="20" x2="600" y2="20" />
          </g>
        </svg>

        <div className="hero-content">
          <h1 className="hero-title">
            CSE student who builds full-stack web applications from backend
            logic to working frontend.
          </h1>
          <p className="hero-sub">
            I build practical software projects end-to-end, from database
            design through backend logic to working user interfaces.
          </p>
          <div className="cta-group">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="projects">
        <h2 className="section-heading">Featured projects</h2>

        <div className="project-grid">
          <article className="project-card">
            <div className="project-image-placeholder">
              <span>Project screenshot</span>
            </div>
            <h3 className="project-title">
              Blood Donation Management System
            </h3>
            <p className="project-desc">
              A web application for managing blood donors and blood bank
              information.
            </p>
            <div className="tag-row">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Flask</span>
              <span className="tech-tag">SQLite</span>
            </div>
          </article>

          <article className="project-card">
            <div className="project-image-placeholder">
              <span>Project screenshot</span>
            </div>
            <h3 className="project-title">
              Blood Donation Management System — React Frontend
            </h3>
            <p className="project-desc">
              A React-based frontend rebuild of the blood donation system.
            </p>
            <div className="tag-row">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">JavaScript</span>
            </div>
          </article>

          <article className="project-card">
            <div className="project-image-placeholder">
              <span>Project screenshot</span>
            </div>
            <h3 className="project-title">Blood Donation Capstone Skeleton</h3>
            <p className="project-desc">
              A deployed frontend skeleton demonstrating routed pages and
              responsive structure. This is a skeleton, not a finished
              application.
            </p>
            <div className="tag-row">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">Tailwind CSS</span>
            </div>
          </article>
        </div>
      </section>

      {/* CORE STACK */}
      <section className="stack-section">
        <h2 className="section-heading">Core stack</h2>
        <div className="stack-list">
          {[
            "Python",
            "Flask",
            "SQLite",
            "JavaScript",
            "React",
            "Vite",
            "Next.js",
            "Tailwind CSS",
          ].map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="final-cta">
        <h2 className="final-cta-title">
          Have a project or problem worth building?
        </h2>
        <a href="#contact" className="btn-primary">
          Contact Me
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p className="footer-text">
          {/* Add your real GitHub / contact links here once confirmed */}
        </p>
      </footer>
    </main>
  );
}