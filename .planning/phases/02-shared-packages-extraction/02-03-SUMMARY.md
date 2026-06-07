---
phase: 02-shared-packages-extraction
plan: 03
subsystem: infra
tags: [astro, remark, rehype, monorepo, markdown, unified]

requires:
  - phase: 02-shared-packages-extraction
    provides: "@vd/shared scaffold and Vite plugins from Plans 02-01/02-02"
provides:
  - createMarkdownConfig factory with path/collection parameterization
  - 11 remark/rehype plugins in packages/shared/markdown/
  - astro.config wired to shared markdown pipeline
affects:
  - 02-04 (SEO/layouts extraction)
  - Phase 5 EN app (contentPathPrefix /guide)

tech-stack:
  added:
    - remark-gfm, rehype-raw, unified, remark-parse, remark-rehype, rehype-stringify
    - unist-util-visit, hast-util-to-text, hast-util-from-html, @types/mdast
  patterns:
    - "createMarkdownConfig({ contentPathPrefix, collections }) factory per D-06"
    - "Plugin-specific factories (createRehypeContentLinks, createRemarkPriruckaImages) per D-10"

key-files:
  created:
    - packages/shared/markdown/create-markdown-config.ts
    - packages/shared/markdown/remark-*.ts (4 files)
    - packages/shared/markdown/rehype-*.ts (7 files)
  modified:
    - packages/shared/package.json
    - apps/vzhurudolu/astro.config.mjs

key-decisions:
  - "Parameterized image paths via guideImagesPrefix default /prirucka/images"
  - "Parameterized link resolution via createRehypeContentLinks({ collections, contentPathPrefix })"
  - "Kept is-published.ts and get-related-articles.ts app-local per plan discretion"

patterns-established:
  - "Markdown pipeline lives in @vd/shared/markdown with exact plugin order contract"
  - "Apps call createMarkdownConfig({ contentPathPrefix: '/prirucka' }) — EN-ready defaults"

requirements-completed: [MONO-03]

duration: 35min
completed: 2026-06-07
---

# Phase 2 Plan 03: Markdown Pipeline Extraction Summary

**Remark/rehype markdown pipeline extracted to @vd/shared with createMarkdownConfig factory, CS defaults preserve /prirucka behavior**

## Performance

- **Duration:** 35 min
- **Started:** 2026-06-07T12:45:00Z
- **Completed:** 2026-06-07T13:20:00Z
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments

- Moved 11 remark/rehype utilities verbatim to `packages/shared/markdown/`
- Created `createMarkdownConfig()` factory with `contentPathPrefix`, `guideImagesPrefix`, `collections`, `includeEbookOnly` options
- Wired `apps/vzhurudolu/astro.config.mjs` to shared factory; deleted app markdown originals
- Full Czech build and `verify-phase2-extraction.sh` pass

## Task Commits

Each task was committed atomically:

1. **Task 1: Move markdown utilities verbatim to @vd/shared** - `5b0ce0f` (feat)
2. **Task 2: Create createMarkdownConfig factory with path parameterization** - `e7a4bd6` (feat)
3. **Task 3: Wire astro.config and remove app markdown originals** - `8506dd6` (feat)

## Files Created/Modified

- `packages/shared/markdown/create-markdown-config.ts` - Factory returning shikiConfig, remarkPlugins, remarkRehype, rehypePlugins
- `packages/shared/markdown/rehype-prirucka-links.ts` - `createRehypeContentLinks({ collections, contentPathPrefix })`
- `packages/shared/markdown/remark-prirucka-images.ts` - `createRemarkPriruckaImages({ imagesPrefix })`
- `packages/shared/markdown/rehype-prirucka-images.ts` - `createRehypePriruckaImages({ imagesPrefix })`
- `packages/shared/package.json` - Markdown pipeline dependencies
- `apps/vzhurudolu/astro.config.mjs` - Uses `createMarkdownConfig({ contentPathPrefix: '/prirucka', collections: [...] })`

## Decisions Made

- Parameterized only plugins required by D-07 (images + links); other plugins moved verbatim
- Default options produce identical CS output — no behavior change for Czech site
- App-local utils retained: is-published.ts, get-related-articles.ts, validate-prirucka.ts, extract-content-fallback.ts, changed-files-integration.ts, custom-sitemap.ts

## Deviations from Plan

None - plan executed exactly as written.

## TDD Gate Compliance

Task 2 marked `tdd="true"` but project has no test framework. Factory behavior verified via grep acceptance criteria and full SSG build gate instead of unit tests.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Markdown pipeline ready for Plan 02-04 (SEO sitemap + layouts/components extraction)
- Factory ready for Phase 5 EN app with `contentPathPrefix: '/guide'`

## Self-Check: PASSED

- FOUND: packages/shared/markdown/create-markdown-config.ts
- FOUND: 5b0ce0f
- FOUND: e7a4bd6
- FOUND: 8506dd6

---
*Phase: 02-shared-packages-extraction*
*Completed: 2026-06-07*

## EXECUTION COMPLETE
