import Link from "next/link";

const plannedMethods = [
  "Logistic regression",
  "Missing data and attrition",
  "Longitudinal models",
  "Health expectancies",
  "Interpreting odds, risks, and rates",
  "Choosing an analysis for a research question",
];

export default function MethodsPage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Methods</span>
        <h1>Problem-led statistical guidance for applied health research.</h1>
        <p>
          Short, practical explanations of statistical methods, assumptions,
          interpretation, and mistakes that often come up in research and teaching.
        </p>
      </div>

      <div className="evidence-strip">
        <div>
          <h2>Planned notes</h2>
          <p>
            Each note should help a student or researcher decide what a method does,
            when it fits, what assumptions need defending, and how to write about the
            result clearly.
          </p>
        </div>
        <ul className="home-profile-list">
          {plannedMethods.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="inline-callout">
        <p>
          For now, related material is available in{" "}
          <Link href="/health-expectancies">health expectancies</Link> and the{" "}
          <Link href="/survey-methods/questionnaire-design">questionnaire design module</Link>.
        </p>
      </div>
    </section>
  );
}
