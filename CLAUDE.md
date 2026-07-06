# Portfolio Monorepo

npm workspaces monorepo: NestJS backend API (apps/api) + Next.js frontend (apps/web).

## Commands

```bash
npm run dev          # start both apps concurrently
npm run dev:api      # NestJS API only (http://localhost:4000/api)
npm run dev:web      # Next.js only (http://localhost:3000)
npm run build        # production build — both apps, no DB/API needed
npm run lint         # ESLint both apps
npm run db:up        # docker compose up -d (postgres:16)
npm run db:migrate   # prisma migrate dev (inside apps/api)
npm run db:seed      # tsx prisma/seed.ts (inside apps/api)
```

Environment:
- Copy `apps/api/.env.example` to `apps/api/.env` (DATABASE_URL, PORT=4000)
- Copy `apps/web/.env.example` to `apps/web/.env.local` (API_URL=http://localhost:4000)

## Architecture

### apps/api (NestJS 10 + Prisma + PostgreSQL)

Clean architecture, same layer rules as before:

```
src/
  domain/          Entities + repository interfaces. No imports. No NestJS. No Prisma.
  application/     Injectable services (@Injectable). Import domain only + NestJS decorators.
  infrastructure/  PrismaService, Prisma*Repository implementations, feature modules.
                   modules/ = NestJS composition root (replaces the old container.ts).
  presentation/    REST controllers. Thin: call service, throw NotFoundException, return data.
```

DI token pattern (infrastructure/tokens.ts → modules/*.module.ts → application/*.service.ts):
```
Symbol token  →  { provide: TOKEN, useClass: PrismaXxxRepository }  →  @Inject(TOKEN)
```

API: global prefix /api, port 4000, CORS for localhost:3000, Swagger at /api/docs.

Endpoints: GET /api/profile, /api/skill-groups, /api/projects, /api/projects/:slug,
           /api/roadmap, /api/posts, /api/posts/:slug

### apps/web (Next.js 15)

No Prisma. No infrastructure layer. Data comes from the API.

```
src/
  app/             Next.js App Router routes (force-dynamic, call lib/api.ts)
  lib/api.ts       Typed fetch functions. Returns null/[] on error (never throws).
  types.ts         Types mirroring API response shapes (same as api/domain/entities).
  presentation/    React components. Props come from pages, not from API directly.
```

## Layer rules (enforced in review)

api/domain: imports nothing.
api/application: imports domain + NestJS decorators only.
api/infrastructure: imports domain. Only place that imports PrismaService.
api/presentation: imports application services only.
web/lib/api.ts: the only place that calls fetch to the API.
web/presentation: data arrives as props from pages.

## New feature flow (monorepo)

1. Add entity to `apps/api/prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Add domain entity + repository interface in `apps/api/src/domain/`
4. Add Prisma repository in `apps/api/src/infrastructure/repositories/`
5. Add application service in `apps/api/src/application/`
6. Create feature module in `apps/api/src/infrastructure/modules/`
7. Add controller in `apps/api/src/presentation/controllers/`
8. Import the new module in `AppModule`
9. Add fetch function to `apps/web/src/lib/api.ts`
10. Add type to `apps/web/src/types.ts`
11. Use in a Next.js page or component

## AI-driven workflow

- Non-trivial features start with a spec in `docs/specs/`.
- Use `/spec` to draft a spec, `/feature` to implement an approved one.
- Architectural decisions go in `docs/adr/`.
- Definition of done: `npm run lint` and `npm run build` pass, layer rules respected.
