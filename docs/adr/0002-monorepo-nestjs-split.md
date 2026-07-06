# ADR 0002: Monorepo split — NestJS API + Next.js frontend

- **Date:** 2026-07-06
- **Status:** accepted
- **Supersedes:** portions of ADR 0001 (layer structure preserved; hosting changes)

## Context

The single Next.js app in ADR 0001 was a useful learning step — it demonstrated
clean architecture without the complexity of a separate API server. The next
learning goal is fullstack separation: building and consuming a REST API, using
NestJS dependency injection, and understanding HTTP as an explicit boundary.

## Decision

Restructure as an **npm workspaces monorepo** with two apps:

- `apps/api` — NestJS 10 + Prisma. Owns the database, exposes REST endpoints
  under the global prefix `/api`, and serves Swagger docs at `/api/docs`.
- `apps/web` — Next.js 15. No Prisma. Fetches from the API via `src/lib/api.ts`.

The clean architecture layer structure from ADR 0001 is preserved inside `apps/api`.
NestJS feature modules in `src/infrastructure/modules/` replace the hand-rolled
`container.ts` composition root — NestJS DI IS the composition root.

The web app introduces two new files:
- `src/types.ts` — plain TypeScript interfaces mirroring the API's domain entities.
  Duplicated intentionally at this scale (the apps are separate deployable units).
  When synchronisation becomes a burden, extract to `packages/types/`.
- `src/lib/api.ts` — typed fetch wrappers. The single place that knows the API URL.
  Returns `null` / `[]` on error so pages degrade gracefully.

## Consequences

- More moving parts: two dev servers, explicit CORS config, an API_URL env var.
- API contract is now explicit: changes to domain entities must be reflected in
  `apps/web/src/types.ts` (a manual sync point — the future `packages/types`
  package will automate this).
- `npm run build` works without a running API because all pages use
  `export const dynamic = 'force-dynamic'` and `lib/api.ts` catches fetch errors.
- `apps/api` is independently deployable to any Node host.
- Swagger UI at `/api/docs` makes learning the API interactive.
