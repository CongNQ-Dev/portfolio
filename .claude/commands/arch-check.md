---
description: Audit the codebase for clean-architecture layer violations
---

Check every file under `src/` against the layer rules in CLAUDE.md:

1. `src/domain/**` must not import from `application`, `infrastructure`, `presentation`, `@prisma/client`, `react`, or `next`.
2. `src/application/**` must import only from `src/domain` (and stdlib).
3. `@prisma/client` / `src/infrastructure/prisma` imports must appear only under `src/infrastructure/`.
4. `src/presentation/**` must not import repositories, use cases, or the container — data comes via props.
5. Only `src/app/**` may import `src/infrastructure/container.ts`.

Use grep over import statements to find violations. Report each violation as `file:line — rule broken — suggested fix`. If everything is clean, say so explicitly.
