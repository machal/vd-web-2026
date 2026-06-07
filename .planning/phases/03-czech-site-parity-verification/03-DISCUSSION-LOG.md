# Phase 3: Czech Site Parity Verification - Discussion Log

> **Audit trail only.** Decisions in CONTEXT.md.

**Date:** 2026-06-07
**Phase:** 03-czech-site-parity-verification
**Mode:** Autonomous smart discuss — user accepted all areas in one batch

---

## Parity Comparison Methodology

| Option | Description | Selected |
|--------|-------------|----------|
| URL inventory + status + redirects vs live | Automated, fast | ✓ |
| Full HTML diff | Too strict | |
| Live vzhurudolu.cz baseline | Source of truth | ✓ |
| CI script verify-phase3-parity.sh | Automated gate | ✓ |

**User's choice:** Accept all (batch)

---

## Link Checker

| Option | Description | Selected |
|--------|-------------|----------|
| Internal links only in dist/ | Scoped check | ✓ |
| linkinator or lychee | Tool choice (discretion) | ✓ |
| Ignore anchors/mailto/data/style preview | Filter rules | ✓ |
| Optional pr-build.yml step | CI integration | ✓ |

**User's choice:** Accept all (batch)

---

## Public Asset Audit

| Option | Description | Selected |
|--------|-------------|----------|
| Inventory + categorize, no delete | Phase 3 scope | ✓ |
| Build under 5 min verify | Performance gate | ✓ |
| Keep copy-public plugin | Parity first | ✓ |
| 03-PUBLIC-ASSET-AUDIT.md deliverable | Document output | ✓ |

**User's choice:** Accept all (batch)

---

## Phase Scope Boundaries

| Option | Description | Selected |
|--------|-------------|----------|
| Vercel redirects → Phase 4 | Out of scope | ✓ |
| vzhurudolu app only | No EN | ✓ |
| 5-page spot-check | Light visual verify | ✓ |
| Phase 4 unblocked on pass | Success routing | ✓ |

**User's choice:** Accept all (batch)
