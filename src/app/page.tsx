import Link from "next/link";
import { BookOpen, HeartPulse, User } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <h1 className="hero-title">Welcome to my Digital Garden</h1>
        <p className="hero-subtitle">
          I am Andrew Kingston PhD. This space is a living collection of my research, 
          methodological notes, and insights into ageing, health expectancies, and longitudinal data analysis.
        </p>
      </section>

      <section className="card-grid">
        <Link href="/newcastle-85" className="glass-card">
          <h3 className="card-title"><BookOpen size={20} /> Newcastle 85+</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Explore the findings, data structure, and methodology of the Newcastle 85+ Study.
          </p>
        </Link>
        
        <Link href="/health-expectancies" className="glass-card">
          <h3 className="card-title"><HeartPulse size={20} /> Health Expectancies</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            An overview of life expectancy calculations and health trajectories.
          </p>
        </Link>
        
        <Link href="/about" className="glass-card">
          <h3 className="card-title"><User size={20} /> About Me</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            My background, publications, and current research focus.
          </p>
        </Link>
      </section>
    </div>
  );
}
