---
phase: 01-monorepo-foundation-ci
plan: 04
subsystem: infra
tags: [github-actions, ci, ftp-deploy, node-22, turbo]

requires:
  - phase: 01-monorepo-foundation-ci
    provides: turbo build pipeline and VD-02 verify script
provides:
  - PR CI workflow with turbo filtered build
  - Updated FTP deploy from apps/vzhurudolu/dist/
affects: [phase-4-vercel, phase-5-en-app, production-deploy]

tech-stack:
  added: []
  patterns: [PR turbo build gate, FTP from app dist path]

key-files:
  created:
    - .github/workflows/pr-build.yml
  modified:
    - .github/workflows/deploy-ftp.yml

key-decisions:
  - "Czech-only PR CI — michalek-dev build deferred to Phase 5 (MONO-05)"
  - "secret-scan.yml unchanged per D-20"

patterns-established:
  - "CI: npm ci && turbo run build --filter=@vd/vzhurudolu && verify-phase1-build.sh"

requirements-completed: [MONO-01, MONO-02]

duration: 10min
completed: 2026-06-07
---

# Phase 01 Plan 04 Summary

**PR CI and FTP deploy updated for monorepo — Node 22, turbo filter, apps/vzhurudolu/dist/**

## Task Commits

1. **Task 1: PR build workflow** — `720f7f5` (feat)
2. **Task 2: FTP deploy update** — `7133906` (feat)
3. **Task 3: secret-scan unchanged + CI simulation** — verified, no changes

## Accomplishments

- PR to main/master runs turbo build + verify gate
- FTP push deploys from `./apps/vzhurudolu/dist/` with Node 22
- secret-scan.yml preserved unchanged (D-20)
- Local CI simulation passes

## Deviations from Plan

None.

## Next Phase Readiness

- Phase 1 all 4 plans complete — ready for phase verification
- Dual-app CI arrives Phase 5 (MONO-05)

---
*Phase: 01-monorepo-foundation-ci*
*Completed: 2026-06-07*
