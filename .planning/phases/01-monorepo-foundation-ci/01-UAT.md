---
status: complete
phase: 01-monorepo-foundation-ci
source:
  - 01-01-SUMMARY.md
  - 01-02-SUMMARY.md
  - 01-03-SUMMARY.md
  - 01-04-SUMMARY.md
started: 2026-06-07T13:30:00.000Z
updated: 2026-06-07T14:25:00.000Z
---

## Current Test

[testing complete]

## Tests

### 1. Monorepo install and Czech build from root
expected: npm ci + turbo build z rootu projde; dist/_astro/ existuje; verify script OK
result: pass

### 2. Turbo filter scripts from package.json
expected: `npm run build:vzhurudolu` z rootu úspěšně buildí český web (stejný výsledek jako turbo filter)
result: pass

### 3. Draft blog post excluded from production output
expected: Po buildu NEexistuje draft HTML a slug není v sitemap
result: pass

### 4. Czech site preview (dev server)
expected: `npm run dev:vzhurudolu` spustí dev server; homepage se načte v prohlížeči
result: pass

### 5. PR CI workflow configured
expected: pr-build.yml existuje, Node 22, turbo filter
result: pass

### 6. FTP deploy workflow uses monorepo dist path
expected: deploy-ftp.yml Node 22, turbo filter, local-dir apps/vzhurudolu/dist/
result: pass

## Summary

total: 6
passed: 6
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none yet]
