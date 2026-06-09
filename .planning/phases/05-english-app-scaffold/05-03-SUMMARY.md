---
phase: 05-english-app-scaffold
plan: 03
subsystem: ui
tags: [astro, routing, homepage]
requires:
  - phase: 05-english-app-scaffold
    provides: "EN app scaffold from 05-02"
provides:
  - Homepage hero + unified article stream
  - /blog/{slug} and /guide/{slug} article routes
  - 404, privacy, cookies stub pages
affects: [05-05]
tech-stack:
  added: []
  patterns: ["ArticleListItem with Blog/Guide badges", "language-switch HTML comment slot"]
key-files:
  created:
    - apps/michalek-dev/src/pages/index.astro
    - apps/michalek-dev/src/pages/blog/[slug].astro
    - apps/michalek-dev/src/pages/guide/[slug].astro
    - apps/michalek-dev/src/pages/404.astro
    - apps/michalek-dev/src/pages/privacy.astro
    - apps/michalek-dev/src/pages/cookies.astro
    - apps/michalek-dev/src/components/ArticleListItem.astro
  modified:
    - packages/shared/components/ArticleHeader.astro
key-decisions:
  - "Added optional locale prop to ArticleHeader for en-GB dates (minimal shared change)"
  - "No vrdl.min.js or Disqus on EN article pages"
requirements-completed: [EN-03, EN-04, EN-06, EN-07, EN-08]
duration: 10min
completed: 2026-06-09
---

# Phase 5 Plan 03: EN Core Routes Summary

**Visitor-facing EN routes deliver homepage stream, article detail pages, custom 404, and legal stubs per UI-SPEC copy contract.**

## Performance

- **Duration:** 10 min
- **Tasks:** 2/2
- **Files modified:** 8

## Accomplishments

- Homepage hero with About Martin CTA and merged blog+guide stream (newest first)
- ArticleListItem badges (Blog / Guide) with en-GB dates
- Article routes without listing pages; language-switch slot as HTML comment
- 404 with Back to Articles and About Martin buttons
- Privacy/Cookies Coming soon stubs

## Task Commits

1. **Tasks 1–2: homepage, articles, 404, legal** — `6b8f2c9` (feat)

## Deviations from Plan

**1. [Rule 2] ArticleHeader locale prop**
- Extended shared `ArticleHeader` with optional `locale` for en-GB formatting (not in original 05-03 file list)

## Self-Check: PASSED

- `apps/michalek-dev/dist/index.html` and `404.html` build
- Commit `6b8f2c9` exists
