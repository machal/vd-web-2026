---
phase: 09-production-cutover-michalek-dev-dns
plan: 03
subsystem: infra
tags: [github-actions, ftp, rollback]
requires:
  - phase: 09-01
    provides: docs/ROLLBACK.md rollback instructions
provides:
  - Archived FTP auto-deploy at .github/workflows/archived/deploy-ftp.yml
  - Manual-only deploy-ftp.yml stub for emergency rollback
affects: [ci, production-deploy]
tech-stack:
  added: []
  patterns: [workflow_dispatch-only FTP rollback; archived push-trigger workflow]
key-files:
  created: [.github/workflows/archived/deploy-ftp.yml]
  modified: [.github/workflows/deploy-ftp.yml]
key-decisions:
  - "FTP push trigger removed; full workflow archived; manual dispatch retains deploy steps"
requirements-completed: [DEPLOY-03]
duration: 5min
completed: 2026-06-09
---

# Phase 9 Plan 03: FTP Archive Summary

**FTP auto-deploy retired with archived push workflow and manual rollback dispatch.**

## Task Commits

1. **Task 1: Archive FTP workflow and disable auto-deploy** - `9ff46ea`

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- FOUND: .github/workflows/archived/deploy-ftp.yml
- FOUND: .github/workflows/deploy-ftp.yml
- FOUND: 9ff46ea
