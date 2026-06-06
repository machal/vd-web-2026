# Coding Conventions

**Analysis Date:** 2026-06-06

## Naming Patterns

**Files:**
- Astro components: PascalCase — `ArticleListItem.astro`, `CategoryTOC.astro`, `ValidationErrors.astro` in `src/components/`
- Category-specific components: `CategoryTOC{Topic}.astro` in `src/components/categories/` (e.g. `CategoryTOCCSS.astro`)
- Astro pages: kebab-case or dynamic segments — `src/pages/blog/[slug].astro`, `src/pages/prirucka/[...page].astro`, `src/pages/o-webu.astro`
- Markdown content: kebab-case slug as filename — `src/content/blog/258-ai-programovani-psani.md`, `src/content/prirucka/css-grid.md`
- Remark plugins: `remark-{purpose}.ts` — `src/utils/remark-heading-ids.ts`, `src/utils/remark-prirucka-images.ts`
- Rehype plugins: `rehype-{purpose}.ts` — `src/utils/rehype-prirucka-links.ts`, `src/utils/rehype-heading-anchors.ts`
- Vite plugins: `vite-plugin-{purpose}.ts` at repo root — `vite-plugin-validate-frontmatter.ts`, `vite-plugin-content-images.ts`
- Utility modules (non-plugin): kebab-case — `src/utils/validate-prirucka.ts`, `src/utils/get-related-articles.ts`, `src/utils/extract-content-fallback.ts`
- Maintenance scripts: kebab-case — `scripts/check-frontmatter.js`, `scripts/assign-categories.ts`
- Static data: `src/data/categories.ts` exports `categories` array and `CategoryConfig` interface

**Functions:**
- camelCase for helpers and business logic — `formatDate()`, `getSlug()`, `normalizeTag()`, `validateDuplicateIds()`
- Factory functions for Astro integrations return named integrations — `customSitemap()`, `changedFilesIntegration()`
- Remark/rehype plugins export `const pluginName: Plugin = () => { return (tree) => { ... } }`
- Type guards in `getCollection` filters use inline predicates — `(entry): entry is CollectionEntry<'prirucka'> & { data: { id: string } } =>`

**Variables:**
- camelCase — `enrichedData`, `postCategories`, `filesWithoutFrontMatter`
- UPPER_SNAKE_CASE for script constants — `OFFICIAL_CATEGORIES`, `CATEGORY_KEYWORDS` in `scripts/assign-categories.ts`
- Destructure Astro props at top of frontmatter — `const { post } = Astro.props`

**Types:**
- PascalCase interfaces — `Props`, `CategoryConfig`, `ValidationError`, `ValidationResult`, `DistManifest`
- Union types for collection scope — `'prirucka' | 'blog' | 'podcast'`
- Zod schemas in `src/content/config.ts` use camelCase field names with legacy aliases (`postTitle`, `postDateTime`)

## Code Style

**Formatting:**
- No ESLint, Prettier, Biome, or root `.editorconfig` detected
- Indentation: 2 spaces (observed in `astro.config.mjs`, `src/utils/*.ts`, `.astro` files)
- Semicolons: used in TypeScript; omitted in some Astro template sections
- Strings: single quotes in TS/JS application code; double quotes in YAML front matter values when escaped
- Trailing commas: used in multiline objects and arrays

**Linting:**
- Not applicable — no linter configured
- Content quality enforced via project skills in `.cursor/skills/` (`vd-articles-write-edit`, `content-internal-links-md`, `czech-proofreading`)

**Module system:**
- Package `"type": "module"` in `package.json` — ESM for `astro.config.mjs` and TypeScript utils
- Legacy scripts in `scripts/*.js` use CommonJS (`require`, `module.exports`) — `scripts/check-frontmatter.js`
- Newer scripts use ESM + `tsx` — `scripts/assign-categories.ts`, `scripts/convert-prirucka-images.ts`

## Import Organization

**Order (Astro pages and components):**
1. Astro/JSX runtime — `import { Fragment } from 'astro/jsx-runtime'`
2. `astro:content` — `getCollection`, `CollectionEntry`
3. Layouts — `import BaseLayout from '../../layouts/BaseLayout.astro'`
4. Components — `import Header from '../../components/Header.astro'`
5. Data/config — `import { categories } from '../../data/categories'`
6. Utils — `import { getRelatedArticles } from '../../utils/get-related-articles'`
7. Node built-ins (only when needed in frontmatter) — `readFileSync`, `join` from `fs`/`path`

**Order (utils/plugins):**
1. Type imports — `import type { Plugin } from 'unified'`
2. AST/types — `import type { Root, Element } from 'hast'`
3. Third-party utilities — `visit` from `unist-util-visit`
4. Local relative imports — sometimes with `.ts` extension: `import { remarkHeadingIds } from './remark-heading-ids.ts'`

**Path Aliases:**
- No TypeScript path aliases (`@/` etc.) — use relative paths throughout
- SCSS include path: `assets/scss` configured in `astro.config.mjs` under `vite.css.preprocessorOptions.scss.includePaths`

## Astro Component Patterns

**Frontmatter structure:**
- `---` block at top with imports, `getStaticPaths`, props interface, logic
- HTML template below the closing `---`
- Optional `<script>` or `<Fragment slot="styles">` for page-specific assets

**Props:**
- Define `interface Props { ... }` in frontmatter
- Destructure immediately: `const { title, description, bodyClass = '' } = Astro.props`
- Default values inline in destructuring — `author = 'Martin Michálek'` in `src/components/ArticleHeader.astro`

**Static paths:**
- Export `getStaticPaths` async function returning `{ params, props }[]`
- Filter collections with predicates — published only, required `id` for prirucka
- Pagination uses custom param format `p={n}` — `src/pages/prirucka/[...page].astro`

**Slots:**
- Named slots for layout composition — `<Header slot="header" />`, `<Footer slot="footer" />`
- `BaseLayout` in `src/layouts/BaseLayout.astro` accepts `title`, `description`, `bodyClass`, OG props

## Content Conventions (Markdown)

Content rules are codified in `.cursor/skills/vd-articles-write-edit/SKILL.md` and `.cursor/skills/content-internal-links-md/SKILL.md`. Follow these when editing `src/content/`:

**Front matter:**
- Every published MD file must have `---` YAML block — enforced by `vite-plugin-validate-frontmatter.ts` at build
- Schema defined in `src/content/config.ts` per collection (`blog`, `podcast`, `prirucka`)
- Příručka published articles require unique `id` — validated in `src/utils/validate-prirucka.ts`
- Ebook drafts use `published: false` — excluded from build validation and duplicate-ID checks

**Markdown body:**
- H2–H6 end with `{#slug}` anchor — processed by `src/utils/rehype-heading-anchors.ts`
- Internal article links use `.md` paths, never final URLs — transformed by `src/utils/rehype-prirucka-links.ts`
  - Same section: `[text](css-grid.md)`
  - Cross-section: `[text](../blog/258-ai-programovani-psani.md)`
- Figures: `<figure>`, `<img alt="...">`, `<figcaption markdown="1">` with italic caption
- Tables: wrap in `<div class="rwd-scrollable f-6" markdown="1">`
- Czech typographic quotes `„ "` in prose; ASCII `"` in front matter and code

**Images:**
- Blog/podcast: `src/assets/img/content/` or `src/assets/img/blog/`, reference as `/assets/img/content/dest/nazev.webp`
- Příručka: source in `src/content/prirucka/assets/images/`, reference as `/prirucka/images/nazev.jpg` (auto-converted to WebP by `vite-plugin-prirucka-images.ts`)

## Remark/Rehype Plugin Patterns

**Registration:**
- All plugins wired in `astro.config.mjs` under `markdown.remarkPlugins` and `markdown.rehypePlugins`
- Two-phase pipeline: remark for MD→AST, rehype for HTML transforms on HAST tree

**Implementation:**
- Export named const matching filename prefix
- Traverse tree recursively with inner `processNode` or `visit` from `unist-util-visit`
- Use `any` for AST nodes in tree walkers when HAST typing is impractical — acceptable pattern in `src/utils/rehype-heading-anchors.ts`, `src/utils/rehype-prirucka-links.ts`
- Plugins are pure transforms — no side effects except `console.warn` on recoverable failures

**Plugin naming in config:**
```typescript
// astro.config.mjs — remark phase (MD parsing)
remarkGfm,
remarkPriruckaImages,
remarkNormalizeCodeLang,
remarkProcessMarkdownAttributes,

// rehype phase (HTML transforms)
rehypeRaw,
rehypePriruckaImages,
rehypeRemoveEbookOnly,
rehypeConnectedElements,
rehypeRelatedToInnerBox,
rehypeHeadingAnchors,
rehypePriruckaLinks,
rehypeRemoveFirstH1,
```

## Vite Plugin Patterns

- Place at repo root as `vite-plugin-*.ts`
- Export factory `export function vitePluginName(): Plugin`
- Register in `astro.config.mjs` under `vite.plugins`
- Use `apply: 'build'` when plugin should only run on production build — `vite-plugin-validate-frontmatter.ts`
- Log with emoji prefixes for scanability — `🖼️`, `✓`, `✗`, `⚠️`
- Fail build with `throw new Error(...)` for unrecoverable validation errors

## Error Handling

**Patterns:**
- **Build-blocking:** `throw new Error(message)` — `vite-plugin-validate-frontmatter.ts`, `src/pages/prirucka/[slug].astro` `getStaticPaths` on duplicate IDs
- **Validation result objects:** return `{ isValid: boolean, errors: ValidationError[] }` — `src/utils/validate-prirucka.ts`; format for display via `formatValidationErrorsForDisplay()`
- **Graceful degradation:** `try/catch` with fallback to original data — `src/pages/prirucka/[slug].astro` enrichment, `src/utils/extract-content-fallback.ts`
- **Silent skip:** empty `catch` blocks when file I/O is optional — `src/utils/changed-files-integration.ts` `walkDir`
- **Dev-only UI errors:** `src/components/ValidationErrors.astro` shows overlay when `import.meta.env.DEV` and duplicate IDs found
- **Non-fatal warnings:** `console.warn(...)` — missing files in image plugins, enrichment failures

**Do not:**
- Swallow build-critical validation errors — always re-throw after logging in `getStaticPaths` catch blocks when error message contains `CHYBA` or `duplicitní ID`

## Logging

**Framework:** `console` (no structured logger)

**Patterns:**
- `console.log` with `✓` prefix for success — sitemap generation, image conversion counts
- `console.error` with `❌` or `✗` for failures — frontmatter validation, image conversion errors
- `console.warn` for recoverable issues — `src/utils/remark-process-markdown-attributes.ts`, `src/components/ValidationErrors.astro`
- Debug logs gated on `process.env.NODE_ENV === 'development'` — `src/pages/prirucka/[slug].astro`
- Commented-out debug logs left in place — `src/components/ArticleFooter.astro`

## Comments

**When to Comment:**
- Module-level `/** ... */` block describing purpose and transform rules — all files in `src/utils/`
- Czech language for comments explaining business logic
- Inline comments for non-obvious pipeline ordering — `astro.config.mjs` FÁZE 1 / FÁZE 2 sections
- Script usage headers with CLI examples — `scripts/check-frontmatter.js`, `scripts/assign-categories.ts`

**JSDoc/TSDoc:**
- `@param` and `@returns` on exported async functions — `src/utils/get-related-articles.ts`
- Parameter types via TypeScript interfaces rather than extensive JSDoc

## Function Design

**Size:**
- Keep Astro page frontmatter focused — extract reusable logic to `src/utils/`
- Tree-walking plugins use inner `processNode` recursion; avoid extracting one-liner helpers

**Parameters:**
- Astro components: single `Props` object via `Astro.props`
- Utils: explicit typed parameters — `getRelatedArticles(currentTags, currentId, currentCollection)`
- Options objects for optional behavior — `validateFrontmatter(entries, { excludeUnpublished?: boolean })`

**Return Values:**
- Plugins return transformer function `(tree) => void` or `(tree, file) => void`
- Data functions return typed results or empty arrays on no-match — `getRelatedArticles` returns `[]` when no tags
- Date formatting returns `''` for undefined dates — pattern in `ArticleListItem.astro`, `ArticleHeader.astro`

## Module Design

**Exports:**
- Named exports only — no default exports in `src/utils/`
- One primary export per plugin file matching the const name
- Data modules export both interface and const — `CategoryConfig` + `categories` in `src/data/categories.ts`

**Barrel Files:**
- Not used — import directly from specific files
- Astro content collections exported from `src/content/config.ts` as `collections`

## Duplicated Patterns to Reuse

**normalizeTag:** Appears in `src/utils/get-related-articles.ts`, `src/pages/blog/[slug].astro`, `src/pages/prirucka/[slug].astro`. When adding tag-matching logic, import from `get-related-articles.ts` or extract to a shared util rather than copying.

**formatDate (cs-CZ):** Duplicated in `ArticleListItem.astro` and `ArticleHeader.astro`. Match existing `Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })` pattern.

**getSlug / URL building:** Collection-specific routing in `ArticleListItem.astro`:
- blog → `/blog/${slug}`
- podcast → `/podcast/${postID}-${slug}`
- prirucka → `/prirucka/${data.id}` (uses frontmatter `id`, not filename)

## SCSS and Static Assets

- Legacy SCSS lives in `public/assets/scss/` — not compiled by Astro; pre-built CSS in `public/assets/css/`
- Page-specific CSS loaded via `<link rel="stylesheet" href="/assets/css/modules-standalone/min/...">` in article pages
- Design tokens and utility classes referenced by existing class names (`page-head`, `section-prirucka`, `inner-box`)
- Do not introduce new CSS build pipeline without aligning with existing `public/assets/` structure

## Scripts Conventions

**Node scripts (`scripts/`):**
- Shebang `#!/usr/bin/env node` for executable JS scripts
- CLI flags: `--check`, `--fix`, `--write` pattern — `check-frontmatter.js`, `assign-categories.ts`
- Report mode (dry run) vs write mode — `assign-categories.ts` defaults to report unless `--write`
- Registered in `package.json` scripts where frequently used

**When adding a new script:**
- Place in `scripts/` with kebab-case name
- Use TypeScript + `tsx` for new scripts with complex logic
- Add npm script alias in `package.json` if it will run regularly

---

*Convention analysis: 2026-06-06*
