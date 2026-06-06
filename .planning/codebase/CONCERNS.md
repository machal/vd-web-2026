# Codebase Concerns

**Analysis Date:** 2026-06-06

## Tech Debt

**Duplicated helper functions across page templates:**
- Issue: `normalizeTag()`, `getCategoriesForPost()`, and `getSlug()` are copy-pasted in `src/pages/blog/[slug].astro`, `src/pages/podcast/[slug].astro`, `src/pages/prirucka/[slug].astro`, `src/pages/index.astro`, and `src/pages/[...page].astro`. Only `normalizeTag()` is partially shared via `src/utils/get-related-articles.ts`.
- Files: `src/pages/blog/[slug].astro`, `src/pages/podcast/[slug].astro`, `src/pages/prirucka/[slug].astro`, `src/pages/index.astro`, `src/pages/[...page].astro`, `src/components/ArticleListItem.astro`
- Impact: Bug fixes or behavior changes (e.g. prirucka URL uses `data.id`) must be applied in multiple places; easy to miss one route.
- Fix approach: Extract shared helpers to `src/utils/content-helpers.ts` (or similar) and import from all pages.

**Duplicated Zod schemas in content config:**
- Issue: Blog and podcast collections in `src/content/config.ts` share nearly identical schema definitions (~60 lines each) including date transforms and field mapping.
- Files: `src/content/config.ts`
- Impact: Schema drift between blog and podcast; any field addition requires two edits.
- Fix approach: Extract shared base schema and `.extend()` per collection.

**Custom sitemap workaround for @astrojs/sitemap bug:**
- Issue: Official `@astrojs/sitemap` is commented out in `astro.config.mjs` due to `Cannot read properties of undefined (reading 'reduce')`. Replaced by hand-rolled `src/utils/custom-sitemap.ts`.
- Files: `astro.config.mjs`, `src/utils/custom-sitemap.ts`
- Impact: Custom sitemap emits only `<loc>` — no `lastmod`, `changefreq`, or `priority`. SEO tooling and crawlers get less signal than the official integration would provide.
- Fix approach: Re-test `@astrojs/sitemap` on current Astro 4.x; if fixed, migrate back. Otherwise extend `custom-sitemap.ts` with lastmod from content dates.

**Hardcoded site URL in multiple locations:**
- Issue: `https://www.vzhurudolu.cz` is duplicated in `astro.config.mjs` (`site`), `src/utils/custom-sitemap.ts`, individual page templates (`ogUrl`), and hundreds of content markdown files as absolute URLs.
- Files: `astro.config.mjs`, `src/utils/custom-sitemap.ts`, `src/pages/blog/[slug].astro`, `src/pages/prirucka/[slug].astro`, `src/content/**`
- Impact: Domain or path changes require wide search-and-replace; internal links in content bypass the `rehype-prirucka-links` transform when written as full URLs.
- Fix approach: Use `Astro.site` / `import.meta.env.SITE` in templates; migrate content internal links to `.md` format per `.cursor/skills/content-internal-links-md/SKILL.md`.

**Legacy jQuery dependency:**
- Issue: `jquery` (^3.7.1) is a production dependency; pages load `/assets/js/vrdl.min.js` (inline script) which likely bundles jQuery-era patterns.
- Files: `package.json`, `src/pages/prirucka/[slug].astro`, `public/assets/js/`
- Impact: Unnecessary JS payload on article pages; maintenance burden for legacy modal/lightbox behavior (`@superkoders/modal`).
- Fix approach: Audit `vrdl.min.js` usage; replace jQuery-dependent features with vanilla JS or remove where unused.

**One-off maintenance scripts without npm integration:**
- Issue: Eleven scripts in `scripts/` (e.g. `assign-categories.ts`, `fix-yaml-quotes.js`, `set-ebook-published-false.js`) are not registered in `package.json` except frontmatter check/fix.
- Files: `scripts/`, `package.json`
- Impact: Scripts are discoverable only by browsing the folder; no documented run order for content migrations.
- Fix approach: Add npm scripts for frequently used maintenance commands; document in `README.md`.

**No TypeScript project config:**
- Issue: No `tsconfig.json` in repo root. TypeScript is used in `.ts` files and Astro components but without explicit strictness settings.
- Files: `src/utils/*.ts`, `vite-plugin-*.ts`, `src/env.d.ts`
- Impact: Loose typing tolerated (`any` in rehype/remark plugins); no IDE-enforced strict checks.
- Fix approach: Add `tsconfig.json` extending Astro defaults with `strict: true`; gradually replace `any` in `src/utils/rehype-connected-elements.ts`, `src/utils/rehype-related-to-inner-box.ts`, `src/utils/remark-process-markdown-attributes.ts`.

**No linting or formatting toolchain:**
- Issue: No ESLint, Prettier, or Biome configuration detected.
- Files: repo root (absent configs)
- Impact: Inconsistent style; no automated catch for common mistakes before CI.
- Fix approach: Add ESLint with `eslint-plugin-astro` and Prettier; wire into CI on pull requests.

## Known Bugs

**Draft blog posts still generate public pages:**
- Symptoms: Blog entries with `postStatus: Draft` get static pages at `/blog/{slug}` even though `published` is computed as `false` in the schema transform.
- Files: `src/pages/blog/[slug].astro`, `src/content/blog/115-google-speed-https.md`, `src/content/blog/179-covid-skoleni-podzim.md`, `src/content/config.ts`
- Trigger: `getStaticPaths()` calls `getCollection('blog')` without filtering on `entry.data.published`.
- Workaround: None in code — drafts are publicly reachable if deployed.

**Silent route generation failure in prirucka getStaticPaths:**
- Symptoms: On collection load errors (other than duplicate-ID validation), `getStaticPaths` catches the error, logs it, and returns `[]` — build succeeds but zero prirucka pages are generated.
- Files: `src/pages/prirucka/[slug].astro` (lines 50–58)
- Trigger: Unexpected error during `getCollection('prirucka')`.
- Workaround: Watch build output for `Error loading prirucka collection`; no build failure.

**RSS full content bypasses remark/rehype pipeline:**
- Symptoms: RSS items render markdown via standalone `markdown-it` + `sanitize-html`, not the project's remark/rehype plugin chain (link transforms, image paths, heading anchors, connected elements, etc.).
- Files: `src/pages/rss.ts`
- Trigger: Subscribe to `/rss` and compare article HTML to on-site rendering.
- Workaround: RSS subscribers see simplified/different HTML; errors fall back to empty `content`.

**Inconsistent published-status filtering across routes:**
- Symptoms: Listing pages filter drafts/unpublished content differently than detail pages. Blog/podcast `[slug].astro` pages include all entries; prirucka requires `published === true`; index/category pages use mixed rules.
- Files: `src/pages/blog/[slug].astro`, `src/pages/podcast/[slug].astro`, `src/pages/index.astro`, `src/pages/[category].astro`, `src/pages/prirucka/[slug].astro`
- Trigger: Compare sitemap/listing URLs vs directly accessible draft URLs.
- Workaround: Manually avoid deploying draft content (not enforced).

## Security Considerations

**Raw HTML allowed in markdown pipeline:**
- Risk: `allowDangerousHtml: true` in `remarkRehype` plus `rehype-raw` renders arbitrary HTML from markdown source. Malicious or accidental HTML in content files is emitted to static pages without sanitization.
- Files: `astro.config.mjs`, `src/utils/remark-process-markdown-attributes.ts`
- Current mitigation: Trusted content authors only; static site with no user-generated content at build time.
- Recommendations: Accept risk for author-controlled content; if CMS or external contributors are added, introduce `rehype-sanitize` with an allowlist.

**FTP deploy without FTPS by default:**
- Risk: Credentials and file contents traverse the network in cleartext FTP unless server enforces encryption separately.
- Files: `.github/workflows/deploy-ftp.yml` (lines 38–39: `# protocol: ftps` commented out)
- Current mitigation: GitHub Secrets for credentials; README documents FTPS option.
- Recommendations: Enable `protocol: ftps` and `port: 990`, or migrate to SFTP action as noted in `README.md`.

**CORS wildcard on font files:**
- Risk: `Access-Control-Allow-Origin: *` on all font MIME types allows any origin to load fonts (intentional for CodePen embeds).
- Files: `public/.htaccess`
- Current mitigation: Fonts are public assets; no auth on static files.
- Recommendations: Accept for current use case; restrict to known domains if abuse occurs.

**Secret scan only — no build gate on PRs:**
- Risk: Pull requests run Gitleaks (`.github/workflows/secret-scan.yml`) but do not run `npm run build`. Broken builds can merge to main and fail only at deploy time.
- Files: `.github/workflows/secret-scan.yml`, `.github/workflows/deploy-ftp.yml`
- Current mitigation: Deploy workflow runs build on push to main/master.
- Recommendations: Add CI job running `npm ci && npm run build` on all PRs.

## Performance Bottlenecks

**Large public/ directory copied on every build:**
- Problem: `public/` is ~685 MB (including ~128 MB in `public/data/` legacy archives). `vitePluginCopyPublicToDist()` in `astro.config.mjs` recursively copies all of `public/` to `dist/` after every build.
- Files: `astro.config.mjs`, `public/`, `public/data/`
- Cause: Legacy demo archives (YUI, Blueprint, Tumblr, SVG tests) committed in repo; full copy on each build.
- Improvement path: Audit `public/data/` for unused legacy assets; exclude unchanged subtrees from copy plugin; keep `data/` and `files/` server-side only (already excluded from FTP deploy).

**Dual file read for prirucka article enrichment:**
- Problem: Each prirucka page reads markdown twice — once via Astro content collections (`item.render()`) and again via `readFileSync` for H1/perex extraction fallback.
- Files: `src/pages/prirucka/[slug].astro`, `src/utils/extract-content-fallback.ts`
- Cause: Front matter often lacks `heading`/`perex`; runtime regex extraction requires raw file access.
- Improvement path: Pre-compute heading/perex at content migration time; or extract from rendered AST instead of re-reading disk.

**Nested unified processor in remarkProcessMarkdownAttributes:**
- Problem: Each `markdown="1"` block spins up a full unified pipeline (`remarkParse` → `remarkGfm` → `remarkRehype` → `rehypeStringify`) synchronously during build.
- Files: `src/utils/remark-process-markdown-attributes.ts`
- Cause: Design choice to process nested markdown before main pipeline.
- Improvement path: Cache processor instance; profile build with many prirucka pages containing `markdown="1"` blocks.

**Image conversion on every dev/build start:**
- Problem: Vite plugins (`vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`, `vite-plugin-design-images.ts`) scan and convert images with Sharp/SVGO on startup.
- Files: `vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`, `vite-plugin-design-images.ts`
- Cause: No incremental hash skip beyond file-exists checks in prirucka plugin.
- Improvement path: Add mtime/size-based skip cache shared across image plugins.

**Full content collection loaded per related-articles call:**
- Problem: `getRelatedArticles()` loads all three collections on every article page render during static generation.
- Files: `src/utils/get-related-articles.ts`
- Cause: No pre-built tag index.
- Improvement path: Build tag→article index once in an Astro integration hook; pass as prop or module singleton during SSG.

## Fragile Areas

**Markdown plugin chain (remark/rehype):**
- Files: `astro.config.mjs`, `src/utils/remark-*.ts`, `src/utils/rehype-*.ts`
- Why fragile: Ten custom plugins run in strict order across two phases. Changing plugin order or adding a plugin can break prirucka-specific HTML patterns (`markdown="1"`, `.connected`, `.related`, `.ebook-only`, `{#anchor}` syntax).
- Safe modification: Change one plugin at a time; run full `npm run build`; spot-check prirucka articles with connected boxes, related links, and ebook-only blocks.
- Test coverage: None automated.

**Content schema transforms and published semantics:**
- Files: `src/content/config.ts`, `src/utils/validate-prirucka.ts`, `vite-plugin-validate-frontmatter.ts`
- Why fragile: Three different `published` representations coexist: boolean, string (`'Publikováno'`), and blog `postStatus: Draft`. Ebook chapters use `published: false` to opt out of duplicate-ID validation.
- Safe modification: Always run `npm run build` after frontmatter changes; use dev overlay from `src/components/ValidationErrors.astro`.
- Test coverage: Build-time validation only; no unit tests.

**Podcast URL slug convention:**
- Files: `src/pages/podcast/[slug].astro`, `src/pages/rss.ts`, `src/pages/index.astro`
- Why fragile: Podcast URLs require `{postID}-{slug}` format (e.g. `/podcast/219-figma-podcast`). Missing or duplicate `postID` breaks routing and RSS links.
- Safe modification: Never change `postID` in frontmatter; verify URL after edit.
- Test coverage: None.

**Category-to-tag matching:**
- Files: `src/data/categories.ts`, page-level `getCategoriesForPost()` copies
- Why fragile: Categories map to articles via normalized tag string matching (diacritics stripped). Typos in frontmatter `category`/`tags` silently exclude articles from category pages.
- Safe modification: Run `scripts/assign-categories.ts` for bulk updates; verify on category listing pages.
- Test coverage: None.

## Scaling Limits

**Static generation of ~700+ content pages:**
- Current capacity: ~520 prirucka + ~142 blog + ~54 podcast markdown files, each generating a static HTML page plus paginated index pages.
- Limit: Build time and memory grow linearly with content; no incremental page generation.
- Scaling path: Astro content layer is adequate for current scale; if build exceeds CI timeout, split collections or enable experimental caching.

**FTP deploy timeout:**
- Current capacity: 60 s timeout in `.github/workflows/deploy-ftp.yml`.
- Limit: README notes failures with error 421 / "Server sent FIN packet" on large deploys.
- Scaling path: Increase timeout; rely on FTP Deploy Action's incremental state file; exclude large static dirs (`data/`, `files/`) already excluded.

**changed-files manifest is local-only:**
- Current capacity: `src/utils/changed-files-integration.ts` writes `.astro/dist-manifest.json` for incremental upload hints.
- Limit: Manifest is not committed; CI builds always report all files as changed on fresh runners.
- Scaling path: Persist manifest as CI artifact between deploys, or rely solely on FTP Deploy Action's server-side state.

## Dependencies at Risk

**@astrojs/sitemap disabled but still in devDependencies:**
- Risk: Package at `^3.4.0` is installed but unused due to runtime bug; may confuse future maintainers.
- Impact: Dead dependency; custom sitemap maintenance burden.
- Migration plan: Upgrade and re-test, or remove from `package.json`.

**remark-extract-frontmatter in dependencies:**
- Risk: Listed in `package.json` dependencies but no imports found in `src/` or config — possibly unused.
- Impact: Unnecessary install surface.
- Migration plan: Grep for usage; remove if confirmed unused.

## Missing Critical Features

**Automated test suite:**
- Problem: Zero `*.test.*` or `*.spec.*` files; no Vitest/Jest/Playwright configuration.
- Blocks: Safe refactoring of remark/rehype plugins, URL helpers, and validation logic without manual full-site verification.

**PR build verification in CI:**
- Problem: Only secret scanning runs on PRs; build validation runs only on push to main/master deploy workflow.
- Blocks: Catching build failures before merge.

**Content link linting in CI:**
- Problem: Project skill `.cursor/skills/content-internal-links-md/SKILL.md` defines `.md` link convention, but no automated check enforces it in CI (only manual/agent use).
- Blocks: Consistent internal linking; many absolute `vzhurudolu.cz` URLs remain in `src/content/`.

## Test Coverage Gaps

**Remark/rehype markdown transforms:**
- What's not tested: All ten custom plugins (`remark-process-markdown-attributes`, `rehype-connected-elements`, `rehype-prirucka-links`, etc.)
- Files: `src/utils/remark-*.ts`, `src/utils/rehype-*.ts`
- Risk: Subtle HTML regressions in prirucka articles go unnoticed until manual QA.
- Priority: High

**Content validation (duplicate IDs, frontmatter):**
- What's not tested: `validateDuplicateIds()`, `validateFrontmatter()`, Vite frontmatter plugin edge cases (YAML quirks, `published: false` exclusion).
- Files: `src/utils/validate-prirucka.ts`, `vite-plugin-validate-frontmatter.ts`
- Risk: Validation regressions could allow broken builds or silent duplicate routes.
- Priority: High

**URL and slug generation:**
- What's not tested: `getSlug()` logic across collections; podcast `{postID}-{slug}` pattern; prirucka `data.id` routing.
- Files: `src/pages/index.astro`, `src/pages/[...page].astro`, `src/components/ArticleListItem.astro`, `src/pages/rss.ts`
- Risk: Wrong links in listings, RSS, and related articles.
- Priority: Medium

**RSS content rendering:**
- What's not tested: RSS item generation, sanitize-html allowlist, markdown-it vs on-site HTML parity.
- Files: `src/pages/rss.ts`
- Risk: Broken or empty RSS content for subscribers.
- Priority: Medium

**Published/draft filtering:**
- What's not tested: Consistent exclusion of draft blog posts and unpublished prirucka from all routes.
- Files: `src/pages/blog/[slug].astro`, `src/pages/podcast/[slug].astro`, listing pages
- Risk: Draft content publicly accessible (confirmed for 2 blog drafts).
- Priority: High

---

*Concerns audit: 2026-06-06*
