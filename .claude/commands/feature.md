---
description: Implement an approved spec end-to-end through the clean architecture layers
---

Implement the spec: $ARGUMENTS (a file in `docs/specs/`, or a short description if no spec exists — in that case confirm scope first).

Work inside-out through the layers, in this order:

1. **Schema** — if the data model changes: edit `prisma/schema.prisma`, run `npm run db:migrate`, update `prisma/seed.ts` if seed data is affected.
2. **Domain** — entity in `src/domain/entities/`, repository interface in `src/domain/repositories/`. No framework imports.
3. **Infrastructure** — `Prisma<Entity>Repository` in `src/infrastructure/repositories/`, register it in `src/infrastructure/container.ts`.
4. **Application** — one use case per file in `src/application/usecases/`.
5. **Presentation + app** — presentational components in `src/presentation/components/` (props in, no data fetching); wire data in the `src/app/` server component/page via the container.

Then verify: `npm run lint` and `npm run build` must pass. Tick the acceptance checklist in the spec and report what changed per layer.
