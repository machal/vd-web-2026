---
status: human_needed
phase: 10-cz-nav-homepage-restructure
updated: 2026-06-09
preview_url: https://vd-web-2026.vercel.app/
---

# Phase 10 Verification: CZ Nav & Homepage Restructure

## Status

**human_needed** — Build passes locally. Visual spot-check on CS preview recommended.

| Check | Status |
|-------|--------|
| Header nav: Články, Knihy, Autor only | ✅ code |
| Podcast/Video not in header | ✅ code |
| Podcast/Video in footer | ✅ already present |
| `#podcast-youtube` removed | ✅ |
| FrontKec block after e-books | ✅ |
| `npm run build:vzhurudolu` | ✅ |

## Human verification

1. Open https://vd-web-2026.vercel.app/ (after deploy)
2. Confirm header: Články, Knihy, Autor
3. Confirm footer still has Podcast and Videa
4. Confirm no podcast/YouTube image band mid-page
5. Confirm FrontKec text block under e-books
