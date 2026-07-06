/**
 * AiWorkflowSection — "Working with AI" section. Server component.
 *
 * This content is hardcoded in the component rather than stored in the
 * database because it describes the owner's tooling philosophy and rarely
 * changes. If you want it editable from a DB later, add an AiCard model
 * to the Prisma schema and follow the same pattern as SkillGroup.
 */
import Image from "next/image";

export default function AiWorkflowSection() {
  return (
    <section id="ai-workflow" style={{ padding: "80px 15vw" }}>
      <p
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 1,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Working with AI
      </p>

      <p
        style={{
          textAlign: "center",
          color: "#888888",
          fontSize: 15,
          maxWidth: 600,
          margin: "0 auto 48px",
          lineHeight: 1.75,
        }}
      >
        I integrate AI tooling directly into my daily development — from
        intelligent code assistance to autonomous agent orchestration, AI makes
        me significantly more productive and capable.
      </p>

      {/* 2-column grid of AI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {AI_CARDS.map((card) => (
          <div
            key={card.name}
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "28px 32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: card.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 800,
                  color: card.iconTextColor ?? "#ffffff",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {card.iconPath ? (
                  <Image src={card.iconPath} alt={card.name} width={26} height={26} style={{ objectFit: "contain" }} />
                ) : (
                  card.iconText
                )}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", marginBottom: 3 }}>
                  {card.name}
                </h3>
                <p style={{ fontSize: 11, color: "#f5a623", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  {card.role}
                </p>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {card.points.map((point, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "#888888",
                    lineHeight: 1.65,
                    paddingLeft: 16,
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "#f5a623" }}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "28px 40px",
          flexWrap: "wrap",
        }}
      >
        <Stat num="15+" label="AI Agents" />
        <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.1)" }} />
        <Stat num="4" label="AI Platforms" />
        <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.1)" }} />
        <Stat num="Daily" label="AI-Augmented Workflow" />
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span style={{ fontSize: 28, fontWeight: 900, color: "#f5a623" }}>{num}</span>
      <span style={{ fontSize: 11, color: "#888888", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
}

const AI_CARDS = [
  {
    name: "GitHub Copilot",
    role: "AI Code Assistant",
    iconPath: "/icons/githubcopilot.svg",
    iconBg: "#1a1a1a",
    iconText: null,
    iconTextColor: null,
    points: [
      "Inline autocomplete and code generation across Flutter, Dart, JavaScript, and PHP",
      "Auto-generates BLoC boilerplate, API models, and unit test stubs",
      "Reduces time on repetitive code patterns by 40–60%",
    ],
  },
  {
    name: "Claude Code",
    role: "AI Engineering Pair",
    iconPath: null,
    iconBg: "#1a0f00",
    iconText: "CC",
    iconTextColor: "#f5a623",
    points: [
      "Architectural decisions, complex debugging, and multi-file refactoring",
      "Code review, security analysis, and performance optimization",
      "Documentation, test planning, and pull request description generation",
    ],
  },
  {
    name: "OpenClaw",
    role: "Personal AI Agent Platform",
    iconPath: "/icon-openclaw.svg",
    iconBg: "#1a0505",
    iconText: null,
    iconTextColor: null,
    points: [
      "Orchestrates 15+ autonomous AI agents for productivity, education, and automation",
      "Agents handle daily planning, research digests, fitness tracking, language learning, and more",
      "Persistent memory system — agents retain context and improve across sessions",
    ],
  },
  {
    name: "MCP",
    role: "Model Context Protocol",
    iconPath: null,
    iconBg: "#0a1520",
    iconText: "MCP",
    iconTextColor: "#61DAFB",
    points: [
      "Connects AI models to development tools, APIs, file systems, and external data sources",
      "Unified integration layer enabling AI agents to act on real systems in real time",
      "Powers tool use across all Claude Code and OpenClaw workflows",
    ],
  },
];
