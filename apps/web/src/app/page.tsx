/**
 * Home page — route: /
 *
 * HOW DATA FLOWS (the full journey in the monorepo):
 *
 *   Browser → Next.js server → this page (server component)
 *     → fetchProjects()                  [src/lib/api.ts]
 *       → GET http://localhost:4000/api/projects
 *         → NestJS ProjectsController    [apps/api]
 *           → ProjectsService            [application layer]
 *             → PrismaProjectRepository  [infrastructure layer]
 *               → prisma.project.findMany()
 *                 → PostgreSQL
 *     → returns Project[]
 *   → passed as prop to <ProjectsSection projects={projects} />
 *   → HTML streamed back to browser
 *
 * `export const dynamic = 'force-dynamic'` tells Next.js NOT to pre-render
 * this page at build time. This means `npm run build` works even when the
 * API is not running — the fetch calls happen at request time, not build time.
 */
export const dynamic = "force-dynamic";

import Hero from "@/presentation/components/Hero";
import SkillsSection from "@/presentation/components/SkillsSection";
import AiWorkflowSection from "@/presentation/components/AiWorkflowSection";
import ProjectsSection from "@/presentation/components/ProjectsSection";
import ContactSection from "@/presentation/components/ContactSection";

import { fetchProfile, fetchSkillGroups, fetchProjects } from "@/lib/api";

export default async function HomePage() {
  // Fetch all data in parallel for best performance.
  const [profile, skillGroups, projects] = await Promise.all([
    fetchProfile(),
    fetchSkillGroups(),
    fetchProjects(),
  ]);

  // Graceful fallback if the API is unreachable or the DB is empty.
  if (!profile) {
    return (
      <div style={{ padding: "200px 15vw", textAlign: "center", color: "#888" }}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>API not reachable</h1>
        <p>
          Make sure the NestJS API is running:{" "}
          <code style={{ background: "#1a1a1a", padding: "2px 8px", borderRadius: 4 }}>
            npm run dev:api
          </code>
        </p>
        <p style={{ marginTop: 8 }}>
          Then seed the database:{" "}
          <code style={{ background: "#1a1a1a", padding: "2px 8px", borderRadius: 4 }}>
            npm run db:seed
          </code>
        </p>
      </div>
    );
  }

  return (
    <>
      <Hero profile={profile} />
      <SkillsSection skillGroups={skillGroups} />
      <AiWorkflowSection />
      <ProjectsSection projects={projects} />
      <ContactSection profile={profile} />

      {/* Back-to-top button */}
      <a
        href="#hero"
        title="Back to top"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          width: 44,
          height: 44,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          color: "#ffffff",
          zIndex: 50,
        }}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </a>
    </>
  );
}
