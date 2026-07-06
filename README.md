# Portfolio — Monorepo (Next.js + NestJS + PostgreSQL)

A fullstack portfolio site structured as an **npm workspaces monorepo** with a
dedicated NestJS backend API and a Next.js frontend that consumes it. The goal is
not just a working site — it is a codebase you can study and extend as you learn
fullstack web development.

---

## Architecture diagram

```
Browser
  |
  v
apps/web  (Next.js 15, App Router, TypeScript strict)
  |
  +-- src/app/              Routes — thin: call api.ts, render components
  +-- src/lib/api.ts        Typed fetch functions  → NestJS API
  +-- src/types.ts          Types mirroring API response shapes
  |
  v  (HTTP fetch, JSON)
apps/api  (NestJS 10, TypeScript strict)
  |
  +-- src/presentation/     REST controllers (GET /api/*)
  +-- src/application/      Injectable services (use cases)
  +-- src/infrastructure/   PrismaService, repositories, NestJS modules
  +-- src/domain/           Entities + repository interfaces (zero deps)
  |
  v
PostgreSQL (Docker, port 5433)
```

### Why the split?

**Separation of concerns.** Next.js is a rendering concern; NestJS is a data concern.
Mixing them creates coupling that makes both harder to change independently.

**Independent deployment.** The API deploys to any Node server; the frontend deploys
to Vercel. They scale independently.

**Learning.** Building and consuming a REST API teaches you to think about API contracts,
HTTP status codes, and error handling as explicit, first-class concerns.

### How NestJS DI replaces container.ts

NestJS wires repository interfaces to their Prisma implementations declaratively via
**feature modules** in `apps/api/src/infrastructure/modules/`:

```typescript
// projects.module.ts
@Module({
  providers: [
    { provide: PROJECT_REPOSITORY, useClass: PrismaProjectRepository },
    ProjectsService,
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
```

NestJS manages instantiation, lifecycle, and scope. The `ProjectsService` only
knows about `IProjectRepository` — it never imports `PrismaProjectRepository`
directly. Swapping the database means changing one line in the module.

---

## Setup — running locally

### Prerequisites

- Node.js 20+, Docker Desktop, npm

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Start PostgreSQL

```bash
npm run db:up
# Postgres is exposed on localhost:5433 (non-default port to avoid conflicts)
```

### Step 3 — Configure environment

```bash
cp apps/api/.env.example apps/api/.env
# Defaults match docker-compose.yml — no edits needed for local dev
```

### Step 4 — Apply the schema and seed data

```bash
npm run db:migrate   # runs prisma migrate dev
npm run db:seed      # inserts profile, projects, skills, roadmap, blog posts
```

### Step 5 — Run both apps

```bash
npm run dev
# NestJS API   → http://localhost:4000/api
# Swagger docs → http://localhost:4000/api/docs
# Next.js web  → http://localhost:3000 (moves to :3001 if 3000 is in use)
```

> **Note:** If you see a `DATABASE_URL` connection error on first start, run
> `npm install` from the repo root to ensure the Prisma client is generated.
> The `PrismaService` force-loads `apps/api/.env` so workspace CWD issues
> don't interfere.

---

## Commands reference

| Command              | What it does                                              |
|----------------------|-----------------------------------------------------------|
| `npm run dev`        | Start both apps concurrently (recommended)                |
| `npm run dev:api`    | Start NestJS API only (port 4000, watch mode)             |
| `npm run dev:web`    | Start Next.js frontend only (port 3000, HMR)              |
| `npm run build`      | Production build for both (no DB or API required)         |
| `npm run lint`       | ESLint both apps                                          |
| `npm run db:up`      | Start Docker Postgres                                     |
| `npm run db:migrate` | Apply schema changes                                      |
| `npm run db:seed`    | Wipe and re-seed all data                                 |
| `npm run db:studio`  | Open Prisma Studio at http://localhost:5555               |

---

## API endpoints

Global prefix `/api`, port 4000. Interactive docs: http://localhost:4000/api/docs

| Method | Path                  | Description                             |
|--------|-----------------------|-----------------------------------------|
| GET    | `/api/profile`        | Portfolio owner profile                 |
| GET    | `/api/skill-groups`   | All skill groups with nested skills     |
| GET    | `/api/projects`       | All projects in display order           |
| GET    | `/api/projects/:slug` | Single project by slug                  |
| GET    | `/api/roadmap`        | All roadmap phases with resources       |
| GET    | `/api/posts`          | Published blog posts (newest first)     |
| GET    | `/api/posts/:slug`    | Single post (404 if not found/draft)    |

---

## Project structure

```
portfolio/
├── apps/
│   ├── api/                      NestJS backend (port 4000)
│   │   ├── prisma/
│   │   │   ├── schema.prisma     Database schema
│   │   │   └── seed.ts           Seed script
│   │   └── src/
│   │       ├── domain/           Entities + repository interfaces (zero deps)
│   │       ├── application/      Injectable services (use cases)
│   │       ├── infrastructure/
│   │       │   ├── prisma/       PrismaService (extends PrismaClient)
│   │       │   ├── repositories/ Prisma implementations
│   │       │   ├── modules/      Feature modules = NestJS composition root
│   │       │   └── tokens.ts     DI Symbol tokens
│   │       ├── presentation/
│   │       │   └── controllers/  REST controllers (thin)
│   │       ├── app.module.ts
│   │       └── main.ts           Bootstrap (CORS, Swagger, ValidationPipe)
│   │
│   └── web/                      Next.js frontend (port 3000)
│       └── src/
│           ├── app/              App Router pages
│           ├── presentation/
│           │   └── components/   React components
│           ├── lib/api.ts        Typed fetch functions
│           └── types.ts          Types mirroring API shapes
│
├── docker-compose.yml            PostgreSQL (port 5433)
├── package.json                  Workspace root + shared scripts
└── docs/                         Specs and architecture decision records
```

---

## What to learn next

### 1. Auth guards + blog CRUD

Add `@nestjs/passport` + JWT strategy. Protect write endpoints with
`@UseGuards(JwtAuthGuard)`. Then add `POST/PATCH/DELETE /api/posts`. Teaches NestJS
Guards, JWT, DTO validation with `class-validator`.

### 2. DTO validation

Create DTO classes (e.g. `CreatePostDto`) with `@IsString()`, `@IsArray()` decorators.
The global `ValidationPipe` rejects invalid input automatically. Teaches the difference
between a DTO (HTTP layer) and a domain entity (business logic layer).

### 3. Shared types package

When `apps/web/src/types.ts` and `apps/api/src/domain/entities/` need to stay in sync,
extract to `packages/types/` with its own `package.json`. Both workspaces import from
`@portfolio/types`. TypeScript catches mismatches at compile time.

### 4. Unit testing the application layer

The application services only depend on repository tokens. Pass a mock:
```typescript
const mockRepo = { find: jest.fn().mockResolvedValue(fakeProfile) };
const service = new ProfileService(mockRepo);
```
No database, no HTTP — pure business logic testing.

### 5. End-to-end tests

Use `@nestjs/testing` to spin up a test app with a test database. Call actual HTTP
endpoints and assert on JSON with Supertest. Teaches `TestingModule`, database seeding,
and teardown strategies.

### 6. Deployment

Deploy the API to Railway, Render, or Fly.io. Deploy the frontend to Vercel.
Set `API_URL` in Vercel environment variables. Use `prisma migrate deploy` (not
`migrate dev`) in the API build step.

---

## Design system

Colours are CSS custom properties in `apps/web/src/app/globals.css`:

| Token               | Value     | Usage                         |
|---------------------|-----------|-------------------------------|
| `--color-black`     | `#111111` | Page background               |
| `--color-black2`    | `#1a1a1a` | Card backgrounds              |
| `--color-orange`    | `#f5a623` | Accent, CTAs, highlights      |
| `--color-gray`      | `#888888` | Secondary text                |
| `--color-lightgray` | `#cccccc` | Body text on dark backgrounds |
