---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: ready_for_verification
stopped_at: Completed Phase 9 production cutover plans (DNS human_needed)
last_updated: "2026-06-09T12:00:00.000Z"
last_activity: 2026-06-09 -- Phase 9 cutover docs, smoke script, FTP archive
progress:
  total_phases: 9
  completed_phases: 8
  total_plans: 41
  completed_plans: 41
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-06)

**Core value:** Articles and `/martin` earn organic global trust; site reflects Web Perf expertise with pragmatic tradeoffs (GA OK; LH 100/100 secondary).
**Current focus:** Phase 09 — production-cutover-michalek-dev-dns (human DNS gate)

## Current Position

Phase: 09 (production-cutover-michalek-dev-dns)
Plan: 3/3 complete
Status: Executed — verification human_needed (DNS cutover)
Last activity: 2026-06-09 -- ROLLBACK.md, verify-phase9-cutover.sh, FTP archived

Progress: [█████████░] 100% plans executed (9/9 phases have plans; Phase 9 DNS pending human)

## Performance Metrics

**Velocity:**

- Total plans completed: 41
- Average duration: 15 min
- Total execution time: ~5 hours

## Accumulated Context

### Decisions

- Roadmap: Czech-first sequencing — monorepo + Vercel for CS before EN DNS cutover
- Phase 04: `.vercelignore` must scope to `public/data/` and `public/files/` — bare `data/` breaks `src/data/categories.ts`
- Phase 04: Vercel project `vzhuru-dolu-2026`, root `apps/vzhurudolu`, branch `michalek-dev`
- Phase 04: Deployment Protection on preview — browser UAT via logged-in Vercel session; curl gate needs bypass or public preview
- Phase 6: cross-origin pairing via CONTENT_PAIRS manifest with resolveAlternate; no Astro i18n routing
- Phase 6: x-default hreflang points to EN; canonical always self-referencing
- Phase 8: GA4 via PUBLIC_GA_MEASUREMENT_ID; loads only after analytics cookie consent
- Phase 8: EN tags in tags.ts; archive pages at /{tag}/
- Phase 9: FTP auto-deploy disabled; archived at `.github/workflows/archived/deploy-ftp.yml`
- Phase 9: Simultaneous DNS cutover both domains; 09-VERIFICATION.md status human_needed until cutover

### Blockers/Concerns

- Phase 9 DNS cutover and Vercel production domain attach — human steps in `09-VERIFICATION.md`
- EN Vercel dashboard connect may still be pending — complete before attaching michalek.dev production domain

## Session Continuity

Last session: 2026-06-09
Stopped at: Completed Phase 9 production cutover plans (DNS human_needed)
Resume file: .planning/phases/09-production-cutover-michalek-dev-dns/09-VERIFICATION.md
