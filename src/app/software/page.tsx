const plannedSoftware = [
  "Stata workflows",
  "R and RStudio notes",
  "Data cleaning habits",
  "Reproducible project structure",
  "Exporting tables and figures",
  "Documenting analysis decisions",
];

export default function SoftwarePage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Software Notes</span>
        <h1>Practical analysis workflows for Stata, R, and reproducible work.</h1>
        <p>
          Applied details that make research easier to repeat: project setup, analysis
          scripts, output checking, table production, and habits that reduce avoidable
          mistakes.
        </p>
      </div>

      <div className="evidence-strip">
        <div>
          <h2>Planned material</h2>
          <p>
            These notes can grow as short pages that answer recurring software questions
            without turning the site into a full programming course.
          </p>
        </div>
        <ul className="home-profile-list">
          {plannedSoftware.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
