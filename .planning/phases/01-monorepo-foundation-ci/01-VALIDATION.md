---
phase: 01
slug: monorepo-foundation-ci
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-06
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — zero `*.test.*` / `*.spec.*` files in repo |
| **Config file** | none — Wave 0 installs CI/build gates |
| **Quick run command** | `npx turbo run build --filter=@vd/vzhurudolu` |
| **Full suite command** | same (only build gate in Phase 1) |
| **Estimated runtime** | ~120 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx turbo run build --filter=@vd/vzhurudolu`
- **After every plan wave:** Run build + draft smoke grep (see Per-Task Verification Map)
- **Before `/gsd-verify-work`:** Full build must pass + draft URLs absent from dist/sitemap
- **Max feedback latency:** 180 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-T3 | 01-01 | 1 | MONO-01 | — | Workspace layout builds | integration | `npm ci && npm run build -w @vd/vzhurudolu` | ❌ W0 | ⬜ pending |
| 01-02-T2 | 01-02 | 2 | MONO-02 | — | Turbo filter builds Czech app | integration | `npx turbo run build --filter=@vd/vzhurudolu` | ❌ W0 | ⬜ pending |
| 01-02-T3 | 01-02 | 2 | MONO-04 | — | App declares own astro deps | structural | `node -e "require('./apps/vzhurudolu/package.json').dependencies.astro"` | ❌ W0 | ⬜ pending |
| 01-03-T2 | 01-03 | 3 | VD-02 | T-01-01 | Draft blog not in dist | smoke | `test ! -e apps/vzhurudolu/dist/blog/115-google-speed-https/index.html` | ❌ W0 | ⬜ pending |
| 01-03-T3 | 01-03 | 3 | VD-02 | T-01-01 | Draft not in sitemap | smoke | `! grep -q '115-google-speed-https' apps/vzhurudolu/dist/sitemap.xml` | ❌ W0 | ⬜ pending |
| 01-04-T1 | 01-04 | 4 | MONO-01, MONO-02 | — | PR CI builds on pull request | integration | `.github/workflows/pr-build.yml` exists | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.github/workflows/pr-build.yml` — PR build gate (MONO-01, MONO-02, D-17)
- [ ] `turbo.json` — task graph (MONO-02)
- [ ] `apps/vzhurudolu/package.json` — app deps (MONO-04)
- [ ] Draft exclusion smoke script or CI step (VD-02) — shell grep acceptable for Phase 1

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FTP deploy path correct | MONO-01 | Requires server credentials | After merge to main, verify deploy-ftp.yml uses `./apps/vzhurudolu/dist/` |
| Czech site output unchanged | D-22 | Full URL diff is Phase 3 | Spot-check homepage and one blog article build locally |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 180s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
