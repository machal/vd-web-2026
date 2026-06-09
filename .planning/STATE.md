---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: Visual Polish (pre-launch)
status: complete
last_updated: "2026-06-09T09:15:00.000Z"
last_activity: 2026-06-09
progress:
  total_phases: 5
  completed_phases: 5
  total_plans: 5
  completed_plans: 5
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-06)

**Core value:** Articles and `/martin` earn organic global trust; site reflects Web Perf expertise with pragmatic tradeoffs (GA OK; LH 100/100 secondary).
**Current focus:** Milestone v1.1 complete — ready for Phase 9 DNS cutover after browser UAT

## Current Position

Phase: 14 (pre-launch-verify-dns-unblock)
Plan: —
Status: v1.1 Phases 10–14 executed
Last activity: 2026-06-09 — Phases 11–14 complete; verify-phase14 passes

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
- Phase 9: Simultaneous DNS cutover both domains; unblocked after v1.1 Phase 14 verify
- Phase 11–14: AuthorProfileBox, EN homepage parity, article language row, verify script

### Pending Todos

- ~~v1.1 visual polish both blogs~~ — resolved by Phases 10–14 (`/martin` redesign → v1.2)

### Blockers/Concerns

- Phase 9 DNS cutover blocked until v1.1 visual polish complete
- Phase 5 UAT in progress (2/10 passed) — resume `/gsd-verify-work 5` for functional gate
- EN Vercel preview live at https://vd-web-2026-xco9.vercel.app/

## Session Continuity

Last session: 2026-06-09
Stopped at: Completed Phase 9 production cutover plans (DNS human_needed)
Resume file: .planning/ROADMAP.md (Phase 10)
