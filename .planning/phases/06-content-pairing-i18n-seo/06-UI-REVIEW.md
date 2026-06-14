# Phase 6 — UI Review

**Audited:** 2026-06-09  
**Baseline:** `06-UI-SPEC.md` (LanguageSwitch placement, labels, visibility)  
**Screenshots:** not captured (no dev server on ports 3000, 4321, 5173, 8080)  
**Mode:** Advisory only — functional pairing and labels pass verify gate; visual contract has gaps

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Native labels **English** / **Česky** locked correctly; unpaired pages omit markup |
| 2. Visuals | 2/4 | Article switch lives inside dark `.page-subhead` flex row beside author meta, not tertiary row below header |
| 3. Color | 2/4 | Inherits white-on-dark from `.page-subhead` instead of muted `text-color-lightest` on content background |
| 4. Typography | 2/4 | Missing `.f-6` label tier; inherits `0.9rem` from `.page-subhead` on articles |
| 5. Spacing | 2/4 | Missing `ta-c mb-1` utilities; no 16px gap before `.content` on article or `/martin` pages |
| 6. Experience Design | 3/4 | Conditional render and cross-domain links work; minor a11y markup gaps |

**Overall: 15/24**

---

## Top 3 Priority Fixes

1. **Move LanguageSwitch below `ArticleHeader`, not inside `.page-subhead`** — Switch currently slots into `ArticleHeader.astro` inside the dark author band (`display: flex` row), so it sits beside avatar/name/date on a semi-transparent bar instead of centered on the content background between header and body. User impact: wrong visual hierarchy; switch competes with author meta. Fix: remove `languageSwitch` slot from `ArticleHeader.astro`; in each article template render `{alternate && <LanguageSwitch … />}` immediately after `</ArticleHeader>` and before `<div class="content">` per UI-SPEC placement diagram.

2. **Align `LanguageSwitch.astro` markup with UI-SPEC utility classes** — Component omits `ta-c mb-1`, `f-6 text-color-lightest`, `language-switch__inner`, `language-switch__link`, `lang` attributes, and `aria-hidden` separator wrapper; reuses `page-subhead__meta` on the inner `<p>`. User impact: wrong size, color, and spacing on all routes including `/martin`. Fix: replace inner markup with the locked contract from `06-UI-SPEC.md` lines 64–76.

3. **Add default utility classes on `/martin` pages** — CS and EN `martin.astro` placement (after `lector__head`, before content) matches spec structurally, but `<LanguageSwitch>` is rendered without `className="ta-c mb-1"`. User impact: switch may left-align and sit flush against hero without 16px breathing room. Fix: pass `className="ta-c mb-1"` or bake defaults into the component.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

**PASS — labels and visibility rules match contract.**

| Check | Status | Evidence |
|-------|--------|----------|
| CS current label | ✓ | `LanguageSwitch.astro:11` → `Česky` |
| CS alternate label | ✓ | `LanguageSwitch.astro:11` → `English` |
| EN current label | ✓ | `LanguageSwitch.astro:12` → `English` |
| EN alternate label | ✓ | `LanguageSwitch.astro:12` → `Česky` |
| No translated variants | ✓ | No "Czech", "Anglicky", flags, or globe icons |
| `aria-label` | ✓ | `LanguageSwitch.astro:19` → `"Language"` |
| Unpaired = no markup | ✓ | `{alternateUrl && (` guard at line 18; pages pass `alternate?.href` |
| No header/footer switch | ✓ | Grep on `Header.astro` / `Footer.astro` — no matches |
| Phase 5 placeholder removed | ✓ | No `<!-- language-switch: Phase 6 -->` in app source |

**Minor note (not scored down):** Descriptive link text uses language names, not generic CTAs — correct per copywriting contract.

---

### Pillar 2: Visuals (2/4)

**WARNING — placement breaks specified tertiary hierarchy on article pages.**

**Finding 1 (WARNING): Article switch inside dark subhead band**

UI-SPEC requires switch **after** entire `ArticleHeader`, **before** `.content`, on content background as tertiary metadata. Implementation slots switch **inside** `.page-subhead`:

```25:41:packages/shared/components/ArticleHeader.astro
<div class="page-subhead">
  <p class="mb-0 page-subhead__meta">
    ...
  </p>
  <slot name="languageSwitch" />
</div>
```

`.page-subhead` is `display: flex; flex-direction: row` (`page-subhead.css:1-10`), so author `<p>` and `<nav class="language-switch">` render **side by side** in the dark band — not a separate centered row below meta.

**Finding 2 (WARNING): `/martin` placement correct, styling incomplete**

Both `apps/vzhurudolu/src/pages/martin.astro:72` and `apps/michalek-dev/src/pages/martin.astro:78` place switch after `lector__head` and before `<main>`/content — structurally aligned with spec. Missing `ta-c` centering prevents confirmed visual parity with article pages.

**Finding 3:** No icons, buttons, badges, or dropdown — text-only switch per spec ✓

---

### Pillar 3: Color (2/4)

**WARNING — wrong color surface on article pages.**

| Element | Spec | Actual |
|---------|------|--------|
| Switch surface | Content bg `#fcfcf7` | Dark band `rgba(46,44,9,0.6)` via parent `.page-subhead` |
| Current text | `.text-color-lightest` (muted on light) | Inherits `color: #fff` from `.page-subhead` |
| Alternate link | Accent `--vd-link-color` on light bg | Link inside white-text context; accent differentiation unclear |
| Separator | Muted, not accent | Raw ` · ` text, no dedicated class |

Component uses `page-subhead__meta` on inner `<p>` (`LanguageSwitch.astro:20`) — explicitly ties switch to author-meta styling instead of label-tier muted text.

No hardcoded hex in component — colors come from wrong inherited context.

---

### Pillar 4: Typography (2/4)

**WARNING — label tier not applied.**

| Spec | Actual |
|------|--------|
| `.f-6` (13px / 0.8rem label tier) | Not present on switch markup |
| Weight 400 | Inherited (acceptable) |
| Article size | Inherits `.page-subhead { font-size: 0.9rem }` (~14.4px) |
| `/martin` size | Likely body default 16px without `.f-6` |

Spec: "LanguageSwitch uses **Label** tier only" — not enforced in component.

---

### Pillar 5: Spacing (2/4)

**WARNING — spacing utilities missing.**

| Token | Spec class | Article pages | `/martin` |
|-------|------------|---------------|-----------|
| 16px gap below switch | `mb-1` on `<nav>` | Missing | Missing |
| Centered | `ta-c` on `<nav>` | Missing (relies on subhead flex) | Missing |

UI-SPEC: "`mb-1` (16px) on switch; article `.content` keeps existing top spacing unchanged." Without `mb-1`, vertical rhythm between switch and article body is undefined.

No arbitrary `[Npx]` spacing found in component — good, but wrong/missing standard utilities.

---

### Pillar 6: Experience Design (3/4)

**Good conditional visibility and navigation; minor accessibility gaps.**

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Render only when paired | ✓ | `alternateUrl &&` guard |
| No disabled/placeholder state | ✓ | Renders nothing when unpaired |
| Cross-origin absolute URL | ✓ | `resolveAlternate()` → `alternate?.href` in all 6 wired pages |
| `rel="alternate"` + `hreflang` on link | ✓ | `LanguageSwitch.astro:23` |
| No `target="_blank"` | ✓ | Plain `<a href>` |
| Nav landmark | ✓ | `<nav aria-label="Language">` |
| Current locale not linkable | ✓ | `<span class="language-switch__current">` |
| `lang` on current/alternate | ✗ | Missing `lang="{currentLocale}"` / `lang="{alternateLocale}"` |
| Separator `aria-hidden` | ✗ | Separator is bare `{' · '}` not wrapped in `<span aria-hidden="true">` |
| No auto-detect redirect | ✓ | Verify gate confirms no Accept-Language rules |

Visibility wiring on all intended routes:

| App | Route | Wired |
|-----|-------|-------|
| vzhurudolu | `blog/[slug].astro` | ✓ slot |
| vzhurudolu | `prirucka/[slug].astro` | ✓ slot |
| vzhurudolu | `martin.astro` | ✓ standalone |
| michalek-dev | `blog/[slug].astro` | ✓ slot |
| michalek-dev | `guide/[slug].astro` | ✓ slot |
| michalek-dev | `martin.astro` | ✓ standalone |

Unpaired pages (404, privacy, cookies, homepage, listings) do not import `LanguageSwitch` — correct per spec scope.

---

## Registry Safety

Registry audit: **skipped** — no `components.json`; UI-SPEC lists no third-party registries.

---

## Files Audited

- `.planning/phases/06-content-pairing-i18n-seo/06-UI-SPEC.md`
- `.planning/phases/06-content-pairing-i18n-seo/06-CONTEXT.md`
- `packages/shared/components/LanguageSwitch.astro`
- `packages/shared/components/ArticleHeader.astro`
- `apps/vzhurudolu/src/pages/blog/[slug].astro`
- `apps/vzhurudolu/src/pages/prirucka/[slug].astro`
- `apps/vzhurudolu/src/pages/martin.astro`
- `apps/michalek-dev/src/pages/blog/[slug].astro`
- `apps/michalek-dev/src/pages/guide/[slug].astro`
- `apps/michalek-dev/src/pages/martin.astro`
- `apps/vzhurudolu/public/assets/css/modules-standalone/page-subhead.css`
- `scripts/verify-phase6-content-pairing-i18n-seo.sh`

---

## Advisory Summary

Phase 6 delivers the **functional** LanguageSwitch contract: correct native labels, paired-only visibility, cross-domain URLs, and route coverage on 8 pilot pairs + `/martin`. The automated verify gate passes SEO and label assertions.

The **visual** contract in `06-UI-SPEC.md` is only partially met. The highest-impact gap is article-page **placement inside `.page-subhead`**, which inverts the intended hierarchy (tertiary muted row on content bg → co-located with author meta on dark band). Secondary gaps are missing VD utility classes (`ta-c mb-1 f-6 text-color-lightest`) and incomplete accessibility markup (`lang`, `aria-hidden` separator).

Recommended fix order: placement refactor → component markup/classes → `/martin` default classes → a11y attributes.
