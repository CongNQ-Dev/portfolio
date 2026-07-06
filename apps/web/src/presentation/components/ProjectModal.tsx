"use client";
/**
 * ProjectModal — the detail overlay that appears when a project card is clicked.
 *
 * Client component: uses useEffect to handle keyboard (Escape key) and body
 * scroll locking while open.
 */
import { useEffect } from "react";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll and handle Escape key when modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Modal box — stop propagation so clicking inside doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(245,166,35,0.25)",
          borderRadius: 24,
          padding: "48px 52px",
          maxWidth: 640,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#ffffff",
            width: 36,
            height: 36,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Tag */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#f5a623",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {project.tag}
        </p>

        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}
        >
          {project.name}
        </h2>

        {/* Description */}
        <p style={{ fontSize: 15, color: "#888888", lineHeight: 1.75, marginBottom: 24 }}>
          {project.desc}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>

        {/* Features */}
        {project.features.length > 0 && (
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#f5a623",
                marginBottom: 14,
              }}
            >
              {project.featuresLabel}
            </p>
            {project.features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom:
                    i < project.features.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  fontSize: 14,
                  color: "#cccccc",
                  lineHeight: 1.65,
                }}
              >
                <span style={{ color: "#f5a623", flexShrink: 0, marginTop: 2 }}>▸</span>
                {f}
              </div>
            ))}
          </div>
        )}

        {/* External links */}
        {project.links.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1,
                  padding: "8px 18px",
                  borderRadius: 20,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
