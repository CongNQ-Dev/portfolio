# Portfolio — Next.js 15 + Clean Architecture + PostgreSQL

A fully-functional portfolio site migrated from static HTML to a production-quality
Next.js application. The goal is not just a working site — it is a codebase you can
study and extend as you learn fullstack web development.

---

## Architecture diagram

```
Browser
  |
  v
Next.js 15 (App Router, TypeScript strict)
  |
  +-- src/app/              Routes — thin: call use cases, render components
  |     page.tsx              /  home
  |     roadmap/page.tsx      /roadmap
  |     blog/page.tsx         /blog
  |     blog/[slug]/page.tsx  /blog/:slug
  |     cv/page.tsx           /cv
  |
  +-- src/presentation/     React components (server by default, 'use client' only where needed)
  |     Hero, SkillsSection, AiWorkflowSection   — server components (no state)
  |     ProjectsSection, ProjectModal            — client components (useState)
  |     HeroCounter, RoadmapTimeline             — client components (useEffect/useState)
  |
  +-- src/application/      Use cases — pure functions, no framework imports
  |     getProfile           getSkillGroups      getProjects
  |     getRoadmap           getPublishedPosts    getPostBySlug
  |
  +-- src/domain/           Entities + repository interfaces — zero dependencies
  |     entities/  Profile  SkillGroup  Project  RoadmapPhase  Post
  |     repositories/  IProfileRepository  ISkillGroupRepository  ...
  |
  +-- src/infrastructure/   Prisma implementations + composition root
        prisma/client.ts        Singleton PrismaClient
        repositories/           PrismaProfileRepository, PrismaProjectRepository, ...
        container.ts            Wires interfaces → implementations (composition root)
```

### The Dependency Rule

Arrows show which layer is allowed to import from which:

```
app/  →  application/  →  domain/
          ↑
     infrastructure/  →  domain/
          ↑
     presentation/    →  domain/
```

**domain/** imports from nowhere. Everything else can import from domain.
**application/** imports only from domain. Never from infrastructure or presentation.
**infrastructure/** can import from domain. It is the only layer that imports Prisma.
**presentation/** can import from domain (for entity types as props).
**app/** imports from application (use cases) and infrastructure (the container).

If you ever find yourself importing `PrismaClient` inside `src/application/` or
`src/domain/`, something has gone wrong — the dependency rule is violated.

---

## How data flows for a single request

Example: loading the home page (`/`)

```
1. Browser  →  GET /

2. Next.js routes to  src/app/page.tsx  (server component, async function)

3. page.tsx calls:
     const projects = await getProjects(projectRepository)
                                 ^              ^
                          application/    infrastructure/container.ts
                          use case        exports PrismaProjectRepository instance

4. getProjects(repo) calls  repo.findAll()
   ─ this is just an interface call; page.tsx never knows it's Prisma

5. PrismaProjectRepository.findAll() calls  prisma.project.findMany()
   ─ this is the one place Prisma is used

6. Prisma sends SQL to PostgreSQL (running in Docker)

7. PostgreSQL returns rows
   └→ Prisma maps rows to a JS object
   └→ PrismaProjectRepository maps Prisma object → domain Project entity
   └→ getProjects returns Project[]
   └→ page.tsx passes Project[] to <ProjectsSection projects={projects} />
   └→ React renders HTML
   └→ Next.js streams HTML to browser
```

---

## Setup — running locally in 4 steps

### Prerequisites

- Node.js 20+ (`node -v`)
- Docker Desktop running (`docker info`)
- npm (included with Node)

### Step 1 — Start PostgreSQL

```bash
npm run db:up
# runs: docker compose up -d
# Starts postgres:16 on localhost:5432 with db=portfolio, user=portfolio_user
```

Check it started: `docker ps` — you should see `portfolio_postgres`.

### Step 2 — Apply the schema

```bash
npm run db:migrate
# runs: prisma migrate dev
# Creates all tables in the database from prisma/schema.prisma
# Generates the Prisma client (TypeScript types for your DB)
```

On first run it will ask for a migration name — type `init` and press Enter.

### Step 3 — Seed real data

```bash
npm run db:seed
# runs: tsx prisma/seed.ts
# Inserts the profile, all 9 projects, 7 skill groups, 6 roadmap phases,
# and 2 sample blog posts into the database
```

### Step 4 — Run the dev server

```bash
npm run dev
# Starts Next.js on http://localhost:3000
```

Open http://localhost:3000 — the full portfolio loads from the database.

---

## Useful commands

| Command             | What it does                                        |
|---------------------|-----------------------------------------------------|
| `npm run dev`       | Start dev server with HMR on port 3000              |
| `npm run build`     | Production build (works without a running DB)       |
| `npm run lint`      | ESLint check                                        |
| `npm run db:up`     | Start Docker Postgres container                     |
| `npm run db:migrate`| Apply schema changes and regenerate Prisma client   |
| `npm run db:seed`   | Wipe and re-seed all data from `prisma/seed.ts`     |
| `npx prisma studio` | Open Prisma's built-in database GUI (localhost:5555) |

---

## Project structure

```
portfolio/
├── legacy/                 Original static HTML site (reference only)
├── public/
│   ├── icons/              Tech stack SVG icons
│   └── icon-*.{webp,svg,…} Project app icons
├── prisma/
│   ├── schema.prisma       Database schema — edit this to add/change tables
│   └── seed.ts             Seeding script with all real content
├── src/
│   ├── domain/
│   │   ├── entities/       Plain TypeScript interfaces — the "shape" of your data
│   │   └── repositories/   Contracts (interfaces) for data access
│   ├── application/
│   │   └── usecases/       Pure functions that orchestrate data retrieval
│   ├── infrastructure/
│   │   ├── prisma/client.ts  PrismaClient singleton
│   │   ├── repositories/     Prisma implementations of domain interfaces
│   │   └── container.ts      Dependency injection — wires everything together
│   ├── presentation/
│   │   └── components/     React components (server by default)
│   └── app/                Next.js App Router pages
├── docker-compose.yml      PostgreSQL service definition
├── .env                    Local environment variables (not committed)
├── .env.example            Template — copy to .env
└── README.md               This file
```

---

## Why `export const dynamic = "force-dynamic"`?

When Next.js builds your app (`npm run build`), it tries to pre-render every page
at build time. For pages that call the database, this fails because there is no
database running in CI.

`export const dynamic = "force-dynamic"` tells Next.js: "Skip pre-rendering. Render
this page on every request at runtime." It is the correct setting for any page
whose content changes (blog posts, projects updated via an admin panel, etc.).

For pages whose content never changes you'd use `export const dynamic = "force-static"`
or just leave it out (static is the default).

---

## What to learn next from this codebase

This codebase is deliberately a starting point. Here are concrete extensions:

### 1. Authentication (most impactful next step)

Add NextAuth.js (`next-auth`). Create an `/admin` route group protected by session
middleware. This teaches:
- Cookies and JWTs
- Next.js middleware (src/middleware.ts)
- Role-based access control (RBAC)

### 2. Admin CRUD for blog posts

Once you have auth, add:
- `GET/POST /api/posts` — list and create posts
- `PUT/DELETE /api/posts/[id]` — update and delete
- A React form using controlled components + server actions

This teaches: API routes, server actions, optimistic UI updates, form handling.

### 3. Unit and integration tests

Install `vitest` and `@testing-library/react`. Write:
- Unit tests for each use case (mock the repository interface — no DB needed)
- Component tests for `ProjectModal` (render it, click close, check state)
- Integration tests for API routes (use a test database)

This is where the clean architecture pays off: the use cases are pure functions —
passing a mock repository is trivial.

### 4. Deployment to Vercel + managed Postgres

- Push to GitHub
- Connect repository to Vercel
- Add a Vercel Postgres database (or Neon, Supabase, Railway)
- Set `DATABASE_URL` in Vercel environment variables
- `prisma migrate deploy` in the build step

### 5. Real-time features

Add WebSockets or Server-Sent Events for a live visitor counter, a "who is online"
presence indicator, or live comments on blog posts. This teaches:
- Next.js Route Handlers (`app/api/`)
- The difference between polling and push
- State synchronisation across tabs

### 6. HTML sanitisation for user content

The blog detail page uses `dangerouslySetInnerHTML` with Markdown-generated HTML.
If you ever allow user-submitted content (comments, guest posts), add `isomorphic-dompurify`
or `sanitize-html` to prevent XSS attacks.

### 7. Search

Add full-text search for projects and blog posts using PostgreSQL's built-in
`tsvector`/`tsquery` feature (zero extra infrastructure), or integrate Algolia
for a managed search service.

---

## AI-driven development workflow

This project is set up for Claude Code with custom slash commands and a subagent.

### Where to put skills (slash commands)

| Location | Scope | When to use |
|---|---|---|
| `.claude/commands/*.md` | This project only | Project-specific workflows ← already set up here |
| `~/.claude/commands/*.md` | All your projects | Personal shortcuts you want everywhere |

Each `.md` file becomes a `/filename` command. To add your own:

```markdown
<!-- .claude/commands/my-command.md -->
---
description: One line describing what this does
---

Instructions for Claude. $ARGUMENTS is replaced with whatever you type after the command name.
```

### Commands already set up

| Command | What it does |
|---|---|
| `/spec <feature>` | Drafts a spec in `docs/specs/` — stops for your review before writing code |
| `/feature <spec>` | Implements an approved spec inside-out through the layers |
| `/arch-check` | Greps import statements for clean-architecture violations |

### The workflow

```
/spec → review → /feature → /arch-check → commit
```

**Example:**
```
/spec add contact form with email notification
# Claude writes docs/specs/2026-07-06-contact-form.md and stops

/feature docs/specs/2026-07-06-contact-form.md
# Claude works: schema → domain → infrastructure → application → presentation → app
# Runs npm run lint + npm run build when done

/arch-check
# Confirms no layer violations

git add -p && git commit
```

### Subagents

`.claude/agents/arch-reviewer.md` defines a subagent that reviews diffs for layer violations. Claude Code loads it automatically — no manual invocation needed.

### Spec template

Every feature starts from `docs/specs/TEMPLATE.md`:
- Problem statement
- In/out of scope
- Data model, domain, application, presentation changes
- Acceptance checklist

Approved specs live in `docs/specs/`. Architecture decisions go in `docs/adr/`.

---

## GitHub — two accounts

This repo belongs to `CongNQ-Dev`. Switch before pushing:

```bash
gh auth switch -u CongNQ-Dev
git push origin main
```

For fully automatic per-repo switching set up SSH keys with host aliases in `~/.ssh/config`.

---

## Design system reference

All colours are CSS custom properties defined in `src/app/globals.css`:

| Token              | Value       | Usage                         |
|--------------------|-------------|-------------------------------|
| `--color-black`    | `#111111`   | Page background               |
| `--color-black2`   | `#1a1a1a`   | Card backgrounds              |
| `--color-orange`   | `#f5a623`   | Accent, CTAs, highlights      |
| `--color-gray`     | `#888888`   | Secondary text                |
| `--color-lightgray`| `#cccccc`   | Body text on dark backgrounds |

Card border: `rgba(255,255,255,0.08)` → hover: `rgba(245,166,35,0.3)`

Typography: Inter (loaded via `next/font/google` — self-hosted, zero extra request)
