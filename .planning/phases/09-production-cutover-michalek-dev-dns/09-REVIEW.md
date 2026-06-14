---
phase: 09-production-cutover-michalek-dev-dns
reviewed: 2026-06-09T12:00:00Z
depth: quick
files_reviewed: 4
files_reviewed_list:
  - docs/ROLLBACK.md
  - scripts/verify-phase9-cutover.sh
  - .github/workflows/deploy-ftp.yml
  - .github/workflows/archived/deploy-ftp.yml
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---

# Phase 9: Code Review Report

**Reviewed:** 2026-06-09T12:00:00Z  
**Depth:** quick  
**Files Reviewed:** 4  
**Status:** issues_found

## Summary

Quick adversarial review of Phase 9 cutover artifacts: rollback runbook, production smoke script, and FTP workflow archive/retirement. No hardcoded secrets, dangerous eval/exec, or debug artifacts. Script is executable, `bash -n` clean, and matches `09-02-PLAN.md` (env overrides, first-five redirect samples, dual-domain checks). FTP archive correctly lives under `.github/workflows/archived/` so GitHub will not auto-run it. Two runbook/security warnings remain before human cutover.

## Narrative Findings (AI reviewer)

## Warnings

### WR-01: EN rollback path under-documented vs CS FTP fallback

**File:** `docs/ROLLBACK.md:14-31,33-54`  
**Issue:** Section 1 instructs reverting DNS for **both** domains, but section 2 (FTP re-enable) only covers the Czech site. There is no EN equivalent of Apache/FTP hosting — operators rolling back `michalek.dev` get DNS guidance only, with EN recovery implicitly limited to §3 Vercel promote. During a partial or EN-only incident this gap can delay recovery.  
**Fix:** Add an explicit subsection under §1 or §3, e.g. “EN (`michalek.dev`): revert DNS to prior registrar records; no FTP fallback — use Vercel Promote to Production or restore previous EN host records. CS-only FTP rollback does not affect EN.”

### WR-02: Archived FTP workflow uses plain FTP (FTPS disabled)

**File:** `.github/workflows/archived/deploy-ftp.yml:44-45` (same in `deploy-ftp.yml:48-49`)  
**Issue:** `protocol: ftps` and `port: 990` remain commented out; rollback deploys credentials and site content over unencrypted FTP if restored. Pre-existing pattern, but the archived rollback path preserves it without warning in `ROLLBACK.md`.  
**Fix:** Document in `ROLLBACK.md` §2 that emergency FTP uses plain FTP unless FTPS is re-enabled, or uncomment/configure FTPS before relying on rollback in production.

## Info

### IN-01: Smoke gate covers five shortcut redirects only

**File:** `scripts/verify-phase9-cutover.sh:69`  
**Issue:** Only the first five non-comment lines from `redirect-samples.txt` are tested (shortcuts `/p/`, `/b/`, etc.). E-book, příručka typo, and `/data/` legacy rules in the same file are not exercised post-cutover. Intentional per plan, but a regression in later matrix rows would not fail the gate.  
**Fix:** Optional — add a `--redirects-full` flag reusing the phase-4 loop, or document in `09-VERIFICATION.md` that browser spot-checks cover e-book/legacy paths.

---

_Reviewed: 2026-06-09T12:00:00Z_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: quick_
