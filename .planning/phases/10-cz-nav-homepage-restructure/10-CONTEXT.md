# Phase 10: CZ Nav & Homepage Restructure - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning
**Source:** v1.1 capture todo (user-approved milestone spec)

<domain>
## Phase Boundary

Czech site (`apps/vzhurudolu`) navigation and homepage layout changes per v1.1 spec. Does NOT include author box (Phase 11), EN parity (Phase 12), article detail UX (Phase 13), or `/martin` redesign (v1.2).

</domain>

<decisions>
## Implementation Decisions

### Header navigation
- Main nav: **Články**, **Knihy**, **Autor** only
- Remove **Podcast** and **Video** from header (currently in `packages/shared/components/Navigation.astro` CS defaults)
- **Autor** links to `/martin` (Czech lector page)

### Footer navigation
- Add **Podcast** and **Video** to footer nav (CS full footer in `Footer.astro`)
- Keep existing footer links where appropriate; Podcast+Video must be discoverable from footer only

### Homepage — remove podcast/YouTube band
- Remove entire `#podcast-youtube` section from `apps/vzhurudolu/src/pages/index.astro` (lines ~135–181)
- No podcast/YouTube image blocks in current positions

### Homepage — podcast under e-books
- After `#ebooky` section, add full-width podcast block
- Copy in **past tense** (podcast ended / historical)
- Link to **FrontKec** (external — confirm URL from existing site or use frontkec.cz / Spotify as on site)
- Full width layout (`.content-full` or equivalent VD pattern)

### Claude's Discretion
- Exact FrontKec URL and past-tense copy wording (keep concise, Czech)
- Whether Knihy points to `/ebooky` anchor or dedicated route — match existing “Knihy” intent
- Footer link order for Podcast/Video among existing footer links

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/shared/components/Navigation.astro` — CS default navItems (Články, Podcast, Knihy, Video)
- `packages/shared/components/Footer.astro` — CS footer link row
- `apps/vzhurudolu/src/pages/index.astro` — homepage with featured article, ebook promo aside, stream, podcast-youtube, ebooks, topics

### Established Patterns
- CS app uses shared Header/Footer without `site.config.ts` (defaults in shared components)
- Homepage uses VD grid: `.row`, `.col`, `.section`, `.content-full`
- E-books section: `#ebooky` with `.section-tall`

### Integration Points
- Update CS nav defaults OR add `apps/vzhurudolu/src/site.config.ts` if cleaner (prefer minimal change — nav defaults in Navigation.astro or vzhurudolu-specific override)
- Footer.astro CS branch for footer nav links

</code_context>

<specifics>
## Specific Ideas

- User spec 2026-06-09: „Podcast a Video do patičky“, „Hompeage: obrázky podcast a YouTube kanál pryč“, „pod e-booky, roztáhnout do šířky, minulý čas, odkaz na FrontKec“
- Preview: https://vd-web-2026.vercel.app/

</specifics>

<deferred>
## Deferred Ideas

- Author profile box on homepage → Phase 11
- EN homepage parity → Phase 12
- `/martin` page redesign → v1.2

</deferred>
