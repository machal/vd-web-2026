---
status: passed
phase: 09-production-cutover-michalek-dev-dns
requirements: [DEPLOY-02, DEPLOY-03, DEPLOY-04]
updated: 2026-06-20
cutover_date: 2026-06-14
---

# Phase 9 Verification: Production Cutover — michalek.blog + DNS

## Status

**passed** — Both domains serve from Vercel. FTP auto-deploy disabled; rollback runbook in repo.

| Check | Status |
|-------|--------|
| `docs/ROLLBACK.md` rollback runbook | ✅ |
| `scripts/verify-phase9-cutover.sh` | ✅ |
| FTP auto-deploy disabled; archive preserved | ✅ |
| `www.vzhurudolu.cz` production domain on Vercel | ✅ |
| `michalek.blog` production domain on Vercel | ✅ |
| Post-cutover smoke tests pass | ✅ (2026-06-20) |
| 48 h stable soak before deleting FTP secrets | ⏳ Optional — secrets retained for rollback |

## Production URLs

- CS: https://www.vzhurudolu.cz/
- EN: https://michalek.blog/

## Vercel projects

| Project | Root Directory | Production branch |
|---------|----------------|-------------------|
| `vzhuru-dolu-2026` (CS) | `apps/vzhurudolu` | `michalek-dev` → `master` after merge |
| EN (`michalek-dev`) | `apps/michalek-dev` | `michalek-dev` → `master` after merge |

## ROADMAP success criteria

- [x] `www.vzhurudolu.cz` and `michalek.blog` serve from Vercel via staged DNS
- [x] FTP deploy workflow disabled after successful Vercel soak
- [x] Rollback path documented (`docs/ROLLBACK.md`)

## Post-merge

Switch Vercel production branch to `master` on both projects after PR merge.
