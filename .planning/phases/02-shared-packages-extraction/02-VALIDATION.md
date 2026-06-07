---
phase: 02
slug: shared-packages-extraction
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-07
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — shell build gate + GitHub Actions |
| **Config file** | `.github/workflows/pr-build.yml`, `scripts/verify-phase1-build.sh` |
| **Quick run command** | `npm run build:vzhurudolu` |
| **Full suite command** | `npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase1-build.sh` |
| **Estimated runtime** | ~120 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build:vzhurudolu`
- **After every plan wave:** Run `npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase1-build.sh`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | MONO-03 | — | Package scaffold builds | integration | `npm run build:vzhurudolu` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 2 | MONO-03 | — | Vite plugins import from @vd/shared | integration | `npm run build:vzhurudolu` | ✅ | ⬜ pending |
| 02-03-01 | 03 | 3 | MONO-03 | T-02-01 | Markdown pipeline unchanged | integration | `npm run build:vzhurudolu` | ✅ | ⬜ pending |
| 02-04-01 | 04 | 4 | MONO-03 | — | Layouts import from @vd/shared | integration | `npm run build:vzhurudolu` | ✅ | ⬜ pending |
| 02-05-01 | 05 | 5 | MONO-03 | — | Stale paths absent | static | `bash scripts/verify-phase2-extraction.sh` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/verify-phase2-extraction.sh` — assert extracted files absent from old paths; assert `@vd/shared` imports in astro.config.mjs
- [ ] Remove duplicated markdown deps from app after migration (final cleanup task)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Full URL/visual parity | VD-01 | Out of scope Phase 2 (D-11) | Phase 3 parity diff |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
