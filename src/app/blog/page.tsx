const blogThemes = [
  "Research practice and project context",
  "Recurring student and supervisee questions",
  "Applied statistics, interpretation, and reporting",
  "Ageing, health evidence, measurement, and surveys",
  "Notes that are useful to keep as stable links",
];

export default function BlogPage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Blog</span>
        <h1>Short notes on research, teaching, and applied health evidence.</h1>
        <p>
          Posts will cover publication context, research practice, teaching follow-up,
          applied examples, and concise answers to questions that come up repeatedly.
        </p>
      </div>

      <div className="evidence-strip">
        <div>
          <h2>Likely themes</h2>
          <p>
            The blog can stay lightweight: useful, citable, and direct, without turning
            every note into a full methods article.
          </p>
        </div>
        <ul className="home-profile-list">
          {blogThemes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
