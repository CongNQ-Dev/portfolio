"use client";
/**
 * RoadmapTimeline — client component for the roadmap page.
 *
 * WHY client component: progress checkboxes read and write to localStorage.
 * The parent server component (app/roadmap/page.tsx) fetches the phase data
 * from the DB and passes it in as a plain serialisable prop.
 *
 * localStorage key "roadmap-progress-v1" is intentionally identical to
 * the legacy site so existing browser progress is preserved after migration.
 */
import { useState, useEffect } from "react";
import type { RoadmapPhase } from "@/domain/entities/RoadmapPhase";

const STORAGE_KEY = "roadmap-progress-v1";

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

type ProgressState = Record<string, boolean>;

export default function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const [progress, setProgress] = useState<ProgressState>({});

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(JSON.parse(stored) as ProgressState);
    } catch {
      // Ignore parse errors.
    }
  }, []);

  function toggle(dataId: string, checked: boolean) {
    setProgress((prev) => {
      const next = { ...prev, [dataId]: checked };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors (private browsing, quota exceeded, etc.)
      }
      return next;
    });
  }

  // Compute overall stats
  const totalResources = phases.flatMap((p) => p.resources).length;
  const doneResources = phases
    .flatMap((p) => p.resources)
    .filter((r) => progress[r.dataId]).length;
  const overallPct = totalResources ? Math.round((doneResources / totalResources) * 100) : 0;

  return (
    <div>
      {/* Overall progress */}
      <div
        style={{
          maxWidth: 560,
          margin: "36px auto 0",
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 13,
            color: "#cccccc",
            marginBottom: 10,
          }}
        >
          <span>Overall Progress</span>
          <strong style={{ color: "#f5a623", fontSize: 18, fontWeight: 800 }}>
            {overallPct}%
          </strong>
        </div>
        <ProgressBar pct={overallPct} />
      </div>

      {/* Badge legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 28 }}>
        {(["video", "course", "docs", "book", "practice"] as const).map((t) => (
          <span key={t} className={`badge badge-${t}`}>{t}</span>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 64, position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 27,
            top: 0,
            bottom: 0,
            width: 2,
            background:
              "linear-gradient(180deg, rgba(245,166,35,0.5), rgba(245,166,35,0.06))",
          }}
        />

        {phases.map((phase) => {
          const phaseDone = phase.resources.filter((r) => progress[r.dataId]).length;
          const phaseTotal = phase.resources.length;
          const phasePct = phaseTotal ? Math.round((phaseDone / phaseTotal) * 100) : 0;

          return (
            <div key={phase.id} style={{ position: "relative", paddingLeft: 84, marginBottom: 72 }}>
              {/* Phase number circle */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  border: "2px solid rgba(245,166,35,0.45)",
                  color: "#f5a623",
                  fontWeight: 900,
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                {phase.number}
              </div>

              {/* Phase header */}
              <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#888888", fontWeight: 600 }}>
                {phase.eta}
              </p>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, marginTop: 4 }}>
                {phase.title}
              </h2>
              <p style={{ color: "#cccccc", fontSize: 14, lineHeight: 1.7, fontWeight: 300, marginTop: 10, maxWidth: 760 }}>
                {phase.goal}
              </p>

              {/* Phase progress bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, maxWidth: 320 }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar pct={phasePct} />
                </div>
                <span style={{ fontSize: 12, color: "#888888", whiteSpace: "nowrap" }}>
                  {phaseDone} / {phaseTotal}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {phase.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              {/* Resources list */}
              <div
                style={{
                  marginTop: 22,
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                {phase.resources.map((resource, idx) => {
                  const done = !!progress[resource.dataId];
                  return (
                    <div
                      key={resource.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 18px",
                        borderBottom:
                          idx < phase.resources.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        background: done ? "rgba(245,166,35,0.04)" : "transparent",
                      }}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={(e) => toggle(resource.dataId, e.target.checked)}
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          width: 18,
                          height: 18,
                          minWidth: 18,
                          border: done ? "none" : "1.5px solid rgba(255,255,255,0.25)",
                          borderRadius: 5,
                          cursor: "pointer",
                          background: done ? "#f5a623" : "transparent",
                          position: "relative",
                        }}
                        aria-label={`Mark "${resource.title}" as done`}
                      />

                      {/* Badge */}
                      <span className={`badge badge-${resource.type}`}>
                        {resource.type}
                      </span>

                      {/* Title + source */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: done ? "#888888" : "#ffffff",
                            fontSize: 14,
                            fontWeight: 500,
                            textDecoration: done ? "line-through" : "none",
                            display: "inline-block",
                          }}
                        >
                          {resource.title}
                        </a>
                        <span
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "#888888",
                            marginTop: 2,
                            fontWeight: 300,
                          }}
                        >
                          {resource.source}
                        </span>
                      </div>

                      {/* External arrow */}
                      <span style={{ color: "#888888", minWidth: 14 }}>↗</span>
                    </div>
                  );
                })}
              </div>

              {/* Milestone */}
              <div
                style={{
                  marginTop: 16,
                  border: "1px dashed rgba(245,166,35,0.4)",
                  borderRadius: 12,
                  padding: "16px 20px",
                  fontSize: "13.5px",
                  color: "#cccccc",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                <strong
                  style={{
                    color: "#f5a623",
                    fontWeight: 700,
                    display: "block",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Milestone
                </strong>
                {phase.milestone}
              </div>
            </div>
          );
        })}
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#888888",
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.8,
        }}
      >
        Progress is saved locally in your browser. Dates are targets, not deadlines —
        <br />
        consistency beats intensity. <em>&ldquo;Make it work, make it right, make it fast.&rdquo;</em>
      </p>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      style={{
        height: 6,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, #f5a623, #ffcd6b)",
          borderRadius: 3,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}
