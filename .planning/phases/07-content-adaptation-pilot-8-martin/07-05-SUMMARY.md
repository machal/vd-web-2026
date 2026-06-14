---
phase: 07-content-adaptation-pilot-8-martin
plan: 05
subsystem: content
tags: [michalek-dev, blog, adaptation]
requires:
  - phase: 07-content-adaptation-pilot-8-martin
    provides: adaptation schema (07-01)
provides:
  - Three EN blog pilots at CONTENT_PAIRS slugs
affects: [07-06, 08-launch-polish]
requirements-completed: [CONT-02, CONT-03, CONT-04, CONT-05]
duration: 15min
completed: 2026-06-09
---

# Phase 7 Plan 05: Blog Pilots (3 articles) Summary

**Three opinion/narrative EN blog articles adapted from Czech originals with pairId and adaptedFrom metadata**

## Task Commits

1. **Three EN blog pilots** - `978fcd4`

## Articles Delivered

- `2025-year-in-review` (pairId rok-2025)
- `saying-no` (pairId saying-no)
- `save-on-devs-spend-on-consultants` (pairId save-spend)

## Deviations from Plan

None — plan executed as specified.

## Self-Check: PASSED

- All three `dist/blog/{slug}/` paths present; no stub placeholder text
