/**
 * Home page — route: /
 *
 * HOW DATA FLOWS (the full journey):
 *
 *   Browser → Next.js server → this page (server component)
 *     → getProjects(projectRepository)       [application layer]
 *       → PrismaProjectRepository.findAll()  [infrastructure layer]
 *         → prisma.project.findMany()        [Prisma ORM]
 *           → PostgreSQL query               [database]
 *     → returns Project[] (domain entity)
 *   → passed as prop to <ProjectsSection projects={projects} />
 *   → HTML streamed back to browser
 *
 * `export const dynamic = 'force-dynamic'` tells Next.js NOT to try to
 * pre-render this page at build time. Without it, `npm run build` would
 * attempt to run the DB queries and fail because there's no database
 * during CI/build.
 */
export const dynamic = "force-dynamic";

import Hero from "@/presentation/components/Hero";
import SkillsSection from "@/presentation/components/SkillsSection";
import AiWorkflowSection from "@/presentation/components/AiWorkflowSection";
import ProjectsSection from "@/presentation/components/ProjectsSection";
import ContactSection from "@/presentation/components/ContactSection";

// Use cases (application layer)
import { getProfile } from "@/application/usecases/getProfile";
import { getSkillGroups } from "@/application/usecases/getSkillGroups";
import { getProjects } from "@/application/usecases/getProjects";

// Concrete repositories wired to Prisma (infrastructure layer)
import {
  profileRepository,
  skillGroupRepository,
  projectRepository,
} from "@/infrastructure/container";

export default async function HomePage() {
  // Fetch all data in parallel for best performance.
  const [profile, skillGroups, projects] = await Promise.all([
    getProfile(profileRepository),
    getSkillGroups(skillGroupRepository),
    getProjects(projectRepository),
  ]);

  // Graceful fallback if DB is empty (useful during initial setup).
  if (!profile) {
    return (
      <div style={{ padding: "200px 15vw", textAlign: "center", color: "#888" }}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>Database is empty</h1>
        <p>
          Run <code style={{ background: "#1a1a1a", padding: "2px 8px", borderRadius: 4 }}>npm run db:seed</code> to populate it.
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
