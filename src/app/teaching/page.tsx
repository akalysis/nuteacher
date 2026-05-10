import Link from "next/link";

const teachingUses = [
  "Lecture support and seminar follow-up",
  "Supervision links for repeated explanations",
  "Reading lists and practical exercises",
  "Short explainers before workshops",
  "Reusable notes for applied health research students",
];

export default function TeachingPage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Teaching</span>
        <h1>Reusable teaching material for research methods and applied statistics.</h1>
        <p>
          Teaching notes, practical resources, and explanatory pages for students,
          supervisees, and collaborators working with applied health evidence.
        </p>
      </div>

      <div className="evidence-strip">
        <div>
          <h2>Current anchor</h2>
          <p>
            The questionnaire design material is the first substantial teaching module on
            the site. It should remain web-native, structured, and easy to send as a link.
          </p>
          <Link href="/survey-methods/questionnaire-design" className="button-link button-link-primary">
            Open questionnaire design
          </Link>
        </div>
        <ul className="home-profile-list">
          {teachingUses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
