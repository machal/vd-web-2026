# Phase 7 Verification: Content Adaptation — Pilot 8 + `/martin`

**Status:** passed  
**Verified:** 2026-06-09  
**Gate:** `bash scripts/verify-phase6-content-pairing-i18n-seo.sh` + EN build

## Automated Checks

| Check | Result |
|-------|--------|
| `node scripts/validate-content-pairs.mjs` | PASS — 9 pairs, frontmatter cross-check |
| `npm run build -w @vd/michalek-dev` | PASS — 13 pages including 8 pilot articles |
| `bash scripts/verify-phase6-content-pairing-i18n-seo.sh` | PASS |
| EN `guide/webp` author byline → `/martin` | PASS |
| EN `guide/webp` attribution footer to CS original | PASS |
| EN homepage "Start here" curated links (4) | PASS |
| EN `/martin` EN-05 (bio, services, logos, LinkedIn, PageSpeed.ONE) | PASS — no patch needed (Phase 5 complete) |

## Pilot Articles Delivered

| pairId | EN path | CS source |
|--------|---------|-----------|
| webp | `/guide/webp` | `prirucka/webp` |
| web-vitals | `/guide/web-vitals` | `prirucka/web-vitals` |
| ai-saas | `/guide/ai-saas` | `prirucka/ai-saas` |
| vibe-coding | `/guide/vibe-coding` | `prirucka/vibe-coding` |
| email-inbox-zero | `/guide/email-inbox-zero` | `prirucka/email-inbox-zero` |
| rok-2025 | `/blog/2025-year-in-review` | `blog/261-rok-2025` |
| saying-no | `/blog/saying-no` | `blog/254-ne` |
| save-spend | `/blog/save-on-devs-spend-on-consultants` | `blog/244-usetrite-utratite` |

Each article includes: `pairId`, EN `title`/`description`, original `date`, `author` byline → `/martin`, adapted body, and attribution note linking the Czech original on vzhurudolu.cz.

## Requirements Covered

- CONT-01: 5 guide articles adapted
- CONT-02: 3 blog articles adapted
- CONT-03: `/martin` verified (EN-05 — no gaps)
- CONT-04: Homepage start-here section
- CONT-05: Attribution notes on all pilots
- CONT-06: Author bylines linking to `/martin`
- CONT-07: Phase 6 pairing validator passes with full EN content

## Notes

- Guide pilot WebP assets copied to `apps/michalek-dev/public/prirucka/images/` from CS build output
- Phase 6 stub placeholders fully replaced at same EN slugs
- Executed from 07-CONTEXT.md (PLAN.md files not yet generated)

## Self-Check: PASSED

- All 8 EN content files exist under `apps/michalek-dev/src/content/`
- Homepage start-here section in `index.astro`
- verify:phase6 and EN build exit 0
