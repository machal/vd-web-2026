# Phase 3: Czech Site Parity Verification - Context

**Gathered:** 2026-06-07
**Status:** Ready for planning
**Mode:** Smart discuss (autonomous — user accepted all recommendations)

<domain>
## Phase Boundary

Verify that the Czech site built from `apps/vzhurudolu` in the monorepo matches current production behavior (`vzhurudolu.cz`) before any Vercel hosting changes. Deliver automated parity gates (URL inventory, redirects, internal link integrity), a `public/` asset audit (~685 MB), and spot-check verification — not Vercel migration, not EN app, not redirect port from `.htaccess`.

</domain>

<decisions>
## Implementation Decisions

### Parity Comparison Methodology
- **D-01:** Compare URL inventory + HTTP status + redirect chains against live `vzhurudolu.cz` (not full HTML diff of all pages).
- **D-02:** Live FTP production (`vzhurudolu.cz`) is the source of truth baseline.
- **D-03:** Pass criteria: zero broken internal links in `dist/`, top `.htaccess` redirects behave identically, draft slugs absent from output (carried from Phase 1).
- **D-04:** Primary gate: CI script `scripts/verify-phase3-parity.sh` plus manual spot-check of a URL sample.

### Link Checker
- **D-05:** Scope: internal links only within `apps/vzhurudolu/dist/` (blog, příručka, podcast, static pages).
- **D-06:** Tool: `linkinator` or `lychee` run against dist after build.
- **D-07:** Ignore: `#anchors`, `mailto:`, `data:` URIs, legacy `/style/` preview paths.
- **D-08:** CI: add link check as optional step in `pr-build.yml` (fail on 404); full CI gate can harden in Phase 4.

### Public Asset Audit (685 MB)
- **D-09:** Audit scope: inventory + categorization (`public/data/` archives vs active assets) — no deletion in Phase 3.
- **D-10:** Verify turbo build completes under 5 minutes; document bottleneck if not.
- **D-11:** Keep existing `vitePluginCopyPublicToDist()` behavior — parity first, optimization deferred to Phase 4+.
- **D-12:** Deliverable: `03-PUBLIC-ASSET-AUDIT.md` with size table and recommendations.

### Phase Scope Boundaries
- **D-13:** Vercel redirects and `.htaccess` → `vercel.json` port: out of scope (Phase 4).
- **D-14:** EN app (`michalek.dev`): out of scope — only `apps/vzhurudolu`.
- **D-15:** Visual verification: spot-check 5 pages (homepage, blog article, příručka article, podcast episode, kurz page) — not pixel-perfect Percy/Chromatic.
- **D-16:** On phase pass, Phase 4 (Vercel migration) may proceed without re-running Phase 2.

### Carried Forward
- **D-17:** Phase 2 move-only extraction complete; Phase 3 validates VD-01 deferred from D-11.
- **D-18:** Existing gates remain: `verify-phase1-build.sh`, `verify-phase2-extraction.sh` must stay green.

### Claude's Discretion
- Exact link checker tool choice (`linkinator` vs `lychee`) based on install footprint and CI compatibility
- URL sample size for redirect comparison (top N from `.htaccess` inventory)
- Which 5 spot-check URLs to document in verification plan

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/PROJECT.md` — Czech-first sequencing, pragmatic CWV
- `.planning/REQUIREMENTS.md` — VD-01, VD-05
- `.planning/ROADMAP.md` — Phase 3 goal and success criteria

### Phase 2 Outcomes
- `.planning/phases/02-shared-packages-extraction/02-CONTEXT.md` — D-11 deferred parity to Phase 3
- `.planning/phases/02-shared-packages-extraction/02-05-SUMMARY.md` — handoff to VD-01

### Research & Codebase
- `.planning/research/PITFALLS.md` — markdown pipeline regression, public/ copy timeout
- `.planning/codebase/CONCERNS.md` — 685 MB public/, copy plugin, RSS parity gaps
- `.planning/codebase/ARCHITECTURE.md` — build pipeline, content collections
- `scripts/verify-phase1-build.sh`, `scripts/verify-phase2-extraction.sh` — existing gates
- `apps/vzhurudolu/astro.config.mjs` — copy-public plugin
- `apps/vzhurudolu/public/` — asset audit target

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/verify-phase1-build.sh` — dist/_astro/, draft exclusion, sitemap checks
- `scripts/verify-phase2-extraction.sh` — stale-path negation after @vd/shared extraction
- `.github/workflows/pr-build.yml` — CI build entry point

### Established Patterns
- Shell-based verify gates (no unit test framework yet)
- `npx turbo run build --filter=@vd/vzhurudolu` as standard build command
- Draft filtering via `isPublished()` — strict `published === true`

### Integration Points
- New `scripts/verify-phase3-parity.sh` composes Phase 1+2 gates + link check
- Optional `pr-build.yml` step for linkinator/lychee
- `03-PUBLIC-ASSET-AUDIT.md` as planning artifact in phase directory

</code_context>

<specifics>
## Specific Ideas

- User accepted all smart-discuss recommendations in one batch (autonomous mode).
- Production baseline is live vzhurudolu.cz, not local dist snapshot.

</specifics>

<deferred>
## Deferred Ideas

- Full HTML diff of all pages — too expensive; URL/status/redirect sufficient
- Percy/Chromatic visual regression — spot-check only
- Remove `public/data/` archives — document in audit, act in Phase 4+
- Vercel redirect port — Phase 4
- EN app parity — Phase 5+

</deferred>

---

*Phase: 03-Czech Site Parity Verification*
*Context gathered: 2026-06-07 via autonomous smart discuss*
