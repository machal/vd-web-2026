---
status: human_needed
phase: 04-vercel-migration-czech-site
requirement: VD-03
updated: 2026-06-07
preview_url: null
---

# Phase 4 Verification: Vercel Migration — Czech Site

## Status

**Automated prep complete.** Vercel config, redirect port, and verification scripts are in the repo. A **human dashboard step** is required before this phase can pass.

| Check | Status |
|-------|--------|
| `vercel.json` monorepo scaffold | ✅ Automated |
| `.vercelignore` archive exclusion | ✅ Automated |
| `.htaccess` → `vercel.json` redirects (56 rules) | ✅ Automated |
| `scripts/verify-phase4-vercel.sh` | ✅ Automated |
| FTP deploy workflow preserved | ✅ Confirmed |
| Vercel project connected + preview deploy | ⏳ **Human required** |
| `verify-phase4-vercel.sh` against live preview | ⏳ **Human required** |

## Vercel Dashboard Setup (Human)

1. **Vercel Dashboard → Add New Project** — import this GitHub repository.
2. **Root Directory:** `apps/vzhurudolu`
3. **Enable:** “Include source files outside of Root Directory” (monorepo)
4. **Framework Preset:** Other (static — `vercel.json` owns build commands)
5. **Deploy** — confirm build log shows:
   - `npm ci` at repo root
   - `turbo run build --filter=@vd/vzhurudolu`
   - `dist/_astro` present in output
6. **Copy preview URL** (e.g. `https://vd-web-2026-xxx.vercel.app`)

### Optional (preview testing only — DNS cutover is Phase 9)

- Add domain `vzhurudolu.cz` as preview alias (do **not** change production DNS yet)
- www/HTTPS redirects are handled by Vercel domain settings, not `vercel.json` (omitted from Apache port intentionally)

## Preview Gate Command

After deployment succeeds, run locally:

```bash
VERCEL_PREVIEW_URL=https://YOUR-PREVIEW.vercel.app bash scripts/verify-phase4-vercel.sh
```

**Expected:**

- 26/26 redirect samples pass (`scripts/redirect-samples.txt`)
- Trailing slash check pass (`/prirucka/css-flexbox/` → slashless)
- Font CORS header (`Access-Control-Allow-Origin: *`) on a `.woff2` asset
- Homepage returns HTTP 200

Redirect-only partial gate (before full deploy):

```bash
VERCEL_PREVIEW_URL=https://YOUR-PREVIEW.vercel.app bash scripts/verify-phase4-vercel.sh --redirects-only
```

## Rollback Procedure

**Production remains on FTP until Phase 9 DNS cutover.**

- `.github/workflows/deploy-ftp.yml` still deploys `apps/vzhurudolu/dist/` on push to `main`/`master`
- FTP exclude list unchanged: `data/**`, `files/**` (legacy archives stay on origin)
- `public/.htaccess` retained in dist for Apache production
- **Rollback:** continue using FTP deploy; no Vercel DNS changes needed until Phase 9

## ROADMAP Success Criteria

- [x] Vercel build config for `apps/vzhurudolu` (monorepo turbo build, `dist` output)
- [x] `trailingSlash: false` in `vercel.json`
- [x] Font CORS headers ported from `.htaccess`
- [x] `data/` and `files/` excluded from Vercel deploy
- [x] All Apache 301 redirects ported to `vercel.json`
- [x] Kurzy `/kurzy/*` consolidation in `vercel.json` (middleware does not run on static)
- [ ] Vercel preview deployment succeeds
- [ ] `verify-phase4-vercel.sh` passes 26/26 against live preview URL
- [x] FTP deploy workflow preserved as rollback path

## WARN / Known Omissions

- **www/HTTPS redirects:** Handled by Vercel project domain settings, not `vercel.json` (Apache `RewriteCond` rules omitted per plan)
- **mod_deflate / mod_expires / ETag:** Not ported — Vercel edge handles compression and caching
- **Internal `index.html` rewrite:** Not ported — Astro static dist + `trailingSlash: false` covers directory URLs
- **Font files:** May 404 on preview if fonts are not in `public/` (CORS check warns instead of failing if asset missing)

## After Human Gate Passes

1. Update this file: set `status: passed`, record `preview_url`, paste verify script output
2. Resume Plan 04-04 Task 3 (finalize VERIFICATION.md)
3. Run `/gsd-verify-work 4` to complete phase UAT

## Human Verification Items

### 1. Vercel project connected
**Expected:** Project exists with Root Directory `apps/vzhurudolu`, monorepo setting enabled, latest deploy green.

### 2. Preview redirect parity
**Expected:** `VERCEL_PREVIEW_URL=... bash scripts/verify-phase4-vercel.sh` exits 0 with 26/26 redirect samples.

### 3. Spot-check content pages
**Expected:** `/prirucka/css-flexbox` and `/blog/261-rok-2025` render on preview URL.
