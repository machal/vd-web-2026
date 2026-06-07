# Phase 3: Public Asset Audit (VD-05)

**Date:** 2026-06-07  
**App:** `apps/vzhurudolu`  
**Related decisions:** D-09, D-10, D-11, D-12  
**Requirement:** VD-05 — `public/` asset strategy preserves production behavior without build timeouts

---

## Build Timing

### Measurement protocol (D-10)

Command (clean build, turbo cache bypassed):

```bash
/usr/bin/time -p npx turbo run build --filter=@vd/vzhurudolu --force
```

Equivalent npm script: `npm run build:vzhurudolu -- --force`

Verification: `test -d apps/vzhurudolu/dist/_astro` — **present**

### Results (2026-06-07, local macOS)

| Metric | Value |
|--------|-------|
| Wall time (`real`) | **29.02 s** |
| Turbo reported | 26.08 s |
| Astro SSG (`[build] … built in`) | 24.77 s |
| Vite client bundle (`[vite] ✓ built in`) | 11.62 s |
| Sitemap generation | 871 URLs |
| Pages built | 877 |

### Pass/fail vs 5-minute threshold

| Threshold | Result |
|-----------|--------|
| 300 s (5 min) | **PASS** — build completes in ~29 s locally |

### Bottleneck analysis

- **Primary cost:** Astro SSG (~870 pages) and Vite bundling (~12 s), not the public copy step.
- **Copy plugin:** `[copy-public-to-dist] public/ zkopírováno do dist/` runs at end of Vite `closeBundle`; on this machine the full 685 MB copy adds negligible wall time relative to page generation (copy is fast on local SSD).
- **CI note:** Cached turbo replay measured **0.42 s** (`>>> FULL TURBO`) — not representative for CI cold builds. CI timing will be captured when `pr-build.yml` runs the full gate in Plan 03-04 (RESEARCH open question #3).

### D-11 preservation

`vitePluginCopyPublicToDist()` in `apps/vzhurudolu/astro.config.mjs` was **not modified**. Full `public/` tree continues to copy into `dist/` on every build.

---

## Public Inventory

Read-only inventory per RESEARCH Pattern 4. **No files under `public/data/` or `public/files/` were modified** (archiv rule).

### Commands

```bash
du -sh apps/vzhurudolu/public apps/vzhurudolu/public/* | sort -hr
find apps/vzhurudolu/public -type f | wc -l
```

### Size table

| Path | Size | Category | Notes |
|------|------|----------|-------|
| `public/` (total) | **685 MB** | — | Matches CONCERNS.md and RESEARCH verified inventory |
| `public/assets/` | 501 MB | Active | CSS, JS, fonts, SCSS, images — production-critical |
| `public/data/` | 128 MB | Archive | Legacy blog HTML — **do not modify** (`.cursor/rules/archiv-public-data-files.md`) |
| `public/files/` | 23 MB | Archive | Legacy downloads — **do not modify** |
| `public/prirucka/` | 34 MB | Active | Příručka static images |
| `public/.htaccess` | 13.7 KB | Active | 311 lines; Apache redirects; copied to dist by plugin |
| `public/favicon*` | ~124 KB | Active | Icons (`favicon/` + `favicon.ico`) |
| Other root files | <100 KB | Active | `robots.txt`, `sw.js`, `offline.html`, etc. |

**File count:** 7,303 files under `public/`

### Archive policy (D-09)

- `public/data/` and `public/files/` are **read-only archives** of very old blog content.
- Phase 3 scope: inventory and categorization only — **no deletion or modification**.

---

## Dist Output

Post-build measurements:

```bash
du -sh apps/vzhurudolu/dist
test -f apps/vzhurudolu/dist/.htaccess
```

| Artifact | Size / status |
|----------|---------------|
| `dist/` (total) | **807 MB** |
| `dist/_astro/` | Present (JS/CSS bundles) |
| `dist/.htaccess` | **Present** (13,707 bytes) |
| `dist/sitemap.xml` | Present (871 URLs) |

Dist is larger than `public/` because it includes ~877 generated HTML pages plus bundled assets in `_astro/`.

---

## FTP Deploy Exclusions

Source: `.github/workflows/deploy-ftp.yml`

FTP-Deploy-Action uploads `./apps/vzhurudolu/dist/` with exclusions:

```yaml
exclude: |
  **/data/**
  **/files/**
```

### Deploy vs build gap (D-11)

| Stage | `data/` + `files/` |
|-------|---------------------|
| Build (`vitePluginCopyPublicToDist`) | **Copied to dist/** (~151 MB archives) |
| FTP deploy | **Excluded from upload** |

Production FTP host serves archive paths from server-side copies already present; fresh deploys skip re-uploading ~151 MB. Local/CI builds still copy archives into `dist/` every time — documented optimization gap for Phase 4+.

---

## Recommendations (Phase 4+)

No implementation in Phase 3 — parity first per D-11.

### 1. Selective `public/` copy for Vercel deploy

Exclude `data/` and `files/` from Vercel artifact while preserving URLs via existing server-side archive hosting or CDN. Aligns build output size with FTP deploy strategy.

### 2. `vercel.json` redirect port (D-13 — out of scope here)

Port 311-line `public/.htaccess` redirect rules to `vercel.json` during Phase 4 Vercel migration. Dist `.htaccess` presence confirms source file parity; redirect behavior tested against production in Plan 03-03.

### 3. Build cache strategy if CI exceeds 5 minutes

- Enable turbo remote cache in CI if cold builds approach 5-minute threshold.
- Consider excluding archive subtrees from copy plugin once Vercel/hosting strategy confirmed.
- Monitor `[copy-public-to-dist]` duration separately in CI logs.

### RESEARCH open question #3 resolution

| Environment | Build time | Status |
|-------------|------------|--------|
| Local cold (`--force`) | 29.02 s | **Recorded** |
| Local turbo cache hit | 0.42 s | Not representative |
| CI (`pr-build.yml`) | Pending | Captured in Plan 03-04 |

---

## VD-05 Verdict

**VD-05: SATISFIED**

- 685 MB `public/` strategy documented with live disk measurements and archive categorization.
- Build completes well under 5-minute threshold locally (29 s vs 300 s limit).
- `vitePluginCopyPublicToDist()` behavior unchanged (D-11).
- FTP exclusion vs dist copy gap documented with Phase 4+ mitigation paths.
- No modifications to `public/data/` or `public/files/` archives.

---

*Audit deliverable for Phase 3 Plan 01 (D-12). Optimization deferred to Phase 4+.*
