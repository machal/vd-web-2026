---
phase: 07-content-adaptation-pilot-8-martin
plan: 02
subsystem: content
tags: [michalek-dev, guide, webp, web-vitals]
requires:
  - phase: 07-content-adaptation-pilot-8-martin
    provides: adaptation schema and attribution wiring (07-01)
provides:
  - Full EN guide articles for webp and web-vitals pilots
  - Pilot WebP assets under apps/michalek-dev/public/prirucka/images/
affects: [07-06, 08-launch-polish]
requirements-completed: [CONT-01, CONT-03, CONT-04, CONT-05]
duration: 15min
completed: 2026-06-09
---

# Phase 7 Plan 02: Guide Pilots webp + web-vitals Summary

**Two performance-focused EN guide articles adapted from Czech příručka with pairId, attribution, and shared WebP assets**

## Task Commits

1. **Five guide pilots batch (includes webp + web-vitals)** - `0604319`
2. **Image path .jpg → .webp fix (web-vitals)** - `afed0ea` (WR-04)

## Deviations from Plan

Guides were adapted in a single batch commit with plans 03–04; webp and web-vitals delivered together.

## Self-Check: PASSED

- `apps/michalek-dev/src/content/guide/webp.md` and `web-vitals.md` ≥80 lines each
- `dist/guide/webp/` and `dist/guide/web-vitals/` present after EN build
