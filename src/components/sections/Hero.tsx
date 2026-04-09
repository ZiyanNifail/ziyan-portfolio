"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

function BlurText({ text, delay = 0, className = "" }: BlurTextProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      className={className}
      style={{
        display: "block",
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0)" : "blur(12px)",
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease",
      }}
    >
      {text}
    </span>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "projects", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = ["About", "Projects", "Experience", "Contact"];

  return (
    <section
      id="home"
      style={{
        background: "var(--deep)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(102,155,188,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(102,155,188,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "320px",
          height: "100%",
          background: "linear-gradient(135deg, transparent 40%, rgba(120,0,0,0.15) 100%)",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "36px 48px 0",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "13px",
            color: "var(--steel)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          ZN / Portfolio
        </div>

        <ul
          style={{
            display: "flex",
            gap: "32px",
            listStyle: "none",
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <li key={link} style={{ position: "relative" }}>
                <a
                  href={`#${link.toLowerCase()}`}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--papaya)" : "rgba(253,240,213,0.5)",
                    textDecoration: "none",
                    fontWeight: isActive ? 500 : 400,
                    transition: "color 0.2s",
                    paddingBottom: "6px",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--papaya)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--papaya)" : "rgba(253,240,213,0.5)")}
                >
                  {link}
                </a>
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: "var(--brick)",
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--papaya)",
            background: "var(--brick)",
            border: "none",
            padding: "12px 26px",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            textDecoration: "none",
            display: "inline-block",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--molten)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brick)")}
        >
          Contact Me
        </a>
      </nav>

      {/* Hero grid */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          padding: "72px 48px 80px",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "28px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
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
              Computer Science · Malaysia
            </span>
          </div>

          <div style={{ marginBottom: "36px" }}>
            <BlurText
              text="Ziyan"
              delay={0}
              className="name-first"
            />
            <BlurText
              text="Nifail"
              delay={150}
              className="name-last"
            />
          </div>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(253,240,213,0.62)",
              maxWidth: "400px",
              fontWeight: 300,
              marginBottom: "44px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
            }}
          >
            CS student. Data Science instructor. Builder. I turn{" "}
            <strong style={{ color: "var(--steel)", fontWeight: 500 }}>data into decisions</strong>{" "}
            and{" "}
            <strong style={{ color: "var(--steel)", fontWeight: 500 }}>
              ideas into working software
            </strong>{" "}
            — from Android apps to AI-powered automation tools.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
            }}
          >
            <a
              href="#projects"
              style={{
                background: "var(--brick)",
                color: "var(--papaya)",
                border: "none",
                padding: "15px 32px",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--molten)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--brick)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              style={{
                background: "transparent",
                color: "var(--steel)",
                border: "1px solid rgba(102,155,188,0.35)",
                padding: "15px 32px",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 400,
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.2s, color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--steel)";
                e.currentTarget.style.color = "var(--papaya)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(102,155,188,0.35)";
                e.currentTarget.style.color = "var(--steel)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              height: "260px",
              overflow: "hidden",
              border: "1px solid rgba(102,155,188,0.2)",
              position: "relative",
            }}
          >
            <Image
              src="/ziyanphoto.jpg"
              alt="Ziyan Nifail"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--papaya)",
                background: "rgba(0,48,73,0.85)",
                padding: "5px 10px",
                fontWeight: 500,
              }}
            >
              Ziyan Nifail · MSU
            </div>
          </div>

          {/* Stats card */}
          <div
            style={{
              background: "rgba(0,48,73,0.65)",
              border: "1px solid rgba(102,155,188,0.2)",
              padding: "32px 28px",
              maxWidth: "340px",
              position: "relative",
              transition: "transform 0.25s ease, border-color 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(102,155,188,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(102,155,188,0.2)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3px",
                height: "100%",
                background: "var(--brick)",
              }}
            />
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--brick)",
                marginBottom: "10px",
                fontWeight: 500,
              }}
            >
              Currently
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                color: "var(--papaya)",
                fontWeight: 700,
                lineHeight: 1.35,
                marginBottom: "28px",
              }}
            >
              Data Science Instructor & CS Student at MSU
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px 24px",
                marginBottom: "28px",
              }}
            >
              {[
                { val: "70+", label: "Pros Trained" },
                { val: "3.80", label: "CGPA" },
                { val: "8×", label: "Dean's List" },
                { val: "20+", label: "AI / ML & DS Projects" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "24px",
                      color: "var(--papaya)",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(253,240,213,0.4)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Python", "Java", "ML / AI", "SQL", "Deep Learning", "TensorFlow", "AI Automation", "Data Science"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      border: "1px solid rgba(102,155,188,0.25)",
                      color: "var(--steel)",
                      fontWeight: 400,
                      transition: "border-color 0.2s, color 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--steel)";
                      e.currentTarget.style.color = "var(--papaya)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(102,155,188,0.25)";
                      e.currentTarget.style.color = "var(--steel)";
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          paddingBottom: "32px",
          position: "relative",
          zIndex: 10,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease 1s",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(253,240,213,0.3)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "36px",
            background: "rgba(253,240,213,0.2)",
            animation: "scrollPulse 1.8s ease infinite",
          }}
        />
      </div>

      <style suppressHydrationWarning>{`
        .name-first {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 7vw, 82px);
          font-weight: 700;
          color: var(--papaya);
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .name-last {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 7vw, 82px);
          font-weight: 900;
          color: var(--brick);
          line-height: 1;
          letter-spacing: -0.01em;
        }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.2; }
          50% { transform: scaleY(1.4); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
