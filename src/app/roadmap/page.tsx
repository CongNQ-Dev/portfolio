/**
 * Roadmap page — route: /roadmap
 *
 * Server component fetches all phases from the DB.
 * The interactive timeline (checkboxes + progress bars) is rendered by
 * <RoadmapTimeline>, a client component, which receives the data as a prop.
 *
 * This is a clean example of the "server shell + client island" pattern:
 * - Server handles data fetching and SEO-friendly HTML structure.
 * - Client handles browser-only state (localStorage progress).
 */
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import RoadmapTimeline from "@/presentation/components/RoadmapTimeline";
import { getRoadmap } from "@/application/usecases/getRoadmap";
import { roadmapRepository } from "@/infrastructure/container";

export const metadata: Metadata = {
  title: "Learning Roadmap — Nguyen Quoc Cong",
  description:
    "A structured 24-month path across six tracks: Full Stack, Backend, DevOps, Math, AI/ML, and AI Agents.",
};

export default async function RoadmapPage() {
  const phases = await getRoadmap(roadmapRepository);

  return (
    <div
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "140px 32px 80px",
      }}
    >
      {/* Static header — rendered on the server (good for SEO) */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p
          style={{
            fontSize: 13,
            color: "#f5a623",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Learning Roadmap
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 900,
            marginTop: 12,
            letterSpacing: -1,
          }}
        >
          Full Stack → AI Agent Engineer
        </h1>
        <p
          style={{
            color: "#888888",
            fontSize: 15,
            maxWidth: 640,
            margin: "16px auto 0",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          My structured 24-month path across six tracks — Full Stack, Server &amp;
          Backend, DevOps &amp; Cloud, Mathematics, AI/ML Engineering, and AI Agents
          — built from the best free video courses and official documentation available.
        </p>
      </div>

      {/* Interactive timeline — client component */}
      <RoadmapTimeline phases={phases} />
    </div>
  );
}
