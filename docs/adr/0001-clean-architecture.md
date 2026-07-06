# ADR 0001: Clean architecture over a flat Next.js layout

- **Date:** 2026-07-06
- **Status:** accepted

## Context

The portfolio is migrating from a static HTML site (`legacy/`) to Next.js 15 with a PostgreSQL backend. Content (profile, skills, projects, posts, roadmap) becomes database-driven and will grow features over time (e.g. admin editing, blog).

## Decision

Structure `src/` as clean architecture layers — `domain`, `application`, `infrastructure`, `presentation`, with `app/` as the framework entry point and `infrastructure/container.ts` doing manual dependency wiring. Prisma is confined to infrastructure behind repository interfaces defined in domain.

## Consequences

- More files per feature (entity, interface, repository, use case) than a flat layout — the trade-off is testability and a swappable persistence layer.
- AI agents get a mechanical, verifiable recipe for features (see `/feature` command), and violations are grep-detectable (see `/arch-check`).
