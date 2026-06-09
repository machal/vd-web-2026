# Phase 7: Content Adaptation — Pilot 8 + `/martin` - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning
**Mode:** Smart discuss — recommended defaults (autonomous continue)

<domain>
## Phase Boundary

Eight adapted pilot articles ship in English with editorial quality. `/martin` page already delivered in Phase 5 — verify/enhance only if gaps vs EN-05. Homepage gains curated "start here" links to key pilots. Replaces Phase 6 stub content with full adapted markdown.

**In scope:** 5 guide + 3 blog EN articles, attribution notes, author bylines → `/martin`, homepage start-here section.

**Out of scope:** Tags (Phase 8), legal pages (Phase 8), language pairing changes (Phase 6 done), remaining CS content.

</domain>

<decisions>
## Implementation Decisions

### Adaptation Workflow
- AI-assisted adaptation in Cursor from Czech source → human-quality EN draft; not literal 1:1 translation
- Source mapping: CS `prirucka` → EN `guide`, CS `blog` → EN `blog` with slugs from Phase 6 manifest
- Each article includes front matter: `pairId`, EN `title`, `description`, `date`, `author` → `/martin`, `adaptedFrom` attribution note linking CS original URL
- Images: reuse CS image paths where assets exist in shared public; update alt text to English

### Article Quality & Tone
- Global tech audience — adapt examples, metrics, cultural references for international readers
- Keep technical depth and Martin's voice; pragmatic Web Perf positioning
- Guide articles: instructional tone; blog: narrative/opinion tone preserved from CS originals
- Attribution footer: "Adapted from the Czech article [Title](https://www.vzhurudolu.cz/...)" on each pilot

### Pilot Selection & Homepage
- 8 pilots fixed per PROJECT.md (no changes to manifest pairIds)
- Homepage "start here": 3–4 curated links (webp, web-vitals, 2025-year-in-review, ai-saas) above unified stream
- Stub articles from Phase 6 replaced with full content at same slugs

### `/martin` Page
- Already complete in Phase 5 — only patch if verify finds EN-05 gaps; no full rewrite

### Claude's Discretion
- Exact adaptation depth per article (word count targets)
- Which homepage articles to feature in "start here"
- OG image selection per article

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- CS sources: `apps/vzhurudolu/src/content/prirucka/` and `blog/` for 8 pilots
- EN stubs: `apps/michalek-dev/src/content/guide/` and `blog/` with pairId from Phase 6
- Pairing manifest: `packages/shared/content-pairing/pairs.ts`
- vd-articles skill: `.cursor/skills/vd-articles-write-edit/SKILL.md` (CS conventions; EN uses guide collection)

### Established Patterns
- EN guide schema in `apps/michalek-dev/src/content/config.ts`
- ArticleHeader with author byline, LanguageSwitch from Phase 6
- Markdown pipeline with `/guide` prefix via createMarkdownConfig

### Integration Points
- Replace stub MD files in EN content dirs
- Update homepage `index.astro` with start-here section
- Verify pairing validator passes with published EN content (no more warn-only)

</code_context>

<specifics>
## Specific Ideas

- Pilot CS keys: prirucka `ai-saas`, `vibe-coding`, `email-inbox-zero`, `web-vitals`, `webp`; blog `261-rok-2025`, `254-ne`, `244-usetrite-utratite`
- EN slugs from Phase 6: `2025-year-in-review`, `saying-no`, `save-on-devs-spend-on-consultants` for blog

</specifics>

<deferred>
## Deferred Ideas

- Additional articles beyond 8 pilots
- css-mine.com cross-links (LINK-V2-01)
- Newsletter/Mailchimp EN forms

</deferred>
