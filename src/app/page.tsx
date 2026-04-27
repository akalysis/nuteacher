import Link from "next/link";
import { BookOpen, HeartPulse, User } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <span className="label-tracking">Digital Garden</span>
        <h1 className="hero-title">
          Advanced statistical thinking for <span className="text-gradient">complex data</span>
        </h1>
        <p className="hero-subtitle">
          I am Andrew Kingston PhD. This space is a living collection of my research, 
          methodological notes, and insights into ageing, health expectancies, and longitudinal data analysis.
        </p>
      </section>

      <section className="card-grid">
        <Link href="/newcastle-85" className="glass-card">
          <span className="label-tracking" style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}>Project</span>
          <h3 className="card-title">Newcastle 85+</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Explore the findings, data structure, and methodology of the Newcastle 85+ Study.
          </p>
        </Link>
        
        <Link href="/health-expectancies" className="glass-card">
          <span className="label-tracking" style={{ fontSize: "0.7rem", marginBottom: "0.5rem", color: "var(--accent-emerald)" }}>Methods</span>
          <h3 className="card-title">Health Expectancies</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            An overview of life expectancy calculations and health trajectories.
          </p>
        </Link>
        
        <Link href="/about" className="glass-card">
          <span className="label-tracking" style={{ fontSize: "0.7rem", marginBottom: "0.5rem", color: "var(--accent-teal)" }}>Profile</span>
          <h3 className="card-title">About Me</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            My background, publications, and current research focus.
          </p>
        </Link>
      </section>
    </div>
  );
}
