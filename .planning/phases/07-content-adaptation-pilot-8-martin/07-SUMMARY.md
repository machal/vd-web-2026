---
phase: 07-content-adaptation-pilot-8-martin
plan: execution
subsystem: content
tags: [michalek-dev, adaptation, i18n, pilots]

requires:
  - phase: 06-content-pairing-i18n-seo
    provides: CONTENT_PAIRS manifest, EN stub routes, LanguageSwitch wiring
provides:
  - 8 fully adapted EN pilot articles (5 guide + 3 blog)
  - Homepage start-here curated links
  - Guide author bylines linking to /martin
  - Shared pilot WebP assets on EN app
affects: [08-launch-polish]

tech-stack:
  added: []
  patterns: [attribution footer linking CS original, editorial EN adaptation not literal translation]

key-files:
  created:
    - apps/michalek-dev/public/prirucka/images/*.webp
    - .planning/phases/07-content-adaptation-pilot-8-martin/07-VERIFICATION.md
  modified:
    - apps/michalek-dev/src/content/guide/*.md
    - apps/michalek-dev/src/content/blog/*.md
    - apps/michalek-dev/src/pages/index.astro
    - apps/michalek-dev/src/pages/guide/[slug].astro
    - apps/michalek-dev/src/content/config.ts

key-decisions:
  - "Executed from 07-CONTEXT.md — PLAN.md files not present on disk at execution time"
  - "Attribution as markdown footer linking vzhurudolu.cz; author via ArticleHeader + optional guide schema field"
  - "/martin EN-05 verified from Phase 5 — no rewrite"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, EN-05]

duration: 45min
completed: 2026-06-09
---

# Phase 7: Content Adaptation — Pilot 8 + `/martin` Summary

**Eight editorial English pilot articles replace Phase 6 stubs with attribution, author bylines, and a homepage start-here section.**

## Performance

- **Duration:** ~45 min
- **Tasks:** 3 execution commits (guides, blog, homepage/wiring) + verification doc
- **Files modified:** 24

## Accomplishments

- All 5 guide and 3 blog pilots adapted with pairId, EN metadata, `/martin` author byline, and Czech attribution footers
- Homepage "Start here" links: webp, web-vitals, 2025-year-in-review, ai-saas
- `/martin` EN-05 verified — bio, services accordion, client logos, LinkedIn, PageSpeed.ONE (Phase 5; no patch)
- `verify:phase6` and EN build pass with full content

## Task Commits

1. **Five EN guide pilots + WebP assets** - `0604319` (feat)
2. **Three EN blog pilots** - `978fcd4` (feat)
3. **Homepage start-here + guide author wiring** - `d060677` (feat)
4. **Phase 7 verification report** - `a885bbb` (docs)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Copied guide WebP assets to EN public**
- **Found during:** Guide article build (images referenced from CS prirucka paths)
- **Issue:** michalek-dev lacks vitePluginPriruckaImages source tree
- **Fix:** Copied 13 pilot WebP files from vzhurudolu build output to `apps/michalek-dev/public/prirucka/images/`
- **Commit:** `0604319`

**2. [Rule 2 - Missing] Guide author byline not wired**
- **Found during:** CONT-04 verification
- **Fix:** Added optional `author` to guide schema; pass to ArticleHeader in guide template
- **Commit:** `d060677`

None otherwise — work aligned with 07-CONTEXT.md and ROADMAP success criteria.

## Self-Check: PASSED

- All 8 content files exist under `apps/michalek-dev/src/content/`
- Commits `0604319`, `978fcd4`, `d060677`, `a885bbb` on branch
- `bash scripts/verify-phase6-content-pairing-i18n-seo.sh` exit 0
