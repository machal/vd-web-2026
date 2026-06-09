---
phase: 05-english-app-scaffold
plan: 04
subsystem: ui
tags: [martin-page, pagespeed, lector-layout]
requires:
  - phase: 05-english-app-scaffold
    provides: "EN app scaffold from 05-02"
provides:
  - Full /martin page with EN copy, services, client logos, external CTAs
affects: [05-05]
tech-stack:
  added: []
  patterns: ["CS lector.astro structure adapted with native EN copy"]
key-files:
  created:
    - apps/michalek-dev/src/pages/martin.astro
    - apps/michalek-dev/public/assets/img/content/lectors/
    - apps/michalek-dev/public/assets/img/content/dest/logos/
key-decisions:
  - "Client logos band uses CS dest/logos SVGs (ČSOB, Heureka, Avast, Ataccama)"
  - "Publications section links to / instead of CS ebook grid"
requirements-completed: [EN-05]
duration: 8min
completed: 2026-06-09
---

# Phase 5 Plan 04: /martin Page Summary

**Full English About Martin page with PageSpeed.ONE promotion, services accordion, client logos, and LinkedIn CTA — EN-05 delivered in Phase 5.**

## Performance

- **Duration:** 8 min
- **Tasks:** 2/2
- **Files modified:** 11

## Accomplishments

- `lector__head` hero with portrait and LinkedIn link
- Web Performance section with prominent PageSpeed.ONE links
- Services accordion (training, audit, consulting)
- Client logos in `.bg-dark` band
- Condensed publications + email/LinkedIn contact (no Czech legal block)
- Document title: `About Martin · Martin Michálek · Web & Performance`
- Martin nav item active on `/martin`

## Task Commits

1. **Tasks 1–2: martin page + nav integration** — `d27d379` (feat)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `apps/michalek-dev/dist/martin/index.html` contains pagespeed.one and linkedin.com/in/martinmichalek
- Commit `d27d379` exists
