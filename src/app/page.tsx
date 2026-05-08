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
    </div>
  );
}
