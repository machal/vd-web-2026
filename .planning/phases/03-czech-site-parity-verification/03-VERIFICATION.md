# Phase 3: Czech Site Parity Verification

**Phase:** 03-czech-site-parity-verification  
**Requirements:** VD-01, VD-05  
**Status:** Automated gate green — manual spot-check pending

---

## Automated Gate

Run after every Czech build:

```bash
npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase3-parity.sh
```

CI runs link check only (no production sitemap/redirect network calls):

```bash
bash scripts/verify-phase3-parity.sh --links-only
```

---

## Spot-Check Checklist (D-15)

Manual browser verification — check each row for 200, main content visible, navigation works, and no `/_astro/*.js` 404 in console.

| # | Page type | Production URL | Local equivalent | Checks |
|---|-----------|----------------|------------------|--------|
| 1 | Homepage | https://www.vzhurudolu.cz/ | `dist/` or `astro preview` | [ ] 200, nav, category listings |
| 2 | Blog | https://www.vzhurudolu.cz/blog/261-rok-2025 | `dist/blog/261-rok-2025/` | [ ] content renders, no _astro 404 |
| 3 | Příručka | https://www.vzhurudolu.cz/prirucka/css-flexbox | `dist/prirucka/css-flexbox/` | [ ] markdown pipeline, internal links |
| 4 | Podcast | https://www.vzhurudolu.cz/podcast/219-figma-podcast | `dist/podcast/219-figma-podcast/` | [ ] episode page, audio/embed |
| 5 | Kurz | https://www.vzhurudolu.cz/kurzy | `dist/kurzy/` | [ ] static page, redirect refs |

---

## Phase Pass Criteria (D-04, D-16)

- [x] `scripts/verify-phase3-parity.sh` green (automated)
- [x] `03-PUBLIC-ASSET-AUDIT.md` complete (VD-05)
- [ ] All 5 spot-checks manually confirmed (human — `/gsd-verify-work 3`)
- [ ] Phase 4 may proceed without re-running Phase 2 once spot-check passes

---

## Out of Scope Reminder

- **D-13:** `.htaccess` → `vercel.json` redirect port — Phase 4
- **D-14:** EN app (`michalek.dev`) — later phase
- Pixel-perfect visual diff — manual spot-check only (no Percy/Chromatic)

---

## Gate Run Log

| Field | Value |
|-------|-------|
| Date | 2026-06-07 |
| Git SHA | 723994b |
| Build | ~22 s (turbo cached/force) |
| verify-phase3-parity.sh | exit 0 |
| Sitemap prod / local | 873 / 871 |
| Sitemap missing (non-draft) | 0 |
| Sitemap draft-excluded | 2 (`115-google-speed-https`, `179-covid-skoleni-podzim`) |
| Sitemap extras (WARN) | 0 |
| linkinator | pass (167 legacy local 404s match production non-200) |
| Redirect samples | 26 / 26 pass |
| VD-05 reference | `03-PUBLIC-ASSET-AUDIT.md` — 685 MB audit, 29 s build PASS |

**Handoff (D-16):** Automated gate complete. Phase 4 (Vercel migration) unblocked after `/gsd-verify-work` confirms 5-page spot-check.
