type SiteLogoProps = {
  compact?: boolean;
};

export default function SiteLogo({ compact = false }: SiteLogoProps) {
  return (
    <span className={`site-logo ${compact ? "site-logo-compact" : ""}`} aria-label="Andrew Kingston">
      <svg
        className="site-logo-mark"
        viewBox="0 0 96 96"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="site-logo-arc"
          d="M14 40a35 35 0 0 1 61-20"
          pathLength="100"
        />
        <path
          className="site-logo-arc"
          d="M82 27a35 35 0 0 1-23 54"
          pathLength="100"
        />
        <path
          className="site-logo-arc"
          d="M48 83a35 35 0 0 1-34-29"
          pathLength="100"
        />
        <path className="site-logo-line" d="M18 38h27" />
        <path className="site-logo-line" d="M18 51h24" />
        <path className="site-logo-line" d="M18 64h21" />
        <path className="site-logo-axis" d="M52 24v48" />
        <path className="site-logo-axis" d="M45 36h14" />
        <path className="site-logo-axis" d="M45 48h14" />
        <path className="site-logo-axis" d="M45 60h14" />
        <path
          className="site-logo-signal"
          d="M27 70c8-1 15-5 21-11 7-7 10-17 18-23 5-4 10-6 16-7"
        />
        <circle className="site-logo-dot light" cx="14" cy="40" r="3.2" />
        <circle className="site-logo-dot light" cx="18" cy="51" r="3.2" />
        <circle className="site-logo-dot olive" cx="20" cy="64" r="3.2" />
        <circle className="site-logo-dot olive" cx="38" cy="68" r="2.4" />
        <circle className="site-logo-dot olive" cx="49" cy="58" r="2.4" />
        <circle className="site-logo-dot olive" cx="58" cy="45" r="2.4" />
        <circle className="site-logo-dot olive" cx="70" cy="34" r="2.4" />
        <circle className="site-logo-dot light" cx="80" cy="26" r="3.2" />
      </svg>
      <span className="site-logo-wordmark">
        <span>Andrew</span>
        <span>Kingston</span>
      </span>
    </span>
  );
}
