import ShaderHero from "../components/layout/ShaderHero";

export default function Home() {
  return (
    <main>
      {/* SHADER HERO */}
      <ShaderHero />

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

            <h3 className="project-title">
              Blood Donation Capstone Skeleton
            </h3>

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
        <p className="footer-text"></p>
      </footer>
    </main>
  );
}