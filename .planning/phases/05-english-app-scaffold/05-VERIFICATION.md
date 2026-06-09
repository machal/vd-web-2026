---
status: human_needed
phase: 05-english-app-scaffold
requirements: [MONO-05, DEPLOY-01]
updated: 2026-06-09
preview_url: null
---

# Phase 5 Verification: English App Scaffold

## Status

**human_needed** — Local dual-app build and verify gate pass. EN Vercel dashboard connect deferred to human (Phase 9 blocks production domain).

| Check | Status |
|-------|--------|
| `apps/michalek-dev/vercel.json` monorepo scaffold | ✅ |
| Dual-app `pr-build.yml` (`@vd/vzhurudolu` + `@vd/michalek-dev`) | ✅ |
| `scripts/verify-phase5-english-scaffold.sh` | ✅ local pass |
| EN homepage, articles, `/martin`, 404 in `dist/` | ✅ |
| No `/blog/` or `/guide/` listing pages | ✅ |
| `contentPathPrefix: '/guide'` in EN astro.config | ✅ |
| EN Vercel project connected + preview deploy | ⏳ **Human needed** |
| `michalek.dev` production domain attached | ❌ Deferred to Phase 9 |

## Vercel projects (dual monorepo)

| Project | Root Directory | Status |
|---------|----------------|--------|
| `vzhuru-dolu-2026` (CS) | `apps/vzhurudolu` | Connected Phase 4 — see `04-VERIFICATION.md` |
| `michalek-dev` (EN) | `apps/michalek-dev` | **Not connected** — steps below |

## EN Vercel dashboard setup (human)

1. Vercel Dashboard → **Add New Project** → same Git repo as vzhurudolu-2026
2. **Root Directory:** `apps/michalek-dev`
3. Enable **Include source files outside of the Root Directory** (monorepo)
4. Deploy preview — confirm build log shows `turbo run build --filter=@vd/michalek-dev`
5. Browser spot-check: `/`, `/martin`, `/blog/hello-blog`, `/guide/hello-guide`, `/404`
6. Record preview URL in this file and set `status: passed` (or `preview_url` only)
7. **Do NOT** attach `michalek.dev` production domain yet (Phase 9 DNS cutover)

## ROADMAP success criteria

- [x] Homepage with unified article stream and About Martin CTA
- [x] Site title **Martin Michálek · Web & Performance** via `site.config.ts`
- [x] Nav: Articles + Martin; minimal footer legal links
- [x] Article URLs at `/blog/{slug}` and `/guide/{slug}`; no listing pages
- [x] Full `/martin` with PageSpeed.ONE + LinkedIn CTAs
- [x] Custom 404 with navigation back
- [x] PR CI builds both apps
- [ ] Two Vercel projects live with preview (EN dashboard connect pending)

## Resume signal

Type `approved` with EN preview URL after dashboard connect, or describe build issues.
