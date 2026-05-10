const writingTypes = [
  "Short reflections on research practice",
  "Plain-English methods notes",
  "Publication context and project updates",
  "Responses to recurring student questions",
  "Commentary on ageing, health evidence, and measurement",
];

export default function WritingPage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Writing</span>
        <h1>Notes, reflections, and linkable explanations.</h1>
        <p>
          This section can hold writing that is more informal than a paper and more
          flexible than teaching material: posts, clarifications, applied examples, and
          short explanations that are useful to have online.
        </p>
      </div>

      <div className="evidence-strip">
        <div>
          <h2>What belongs here</h2>
          <p>
            Writing pages can be short. The value is in having a clear, stable place to
            send people when the same question or explanation keeps coming up.
          </p>
        </div>
        <ul className="home-profile-list">
          {writingTypes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
