/**
 * CV page — route: /cv
 *
 * A print-friendly CV page. Dynamic profile data (name, email, GitHub,
 * LinkedIn) is fetched from the DB. The experience and skills content
 * matches legacy/resume.html and is kept in the component for simplicity.
 *
 * To make this fully data-driven later, add Experience and Education
 * models to the Prisma schema and follow the same pattern as Project.
 */
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getProfile } from "@/application/usecases/getProfile";
import { profileRepository } from "@/infrastructure/container";

export const metadata: Metadata = {
  title: "Resume — Nguyen Quoc Cong",
  description: "CV / Resume of Nguyen Quoc Cong, Mobile & Full Stack Developer.",
};

export default async function CvPage() {
  const profile = await getProfile(profileRepository);

  const name = profile?.name ?? "Nguyen Quoc Cong";
  const email = profile?.email ?? "congnguyen.working@gmail.com";
  const github = profile?.github ?? "https://github.com/CongNQ-Dev";
  const linkedin = profile?.linkedin ?? "https://www.linkedin.com/in/cong-nguyen-7555a9269/";

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "11pt",
        lineHeight: 1.45,
        color: "#000000",
        background: "#ffffff",
        maxWidth: "8.5in",
        margin: "0 auto",
        padding: "0.75in",
        minHeight: "100vh",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h1
          style={{
            fontSize: "20pt",
            fontWeight: "bold",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {name}
        </h1>
        <div style={{ fontSize: "10pt" }}>
          Ho Chi Minh City, Vietnam &nbsp;|&nbsp;
          <a href={`mailto:${email}`} style={{ color: "#000", textDecoration: "none" }}>{email}</a>
          &nbsp;|&nbsp;
          <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "none" }}>
            github.com/CongNQ-Dev
          </a>
          &nbsp;|&nbsp;
          <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "none" }}>
            linkedin.com/in/cong-nguyen-7555a9269
          </a>
        </div>
      </div>

      {/* ── PROFESSIONAL EXPERIENCE ── */}
      <Section title="Professional Experience">
        <Job
          org="Shift Asia"
          location="Ho Chi Minh City, Vietnam"
          role="Full Stack Engineer — Full-time · Hybrid"
          date="April 2025 – Present"
        >
          <ProjectEntry title="H¹T — Office Seat Reservation App" note="React Native · iOS & Android">
            <li>Built a cross-platform seat reservation app for a satellite shared office network using React Native and MobX</li>
            <li>Integrated Google Maps API for multi-location browsing; implemented digital door unlock triggered 5 minutes before reservation start</li>
            <li>Delivered member authentication system with personal account management, live on App Store and Google Play</li>
          </ProjectEntry>
          <ProjectEntry title="UP-T Web — Japanese Custom Merchandise Platform" note="PHP · MySQL · up-t.jp">
            <li>Maintained backend APIs for a large-scale e-commerce platform supporting 2,000+ custom product types</li>
            <li>Investigated and resolved bugs, optimized database queries, and resolved schema issues in production MySQL environment</li>
          </ProjectEntry>
          <ProjectEntry title="UP-T Talent — Idol Event Management App" note="Flutter · iOS & Android">
            <li>Built talent-side app for idols to create ticketed events, manage fan sessions, and host real-time Agora-powered video/audio calls</li>
            <li>Integrated WebSocket for live chat, Firebase for push notifications and auth, and post-event letter exchange flow</li>
            <li>Managed CI/CD pipeline via Fastlane + TestFlight (iOS) and APK release builds (Android)</li>
          </ProjectEntry>
          <ProjectEntry title="UP-T Talk — Fan Engagement App" note="Flutter · iOS & Android">
            <li>Built fan-facing app for joining ticketed live video events, 2-shot photography sessions, and digital collectible delivery</li>
            <li>Integrated In-App Purchase for VIP monthly subscriptions and Agora SDK for real-time video/audio</li>
            <li>Implemented fan request system allowing fans to propose events with their favourite idols</li>
          </ProjectEntry>
        </Job>

        <Job
          org="Futurify"
          location="Vietnam"
          role="Full Stack Engineer — Contract · Remote"
          date="February 2023 – April 2026"
        >
          <ProjectEntry title="Beaverly — AI-Powered SR&ED Platform" note="Python · FastAPI · React · TypeScript">
            <li>Built FastAPI backend with PostgreSQL/Supabase, async message queues, JWT auth, and Docker deployment</li>
            <li>Developed admin panel for client management, R&D initiative tracking, and evidence review using shadcn-ui + Tailwind</li>
            <li>Integrated OpenAI API for AI-assisted SR&ED claim analysis and classification</li>
          </ProjectEntry>
          <ProjectEntry title="HR Web — eOffice HR Management System" note="React · TypeScript · ASP.NET Core">
            <li>Built React/TypeScript frontend with Redux, Ant Design, drag-and-drop UI, and multi-language support (i18next)</li>
            <li>Developed ASP.NET Core (.NET 8) backend with employee management, leave tracking, and performance review modules</li>
            <li>Implemented automated offer letter generation with PDF/Word export; deployed on AWS ECS via Bitbucket Pipelines</li>
          </ProjectEntry>
          <ProjectEntry title="HD Saison — Consumer Loan Platform" note="Flutter · iOS & Android">
            <li>Architected and delivered a large-scale consumer loan application from the ground up using Flutter and BLoC</li>
            <li>Implemented complete eKYC workflow: biometric authentication, face detection, and OCR for identity card recognition</li>
            <li>Automated iOS build pipeline via Fastlane + TestFlight; produced APK builds for Android QC cycles</li>
          </ProjectEntry>
          <ProjectEntry title="Ziip Campus — Bus Tracking & Student Attendance" note="Flutter · iOS & Android">
            <li>Maintained real-time bus tracking application using Flutter, Google Maps API, and Firebase Realtime Database</li>
            <li>Built push notification system alerting parents when their child boards or exits the school bus</li>
          </ProjectEntry>
          <ProjectEntry title="Driver Booking App" note="Flutter · iOS & Android">
            <li>Built real-time driver-passenger coordination app with live tracking via Socket.io and Google Maps API</li>
            <li>Integrated MoMo and VNPay payment gateways for in-app transactions</li>
          </ProjectEntry>
        </Job>
      </Section>

      {/* ── TECHNICAL SKILLS ── */}
      <Section title="Technical Skills">
        <SkillRow label="Mobile" value="Flutter, React Native, Xcode, Android Studio, NativeBase" />
        <SkillRow label="State Management" value="BLoC, GetX, MobX, Riverpod" />
        <SkillRow label="Languages" value="Dart, TypeScript, JavaScript, PHP, Python, Java, C/C++, C#" />
        <SkillRow label="Backend & APIs" value="FastAPI, ASP.NET Core, Node.js, REST API, WebSocket" />
        <SkillRow label="Databases" value="PostgreSQL, MySQL, MongoDB, Firebase Realtime DB, Cloud Firestore" />
        <SkillRow label="Cloud & Services" value="Firebase, AWS ECS, Google Maps API, Agora SDK, VNPT eKYC" />
        <SkillRow label="DevOps & Tooling" value="Fastlane, TestFlight, Docker, Git, GitHub, Bitbucket Pipelines, Vercel" />
        <SkillRow label="AI Tools" value="GitHub Copilot, Claude Code, OpenClaw, MCP (Model Context Protocol)" />
      </Section>

      {/* ── LANGUAGES ── */}
      <Section title="Languages">
        <SkillRow label="Vietnamese" value="Native" />
        <SkillRow label="English" value="Professional proficiency — reading, writing, and research" />
      </Section>

      {/* ── EDUCATION ── */}
      <Section title="Education">
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>FPT University</span>
            <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Ho Chi Minh City, Vietnam</span>
          </div>
          <div style={{ fontStyle: "italic", fontSize: "10.5pt" }}>Bachelor of Science, Software Engineering</div>
        </div>
      </Section>

      {/* Print / back links */}
      <div style={{ textAlign: "center", marginTop: 22, fontSize: "10pt", color: "#666" }}>
        <a href="/" style={{ color: "#000", textDecoration: "none" }}>Back to Portfolio</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="javascript:window.print()" style={{ color: "#000", textDecoration: "none" }}>Print / Save as PDF</a>
      </div>
    </div>
  );
}

// ── Small layout helpers (avoid repeating inline styles) ──────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 13 }}>
      <div
        style={{
          fontSize: "11pt",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          borderBottom: "1.5px solid #000",
          paddingBottom: 1,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Job({
  org,
  location,
  role,
  date,
  children,
}: {
  org: string;
  location: string;
  role: string;
  date: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{org}</span>
        <span style={{ fontWeight: "bold", fontSize: "10.5pt", whiteSpace: "nowrap" }}>{location}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
        <span style={{ fontStyle: "italic", fontSize: "10.5pt" }}>{role}</span>
        <span style={{ fontSize: "10.5pt", fontStyle: "italic", whiteSpace: "nowrap" }}>{date}</span>
      </div>
      {children}
    </div>
  );
}

function ProjectEntry({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ fontStyle: "italic", fontSize: "10.5pt", fontWeight: "bold", marginBottom: 2 }}>
        {title}{" "}
        <span style={{ fontWeight: "normal" }}>({note})</span>
      </div>
      <ul style={{ marginLeft: 20, marginTop: 2 }}>
        {children}
      </ul>
    </div>
  );
}

function SkillRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ fontSize: "10.5pt", lineHeight: 1.65, marginBottom: 2 }}>
      <strong>{label}:</strong> {value}
    </div>
  );
}
