---
status: passed
phase: 14-pre-launch-verify-dns-unblock
requirements: [LAUNCH-01, LAUNCH-02]
updated: 2026-06-09
---

# Phase 14 Verification — Pre-launch Verify & DNS Unblock

## Automated gate

```bash
npm run verify:phase14
# optional live preview:
# VZHURUDOLU_URL=https://vd-web-2026.vercel.app \
# MICHALEK_DEV_URL=https://vd-web-2026-xco9.vercel.app \
# bash scripts/verify-phase14-v1-1-visual-polish.sh --live
```

| Check | Status |
|-------|--------|
| LAUNCH-01: Static v1.1 visual checks on both builds | ✅ |
| LAUNCH-02: Phase 9 DNS unblocked after v1.1 (doc updated) | ✅ |
| `verify-phase14-v1-1-visual-polish.sh` | ✅ PASS |

## Manual UAT (LAUNCH-01 sign-off)

Browser spot-check on Vercel previews before DNS cutover:

| URL | What to verify |
|-----|----------------|
| CS `/` | Author brown box beside featured article; no ebook promo aside |
| EN `/` | Same layout; no "Start here"; topic hub buttons |
| CS paired article | Author/date left, language switch right |
| EN paired article | Same row layout; no adaptation footer |

**Preview URLs:**

- CS: https://vd-web-2026.vercel.app/
- EN: https://vd-web-2026-xco9.vercel.app/

After UAT passes, proceed with Phase 9 DNS cutover per `09-VERIFICATION.md`.
