"use client";
/**
 * ProjectsSection — the portfolio projects list with tab filter and modal.
 *
 * WHY client component: tab filtering and the modal both need useState.
 * The parent page (server component) fetches the data and passes it in as
 * a plain serialisable prop — no Prisma types cross the server/client boundary.
 *
 * KEY CONCEPT (serialisation boundary):
 *   Server components can pass plain objects/arrays to client components.
 *   They cannot pass class instances, functions, or Promises.
 *   That's why types are plain interfaces, not classes.
 */
import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "personal">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.type === "personal");

  return (
    <section id="projects" style={{ padding: "60px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 15vw", marginBottom: 60 }}>
        <p
          style={{
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 4,
            color: "#f5a623",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Projects
        </p>
        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#cccccc", fontWeight: 300, marginTop: 8 }}>
          Driven by design, centered on users, and built for functionality
        </p>
      </div>

      {/* Tab filter */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        {(["all", "personal"] as const).map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 24px",
              background: activeTab === tab ? "#f5a623" : "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderLeft: i === 1 ? "none" : "1px solid rgba(255,255,255,0.15)",
              borderRadius: i === 0 ? "20px 0 0 20px" : "0 20px 20px 0",
              color: activeTab === tab ? "#111111" : "#888888",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {tab === "all" ? "All" : "Personal"}
          </button>
        ))}
      </div>

      {/* Project cards */}
      {filtered.map((project) => (
        <div
          key={project.id}
          onClick={() => setSelectedProject(project)}
          style={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            margin: "0 8vw 24px",
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            cursor: "pointer",
          }}
        >
          {/* Left: text info */}
          <div style={{ padding: "48px 52px", flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 20,
                letterSpacing: -0.5,
              }}
            >
              {project.name}
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#888888",
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 480,
              }}
            >
              {project.desc}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            {/* External links */}
            {project.links.length > 0 && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: 1,
                      padding: "8px 18px",
                      borderRadius: 20,
                      textDecoration: "none",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: visual panel */}
          <div
            className={`visual-${project.visualVariant ?? "v6"}`}
            style={{
              width: 380,
              minHeight: 300,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              overflow: "hidden",
            }}
          >
            {project.iconPath && (
              <Image
                src={project.iconPath}
                alt={project.name}
                width={96}
                height={96}
                style={{
                  borderRadius: 22,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  objectFit: "cover",
                }}
              />
            )}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              {project.name}
            </span>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
