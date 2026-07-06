/**
 * Seed script — populates the database with all real content from the legacy site.
 *
 * Run with:  npm run db:seed
 * (which executes: tsx prisma/seed.ts)
 *
 * This script is IDEMPOTENT — running it multiple times is safe because it
 * deletes all existing rows before inserting. In production you'd use upsert
 * or conditional inserts to preserve user-generated data.
 *
 * DATA SOURCES:
 *  - Projects: PROJECTS object from legacy/index.html <script>
 *  - Skills: skills section from legacy/index.html
 *  - Roadmap: all phases + resources from legacy/roadmap.html
 *  - Profile: hardcoded from hero section of legacy/index.html
 *  - Posts: 2 sample posts
 */

import { PrismaClient, ResourceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── 1. Delete everything in dependency order ──────────────────────────
  await prisma.post.deleteMany();
  await prisma.roadmapResource.deleteMany();
  await prisma.roadmapPhase.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillGroup.deleteMany();
  await prisma.profile.deleteMany();

  // ── 2. Profile ─────────────────────────────────────────────────────────
  await prisma.profile.create({
    data: {
      name: "Cong Nguyen",
      title: "A Mobile & Full Stack Developer",
      yearsExp: 4,
      email: "congnguyen.working@gmail.com",
      github: "https://github.com/CongNQ-Dev",
      linkedin: "https://www.linkedin.com/in/cong-nguyen-7555a9269/",
      quote: "Make it work, make it right, make it fast.",
    },
  });
  console.log("  Profile created");

  // ── 3. Skill Groups ────────────────────────────────────────────────────
  // Each skill's iconPath matches a file in public/icons/ or public/icon-*.
  // iconText is shown when there is no image (abbreviation in a coloured box).
  const skillGroups = [
    {
      name: "Mobile",
      order: 1,
      skills: [
        { name: "Flutter",        iconPath: "/icons/flutter.svg",       iconBg: "#0d1b2e", order: 1 },
        { name: "React Native",   iconPath: "/icons/react.svg",         iconBg: "#1a2535", order: 2 },
        { name: "Xcode",          iconPath: "/icons/xcode.svg",         iconBg: "#0d1530", order: 3 },
        { name: "Android Studio", iconPath: "/icons/androidstudio.svg", iconBg: "#0d200d", order: 4 },
        { name: "NativeBase",     iconPath: null, iconBg: "#1f1050", iconText: "NB",   iconColor: "#9b7fff", order: 5 },
      ],
    },
    {
      name: "Backend",
      order: 2,
      skills: [
        { name: "FastAPI",       iconPath: "/icons/fastapi.svg", iconBg: "#0d1f1c", order: 1 },
        { name: "ASP.NET Core",  iconPath: "/icons/dotnet.svg",  iconBg: "#1a1030", order: 2 },
        { name: "PHP",           iconPath: "/icons/php.svg",     iconBg: "#1e1730", order: 3 },
        { name: "WebSocket",     iconPath: null, iconBg: "#0d2020", iconText: "WS",   iconColor: "#00d4aa", order: 4 },
        { name: "REST API",      iconPath: null, iconBg: "#2d1010", iconText: "REST", iconColor: "#e74c3c", order: 5 },
      ],
    },
    {
      name: "Database",
      order: 3,
      skills: [
        { name: "PostgreSQL", iconPath: "/icons/postgresql.svg", iconBg: "#0d1626", order: 1 },
        { name: "Supabase",   iconPath: "/icons/supabase.svg",   iconBg: "#0d1a10", order: 2 },
        { name: "MySQL",      iconPath: "/icons/mysql.svg",      iconBg: "#0d1e26", order: 3 },
        { name: "MongoDB",    iconPath: "/icons/mongodb.svg",    iconBg: "#0d1f0d", order: 4 },
        { name: "Firebase",   iconPath: "/icons/firebase.svg",   iconBg: "#1f1500", order: 5 },
      ],
    },
    {
      name: "Tools & Services",
      order: 4,
      skills: [
        { name: "Google Maps", iconPath: "/icons/googlemaps.svg", iconBg: "#0d1830", order: 1 },
        { name: "Agora SDK",   iconPath: null, iconBg: "#00246b", iconText: "AGO",  iconColor: "#ffffff", order: 2 },
        { name: "Fastlane",    iconPath: "/icons/fastlane.svg",   iconBg: "#0d200d", order: 3 },
        { name: "VNPT eKYC",   iconPath: null, iconBg: "#0d1f10", iconText: "eKYC", iconColor: "#43a047", order: 4 },
        { name: "Face Recognition", iconPath: null, iconBg: "#1f0d0d", iconText: "FACE", iconColor: "#FF7043", order: 5 },
        { name: "Speech to Text",   iconPath: null, iconBg: "#1a0020", iconText: "STT",  iconColor: "#9c27b0", order: 6 },
      ],
    },
    {
      name: "Language",
      order: 5,
      skills: [
        { name: "TypeScript",  iconPath: "/icons/typescript.svg",  iconBg: "#0d1826", order: 1 },
        { name: "Dart",        iconPath: "/icons/dart.svg",        iconBg: "#0d1f1e", order: 2 },
        { name: "Python",      iconPath: "/icons/python.svg",      iconBg: "#1a1526", order: 3 },
        { name: "C#",          iconPath: null, iconBg: "#1a1030", iconText: "C#",   iconColor: "#a78bfa", order: 4 },
        { name: "JavaScript",  iconPath: "/icons/javascript.svg",  iconBg: "#1f1c00", order: 5 },
        { name: "Java",        iconPath: "/icons/java.svg",        iconBg: "#1a1200", order: 6 },
        { name: "C / C++",     iconPath: "/icons/cplusplus.svg",   iconBg: "#0d1826", order: 7 },
      ],
    },
    {
      name: "Web Frontend",
      order: 6,
      skills: [
        { name: "React",      iconPath: "/icons/react.svg",     iconBg: "#1a2535", order: 1 },
        { name: "Vite",       iconPath: "/icons/vite.svg",      iconBg: "#0f1020", order: 2 },
        { name: "shadcn/ui",  iconPath: null, iconBg: "#1a1a1a", iconText: "shad", iconColor: "#ffffff", order: 3 },
        { name: "Ant Design", iconPath: "/icons/antdesign.svg", iconBg: "#0d1530", order: 4 },
        { name: "Redux",      iconPath: "/icons/redux.svg",     iconBg: "#1a0d26", order: 5 },
      ],
    },
    {
      name: "AI Tools",
      order: 7,
      skills: [
        { name: "GitHub Copilot", iconPath: "/icons/githubcopilot.svg", iconBg: "#1a1a1a", order: 1 },
        { name: "Claude Code",    iconPath: "/icons/anthropic.svg",     iconBg: "#1a0f00", order: 2 },
        { name: "OpenClaw",       iconPath: "/icon-openclaw.svg",       iconBg: "#1a0505", order: 3 },
        { name: "MCP",            iconPath: null, iconBg: "#0a1520", iconText: "MCP", iconColor: "#61DAFB", order: 4 },
      ],
    },
  ];

  for (const group of skillGroups) {
    await prisma.skillGroup.create({
      data: {
        name: group.name,
        order: group.order,
        skills: {
          create: group.skills.map((s) => ({
            name: s.name,
            iconPath: s.iconPath ?? null,
            iconBg: s.iconBg ?? null,
            iconText: "iconText" in s ? (s.iconText ?? null) : null,
            iconColor: "iconColor" in s ? (s.iconColor ?? null) : null,
            order: s.order,
          })),
        },
      },
    });
  }
  console.log("  Skill groups + skills created");

  // ── 4. Projects ────────────────────────────────────────────────────────
  // Data copied verbatim from the PROJECTS object in legacy/index.html.
  const projects = [
    {
      slug: "h1t",
      tag: "React Native · iOS & Android",
      name: "H¹T",
      desc: "Office seat reservation app for a satellite shared office network. Features map-based location browsing, booking management, and digital door unlock.",
      tech: ["React Native", "Google Maps API", "MobX", "REST API"],
      featuresLabel: "Key Features",
      features: [
        "Multi-location map-based seat browsing and reservation management.",
        "Digital door unlock activated 5 minutes before the reservation start time.",
        "Member authentication system with personal account login.",
      ],
      links: [
        { label: "App Store", href: "https://apps.apple.com/jp/app/h-t/id1537360714" },
        { label: "CH Play",   href: "https://play.google.com/store/apps/details?id=com.nomura.h1t.mobile" },
      ],
      type: "company",
      iconPath: "/icon-h1t.webp",
      visualVariant: "v3",
      order: 1,
    },
    {
      slug: "upt-talent",
      tag: "Flutter · iOS & Android",
      name: "UP-T Talent",
      desc: "Talent-side app for idols and entertainers to create events, manage fan sessions, and host real-time Agora-powered video calls. Includes fan request system and post-event letter exchange.",
      tech: ["Flutter", "Dart", "Agora SDK", "WebSocket", "Firebase", "BLoC", "Fastlane", "TestFlight"],
      featuresLabel: "Key Features",
      features: [
        "Event creation and scheduling with ticket management for fan participation.",
        "Real-time Agora-powered video/audio sessions and live WebSocket chat during events.",
        "Fan request system — fans can propose events at times matching their availability.",
        "Post-event letter exchange; CI/CD via Fastlane + TestFlight and Android APK builds.",
      ],
      links: [
        { label: "App Store", href: "https://apps.apple.com/vn/app/up-t-talent/id6444641726" },
        { label: "CH Play",   href: "https://play.google.com/store/apps/details?id=jp.maruiorimono.upt.talk.idol" },
      ],
      type: "company",
      iconPath: "/icon-upt-talent.webp",
      visualVariant: "v4",
      order: 2,
    },
    {
      slug: "upt-talk",
      tag: "Flutter · iOS & Android",
      name: "UP-T Talk",
      desc: "Fan-facing app to join ticketed live video events with idols, enjoy 2-shot photography sessions, receive digital collectibles, and subscribe to VIP plans for unlimited access to past talks.",
      tech: ["Flutter", "Dart", "Agora SDK", "WebSocket", "Firebase", "In-App Purchase", "BLoC", "Fastlane", "TestFlight"],
      featuresLabel: "Key Features",
      features: [
        "Browse and join ticketed live video/audio events hosted by idols and entertainers.",
        "2-shot photography sessions and digital collectible delivery after talks.",
        "VIP monthly subscription (In-App Purchase) for unlimited access to past talk recordings.",
        "Fan request system to schedule events with favourite idols.",
      ],
      links: [
        { label: "App Store", href: "https://apps.apple.com/vn/app/up-t-talk-%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%E3%81%A8web%E3%81%A7%E7%89%B9%E5%85%B8%E4%BC%9A/id6443553469" },
        { label: "CH Play",   href: "https://play.google.com/store/apps/details?id=jp.maruiorimono.upt.talk" },
      ],
      type: "company",
      iconPath: "/icon-upt-talk.webp",
      visualVariant: "v4",
      order: 3,
    },
    {
      slug: "upt-web",
      tag: "Web · PHP / MySQL",
      name: "UP-T Web",
      desc: "Large-scale Japanese custom merchandise e-commerce platform supporting 2,000+ product types, a creator marketplace, online design tool with 3D preview, and multiple payment methods.",
      tech: ["PHP", "MySQL", "REST API"],
      featuresLabel: "Responsibilities",
      features: [
        "Backend API maintenance, bug investigation and fixing.",
        "Database query optimization and schema-related issues.",
      ],
      links: [
        { label: "View Site", href: "https://up-t.jp" },
      ],
      type: "company",
      iconPath: null,
      visualVariant: "v1",
      order: 4,
    },
    {
      slug: "hdsaison",
      tag: "Flutter · iOS & Android",
      name: "HD Saison",
      desc: "Large-scale consumer loan platform built from scratch. Features biometric authentication, face detection, OCR for identity cards, and eKYC workflows.",
      tech: ["Flutter", "BLoC", "Biometric Auth", "Face Detection", "eKYC / OCR", "Firebase"],
      featuresLabel: "Highlights",
      features: [
        "Biometric authentication, face detection for verification, OCR for identity card text recognition.",
        "Full eKYC workflow — capture, verify, and submit identity documents entirely in-app.",
        "Handled complex loan application logic with robust error handling and clean architecture.",
        "Builds: Delivered TestFlight and APK builds for in-house QC and client testing.",
      ],
      links: [
        { label: "App Store", href: "https://apps.apple.com/vn/app/hd-saison/id1589425903" },
        { label: "CH Play",   href: "https://play.google.com/store/apps/details?id=com.finos.hdsaison&gl=VN" },
      ],
      type: "company",
      iconPath: "/icon-hdsaison.webp",
      visualVariant: "v4",
      order: 5,
    },
    {
      slug: "ziip",
      tag: "Flutter · iOS & Android",
      name: "Ziip Campus",
      desc: "Bus tracking and student attendance app for parents. Real-time location updates with Google Maps and push notification alerts for timely pickup management.",
      tech: ["Flutter", "Google Maps API", "Firebase Realtime DB", "Push Notifications", "BLoC"],
      featuresLabel: "Key Features",
      features: [
        "Real-time bus position tracking displayed on Google Maps.",
        "Student attendance logging — parents notified when their child boards or exits.",
        "Firebase Realtime Database for live synchronized bus location data.",
        "Push notification alerts for pick-up timing and schedule changes.",
        "Hired specifically for Google Maps API expertise to maintain and extend this product.",
      ],
      links: [
        { label: "App Store", href: "https://apps.apple.com/us/app/zip-campus/id6751437352?l=vi" },
        { label: "CH Play",   href: "https://play.google.com/store/apps/details?id=com.zipcampus.co&hl=en_GB" },
      ],
      type: "company",
      iconPath: "/icon-ziip.webp",
      visualVariant: "v5",
      order: 6,
    },
    {
      slug: "driver",
      tag: "Flutter · iOS & Android",
      name: "Driver Booking App",
      desc: "Cross-platform driver booking app with real-time tracking, integrated MoMo & VNPay payment gateways, and Firebase push notifications for seamless passenger-driver coordination.",
      tech: ["Flutter", "Dart", "Google Maps API", "Socket", "Firebase", "MoMo", "VNPay", "GetX", "MongoDB"],
      featuresLabel: "Key Features",
      features: [
        "Real-time driver-passenger location tracking via Socket connections.",
        "Firebase push notifications, authentication, and cloud functions.",
        "Payment gateway integration: MoMo & VNPay for in-app transactions.",
        "Builds: Delivered TestFlight and APK builds for QC.",
      ],
      links: [],
      type: "company",
      iconPath: null,
      visualVariant: "v6",
      order: 7,
    },
    {
      slug: "hr-web",
      tag: "Web · React / TypeScript / .NET",
      name: "HR Web",
      desc: "Full-stack eOffice HR management system covering employee records, leave management, performance reviews, and automated offer letter generation — deployed on AWS ECS.",
      tech: ["React 18", "TypeScript", "Redux", "Ant Design", "ASP.NET Core", "C#", ".NET 8", "AWS ECS", "i18next", "jsPDF"],
      featuresLabel: "Key Features",
      features: [
        "Employee management, absence/leave tracking, and performance review workflows.",
        "Automated offer letter generation for full-time, part-time, intern, and consultant roles.",
        "Rich text editing, drag-and-drop UI, PDF/Word export, and multi-language (i18next) support.",
        "Backend deployed on AWS ECS via Bitbucket Pipelines CI/CD.",
      ],
      links: [],
      type: "company",
      iconPath: "/icon-hr.svg",
      visualVariant: "v6",
      order: 8,
    },
    {
      slug: "beaverly",
      tag: "Web · Python / FastAPI / React",
      name: "Beaverly",
      desc: "AI-powered SR&ED (Scientific Research & Experimental Development) claim management platform with OpenAI integration, a multi-tenant client workspace, and an admin evidence tracking panel.",
      tech: ["Python", "FastAPI", "PostgreSQL", "Supabase", "OpenAI API", "Docker", "React", "TypeScript", "Vite", "shadcn-ui", "Tailwind CSS", "Zustand"],
      featuresLabel: "Key Features",
      features: [
        "AI-assisted SR&ED claim analysis and classification using OpenAI API with tiktoken and hdbscan clustering.",
        "Admin platform (core-platform-ui): client management, R&D initiative tracking, and evidence review.",
        "Client workspace (beaverly-workspace): project collaboration and evidence submission portal.",
        "FastAPI backend with PostgreSQL/Supabase, async message queues (aio-pika), JWT auth, and Docker deployment.",
      ],
      links: [],
      type: "company",
      iconPath: "/icon-beaverly.png",
      visualVariant: "v6",
      order: 9,
    },
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log("  Projects created:", projects.length);

  // ── 5. Roadmap ─────────────────────────────────────────────────────────
  // All data copied verbatim from legacy/roadmap.html.
  // `dataId` values match the HTML data-id attributes so localStorage
  // progress from the legacy site is preserved after migration.
  const phases = [
    {
      number: 1,
      eta: "Months 1 – 6 · Foundation",
      title: "Full Stack Engineering",
      goal: "Solidify computer science fundamentals, then master the modern web stack end to end — semantic HTML/CSS, deep JavaScript & TypeScript, React on the frontend, and Node.js on the server.",
      tags: ["HTML / CSS", "JavaScript", "TypeScript", "React", "Node.js", "Git"],
      milestone: "Build and deploy a full-stack app (React + TypeScript frontend, Node/Express API, PostgreSQL) with auth, CRUD, and tests — deployed live with a public GitHub repo and README.",
      resources: [
        { dataId: "p1-cs50",     type: "course",   title: "CS50x — Introduction to Computer Science",                       url: "https://cs50.harvard.edu/x/",                                                         source: "Harvard · the single best CS foundation course, free with certificate",             order: 1 },
        { dataId: "p1-odin",     type: "course",   title: "The Odin Project — Full Stack JavaScript Path",                  url: "https://www.theodinproject.com/paths/full-stack-javascript",                          source: "Project-based curriculum covering the entire stack, start to finish",               order: 2 },
        { dataId: "p1-htmlcss",  type: "video",    title: "HTML & CSS Full Course — Beginner to Pro (6.5h)",                url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",                                        source: "SuperSimpleDev · YouTube",                                                          order: 3 },
        { dataId: "p1-js",       type: "video",    title: "Learn JavaScript — Full Course for Beginners (3.5h)",            url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",                                        source: "freeCodeCamp · YouTube",                                                            order: 4 },
        { dataId: "p1-jsinfo",   type: "docs",     title: "The Modern JavaScript Tutorial",                                 url: "https://javascript.info/",                                                            source: "javascript.info · the deepest free JS reference, read alongside MDN",               order: 5 },
        { dataId: "p1-ts",       type: "video",    title: "Learn TypeScript — Full Tutorial (4.5h)",                        url: "https://www.youtube.com/watch?v=30LWjhZzg50",                                        source: "freeCodeCamp · YouTube · pair with typescriptlang.org/docs",                        order: 6 },
        { dataId: "p1-react",    type: "docs",     title: "React — Official \"Learn React\" Guide",                         url: "https://react.dev/learn",                                                             source: "react.dev · interactive official docs, the canonical way to learn React",           order: 7 },
        { dataId: "p1-fso",      type: "course",   title: "Full Stack Open — React, Node, GraphQL, TypeScript, CI/CD",      url: "https://fullstackopen.com/en/",                                                       source: "University of Helsinki · the best free modern full-stack course",                   order: 8 },
        { dataId: "p1-node",     type: "video",    title: "Node.js & Express — Full Course (8h)",                           url: "https://www.youtube.com/watch?v=Oe421EPjeBE",                                        source: "freeCodeCamp (John Smilga) · YouTube",                                              order: 9 },
        { dataId: "p1-git",      type: "video",    title: "Git & GitHub for Beginners — Crash Course",                      url: "https://www.youtube.com/watch?v=RGOj5yH7evk",                                        source: "freeCodeCamp · YouTube · then practice at learngitbranching.js.org",                order: 10 },
        { dataId: "p1-roadmapsh",type: "docs",     title: "roadmap.sh — Full Stack Developer Roadmap",                     url: "https://roadmap.sh/full-stack",                                                       source: "Visual skill map · use it to track coverage, not as a checklist to fear",          order: 11 },
      ],
    },
    {
      number: 2,
      eta: "Months 4 – 10 · Depth",
      title: "Server & Backend Engineering",
      goal: "Go beyond CRUD — understand how servers, databases, networks, and operating systems actually work. Learn API design, caching, message queues, and the system design patterns behind large-scale platforms.",
      tags: ["Python / FastAPI", "PostgreSQL", "Redis", "Networking", "System Design", "Linux"],
      milestone: "Design and build a production-style API: FastAPI + PostgreSQL + Redis cache + background workers (message queue), rate limiting, JWT auth, OpenAPI docs, and load-test results documented in the repo.",
      resources: [
        { dataId: "p2-python",     type: "video",  title: "Learn Python — Full Course for Beginners (4.5h)",               url: "https://www.youtube.com/watch?v=rfscVS0vtbw",                                        source: "freeCodeCamp · YouTube · skip ahead if you already know Python basics",             order: 1 },
        { dataId: "p2-fastapi",    type: "video",  title: "Python API Development with FastAPI — Full Course (19h)",       url: "https://www.youtube.com/watch?v=0sOvCWFmrtA",                                        source: "freeCodeCamp · YouTube · covers SQLAlchemy, JWT, testing, deployment, CI",         order: 2 },
        { dataId: "p2-fastapidocs",type: "docs",   title: "FastAPI — Official Tutorial & User Guide",                      url: "https://fastapi.tiangolo.com/tutorial/",                                              source: "fastapi.tiangolo.com · among the best-written docs in the industry",                order: 3 },
        { dataId: "p2-pg",         type: "video",  title: "PostgreSQL Tutorial — Full Course for Beginners (4h)",         url: "https://www.youtube.com/watch?v=qw--VYLpxG4",                                        source: "freeCodeCamp · YouTube · then practice queries at pgexercises.com",                 order: 4 },
        { dataId: "p2-hussein",    type: "video",  title: "Hussein Nasser — Backend Engineering Channel",                 url: "https://www.youtube.com/@hnasr",                                                     source: "Deep dives on TCP, HTTP/2-3, connection pooling, DB internals, proxies",            order: 5 },
        { dataId: "p2-network",    type: "video",  title: "Computer Networking — Full Course (9h)",                       url: "https://www.youtube.com/watch?v=qiQR5rTSshw",                                        source: "freeCodeCamp · YouTube · OSI model, TCP/IP, DNS, subnetting",                      order: 6 },
        { dataId: "p2-missing",    type: "course", title: "The Missing Semester of Your CS Education",                    url: "https://missing.csail.mit.edu/",                                                     source: "MIT · shell, tmux, dotfiles, debugging, profiling — daily-driver skills",          order: 7 },
        { dataId: "p2-sdp",        type: "docs",   title: "The System Design Primer",                                     url: "https://github.com/donnemartin/system-design-primer",                                source: "GitHub · load balancing, caching, sharding, CAP — with exercises",                 order: 8 },
        { dataId: "p2-bytebytego", type: "video",  title: "ByteByteGo — System Design Channel",                          url: "https://www.youtube.com/@ByteByteGo",                                                source: "Alex Xu · short animated system design explanations",                              order: 9 },
        { dataId: "p2-ddia",       type: "book",   title: "Designing Data-Intensive Applications",                        url: "https://dataintensive.net/",                                                         source: "Martin Kleppmann · THE backend book — read slowly, one chapter a week",            order: 10 },
      ],
    },
    {
      number: 3,
      eta: "Months 8 – 14 · Operations",
      title: "DevOps & Cloud",
      goal: "Own the full delivery pipeline: Linux, containers, orchestration, infrastructure as code, CI/CD, monitoring, and one cloud provider learned deeply (AWS).",
      tags: ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD", "AWS", "Monitoring"],
      milestone: "Take the Phase 2 API and productionize it: Dockerize, deploy to Kubernetes with Terraform-provisioned AWS infra, GitHub Actions CI/CD (test → build → deploy), and Prometheus/Grafana dashboards with alerts.",
      resources: [
        { dataId: "p3-linux",    type: "docs",     title: "Linux Journey — Interactive Linux Fundamentals",               url: "https://linuxjourney.com/",                                                           source: "linuxjourney.com · then break into servers at overthewire.org/wargames/bandit",    order: 1 },
        { dataId: "p3-docker",   type: "video",    title: "Docker Tutorial for Beginners — Full Course (3h)",            url: "https://www.youtube.com/watch?v=3c-iBn73dDE",                                        source: "TechWorld with Nana · YouTube · the classic Docker introduction",                  order: 2 },
        { dataId: "p3-k8s",      type: "video",    title: "Kubernetes Tutorial for Beginners — Full Course (4h)",        url: "https://www.youtube.com/watch?v=X48VuDVv0do",                                        source: "TechWorld with Nana · YouTube · pods, services, ingress, volumes, helm",           order: 3 },
        { dataId: "p3-cicd",     type: "video",    title: "GitHub Actions Tutorial — CI/CD Pipeline",                    url: "https://www.youtube.com/watch?v=R8_veQiYBjI",                                        source: "TechWorld with Nana · YouTube · pair with docs.github.com/actions",                order: 4 },
        { dataId: "p3-terraform",type: "video",    title: "Terraform Course — Automate AWS Infrastructure (2h)",         url: "https://www.youtube.com/watch?v=SLB_c_ayRMo",                                        source: "freeCodeCamp · YouTube · then developer.hashicorp.com/terraform/tutorials",        order: 5 },
        { dataId: "p3-aws",      type: "video",    title: "AWS Certified Cloud Practitioner Course (CLF-C02)",           url: "https://www.youtube.com/watch?v=NhDYbskXRgc",                                        source: "freeCodeCamp (Andrew Brown) · YouTube · then aim for Solutions Architect Associate",order: 6 },
        { dataId: "p3-roadmap",  type: "docs",     title: "roadmap.sh — DevOps Roadmap",                                 url: "https://roadmap.sh/devops",                                                          source: "Visual map of the whole DevOps landscape with linked resources",                   order: 7 },
        { dataId: "p3-prom",     type: "docs",     title: "Prometheus + Grafana — Monitoring & Observability",           url: "https://prometheus.io/docs/introduction/overview/",                                  source: "prometheus.io / grafana.com · metrics, alerts, dashboards",                       order: 8 },
        { dataId: "p3-sre",      type: "book",     title: "Google SRE Book — Site Reliability Engineering",              url: "https://sre.google/sre-book/table-of-contents/",                                     source: "Free online · SLOs, error budgets, toil, incident response",                      order: 9 },
        { dataId: "p3-kodekloud",type: "practice", title: "Killercoda — Free Interactive K8s/Linux Scenarios",           url: "https://killercoda.com/",                                                            source: "Hands-on browser labs · no local cluster needed",                                 order: 10 },
      ],
    },
    {
      number: 4,
      eta: "Months 1 – 14 · Parallel Track (3–4 h/week)",
      title: "Mathematics for AI",
      goal: "Run this alongside everything else. Linear algebra, calculus, probability & statistics — enough to read ML papers and understand what's happening inside a neural network, built on intuition first, formality second.",
      tags: ["Linear Algebra", "Calculus", "Probability", "Statistics", "Optimization"],
      milestone: "Implement linear regression and a 2-layer neural network from scratch in NumPy — forward pass, loss, backprop, gradient descent — no ML libraries. If you can do this, the math stuck.",
      resources: [
        { dataId: "p4-3b1b-la",  type: "video",  title: "Essence of Linear Algebra (16 videos)",                        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",           source: "3Blue1Brown · YouTube · vectors, matrices, eigenvalues — pure visual intuition",   order: 1 },
        { dataId: "p4-3b1b-calc",type: "video",  title: "Essence of Calculus (12 videos)",                              url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",           source: "3Blue1Brown · YouTube · derivatives, chain rule, integrals",                      order: 2 },
        { dataId: "p4-strang",   type: "course", title: "MIT 18.06 — Linear Algebra (Gilbert Strang)",                  url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",                       source: "MIT OpenCourseWare · full lectures + problem sets, the legendary course",          order: 3 },
        { dataId: "p4-khan",     type: "course", title: "Khan Academy — Statistics & Probability",                      url: "https://www.khanacademy.org/math/statistics-probability",                             source: "khanacademy.org · exercises included, fill any gaps from calculus too",            order: 4 },
        { dataId: "p4-statquest",type: "video",  title: "StatQuest — Statistics & ML, Clearly Explained",              url: "https://www.youtube.com/@statquest",                                                  source: "Josh Starmer · YouTube · start with the \"Statistics Fundamentals\" playlist",     order: 5 },
        { dataId: "p4-mml",      type: "book",   title: "Mathematics for Machine Learning (free PDF)",                  url: "https://mml-book.github.io/",                                                        source: "Deisenroth, Faisal, Ong · Cambridge · the bridge from math to ML",                order: 6 },
        { dataId: "p4-3b1b-nn",  type: "video",  title: "Neural Networks series (incl. \"But what is a GPT?\")",       url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",           source: "3Blue1Brown · YouTube · gradient descent & backprop, visually — the bridge to Phase 5", order: 7 },
      ],
    },
    {
      number: 5,
      eta: "Months 12 – 20 · Specialization",
      title: "AI / ML Engineering",
      goal: "From classical ML to deep learning to LLMs. Train models, fine-tune transformers, build RAG systems, and learn to ship AI features in production — evaluation, cost, and latency included.",
      tags: ["PyTorch", "Transformers", "LLMs", "RAG", "Embeddings", "Evals"],
      milestone: "Ship an end-to-end RAG application: document ingestion → embeddings → vector search → LLM answer with citations, plus an eval harness measuring answer quality — deployed with the DevOps stack from Phase 3.",
      resources: [
        { dataId: "p5-karpathy-llm",type: "video",  title: "Intro to Large Language Models (1h)",                       url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",                                        source: "Andrej Karpathy · YouTube · the best 1-hour LLM overview, watch first",            order: 1 },
        { dataId: "p5-zero2hero",   type: "video",  title: "Neural Networks: Zero to Hero",                             url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",           source: "Andrej Karpathy · YouTube · build backprop, makemore, and GPT from scratch — do every exercise", order: 2 },
        { dataId: "p5-gpt",         type: "video",  title: "Let's Build GPT: from scratch, in code (2h)",               url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",                                        source: "Andrej Karpathy · YouTube · code a transformer line by line",                     order: 3 },
        { dataId: "p5-fastai",      type: "course", title: "fast.ai — Practical Deep Learning for Coders",              url: "https://course.fast.ai/",                                                            source: "Jeremy Howard · free · top-down: train real models on day one",                   order: 4 },
        { dataId: "p5-hf",          type: "course", title: "Hugging Face — LLM, NLP & Agents Courses",                  url: "https://huggingface.co/learn",                                                       source: "huggingface.co · transformers library, fine-tuning, datasets — free",             order: 5 },
        { dataId: "p5-pytorch",     type: "docs",   title: "PyTorch — Official \"Learn the Basics\" Tutorials",         url: "https://pytorch.org/tutorials/beginner/basics/intro.html",                           source: "pytorch.org · tensors, autograd, training loops, saving models",                  order: 6 },
        { dataId: "p5-dlai",        type: "course", title: "DeepLearning.AI — Short Courses (free)",                    url: "https://www.deeplearning.ai/short-courses/",                                         source: "1-hour courses on RAG, embeddings, evals, fine-tuning, prompt engineering",       order: 7 },
        { dataId: "p5-anthropic-docs",type:"docs",  title: "Claude Docs — Prompt Engineering & Tool Use",               url: "https://docs.claude.com/",                                                           source: "Anthropic · prompting guide, tool use, streaming, evals cookbook",                order: 8 },
        { dataId: "p5-aiebook",     type: "book",   title: "AI Engineering — Chip Huyen",                               url: "https://huyenchip.com/books/",                                                       source: "O'Reilly · building applications on foundation models: RAG, evals, serving",      order: 9 },
      ],
    },
    {
      number: 6,
      eta: "Months 18 – 24 · Frontier",
      title: "AI Agents",
      goal: "Build autonomous systems that plan, use tools, and act — single agents, multi-agent orchestration, MCP integrations, memory, and the safety/eval discipline to run them reliably in production.",
      tags: ["Tool Use", "MCP", "Claude Agent SDK", "LangGraph", "Multi-Agent", "Memory"],
      milestone: "Build a multi-agent system that solves a real problem end to end: a planner agent, specialist worker agents with MCP tool access, persistent memory, an eval suite, and full observability — deployed, documented, and demoed on this portfolio.",
      resources: [
        { dataId: "p6-anthropic-agents",type:"docs",  title: "Building Effective Agents",                               url: "https://www.anthropic.com/engineering/building-effective-agents",                     source: "Anthropic Engineering · workflows vs agents, patterns that actually work — read first", order: 1 },
        { dataId: "p6-mcp",         type: "docs",   title: "Model Context Protocol (MCP) — Official Docs",              url: "https://modelcontextprotocol.io/",                                                   source: "modelcontextprotocol.io · build servers & clients that connect AI to real systems",order: 2 },
        { dataId: "p6-agentsdk",    type: "docs",   title: "Claude Agent SDK — Build Production Agents",                url: "https://docs.claude.com/en/api/agent-sdk/overview",                                  source: "Anthropic · the SDK behind Claude Code: tools, hooks, subagents, permissions",    order: 3 },
        { dataId: "p6-langgraph",   type: "docs",   title: "LangGraph — Stateful Agent Orchestration",                  url: "https://langchain-ai.github.io/langgraph/",                                          source: "LangChain · graphs, state, human-in-the-loop, multi-agent patterns",              order: 4 },
        { dataId: "p6-hf-agents",   type: "course", title: "Hugging Face — AI Agents Course",                           url: "https://huggingface.co/learn/agents-course/unit0/introduction",                     source: "Free certified course · agent fundamentals, frameworks, final project",            order: 5 },
        { dataId: "p6-dlai-agents", type: "course", title: "DeepLearning.AI — Agent Short Courses",                     url: "https://www.deeplearning.ai/short-courses/",                                         source: "Multi-agent systems, function calling, agent evals, computer use",                order: 6 },
        { dataId: "p6-karpathy-deep",type:"video",  title: "Deep Dive into LLMs like ChatGPT (3.5h)",                   url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",                                        source: "Andrej Karpathy · YouTube · pretraining → SFT → RLHF, hallucinations, tool use", order: 7 },
        { dataId: "p6-swarm",       type: "docs",   title: "OpenAI — A Practical Guide to Building Agents",             url: "https://platform.openai.com/docs/guides/agents",                                     source: "platform.openai.com · orchestration, guardrails, handoffs — compare approaches", order: 8 },
        { dataId: "p6-build",       type: "practice",title: "Anthropic Cookbook — Agent & Tool-Use Recipes",            url: "https://github.com/anthropics/anthropic-cookbook",                                   source: "GitHub · runnable notebooks: tool use, RAG, sub-agents, evaluations",             order: 9 },
      ],
    },
  ];

  for (const phase of phases) {
    await prisma.roadmapPhase.create({
      data: {
        number: phase.number,
        eta: phase.eta,
        title: phase.title,
        goal: phase.goal,
        tags: phase.tags,
        milestone: phase.milestone,
        resources: {
          create: phase.resources.map((r) => ({
            ...r,
            type: r.type as ResourceType,
          })),
        },
      },
    });
  }
  console.log("  Roadmap phases created:", phases.length);

  // ── 6. Sample Blog Posts ───────────────────────────────────────────────
  const posts = [
    {
      slug: "clean-architecture-nextjs",
      title: "Clean Architecture in a Next.js App: Why I Added Layers to a Portfolio Site",
      excerpt:
        "Most portfolio sites are a single page of HTML. Mine now has a domain layer, use cases, and repository interfaces. Here's why that's a feature, not over-engineering.",
      content: `# Clean Architecture in a Next.js App

When I decided to migrate my static HTML portfolio to Next.js, I could have just dropped everything into a \`pages/\` directory and called it done. Instead I added three extra layers.

Here's why.

## The three questions that drove the architecture

**1. Can I test my business logic without a running database?**

With a plain Next.js app that imports Prisma directly in a route, the answer is no. With the repository pattern, the answer is yes — swap in a fake repository and call the use case function directly.

**2. Can I change the data source without touching the UI?**

With direct Prisma imports in components, changing from Postgres to a JSON file means hunting through every file that ever called \`prisma.project.findMany()\`. With the container wiring, it's one swap in \`src/infrastructure/container.ts\`.

**3. Is the code self-documenting?**

When a new developer opens \`src/app/page.tsx\`, they see \`getProjects(projectRepository)\`. The name tells the whole story: there is a use case called \`getProjects\`, it depends on a repository, and the repository is injected (not imported directly).

## The layers in 30 seconds

\`\`\`
src/
  domain/       — plain TypeScript interfaces, no imports from anywhere else
  application/  — pure functions (use cases), only import from domain/
  infrastructure/ — Prisma implementations, one composition root (container.ts)
  presentation/ — React components, receive domain types as props
  app/          — Next.js routes, thin: call use cases, render components
\`\`\`

## The rule that makes it work

**The dependency arrow only points inward.**

\`infrastructure\` can import from \`domain\`.
\`application\` can import from \`domain\`.
\`domain\` imports from nowhere.

If you ever find yourself importing a Prisma type inside \`src/domain/\`, something has gone wrong.

## Was it worth it for a portfolio?

Objectively, no — the site has nine projects and zero business logic worth testing. But the point of this migration was to *learn* how clean architecture feels in a real codebase. Running \`npm run db:seed\` and watching the roadmap appear in the browser while understanding *exactly* which code path got it there is a better lesson than any tutorial.

That's the whole point.
`,
      tags: ["Architecture", "Next.js", "TypeScript", "Learning"],
      publishedAt: new Date("2026-06-15"),
    },
    {
      slug: "from-flutter-to-nextjs",
      title: "What Flutter Taught Me About React Server Components",
      excerpt:
        "After four years of building Flutter apps with a strict widget tree, picking up Next.js App Router felt surprisingly familiar — and surprisingly different in one key way.",
      content: `# What Flutter Taught Me About React Server Components

I've been writing Flutter for four years. When I started learning Next.js App Router with React Server Components, I kept reaching for mental models from Flutter — and most of them held up.

## The widget tree → the component tree

In Flutter, everything is a widget. Some widgets are stateful (\`StatefulWidget\`), most are stateless (\`StatelessWidget\`). You compose them into a tree.

React works the same way. Server components are like \`StatelessWidget\` — they receive props (inputs), return JSX (the widget description), and have no mutable state. Client components are like \`StatefulWidget\` — they can hold state, respond to events, and talk to the browser.

The key difference: in Flutter, both types run on the device. In Next.js, server components run on the server (no JS shipped to the browser) and client components run in the browser.

## The boundary between them

In Flutter, you can embed a \`StatefulWidget\` inside a \`StatelessWidget\` no problem. In Next.js, you can embed a client component inside a server component just as easily.

What you *cannot* do is import a server component into a client component. Once you're in client-land, you stay there.

This maps reasonably well to Flutter's \`const\` constructor pattern — a widget declared with \`const\` signals "I won't change", which lets Flutter skip rebuilding it. Server components make a similar promise to Next.js: "I will never re-render in the browser."

## What surprised me

In Flutter, data fetching happens in \`initState\`, a \`FutureBuilder\`, or a state management layer (BLoC, Riverpod, etc.). It's always async and always in a stateful context.

In Next.js 15, server components can be \`async\` functions that \`await\` data directly:

\`\`\`tsx
export default async function ProjectsPage() {
  const projects = await getProjects(projectRepository);
  return <ProjectList projects={projects} />;
}
\`\`\`

No \`FutureBuilder\`, no loading state, no separate data layer — the component *is* the data layer. This felt wrong at first. It felt too simple. After a week it felt obvious.

## The mental model that clicked

Flutter widget: describes the UI for a given configuration.
React server component: describes the UI for a given server-side data fetch.

Both are pure functions of their inputs. Neither holds state. The difference is where those inputs come from — props vs an \`await\`.

Once that clicked, the rest of App Router made sense.
`,
      tags: ["Flutter", "React", "Next.js", "Mobile", "Learning"],
      publishedAt: new Date("2026-07-01"),
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
  console.log("  Blog posts created:", posts.length);

  console.log("\nSeed complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
