import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const repositorySections = [
  {
    label: "Survey Methods",
    title: "Questionnaire Design Studio",
    description:
      "Reusable teaching material for planning questionnaires, writing items, reducing measurement error, and preparing survey fieldwork.",
    href: "/survey-methods/questionnaire-design",
    meta: "Live module",
  },
  {
    label: "Study Resources",
    title: "Newcastle 85+ and ageing studies",
    description:
      "Notes and context for later-life population health, longitudinal ageing evidence, and study-specific interpretation.",
    href: "/newcastle-85",
    meta: "Study guide",
  },
  {
    label: "Methods",
    title: "Applied statistical notes",
    description:
      "A home for clear explanations of methods such as logistic regression, missing data, longitudinal models, and health expectancies.",
    href: "/methods",
    meta: "Growing collection",
  },
  {
    label: "Software",
    title: "Stata, R and reproducible workflows",
    description:
      "Practical notes for doing analysis cleanly, documenting decisions, and avoiding avoidable software mistakes.",
    href: "/software",
    meta: "Planned collection",
  },
];

const audienceRoutes = [
  "Students looking for a clear explanation before a seminar or assessment.",
  "Doctoral researchers who need a linkable answer to a recurring methods question.",
  "Applied researchers turning study design, measurement, and analysis decisions into defensible evidence.",
  "Collaborators who need context on ageing, health expectancies, surveys, or statistical practice.",
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section repository-hero">
        <div className="hero-copy">
          <span className="label-tracking">Andrew Kingston</span>
          <h1 className="hero-title">
            Research and teaching notes for applied health evidence.
          </h1>
          <p className="hero-subtitle">
            A working repository of explanations, methods notes, study resources, software
            guidance, teaching material, and research context that I can point students,
            collaborators, and applied researchers towards.
          </p>
          <div className="hero-actions" aria-label="Primary repository links">
            <Link href="/start-here" className="button-link button-link-primary">
              Start here
            </Link>
            <Link href="/survey-methods/questionnaire-design" className="button-link">
              Questionnaire design
            </Link>
          </div>
        </div>

        <aside className="repository-panel" aria-label="Repository scope">
          <span className="repository-panel-kicker">Repository scope</span>
          <dl>
            <div>
              <dt>Research</dt>
              <dd>Ageing, health expectancies, Newcastle 85+, population health.</dd>
            </div>
            <div>
              <dt>Methods</dt>
              <dd>Problem-led statistical guidance, interpretation, and common mistakes.</dd>
            </div>
            <div>
              <dt>Teaching</dt>
              <dd>Reusable explanations, modules, resources, and supervised-study notes.</dd>
            </div>
            <div>
              <dt>Software</dt>
              <dd>Stata, R, RStudio, reproducible workflows, and practical analysis notes.</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="remotion-intro" aria-labelledby="remotion-intro-title">
        <div className="remotion-stage" aria-hidden="true">
          <div className="remotion-frame frame-research">
            <span>01</span>
            <strong>Research</strong>
          </div>
          <div className="remotion-frame frame-methods">
            <span>02</span>
            <strong>Methods</strong>
          </div>
          <div className="remotion-frame frame-teaching">
            <span>03</span>
            <strong>Teaching</strong>
          </div>
          <div className="remotion-frame frame-software">
            <span>04</span>
            <strong>Software</strong>
          </div>
          <div className="remotion-playhead">
            <Play size={18} fill="currentColor" />
          </div>
          <div className="remotion-thread" />
        </div>
        <div className="remotion-copy">
          <span className="label-tracking">Repository map</span>
          <h2 id="remotion-intro-title">Four ways into the same evidence workspace.</h2>
          <p>
            Research context, methods explanations, teaching material, and software notes are
            organised as connected routes through the same applied evidence problems.
          </p>
          <div className="section-link-row" aria-label="Jump to repository collections">
            {repositorySections.map((section) => (
              <Link href={section.href} className="section-pill" key={section.title}>
                <span>{section.label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="collections">
        <div className="section-heading">
          <span className="label-tracking">Collections</span>
          <h2>Use it as a reference point, teaching base, and research map.</h2>
          <p>
            The site is intentionally broad. Some pages are polished teaching resources, some are
            short explainers, and some are working notes that save repeating the same answer.
          </p>
        </div>
        <div className="repository-grid">
          {repositorySections.map((section) => (
            <Link href={section.href} className="repository-card" key={section.title}>
              <span>{section.label}</span>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <small>{section.meta}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-profile evidence-strip">
        <div>
          <span className="label-tracking">What belongs here</span>
          <h2>Anything useful enough to send as a link.</h2>
          <p>
            That includes research outputs, study background, statistical explainers, software
            walkthroughs, survey design material, teaching support, reading lists, and practical
            notes on turning data into evidence responsibly.
          </p>
        </div>
        <ul className="home-profile-list">
          {audienceRoutes.map((route) => (
            <li key={route}>{route}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
