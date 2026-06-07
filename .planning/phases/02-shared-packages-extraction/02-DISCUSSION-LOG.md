# Phase 2: Shared Packages Extraction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-07
**Phase:** 02-shared-packages-extraction
**Areas discussed:** package granularity, extraction scope, path parameterization, build strategy, migration discipline

---

## Package Granularity

| Option | Description | Selected |
|--------|-------------|----------|
| Single `@vd/shared` | One package, internal folders + exports map | ✓ |
| Granular (`@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`, …) | Multiple packages, clearer turbo graph | |
| Hybrid (2–3 packages) | Split markdown+plugins vs UI | |

**User's choice:** Advisor recommendation accepted — single `@vd/shared`
**Notes:** Only CS app builds today; granular split premature until EN app (Phase 5).

---

## Extraction Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Pipeline + plugins + layouts + SEO | Full ROADMAP scope, move-only | ✓ |
| Utils/plugins only, layouts in Phase 5 | Smaller Phase 2 | |
| Everything including pages/routes | Too broad — scope creep | |

**User's choice:** Pipeline + plugins + layouts + SEO (ROADMAP-aligned)
**Notes:** Content and routes stay app-local.

---

## Path Parameterization (`/prirucka` vs `/guide`)

| Option | Description | Selected |
|--------|-------------|----------|
| Factory now, CS default `/prirucka` | Prepare EN without behavior change | ✓ |
| Hardcode CS paths, parameterize in Phase 5 | Simpler now, second migration later | |

**User's choice:** Factory now
**Notes:** Avoids PITFALLS.md hardcoded `/prirucka` trap.

---

## Build Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Source exports + `vite.ssr.noExternal` | Astro 4 consumes TS directly | ✓ |
| tsup/tsc compile to `dist/` | Explicit build step, turbo `^build` | |

**User's choice:** Source exports
**Notes:** Matches STACK.md recommendation for Astro components.

---

## Migration Discipline

| Option | Description | Selected |
|--------|-------------|----------|
| Strict move-only | No behavior changes; parity in Phase 3 | ✓ |
| Move + allowed cleanup | Refactor while extracting | |

**User's choice:** Strict move-only
**Notes:** User agreed via "souhlas" to full advisor package.

---

## Claude's Discretion

- Exact exports map structure
- Extraction plan ordering
- Whether `is-published.ts` stays app-local
- `siteConfig` prop shape for shared layouts

## Deferred Ideas

- Granular package split, content pairing, EN scaffold, shared static assets, tsup compile — see CONTEXT.md `<deferred>`
