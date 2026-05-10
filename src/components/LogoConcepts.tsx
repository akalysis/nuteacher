type LogoConcept = {
  name: string;
  direction: string;
  rationale: string;
  mark: React.ReactNode;
};

function Wordmark() {
  return (
    <g>
      <text
        fill="#f8faf7"
        fontFamily="IBM Plex Sans, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="1.7"
        x="118"
        y="41"
      >
        ANDREW
      </text>
      <text
        fill="rgba(248, 250, 247, 0.72)"
        fontFamily="IBM Plex Sans, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="1.7"
        x="118"
        y="72"
      >
        KINGSTON
      </text>
    </g>
  );
}

const concepts: LogoConcept[] = [
  {
    name: "Option 1: Signal Monogram",
    direction: "Personal, sharp, academic.",
    rationale:
      "A strong AK monogram with a fitted signal line. Best if the site should feel clearly authored and distinctive.",
    mark: (
      <svg viewBox="0 0 360 104" role="img" aria-label="Signal monogram logo option">
        <rect fill="#17201d" height="104" rx="8" width="360" />
        <rect fill="#1c6b57" height="72" rx="8" width="72" x="22" y="16" />
        <path d="M34 73V31l18 42 18-42v42" fill="none" stroke="#f8faf7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
        <path d="M28 78c13-2 21-8 30-21 7-10 15-16 28-17" fill="none" stroke="#d2a146" strokeLinecap="round" strokeWidth="4" />
        <circle cx="34" cy="76" fill="#d2a146" r="3.5" />
        <circle cx="58" cy="57" fill="#d2a146" r="3.5" />
        <circle cx="86" cy="40" fill="#d2a146" r="3.5" />
        <Wordmark />
      </svg>
    ),
  },
  {
    name: "Option 2: Evidence Compass",
    direction: "Organised, navigational, professional.",
    rationale:
      "Four quadrants for Methods, Research, Teaching, and Blog. Best if the logo should reinforce the site architecture.",
    mark: (
      <svg viewBox="0 0 360 104" role="img" aria-label="Evidence compass logo option">
        <rect fill="#17201d" height="104" rx="8" width="360" />
        <circle cx="58" cy="52" fill="none" r="33" stroke="#f8faf7" strokeOpacity="0.84" strokeWidth="3" />
        <path d="M58 20v64M26 52h64" stroke="#f8faf7" strokeLinecap="round" strokeOpacity="0.36" strokeWidth="2" />
        <path d="M58 31l11 21-11 21-11-21z" fill="#d2a146" />
        <circle cx="58" cy="52" fill="#17201d" r="6" />
        <circle cx="58" cy="52" fill="#f8faf7" r="3" />
        <Wordmark />
      </svg>
    ),
  },
  {
    name: "Option 3: Cohort Rings",
    direction: "Ageing research, longitudinal evidence.",
    rationale:
      "Nested cohort rings with a small trajectory line. Best if ageing, population health, and longitudinal studies should lead the brand.",
    mark: (
      <svg viewBox="0 0 360 104" role="img" aria-label="Cohort rings logo option">
        <rect fill="#17201d" height="104" rx="8" width="360" />
        <circle cx="50" cy="52" fill="none" r="30" stroke="#345f84" strokeWidth="7" />
        <circle cx="66" cy="52" fill="none" r="22" stroke="#1c6b57" strokeWidth="7" />
        <circle cx="38" cy="52" fill="none" r="15" stroke="#873244" strokeWidth="7" />
        <path d="M25 72c18-2 28-12 39-29 7-11 15-17 27-18" fill="none" stroke="#d2a146" strokeLinecap="round" strokeWidth="4" />
        <Wordmark />
      </svg>
    ),
  },
  {
    name: "Option 4: Methods Margin",
    direction: "Editorial, rigorous, clean.",
    rationale:
      "A journal-margin mark with plotted points. Best if the site should feel like high-quality academic notes rather than a course platform.",
    mark: (
      <svg viewBox="0 0 360 104" role="img" aria-label="Methods margin logo option">
        <rect fill="#17201d" height="104" rx="8" width="360" />
        <rect fill="none" height="64" rx="7" stroke="#f8faf7" strokeOpacity="0.84" strokeWidth="3" width="60" x="28" y="20" />
        <path d="M43 33h30M43 47h22M43 61h16" stroke="#f8faf7" strokeLinecap="round" strokeOpacity="0.54" strokeWidth="3" />
        <path d="M42 73c9-18 17-20 24-10 6 8 11 7 18-12" fill="none" stroke="#d2a146" strokeLinecap="round" strokeWidth="4" />
        <circle cx="42" cy="73" fill="#d2a146" r="3" />
        <circle cx="66" cy="63" fill="#d2a146" r="3" />
        <circle cx="84" cy="51" fill="#d2a146" r="3" />
        <Wordmark />
      </svg>
    ),
  },
  {
    name: "Option 5: Garden Plot",
    direction: "Knowledge garden, warmer, more human.",
    rationale:
      "A plotted network that also reads as a growing stem. Best if the site should feel like an evolving personal knowledge garden.",
    mark: (
      <svg viewBox="0 0 360 104" role="img" aria-label="Garden plot logo option">
        <rect fill="#17201d" height="104" rx="8" width="360" />
        <path d="M58 82V30" stroke="#f8faf7" strokeLinecap="round" strokeOpacity="0.84" strokeWidth="4" />
        <path d="M58 62c-14-1-24-9-28-23 15 1 24 8 28 23z" fill="#1c6b57" />
        <path d="M58 49c16-2 26-10 31-25-17 1-27 9-31 25z" fill="#345f84" />
        <path d="M36 72c18-1 34-9 48-25" fill="none" stroke="#d2a146" strokeLinecap="round" strokeWidth="4" />
        <circle cx="36" cy="72" fill="#d2a146" r="3.5" />
        <circle cx="58" cy="61" fill="#d2a146" r="3.5" />
        <circle cx="84" cy="47" fill="#d2a146" r="3.5" />
        <Wordmark />
      </svg>
    ),
  },
];

export default function LogoConcepts() {
  return (
    <div className="logo-options-grid">
      {concepts.map((concept) => (
        <article className="logo-option-card" key={concept.name}>
          <div className="logo-option-art">{concept.mark}</div>
          <div>
            <span>{concept.direction}</span>
            <h2>{concept.name}</h2>
            <p>{concept.rationale}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
