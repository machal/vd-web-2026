---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: Visual Polish (pre-launch)
status: complete
last_updated: "2026-06-20T10:00:00.000Z"
last_activity: 2026-06-20
progress:
  total_phases: 14
  completed_phases: 14
  total_plans: 46
  completed_plans: 46
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-20)

**Core value:** Articles and `/martin` earn organic global trust; site reflects Web Perf expertise with pragmatic tradeoffs (GA OK; LH 100/100 secondary).
**Current focus:** Milestone v1.1 complete — production live on Vercel; ready for `michalek-dev` → `master` merge

## Current Position

Phase: —
Plan: —
Status: **All phases complete (1–14). Production cutover done.**
Last activity: 2026-06-20 — GSD plan closed; no cookie banner (owner decision); verify gates updated

## Performance Metrics

**Velocity:**

- Total plans completed: 46
- Average duration: 15 min
- Total execution time: ~5 hours

## Accumulated Context

### Decisions

- Roadmap: Czech-first sequencing — monorepo + Vercel for CS before EN DNS cutover
- Phase 04: `.vercelignore` must scope to `public/data/` and `public/files/` — bare `data/` breaks `src/data/categories.ts`
- Phase 04: Vercel project `vzhuru-dolu-2026`, root `apps/vzhurudolu`, production branch `michalek-dev` (→ `master` after merge)
- Phase 6: cross-origin pairing via CONTENT_PAIRS manifest with resolveAlternate; no Astro i18n routing
- Phase 6: x-default hreflang points to EN; canonical always self-referencing
- Phase 8: GA4 via `PUBLIC_GA_MEASUREMENT_ID`; loads async in EN layout (no cookie banner — owner decision 2026-06-20)
- Phase 8: EN tags in tags.ts; archive pages at /{tag}/
- Phase 9: FTP auto-deploy disabled; archived at `.github/workflows/archived/deploy-ftp.yml`
- Phase 9: DNS cutover complete — `www.vzhurudolu.cz` + `michalek.blog` on Vercel (2026-06-14)
- Phase 11–14: AuthorProfileBox, EN homepage parity, article language row, verify script
- **2026-06-20:** Cookie consent banner explicitly out of scope — GA without interactive gate; cookie policy page retained

### Pending Todos

None — milestone v1.1 closed.

### Blockers/Concerns

None for merge. Post-merge: switch Vercel production branch to `master` on both projects.

## Session Continuity

Last session: 2026-06-20
Stopped at: GSD plan closed; verify-phase8 updated for no-banner GA
Next: PR `michalek-dev` → `master`, then Vercel production branch → `master`
