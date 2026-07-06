# Portfolio

Next.js 15 (App Router) portfolio site with a PostgreSQL backend, migrated from the static site kept in `legacy/`.

## Commands

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build — run before committing significant changes
npm run lint         # ESLint
npm run db:up        # start Postgres via docker compose
npm run db:migrate   # prisma migrate dev (apply schema changes)
npm run db:seed      # seed database (prisma/seed.ts)
```

Environment: copy `.env.example` to `.env`. `DATABASE_URL` must point to the docker Postgres before any db command.

## Architecture — Clean Architecture, dependencies point inward

```
src/
  domain/          # entities + repository interfaces. No imports from other layers, no Prisma, no React.
  application/     # use cases. Imports domain only. One file per use case (getX.ts).
  infrastructure/  # Prisma client, Prisma*Repository implementations, container.ts (DI wiring).
  presentation/    # React components. No direct Prisma/repository access — data comes in via props.
  app/             # Next.js App Router. Server components call use cases via infrastructure/container.ts.
```

Layer rules (enforced in review):
- `domain` imports nothing from `application`, `infrastructure`, or `presentation`.
- `application` imports only `domain`.
- `presentation` components are presentational — data arrives as props from `app/` pages.
- Prisma appears **only** in `src/infrastructure/`.

## Conventions

- Data model lives in `prisma/schema.prisma` — it is the single source of truth. Schema change flow: edit schema → `npm run db:migrate` → update domain entity → repository → use case → UI.
- New feature flow: domain entity + repository interface → Prisma repository → register in `container.ts` → use case → server component/page.
- `legacy/` is the frozen static site used as the visual/content reference for the migration. Never edit it; read it to match content and styling.
- Root-level `*.html`, `styles.css`, `icons/`, `icon-*` files are legacy leftovers pending cleanup — don't build on them.
- Styling: Tailwind CSS 4 (via PostCSS). Markdown rendering uses `marked`.

## AI-driven workflow

- Non-trivial features start with a spec in `docs/specs/` (template: `docs/specs/TEMPLATE.md`). Write the spec, get it approved, then implement.
- Use `/spec` to draft a spec, `/feature` to implement an approved one.
- Architectural decisions worth remembering go in `docs/adr/`.
- Definition of done: `npm run lint` and `npm run build` pass, layer rules respected, spec checklist items ticked.
