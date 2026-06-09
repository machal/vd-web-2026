---
phase: 12-en-homepage-cs-parity
requirements-completed: [ENHOME-01, ENHOME-02, ENHOME-03, ENHOME-04, ENHOME-05]
completed: 2026-06-09
---

# Phase 12 Summary — EN Homepage CS Parity

**EN homepage restructured to match CS: featured article, author box, article stream, topic hub.**

## Accomplishments

- Rewrote `apps/michalek-dev/src/pages/index.astro` with CS-equivalent layout
- Featured latest article + `AuthorProfileBox` in two-column row
- Paginated article stream (5 posts); removed "Start here" and intro hero
- Added `TopicHubPrimary` green topic hub with EN primary buttons only

## Files

- `apps/michalek-dev/src/pages/index.astro` (rewritten)
- `packages/shared/components/TopicHubPrimary.astro` (created)
- `apps/vzhurudolu/src/pages/index.astro` (topic hub extracted)

## Verification

- `npm run build:michalek-dev` — pass

## Deviations

None.

## Self-Check: PASSED
