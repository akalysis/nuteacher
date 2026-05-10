import Link from "next/link";
import { HeroStatementPlayer } from "@/components/remotion/HeroStatementPlayer";

const primaryAreas = [
  {
    label: "Methods",
    title: "Statistical methods",
    description:
      "Plain-English, rigorous notes on study design, assumptions, analysis choices, interpretation, and common mistakes in applied health research.",
    href: "/methods",
  },
  {
    label: "Research",
    title: "Research and studies",
    description:
      "Ageing, population health, health expectancies, Newcastle 85+, study context, and research outputs.",
    href: "/research",
  },
  {
    label: "Teaching",
    title: "Teaching resources",
    description:
      "Reusable explanations, survey material, seminar support, workshop notes, and resources for students and supervisees.",
    href: "/teaching",
  },
  {
    label: "Blog",
    title: "Notes and commentary",
    description:
      "Short posts, publication context, reflections on research practice, and answers to recurring questions.",
    href: "/blog",
  },
];

export default function Home() {
  return (
    <div className="landing-page">
      <section className="landing-hero" aria-labelledby="home-title">
        <div className="landing-hero-copy">
          <span className="label-tracking">Andrew Kingston</span>
          <h1 id="home-title" className="visually-hidden">
            Research, teaching, methods, and notes for applied health evidence.
          </h1>
          <div className="hero-statement-shell" aria-hidden="true">
            <HeroStatementPlayer />
          </div>
          <p className="hero-subtitle">
            A public repository for material that sits around my research and teaching:
            statistical methods, surveys, ageing and health studies, software notes,
            practical explanations, and shorter writing.
          </p>
          <div className="hero-actions" aria-label="Primary links">
            <Link href="/methods" className="button-link button-link-primary">
              Explore methods
            </Link>
            <Link href="/teaching" className="button-link">
              Teaching resources
            </Link>
          </div>
        </div>
      </section>

      <section className="about-card" aria-labelledby="about-title">
        <div>
          <span className="label-tracking">About</span>
          <h2 id="about-title">About me</h2>
        </div>
        <div className="about-copy">
          <p>
            I am Andrew Kingston PhD, CStat, SFHEA. My work sits across ageing,
            population health, epidemiology, applied statistics, survey methods, and
            research methods teaching.
          </p>
          <p>
            This site brings together material useful beyond a single lecture,
            supervision meeting, project, or email thread. Some pages are polished
            teaching resources; others are working notes, study guides, methods
            explainers, or short posts that make recurring questions easier to answer
            well.
          </p>
        </div>
      </section>

      <section className="section-block" aria-labelledby="areas-title">
        <div className="section-heading compact-section-heading">
          <span className="label-tracking">Four areas</span>
          <h2 id="areas-title">Browse by the kind of material you need.</h2>
        </div>

        <div className="area-grid">
          {primaryAreas.map((area) => (
            <Link href={area.href} className="area-card" key={area.title}>
              <span>{area.label}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <small>Open</small>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
