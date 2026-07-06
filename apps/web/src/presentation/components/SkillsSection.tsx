/**
 * SkillsSection — the "My Tech Stacks" grid. Server component.
 *
 * Receives pre-fetched skill groups from the parent page (no API calls here).
 * Each skill renders its icon using a priority chain:
 *   1. Image from iconPath  →  <img>
 *   2. Short text from iconText on iconBg background
 */
import type { SkillGroup } from "@/types";
import Image from "next/image";

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
}

export default function SkillsSection({ skillGroups }: SkillsSectionProps) {
  return (
    <section id="skills" style={{ padding: "80px 15vw" }}>
      <p
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 1,
          color: "#ffffff",
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        My Tech Stacks
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center",
        }}
      >
        {skillGroups.map((group) => (
          <div key={group.id} style={{ flex: "1 1 140px", maxWidth: 200 }}>
            <h3
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#888888",
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              {group.name}
            </h3>

            {group.skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#cccccc",
                  marginBottom: 8,
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: skill.iconBg ?? "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 800,
                    color: skill.iconColor ?? "#ffffff",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {skill.iconPath ? (
                    <Image
                      src={skill.iconPath}
                      alt={skill.name}
                      width={22}
                      height={22}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    skill.iconText
                  )}
                </div>
                {skill.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
