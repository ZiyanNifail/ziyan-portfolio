"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Data Science Instructor / Python Instructor",
    company: "CodeRangers",
    period: "Oct 2024 – Present",
    type: "Full-time",
    points: [
      "Designed and delivered Data Science/AI training modules covering data structures, algorithms, and machine learning.",
      "Guided 70+ corporate professionals through interactive coding exercises and industry-relevant case studies.",
      "Developed reusable lesson templates, debugging guides, and mentorship frameworks.",
    ],
    tags: ["Python", "ML", "AI", "Teaching", "Data Science"],
  },
  {
    role: "Corporate Sales Executive",
    company: "Cake Together Corporate",
    period: "Feb 2024 – Sept 2024",
    type: "Full-time",
    points: [
      "Managed corporate sales for large-scale events — corporate festivities, holiday celebrations, and custom gifting.",
      "Built relationships with enterprise clients including Huawei, FedEx, and TDCX.",
      "Exceeded sales KPI by 30% in a single festive season — RM13,000 vs target of RM10,000.",
    ],
    tags: ["Sales", "Client Relations", "B2B", "Negotiation"],
  },
  {
    role: "Intern Project Manager",
    company: "FWD Insurance (formerly Gibraltar BSN)",
    period: "Mar 2023 – Jul 2023",
    type: "Internship",
    points: [
      "Coordinated IT hardware migration for 300+ PCs during Gibraltar BSN to FWD Insurance transformation.",
      "Managed server and cloud infrastructure maintenance and monitoring via AWS.",
      "Handled reformatting, hardware assignment, and technical support for company-wide asset management.",
    ],
    tags: ["AWS", "IT Migration", "Project Management", "Hardware"],
  },
  {
    role: "Outlet Supervisor",
    company: "LLAOLLAO",
    period: "Mar 2021 – Dec 2023",
    type: "Part-time",
    points: [
      "Mentored new employees on operations, customer service, and sales practices.",
      "Served 150–200 customers daily in a fast-paced environment.",
      "Managed weekly stock inventory and reconciliation.",
    ],
    tags: ["Leadership", "Operations", "Inventory"],
  },
];

function useInView(threshold = 0.1) {
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

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);
  const mobile = useMobile();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "200px 1fr",
        gap: mobile ? "12px 0" : "0 48px",
        padding: "36px 0",
        borderBottom: "1px solid rgba(102,155,188,0.1)",
        position: "relative",
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: "-25px",
          top: "42px",
          width: "8px",
          height: "8px",
          background: hovered ? "var(--brick)" : "var(--steel)",
          transition: "background 0.3s",
        }}
      />

      {/* Left: period + type */}
      <div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            color: "var(--steel)",
            lineHeight: 1.5,
            marginBottom: "8px",
          }}
        >
          {exp.period}
        </div>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color:
              exp.type === "Internship"
                ? "var(--brick)"
                : exp.type === "Part-time"
                ? "rgba(253,240,213,0.4)"
                : "var(--steel)",
            border: "1px solid",
            borderColor:
              exp.type === "Internship"
                ? "rgba(193,18,31,0.4)"
                : exp.type === "Part-time"
                ? "rgba(253,240,213,0.15)"
                : "rgba(102,155,188,0.3)",
            padding: "4px 10px",
            fontWeight: 500,
          }}
        >
          {exp.type}
        </span>
      </div>

      {/* Right: content */}
      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px",
            fontWeight: 700,
            color: hovered ? "var(--papaya)" : "rgba(253,240,213,0.9)",
            marginBottom: "4px",
            transition: "color 0.3s",
          }}
        >
          {exp.role}
        </h3>
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--brick)",
            marginBottom: "20px",
            fontWeight: 500,
          }}
        >
          {exp.company}
        </div>

        <ul style={{ listStyle: "none", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {exp.points.map((pt, i) => (
            <li
              key={i}
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(253,240,213,0.55)",
                fontWeight: 300,
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "var(--brick)", marginTop: "6px", flexShrink: 0, fontSize: "8px" }}>◆</span>
              {pt}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {exp.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "5px 10px",
                border: "1px solid rgba(102,155,188,0.2)",
                color: "rgba(102,155,188,0.7)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref: headRef, inView: headInView } = useInView(0.2);
  const mobile = useMobile();

  return (
    <section
      id="experience"
      style={{
        background: "#002236",
        padding: mobile ? "80px 20px" : "120px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            Career History
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: "var(--papaya)",
            lineHeight: 1.1,
          }}
        >
          Experience &{" "}
          <span style={{ color: "var(--brick)" }}>Work</span>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "25px" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(102,155,188,0.15)",
          }}
        />
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
