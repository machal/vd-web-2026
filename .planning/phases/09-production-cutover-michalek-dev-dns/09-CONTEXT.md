# Phase 9: Production Cutover — michalek.dev + DNS - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning
**Mode:** Smart discuss — recommended defaults (autonomous continue)

<domain>
## Phase Boundary

Both domains live on Vercel with FTP retired and documented rollback. Staged DNS cutover for `vzhurudolu.cz` and `michalek.dev`, production domain attach on both Vercel projects, FTP deploy workflow disabled/archived, rollback runbook written.

**Human gates expected:** DNS TTL reduction, Vercel domain attach, production verification, FTP disable approval.

</domain>

<decisions>
## Implementation Decisions

### DNS Cutover Strategy
- Staged cutover: reduce TTL 24–48h before switch per DEPLOY-02
- `vzhurudolu.cz` → Vercel project 1 (`apps/vzhurudolu`) — may already be on preview from Phase 4
- `michalek.dev` → Vercel project 2 (`apps/michalek-dev`) — attach production domain
- Document exact DNS records (A/CNAME) from Vercel dashboard for both domains

### FTP Retirement
- Disable or archive `.github/workflows/deploy-ftp.yml` — keep file with comment explaining rollback path
- Do NOT delete FTP credentials from GitHub secrets until human confirms stable production (document in runbook)
- Rollback: re-enable FTP workflow + revert DNS if critical failure within 48h window

### Verification & Rollback
- `verify-phase9-cutover.sh` — production URL checks: homepage, sample redirects (CS), sample EN routes, RSS, sitemap
- `09-VERIFICATION.md` with `human_needed` for DNS + domain attach steps
- Rollback runbook in phase VERIFICATION or `docs/ROLLBACK.md` at repo root

### Claude's Discretion
- Whether to add production smoke test to PR CI (probably not — manual only)
- Exact FTP workflow handling (disable vs archive vs rename)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `apps/vzhurudolu/vercel.json` — 56 redirects ported Phase 4
- `04-VERIFICATION.md`, `05-VERIFICATION.md` — Vercel dashboard setup docs
- `scripts/verify-phase4-vercel.sh`, `verify-phase8-launch-polish.sh` — patterns for production verify
- `.github/workflows/deploy-ftp.yml` — FTP deploy to retire

### Established Patterns
- Human gate documentation in VERIFICATION.md
- Phase verify scripts + PR CI for automated checks only

### Integration Points
- Vercel dashboard: both projects production domains
- DNS registrar for vzhurudolu.cz and michalek.dev
- GitHub Actions: FTP workflow disable

</code_context>

<specifics>
## Specific Ideas

- Simultaneous cutover for both domains per PROJECT.md key decision
- FTP remains rollback until human confirms stable production

</specifics>

<deferred>
## Deferred Ideas

- CDN edge config beyond Vercel defaults
- Multi-region deployment

</deferred>
