---
phase: 05-english-app-scaffold
plan: 02
subsystem: infra
tags: [astro, monorepo, content-collections]
requires:
  - phase: 05-english-app-scaffold
    provides: "SiteConfig types from 05-01"
provides:
  - Buildable @vd/michalek-dev Astro 4 app
  - blog+guide collections with stub content
  - site.config.ts and VD CSS public assets
affects: [05-03, 05-04, 05-05]
tech-stack:
  added: [astro@4.16.19]
  patterns: ["createMarkdownConfig contentPathPrefix /guide", "independent EN public assets copy"]
key-files:
  created:
    - apps/michalek-dev/astro.config.mjs
    - apps/michalek-dev/src/site.config.ts
    - apps/michalek-dev/src/content/config.ts
    - apps/michalek-dev/src/content/blog/hello-blog.md
    - apps/michalek-dev/src/content/guide/hello-guide.md
  modified:
    - apps/michalek-dev/package.json
    - package.json
key-decisions:
  - "Copied VD CSS/fonts/favicon from vzhurudolu public (packages/shared/static not available)"
  - "Omitted prirucka-images and changedFilesIntegration from EN config"
requirements-completed: [EN-01, EN-06]
duration: 12min
completed: 2026-06-09
---

# Phase 5 Plan 02: EN App Scaffold Summary

**Independent Astro 4 SSG app at apps/michalek-dev builds with blog+guide collections, EN siteConfig, and lean toolchain (no jQuery/Disqus).**

## Performance

- **Duration:** 12 min
- **Tasks:** 2/2
- **Files modified:** 209 (incl. copied CSS assets)

## Accomplishments

- Full `@vd/michalek-dev` package with astro 4.16.19 and `@vd/shared` wiring
- `createMarkdownConfig({ contentPathPrefix: '/guide', collections: ['blog', 'guide'] })`
- EN `site.config.ts` with Articles/Martin nav and minimal footer mode
- Stub articles `hello-blog` and `hello-guide`
- Root `build:michalek-dev` script added

## Task Commits

1. **Tasks 1–2: package, config, collections, assets** — `69ba927` (feat)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing functionality] EN dist may lack `_astro/` directory**
- **Found during:** Task 2 verify
- **Issue:** Lean static pages without client bundles do not emit `dist/_astro/` (unlike CS app)
- **Fix:** Phase 5 verify script checks `dist/index.html` and route files instead of `_astro` for EN
- **Files modified:** `scripts/verify-phase5-english-scaffold.sh` (Plan 05-05)

## Self-Check: PASSED

- `apps/michalek-dev/astro.config.mjs` exists
- Commit `69ba927` exists
