---
status: passed
phase: 04-vercel-migration-czech-site
requirement: VD-03
updated: 2026-06-09
preview_url: https://vzhuru-dolu-2026-qyx9oturv-martinmichalekpagespeedczs-projects.vercel.app
---

# Phase 4 Verification: Vercel Migration — Czech Site

## Status

**Passed** — Vercel project connected, build green, browser spot-check confirmed by human (2026-06-09).

| Check | Status |
|-------|--------|
| `vercel.json` monorepo scaffold | ✅ |
| `.vercelignore` archive exclusion (`public/data/`, `public/files/`) | ✅ |
| `.htaccess` → `vercel.json` redirects | ✅ |
| `scripts/verify-phase4-vercel.sh` | ✅ (script in repo; curl gate blocked by Deployment Protection — browser UAT used) |
| FTP deploy workflow preserved | ✅ |
| Vercel project connected + preview deploy | ✅ |
| Browser spot-check (homepage, příručka, blog, podcast, e-book + redirects) | ✅ Human confirmed |

## Build fix (2026-06-09)

`.vercelignore` pattern `data/` excluded `src/data/categories.ts` → Rollup `Could not resolve "../../data/categories"`. Fixed in commit `f052eae` (`public/data/`, `public/files/` only).

## Vercel project

| Setting | Value |
|---------|-------|
| Project | `vzhuru-dolu-2026` |
| Root Directory | `apps/vzhurudolu` |
| Production branch | `michalek-dev` |
| Monorepo toggle | ON |
| Latest green deploy | `f052eae` |

Preview URL (Deployment Protection — requires Vercel login):

`https://vzhuru-dolu-2026-qyx9oturv-martinmichalekpagespeedczs-projects.vercel.app`

## Human verification (2026-06-09)

- [x] Homepage, `/prirucka/css-flexbox`, `/blog/261-rok-2025`, `/podcast`, `/css-layout` render correctly
- [x] No console 404 on `/_astro/*.js`
- [x] Legacy redirects work in browser (`/p/…`, `/prirucka/css3-flexbox`, `/checklist`, …)

## Rollback procedure

Production remains on FTP until Phase 9 DNS cutover.

- `.github/workflows/deploy-ftp.yml` deploys `apps/vzhurudolu/dist/` on `main`/`master`
- `public/.htaccess` retained in dist for Apache production
- Rollback: continue FTP deploy; no Vercel DNS changes needed until Phase 9

## ROADMAP success criteria

- [x] Vercel build config for `apps/vzhurudolu`
- [x] `trailingSlash: false` in `vercel.json`
- [x] Font CORS headers ported from `.htaccess`
- [x] `public/data/` and `public/files/` excluded from Vercel deploy
- [x] Apache 301 redirects ported to `vercel.json`
- [x] Vercel preview deployment succeeds
- [x] Browser parity confirmed (redirects + content pages)
- [x] FTP deploy workflow preserved as rollback path
