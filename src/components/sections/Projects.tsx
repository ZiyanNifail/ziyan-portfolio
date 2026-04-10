"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Machine Learning & AI",
    subtitle: "Supervised, Unsupervised & Deep Learning",
    year: "2025",
    tags: ["Python", "scikit-learn", "TensorFlow", "Keras", "Jupyter"],
    description:
      "A collection of ML projects spanning supervised, unsupervised, and deep learning. Covers ANN classification and regression, DBSCAN clustering, logistic regression, and sequential prediction across real-world datasets including breast cancer detection and house price forecasting.",
    highlight: "Deep Learning · Classification · Clustering",
    featured: true,
    githubUrl: "https://github.com/ZiyanNifail/machine-learning-ai",
  },
  {
    id: "02",
    title: "Data Manipulation & Engineering",
    subtitle: "NumPy & Pandas Data Wrangling",
    year: "2025",
    tags: ["Python", "NumPy", "Pandas", "Scikit-learn", "Jupyter"],
    description:
      "Real-world data wrangling projects covering data cleaning, feature engineering, and exploratory analysis. Includes e-commerce product classification, hotel booking manipulation, and airline fare prediction using regression techniques.",
    highlight: "Feature Engineering · EDA · Regression",
    featured: false,
    githubUrl: "https://github.com/ZiyanNifail/data-manipulation-and-engineering-project",
  },
  {
    id: "03",
    title: "Data Visualisation",
    subtitle: "Python Visual Analytics",
    year: "2025",
    tags: ["Python", "Matplotlib", "Seaborn", "Pandas", "Scikit-learn"],
    description:
      "Transforming raw datasets into clear, insightful visualisations using Matplotlib and Seaborn. Projects include fraud detection with hierarchical clustering, Olympic data analysis, and car price cross-validation with KFold regression.",
    highlight: "Heatmaps · Dendrograms · Statistical Plots",
    featured: false,
    githubUrl: "https://github.com/ZiyanNifail/data-visualisation-python",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        background: hovered ? "rgba(0,48,73,0.8)" : "rgba(0,48,73,0.45)",
        border: hovered
          ? "1px solid rgba(193,18,31,0.5)"
          : project.featured
          ? "1px solid rgba(102,155,188,0.3)"
          : "1px solid rgba(102,155,188,0.15)",
        padding: "36px 32px",
        position: "relative",
        cursor: "default",
        transition: `all 0.3s ease, opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: hovered ? "100%" : project.featured ? "60%" : "30%",
          background: "var(--brick)",
          transition: "height 0.35s ease",
        }}
      />

      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "rgba(253,240,213,0.3)",
            letterSpacing: "0.15em",
          }}
        >
          {project.id}
        </span>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--brick)",
            fontWeight: 500,
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Title */}
      <div style={{ marginBottom: "6px" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "26px",
            fontWeight: 700,
            color: hovered ? "var(--papaya)" : "rgba(253,240,213,0.9)",
            lineHeight: 1.1,
            transition: "color 0.3s",
          }}
        >
          {project.title}
        </h3>
      </div>

      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--steel)",
          marginBottom: "20px",
          fontWeight: 400,
        }}
      >
        {project.subtitle}
      </div>

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.75,
          color: "rgba(253,240,213,0.55)",
          marginBottom: "24px",
          fontWeight: 300,
        }}
      >
        {project.description}
      </p>

      {/* Highlight pill */}
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: hovered ? "#000000" : "rgba(255,255,255,0.9)",
          background: hovered ? "#ffffff" : "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.85)",
          padding: "6px 14px",
          display: "inline-block",
          marginBottom: "24px",
          fontWeight: 500,
          transition: "color 0.3s, background 0.3s",
        }}
      >
        {project.highlight}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "5px 10px",
              border: "1px solid rgba(255,255,255,0.85)",
              color: hovered ? "#000000" : "rgba(255,255,255,0.9)",
              background: hovered ? "#ffffff" : "transparent",
              fontWeight: 400,
              transition: "color 0.3s, background 0.3s",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: hovered ? "#000000" : "rgba(255,255,255,0.9)",
          background: hovered ? "#ffffff" : "transparent",
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.85)",
          padding: "7px 14px",
          transition: "color 0.3s, background 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#000000";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.borderColor = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = hovered ? "#ffffff" : "transparent";
          e.currentTarget.style.color = hovered ? "#000000" : "rgba(255,255,255,0.9)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.85)";
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
}

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export default function Projects() {
  const { ref: headRef, inView: headInView } = useInView(0.2);
  const mobile = useMobile();

  return (
    <section
      id="projects"
      style={{
        background: "var(--deep)",
        padding: mobile ? "80px 20px" : "120px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(102,155,188,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102,155,188,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section header */}
      <div
        ref={headRef}
        style={{
          marginBottom: "72px",
          opacity: headInView ? 1 : 0,
          transform: headInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
          <div style={{ width: "32px", height: "1px", background: "var(--brick)" }} />
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brick)",
              fontWeight: 500,
            }}
          >
            Selected Work
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: "var(--papaya)",
            lineHeight: 1.1,
            maxWidth: "480px",
          }}
        >
          Projects &{" "}
          <span style={{ color: "var(--brick)" }}>Builds</span>
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(253,240,213,0.5)",
            marginTop: "16px",
            maxWidth: "420px",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          A collection of software I've built — from mobile apps and web platforms to AI-powered tools.
        </p>
      </div>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          position: "relative",
          zIndex: 5,
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* GitHub CTA */}
      <div
        style={{
          marginTop: "64px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div style={{ height: "1px", flex: 1, background: "rgba(102,155,188,0.1)" }} />
        <a
          href="https://github.com/ZiyanNifail"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--steel)",
            textDecoration: "none",
            border: "1px solid rgba(102,155,188,0.3)",
            padding: "12px 28px",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--steel)";
            e.currentTarget.style.color = "var(--papaya)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(102,155,188,0.3)";
            e.currentTarget.style.color = "var(--steel)";
          }}
        >
          View All on GitHub →
        </a>
        <div style={{ height: "1px", flex: 1, background: "rgba(102,155,188,0.1)" }} />
      </div>
    </section>
  );
}
