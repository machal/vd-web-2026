# Production Rollback Runbook

Use this runbook if production on `www.vzhurudolu.cz` or `michalek.blog` has critical failures after a Vercel deployment or DNS change.

## When to rollback

- Widespread 5xx or blank pages on either production domain
- Critical redirect chains broken (legacy `/p/`, `/prirucka/`, e-book paths on CS site)
- EN site unreachable or serving wrong project/build
- RSS, sitemap, or core article routes failing production smoke tests

Run `bash scripts/verify-phase9-cutover.sh` first to capture which checks fail.

## 1. Promote previous Vercel build (fastest — DNS stays on Vercel)

If a bad deployment shipped but DNS is correct:

1. Vercel Dashboard → project (`vzhuru-dolu-2026` or EN project for `michalek.blog`)
2. Deployments → select last known-good deployment → **Promote to Production**
3. Re-run smoke tests:

```bash
bash scripts/verify-phase9-cutover.sh
```

## 2. Revert DNS (if domains must leave Vercel)

At your domain registrar / DNS provider for **both** domains:

1. Restore the **previous DNS records** (before Vercel cutover).
2. Keep reduced TTL (300–600 s) until stable for 24 h, then restore normal TTL.
3. Wait for propagation (typically 5–30 min with low TTL).

Record restored values here after rollback:

| Domain | Record type | Name | Value (restored) | TTL |
|--------|-------------|------|------------------|-----|
| vzhurudolu.cz | | | | |
| www.vzhurudolu.cz | | | | |
| michalek.dev | | | | |
| michalek.blog | | | | |

Legacy Apache/FTP hosting is **no longer maintained from this repo**. If you revert DNS, you need a separate backup of the old hosting tree or a manual redeploy outside this repository.

## 3. Verify recovery

```bash
VZHURUDOLU_URL=https://www.vzhurudolu.cz \
MICHALEK_DEV_URL=https://michalek.blog \
bash scripts/verify-phase9-cutover.sh
```

Note rollback date, cause, and checks passed in your deploy log or PR/issue.

## 4. Re-attempt cutover / redeploy

1. Fix root cause on preview deployments
2. Re-run verify scripts against preview URLs if needed
3. For DNS changes: reduce TTL → switch → smoke test → restore TTL after stable soak

## Reference

| Asset | Location |
|-------|----------|
| Production smoke tests | `scripts/verify-phase9-cutover.sh` |
| CS Vercel config | `apps/vzhurudolu/vercel.json` |
| EN Vercel config | `apps/michalek-dev/vercel.json` |
