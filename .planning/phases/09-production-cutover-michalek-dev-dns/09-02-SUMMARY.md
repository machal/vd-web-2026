---
phase: 09-production-cutover-michalek-dev-dns
plan: 02
subsystem: testing
tags: [bash, smoke-test, curl, production]
requires:
  - phase: 04-vercel-migration-czech-site
    provides: redirect-samples.txt and verify-phase4 patterns
provides:
  - scripts/verify-phase9-cutover.sh dual-domain production smoke gate
affects: [production-cutover, ci-optional]
tech-stack:
  added: []
  patterns: [env-var URL overrides for production smoke tests]
key-files:
  created: [scripts/verify-phase9-cutover.sh]
  modified: []
key-decisions:
  - "VZHURUDOLU_URL and MICHALEK_DEV_URL env vars default to production domains"
requirements-completed: [DEPLOY-02]
duration: 8min
completed: 2026-06-09
---

# Phase 9 Plan 02: Production Smoke Script Summary

**Dual-domain curl smoke gate for post-DNS cutover with configurable base URLs.**

## Task Commits

1. **Task 1: Production cutover smoke test script** - `a665734`

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- FOUND: scripts/verify-phase9-cutover.sh
- FOUND: a665734
