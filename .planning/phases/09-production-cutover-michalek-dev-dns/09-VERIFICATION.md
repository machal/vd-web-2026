---
status: human_needed
phase: 09-production-cutover-michalek-dev-dns
requirements: [DEPLOY-02, DEPLOY-03, DEPLOY-04]
updated: 2026-06-09
cutover_date: null
---

# Phase 9 Verification: Production Cutover — michalek.blog + DNS

## Status

**human_needed** — Rollback runbook, production smoke script, and FTP workflow archive are in repo. **DNS cutover was blocked until v1.1 visual polish (Phases 10–14).** After Phase 14 `verify-phase14-v1-1-visual-polish.sh` passes and LAUNCH-01 UAT is signed off, DNS cutover and Vercel production domain attach may proceed (human action at registrar and Vercel dashboard).

| Check | Status |
|-------|--------|
| `docs/ROLLBACK.md` rollback runbook | ✅ |
| `scripts/verify-phase9-cutover.sh` | ✅ (run after DNS points to Vercel) |
| FTP auto-deploy disabled; archive preserved | ✅ |
| TTL reduced 24–48 h before switch | ⏳ **Human needed** |
| `www.vzhurudolu.cz` production domain on Vercel | ⏳ **Human needed** |
| `michalek.blog` production domain on Vercel | ⏳ **Human needed** |
| Post-cutover smoke tests pass | ⏳ **Human needed** |
| 48 h stable soak before deleting FTP secrets | ⏳ **Human needed** |

## Staged DNS cutover (DEPLOY-02)

**Simultaneous cutover** for both domains (per PROJECT.md). Do not switch one domain weeks before the other unless intentionally testing.

### Pre-cutover (T−48 h to T−24 h)

1. At DNS registrar for **vzhurudolu.cz** and **michalek.blog**, reduce TTL on apex and `www` records to **300–600 seconds**.
2. Confirm both Vercel projects build green on production branch (`michalek-dev` or your chosen branch).
3. Run preview smoke checks if Deployment Protection allows (browser) or temporarily use preview URLs:
   ```bash
   VZHURUDOLU_URL=https://YOUR-CS-PREVIEW.vercel.app \
   MICHALEK_DEV_URL=https://YOUR-EN-PREVIEW.vercel.app \
   bash scripts/verify-phase9-cutover.sh
   ```

### Cutover day (T0)

1. Attach production domains in Vercel (steps below).
2. Update DNS at registrar to Vercel-provided records (paste exact values from dashboard — do not guess):
3. Wait for propagation; verify with `dig +short vzhurudolu.cz` / `dig +short www.vzhurudolu.cz` / `dig +short michalek.blog`.
4. Run production smoke tests:
   ```bash
   bash scripts/verify-phase9-cutover.sh
   ```
   Override bases if needed:
   ```bash
   VZHURUDOLU_URL=https://www.vzhurudolu.cz \
   MICHALEK_DEV_URL=https://michalek.blog \
   bash scripts/verify-phase9-cutover.sh
   ```
5. Browser spot-check: CS homepage, `/prirucka/css-flexbox`, legacy redirect `/p/css-flexbox`; EN `/`, `/martin`, `/guide/webp`, language switch on paired article.
6. If failures are critical, follow `docs/ROLLBACK.md` within 48 h window.

### Post-cutover (T+48 h stable)

1. Restore normal DNS TTL (e.g. 3600 s or registrar default).
2. Confirm FTP workflow remains disabled (auto-deploy off; manual rollback via Actions if needed).
3. Update this file: set `status: passed`, fill `cutover_date`, check ROADMAP criteria below.
4. Only then consider removing GitHub FTP secrets (optional; rollback needs them until you accept Vercel-only ops).

## Vercel production domain attach

### Project 1 — Czech site (`vzhuru-dolu-2026`)

| Setting | Value |
|---------|-------|
| Root Directory | `apps/vzhurudolu` |
| Monorepo | Include source files outside root **ON** |
| Production branch | `michalek-dev` (confirm in dashboard) |

**Domains → Add:**

1. `www.vzhurudolu.cz` (primary — canonical in HTML/sitemap)
2. `vzhurudolu.cz` → redirect to `www.vzhurudolu.cz` (Vercel domain redirect + `vercel.json` host rule)

**DNS records (copy from Vercel Domains UI — examples only):**

| Host | Type | Value (from Vercel) |
|------|------|---------------------|
| `@` | A | `76.76.21.21` (verify in dashboard) |
| `www` | CNAME | `cname.vercel-dns.com` (verify in dashboard) |

Prior state: production on **FTP/Apache**; Vercel preview connected Phase 4 — see `04-VERIFICATION.md`.

### Project 2 — English site (`michalek-dev`)

| Setting | Value |
|---------|-------|
| Root Directory | `apps/michalek-dev` |
| Monorepo | Include source files outside root **ON** |

**Domains → Add:**

1. `michalek.blog` (primary — canonical in HTML/sitemap)
2. `michalek.dev` → redirect to `michalek.blog` (attach when ready; `vercel.json` host rule prepared)
3. `www.michalek.dev` → redirect to `michalek.blog` (optional)

**DNS records (copy from Vercel Domains UI):**

| Host | Type | Value (from Vercel) |
|------|------|---------------------|
| `@` | A | _(paste from Vercel)_ |
| `www` | CNAME | _(paste from Vercel)_ |

Prior state: EN project may need initial dashboard connect — see `05-VERIFICATION.md` steps 1–5 before attaching production domain.

## FTP retirement (DEPLOY-03)

- Auto-deploy on push **disabled** — active workflow is manual-only stub; full workflow at `.github/workflows/archived/deploy-ftp.yml`
- Rollback: `docs/ROLLBACK.md` §2
- **Do not delete** `FTP_*` GitHub secrets until post-cutover soak confirmed

## Rollback (DEPLOY-04)

See **`docs/ROLLBACK.md`** at repo root:

1. Revert DNS to pre-Vercel records
2. Re-enable FTP deploy (manual workflow or restore archived YAML)
3. Optionally promote previous Vercel deployment

## ROADMAP success criteria

- [ ] `www.vzhurudolu.cz` and `michalek.blog` serve from Vercel via staged DNS (TTL reduced before switch)
- [ ] FTP deploy workflow removed/disabled after successful Vercel soak
- [ ] Rollback path documented and verified readable (`docs/ROLLBACK.md`)

## Resume signal

After DNS cutover and smoke tests pass, reply with cutover date and `verify-phase9-cutover.sh` output summary to set `status: passed`.
