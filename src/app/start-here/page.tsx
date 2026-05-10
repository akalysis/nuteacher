import Link from "next/link";

const startingPoints = [
  {
    title: "I am designing a survey",
    description:
      "Start with questionnaire design, measurement error, response options, layout, testing, and fieldwork decisions.",
    href: "/survey-methods/questionnaire-design",
  },
  {
    title: "I am working with ageing or later-life health data",
    description:
      "Use the study resources and health expectancy material to orient your question before choosing methods.",
    href: "/newcastle-85",
  },
  {
    title: "I need a methods explanation",
    description:
      "Use the methods notes for practical, problem-led explanations of statistical ideas and interpretation.",
    href: "/methods",
  },
  {
    title: "I need software guidance",
    description:
      "Use the software notes for Stata, R, RStudio, reproducible workflows, and analysis habits.",
    href: "/software",
  },
];

export default function StartHerePage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Start Here</span>
        <h1>Find the material by the problem you are trying to solve.</h1>
        <p>
          This repository is built to be used as a linkable reference. Start with the
          practical task in front of you, then move into the relevant research, teaching,
          methods, or software material.
        </p>
      </div>

      <div className="repository-grid">
        {startingPoints.map((item) => (
          <Link className="repository-card" href={item.href} key={item.title}>
            <span>Starting point</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <small>Open resource</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
