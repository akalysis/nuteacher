import Link from "next/link";

const researchLinks = [
  {
    title: "Newcastle 85+",
    description:
      "Study context, interpretation notes, and resources for later-life population health research.",
    href: "/newcastle-85",
  },
  {
    title: "Health expectancies",
    description:
      "Notes on healthy life expectancy, disability-free life expectancy, interpretation, and methods.",
    href: "/health-expectancies",
  },
  {
    title: "Research outputs",
    description:
      "Publication context, project notes, and linked material will be added here as the repository grows.",
    href: "/blog",
  },
  {
    title: "Software and workflows",
    description:
      "Practical analysis notes for Stata, R, RStudio, reproducible project structure, and checking outputs.",
    href: "/software",
  },
];

export default function ResearchPage() {
  return (
    <section className="collection-page">
      <div className="section-heading">
        <span className="label-tracking">Research</span>
        <h1>Ageing, population health, study context, and applied evidence.</h1>
        <p>
          Research notes sit alongside study guides, methods explanations, software
          workflows, and commentary so that evidence, analysis, and interpretation remain
          connected.
        </p>
      </div>

      <div className="repository-grid">
        {researchLinks.map((item) => (
          <Link className="repository-card" href={item.href} key={item.title}>
            <span>Research</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <small>Open resource</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
