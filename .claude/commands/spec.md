---
description: Draft a feature spec in docs/specs before writing any code
---

Draft a spec for: $ARGUMENTS

1. Read `docs/specs/TEMPLATE.md` and any existing specs in `docs/specs/` for format and prior decisions.
2. Explore the relevant code (`src/domain`, `src/application`, `prisma/schema.prisma`) and, if the feature exists in the old site, the matching content in `legacy/`.
3. Write the spec to `docs/specs/YYYY-MM-DD-<slug>.md` following the template. Be concrete: name the entities, use cases, routes, and schema changes involved.
4. Do NOT implement anything yet. Present the spec summary and open questions, then stop for review.
