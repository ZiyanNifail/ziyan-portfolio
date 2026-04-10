"use client";

import { useEffect, useRef, useState } from "react";

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

export default function Contact() {
  const { ref, inView } = useInView();
  const mobile = useMobile();

  const contacts = [
    { label: "Email", value: "ziyannifail1011@gmail.com", href: "mailto:ziyannifail1011@gmail.com" },
    { label: "GitHub", value: "github.com/ZiyanNifail", href: "https://github.com/ZiyanNifail" },
    { label: "Phone", value: "+601164097691", href: "tel:+601164097691" },
    { label: "Location", value: "Subang Jaya, Malaysia", href: null },
  ];

  return (
    <section
      id="contact"
      style={{
        background: "var(--deep)",
        padding: mobile ? "80px 20px" : "120px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
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

      <div
        ref={ref}
        style={{
          maxWidth: "680px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          position: "relative",
          zIndex: 5,
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
            Get in Touch
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: "var(--papaya)",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Let's Build{" "}
          <span style={{ color: "var(--brick)" }}>Something</span>
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(253,240,213,0.55)",
            fontWeight: 300,
            marginBottom: "56px",
            maxWidth: "480px",
          }}
        >
          Open to software engineering roles, freelance projects, and collaboration opportunities.
          Based in Subang Jaya — available remotely and locally across Malaysia.
        </p>

        {/* Contact links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {contacts.map((c, i) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderBottom: "1px solid rgba(102,155,188,0.1)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(253,240,213,0.35)",
                  fontWeight: 500,
                  minWidth: "80px",
                }}
              >
                {c.label}
              </span>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "15px",
                    color: "var(--steel)",
                    textDecoration: "none",
                    fontWeight: 400,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--papaya)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--steel)")}
                >
                  {c.value}
                </a>
              ) : (
                <span style={{ fontSize: "15px", color: "rgba(253,240,213,0.6)", fontWeight: 400 }}>
                  {c.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: "16px", marginTop: "48px" }}>
          <a
            href="mailto:ziyannifail1011@gmail.com"
            style={{
              background: "var(--brick)",
              color: "var(--papaya)",
              padding: "16px 36px",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 500,
              transition: "background 0.2s, transform 0.15s",
              display: "inline-block",
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
            Send Email
          </a>
          <a
            href="https://github.com/ZiyanNifail"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              color: "var(--steel)",
              border: "1px solid rgba(102,155,188,0.35)",
              padding: "16px 36px",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 400,
              transition: "border-color 0.2s, color 0.2s, transform 0.15s",
              display: "inline-block",
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
            GitHub →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "96px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(102,155,188,0.1)",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: mobile ? "flex-start" : "center",
          gap: mobile ? "8px" : "0",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            color: "rgba(253,240,213,0.25)",
            letterSpacing: "0.1em",
          }}
        >
          ZN / {new Date().getFullYear()}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "rgba(253,240,213,0.2)",
            letterSpacing: "0.1em",
          }}
        >
          Subang Jaya, Malaysia
        </span>
      </div>
    </section>
  );
}
