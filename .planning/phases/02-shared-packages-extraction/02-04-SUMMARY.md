---
phase: 02-shared-packages-extraction
plan: 04
subsystem: infra
tags: [astro, monorepo, sitemap, layouts, seo]

requires:
  - phase: 02-shared-packages-extraction
    provides: "@vd/shared scaffold, Vite plugins, markdown pipeline from Plans 02-01–02-03"
provides:
  - createCustomSitemap({ site }) factory in packages/shared/seo/
  - BaseLayout, Header, Navigation, Footer, ArticleHeader, ArticleFooter in @vd/shared
  - ~40 page routes importing layout/chrome from @vd/shared
affects:
  - 02-05 (cleanup, dep dedupe, full verify gate)
  - Phase 5 EN app (shared layouts with siteConfig refactor deferred)

tech-stack:
  added: []
  patterns:
    - "createCustomSitemap({ site }) factory per D-06 — app passes defineConfig.site"
    - "Move-only layout extraction per D-10 — CS branding strings unchanged"
    - "ArticleFooter CategoryConfig from @vd/shared/types per D-05"

key-files:
  created:
    - packages/shared/seo/custom-sitemap.ts
    - packages/shared/layouts/BaseLayout.astro
    - packages/shared/components/Header.astro
    - packages/shared/components/Navigation.astro
    - packages/shared/components/Footer.astro
    - packages/shared/components/ArticleHeader.astro
    - packages/shared/components/ArticleFooter.astro
  modified:
    - apps/vzhurudolu/astro.config.mjs
    - apps/vzhurudolu/src/pages/**/*.astro (~40 files)

key-decisions:
  - "Sitemap site URL parameterized via createCustomSitemap — CS app passes https://www.vzhurudolu.cz"
  - "ArticleFooter imports CategoryConfig from @vd/shared/types; categories data stays app-local"
  - "is-published.ts and get-related-articles.ts remain app-local per plan discretion"

patterns-established:
  - "Pages import layout/chrome via @vd/shared/layouts/* and @vd/shared/components/*"
  - "Header retains relative ./Navigation.astro import inside shared package"

requirements-completed: [MONO-03]

duration: 25min
completed: 2026-06-07
---

# Phase 2 Plan 04: SEO Sitemap + Layouts Extraction Summary

**createCustomSitemap factory and six layout/chrome .astro components extracted to @vd/shared; ~40 CS page routes compile with shared imports**

## Performance

- **Duration:** 25 min
- **Started:** 2026-06-07T14:45:00Z
- **Completed:** 2026-06-07T15:10:00Z
- **Tasks:** 3
- **Files modified:** 49

## Accomplishments

- Extracted custom sitemap integration to `packages/shared/seo/custom-sitemap.ts` with `createCustomSitemap({ site })`
- Copied BaseLayout + five chrome components to `@vd/shared`; ArticleFooter uses `CategoryConfig` from shared types
- Migrated ~40 page routes to `@vd/shared` imports; removed app-local layout/component originals
- Full turbo build and `verify-phase2-extraction.sh` pass; sitemap.xml generated (871 URLs)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract custom sitemap with createCustomSitemap factory** - `8c538d5` (feat)
2. **Task 2: Move layout and chrome components to @vd/shared** - `80c1a80` (feat)
3. **Task 3: Update page imports and remove app originals** - `1457360` (feat)

## Files Created/Modified

- `packages/shared/seo/custom-sitemap.ts` - Parameterized AstroIntegration replacing hardcoded CS origin
- `packages/shared/layouts/BaseLayout.astro` - Shared page shell with OG/meta slots
- `packages/shared/components/{Header,Navigation,Footer,ArticleHeader,ArticleFooter}.astro` - Site chrome
- `apps/vzhurudolu/astro.config.mjs` - Uses `createCustomSitemap({ site: 'https://www.vzhurudolu.cz' })`
- `apps/vzhurudolu/src/pages/**/*.astro` - Imports switched to `@vd/shared/*`

## Decisions Made

- Kept CS hardcoded branding strings in shared components (siteConfig refactor deferred to Phase 5)
- categories data array passed as prop from pages; only the type moved to shared package

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Perl batch replace stripped `@vd` from import paths**
- **Found during:** Task 3 (Update page imports)
- **Issue:** Perl `s///` replacement interpolated `@vd` as empty array, producing `from '/shared/...'` imports
- **Fix:** Second pass escaped `@` as `\@vd` in replacement strings
- **Files modified:** ~40 page `.astro` files under `apps/vzhurudolu/src/pages/`
- **Verification:** `grep` gate shows 0 stale layout imports; turbo build passes
- **Committed in:** `1457360` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Fix required for build correctness; no scope change.

## Issues Encountered

None beyond the Perl interpolation bug (resolved inline).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 02-05 ready: cleanup, dep dedupe, extended verify gate
- Shared presentation layer complete for CS app; EN app can reuse layouts in Phase 5 after siteConfig parameterization

## Self-Check: PASSED

- FOUND: packages/shared/seo/custom-sitemap.ts
- FOUND: packages/shared/layouts/BaseLayout.astro
- FOUND: packages/shared/components/ArticleFooter.astro
- FOUND: commits 8c538d5, 80c1a80, 1457360

---
*Phase: 02-shared-packages-extraction*
*Completed: 2026-06-07*

## EXECUTION COMPLETE
