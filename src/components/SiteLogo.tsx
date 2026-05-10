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
        <circle className="site-logo-compass-ring" cx="48" cy="48" r="34" />
        <path className="site-logo-compass-axis" d="M48 13v70M13 48h70" />
        <path className="site-logo-compass-needle" d="M48 25l12 23-12 23-12-23z" />
        <circle className="site-logo-compass-core" cx="48" cy="48" r="7.5" />
        <circle className="site-logo-compass-dot" cx="48" cy="48" r="3.5" />
      </svg>
      <span className="site-logo-wordmark">
        <span>Andrew</span>
        <span>Kingston</span>
      </span>
    </span>
  );
}
