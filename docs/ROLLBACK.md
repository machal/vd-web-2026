# Production Rollback Runbook

Use this runbook if the Vercel production cutover (Phase 9) causes critical failures on `www.vzhurudolu.cz` or `michalek.blog`. Target recovery window: **within 48 hours** of DNS switch while old TTL caches expire.

## When to rollback

- Widespread 5xx or blank pages on either production domain after DNS cutover
- Critical redirect chains broken (legacy `/p/`, `/prirucka/`, e-book paths on CS site)
- EN site unreachable or serving wrong project/build
- RSS, sitemap, or core article routes failing production smoke tests

Run `bash scripts/verify-phase9-cutover.sh` first to capture which checks fail.

## 1. Revert DNS (fastest path)

At your domain registrar / DNS provider for **both** domains:

1. Restore the **previous DNS records** that pointed to FTP/Apache hosting (before Vercel cutover).
2. Keep reduced TTL (300–600 s) until stable for 24 h, then restore normal TTL.
3. Wait for propagation (typically 5–30 min with low TTL; up to prior TTL max if not reduced).

Record restored values here after rollback:

| Domain | Record type | Name | Value (restored) | TTL |
|--------|-------------|------|------------------|-----|
| vzhurudolu.cz | | | (redirects to www) | |
| www.vzhurudolu.cz | | | | |
| michalek.dev | | | (redirects to michalek.blog) | |
| michalek.blog | | | | |

Apache/FTP production continues to serve CS content from `www/project/` with `public/.htaccess` redirects until you cut over again.

## 2. Re-enable FTP deploy (CS site)

FTP auto-deploy was **disabled** in Phase 9. The full workflow is preserved at:

`.github/workflows/archived/deploy-ftp.yml`

**Option A — Manual emergency deploy (no file change):**

1. GitHub → Actions → **Deploy na FTP (manual rollback only)**
2. Run workflow on `main` / `michalek-dev` (whichever branch you deploy from)
3. Confirm deploy completes and `apps/vzhurudolu/dist/` uploads to `www/project/`

**Option B — Restore automatic FTP on push:**

1. Copy archived workflow back:
   ```bash
   cp .github/workflows/archived/deploy-ftp.yml .github/workflows/deploy-ftp.yml
   ```
2. Commit and push — FTP deploy runs on next push to `main`/`master`
3. Or trigger manually once via Actions after restore

**GitHub secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` are **intentionally kept** until you confirm stable Vercel production. Do not delete secrets during rollback.

## 3. Redeploy previous Vercel build (optional)

If DNS stays on Vercel but a bad deployment shipped:

1. Vercel Dashboard → project (`vzhuru-dolu-2026` or `michalek-dev`)
2. Deployments → select last known-good deployment → **Promote to Production**
3. Re-run `bash scripts/verify-phase9-cutover.sh`

This does **not** fix DNS mispointing — use section 1 if domains should return to FTP.

## 4. Verify recovery

```bash
# After DNS revert to FTP (CS only on Apache):
VZHURUDOLU_URL=https://www.vzhurudolu.cz bash scripts/verify-phase9-cutover.sh

# After Vercel promote (both domains still on Vercel):
bash scripts/verify-phase9-cutover.sh
```

Update `.planning/phases/09-production-cutover-michalek-dev-dns/09-VERIFICATION.md` with rollback date, cause, and checks passed.

## 5. Re-attempt cutover

1. Fix root cause on Vercel preview deployments
2. Re-run Phase 4/8 verify scripts against preview URLs if needed
3. Follow staged DNS steps in `09-VERIFICATION.md` (TTL reduction → switch → smoke test)
4. Only after **48 h stable** production: confirm FTP workflow stays disabled and consider removing FTP secrets (human decision)

## Reference

| Asset | Location |
|-------|----------|
| Phase 9 verification checklist | `.planning/phases/09-production-cutover-michalek-dev-dns/09-VERIFICATION.md` |
| Production smoke tests | `scripts/verify-phase9-cutover.sh` |
| Archived FTP workflow | `.github/workflows/archived/deploy-ftp.yml` |
| CS Vercel config | `apps/vzhurudolu/vercel.json` |
| EN Vercel config | `apps/michalek-dev/vercel.json` |
| Phase 4 CS preview notes | `.planning/phases/04-vercel-migration-czech-site/04-VERIFICATION.md` |
