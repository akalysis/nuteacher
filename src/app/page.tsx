import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <h1 className="hero-title">
          <span className="text-gradient">Digital Garden</span>
        </h1>
        <p className="hero-subtitle">
          A living collection of research notes, methods, teaching material, and working ideas on
          ageing, health expectancies, longitudinal data, survey design, and the practical use of
          statistics in complex real-world evidence.
        </p>
      </section>

      <section className="home-profile glass-card">
        <span className="label-tracking">Andrew Kingston</span>
        <div className="home-profile-grid">
          <div>
            <h2>Applied statistical thinking for ageing, health and survey evidence.</h2>
            <p>
              I am Andrew Kingston PhD, CStat, SFHEA. My work sits at the intersection of
              epidemiology, statistics and gerontology, with a particular focus on how we measure,
              model and interpret the complex processes of human ageing.
            </p>
            <p>
              This site is where I collect the material that sits around that work: explanations,
              methodological notes, resources for survey design, and reflections on turning data
              into evidence that can be used responsibly.
            </p>
          </div>
          <ul className="home-profile-list">
            <li>Longitudinal data analysis, missing data and attrition</li>
            <li>Health expectancies and disability-free life expectancy</li>
            <li>The Newcastle 85+ Study and later-life population health</li>
            <li>Questionnaire design, measurement and survey data quality</li>
          </ul>
        </div>
      </section>

      <section className="card-grid">
        <Link href="/newcastle-85" className="glass-card">
          <span className="label-tracking" style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}>Project</span>
          <h3 className="card-title">Newcastle 85+</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Explore the findings, data structure, and methodology of the Newcastle 85+ Study.
          </p>
        </Link>
        
        <Link href="/health-expectancies" className="glass-card">
          <span className="label-tracking" style={{ fontSize: "0.7rem", marginBottom: "0.5rem", color: "var(--accent-emerald)" }}>Methods</span>
          <h3 className="card-title">Health Expectancies</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            An overview of life expectancy calculations and health trajectories.
          </p>
        </Link>
        
        <Link href="/survey-methods" className="glass-card">
          <span className="label-tracking" style={{ fontSize: "0.7rem", marginBottom: "0.5rem", color: "var(--accent-teal)" }}>Profile</span>
          <h3 className="card-title">Survey Methods</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Practical resources for questionnaire design, fieldwork, data quality, and survey evidence.
          </p>
        </Link>
      </section>
    </div>
  );
}
