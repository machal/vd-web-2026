---
phase: 10-cz-nav-homepage-restructure
plan: 01
subsystem: ui
tags: [navigation, homepage, czech]
requirements-completed: [CZNAV-01, CZNAV-02, CZHOME-01, CZHOME-02]
completed: 2026-06-09
---

# Phase 10 Plan 01 Summary

**CZ header nav reduced to Články/Knihy/Autor; podcast-youtube band removed; FrontKec block added under e-books.**

## Accomplishments

- `Navigation.astro` CS defaults: Články, Knihy, Autor (`/martin`); Podcast/Video removed from header
- Active section detection includes `author` for `/martin`
- Homepage: removed `#podcast-youtube` image blocks
- Homepage: added `#podcast-frontkec` full-width section after e-books with past-tense copy + FrontKec CTA
- Footer already contained Podcast and Videa links — no change needed

## Files modified

- `packages/shared/components/Navigation.astro`
- `apps/vzhurudolu/src/pages/index.astro`

## Verification

- `npm run build:vzhurudolu` — pass
