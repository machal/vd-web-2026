# Phase 4: Vercel Migration — Czech Site - Context

**Gathered:** 2026-06-07
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure phase — smart discuss skipped)

<domain>
## Phase Boundary

Czech site serves from Vercel with ported redirects while FTP remains rollback path. Port 311-line `public/.htaccess` redirect rules to `vercel.json`, configure Vercel project for `apps/vzhurudolu`, validate preview matches production URL behavior (redirects, trailing slashes, security headers). FTP deploy workflow stays as rollback until Phase 9 cutover.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — pure infrastructure phase. Use ROADMAP success criteria, Phase 3 audit (`03-PUBLIC-ASSET-AUDIT.md`, `verify-phase3-parity.sh`), and existing `.htaccess` inventory as source of truth. Prefer mechanical port of redirect rules over reinterpretation.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `apps/vzhurudolu/public/.htaccess` — 311 lines, 57 Redirect/RewriteRule directives (source for vercel.json)
- `scripts/verify-phase3-parity.sh` — redirect sample matrix (26 samples), extend for Vercel preview URL
- `scripts/redirect-samples.txt` — curated production redirect test cases
- `.github/workflows/deploy-ftp.yml` — existing FTP deploy (keep as rollback)
- Phase 3 gate: sitemap parity, linkinator, dist/.htaccess presence

### Established Patterns
- Shell verification gates (`verify-phase1-build.sh`, `verify-phase2-extraction.sh`, `verify-phase3-parity.sh`)
- Turbo monorepo build: `npm run build:vzhurudolu`
- Copy plugin copies full `public/` to dist including `.htaccess`

### Integration Points
- Vercel project root: `apps/vzhurudolu`
- `vercel.json` at app or repo root (follow monorepo convention from research)
- CI: `pr-build.yml` already runs build + link check

</code_context>

<specifics>
## Specific Ideas

No specific requirements — infrastructure phase. Reference D-13 from Phase 3 research. Do not modify `public/data/` or `public/files/` archive exclusions beyond what audit documented.

</specifics>

<deferred>
## Deferred Ideas

- DNS cutover and FTP retirement — Phase 9
- English app Vercel project — Phase 5
- Selective public/ copy optimization — post-launch if needed

</deferred>
