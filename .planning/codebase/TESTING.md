# Testing Patterns

**Analysis Date:** 2026-06-06

## Test Framework

**Runner:**
- Not detected — no Vitest, Jest, Mocha, Playwright, or Cypress in `package.json`
- No `*.test.*` or `*.spec.*` files in application source (`src/`, `scripts/`, root plugins)

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
npm run build              # Primary verification — static site generation must succeed
npm run check-frontmatter  # Content validation — front matter presence
npm run dev                # Dev server — triggers ValidationErrors overlay for duplicate prirucka IDs
npm run preview            # Manual smoke test of production build
```

## Test File Organization

**Location:**
- No test directory or co-located test files in active codebase
- Legacy third-party test files exist under `public/data/` (archived CSS frameworks, YUI tests) — not part of project test suite; do not extend or run these

**Naming:**
- Not applicable for application code
- If adding tests, use co-located `*.test.ts` next to the module under test, or `tests/` at repo root

**Structure:**
```
www/
├── src/                    # No tests today
├── scripts/                # No tests today
├── vite-plugin-*.ts        # No tests today
└── .github/workflows/      # CI runs build + secret scan only
```

## Build-Time Validation (De Facto Test Suite)

The project relies on build-time checks and maintenance scripts instead of unit tests. Treat these as the current quality gate.

### Vite plugin: front matter check

- File: `vite-plugin-validate-frontmatter.ts`
- Runs: `apply: 'build'` — only on `npm run build`
- Asserts: all MD files in `src/content/` have `---` front matter
- Excludes: files with `published: false`
- Failure: `throw new Error(...)` with file list and hint to run `node scripts/check-frontmatter.js --fix`

### Astro content schema validation

- File: `src/content/config.ts`
- Runs: during `getCollection()` / content loading
- Asserts: Zod schema compliance per collection (`blog`, `podcast`, `prirucka`)
- Failure: Astro build error with schema mismatch details

### Příručka duplicate ID validation

- Files: `src/utils/validate-prirucka.ts`, `src/pages/prirucka/[slug].astro`
- Runs: `getStaticPaths` in prirucka slug page (build) + dev overlay via `src/components/ValidationErrors.astro`
- Asserts: no duplicate `id` among published prirucka entries
- Excludes: `published: false` ebook chapters
- Failure: `throw new Error(errorMessage)` — build stops

### Image pipeline plugins

- Files: `vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`, `vite-plugin-design-images.ts`
- Runs: dev and build via Vite `buildStart` / file watchers
- Asserts: images convert without fatal errors (logs `✗` on failure, continues other files)
- Failure: individual file errors logged; build continues unless unhandled exception

### Maintenance scripts (manual/CI-adjacent)

| Script | Command | Purpose |
|--------|---------|---------|
| `scripts/check-frontmatter.js` | `npm run check-frontmatter` | Scan MD files for missing front matter |
| `scripts/check-frontmatter.js --fix` | `npm run fix-frontmatter` | Auto-generate minimal front matter |
| `scripts/assign-categories.ts` | `npx tsx scripts/assign-categories.ts` | Report missing categories (dry run) |
| `scripts/assign-categories.ts --write` | `npx tsx scripts/assign-categories.ts --write` | Write category assignments |
| `scripts/fill-heading-from-h1.js` | `npm run fill-heading` | Sync prirucka `heading` from H1 |
| `scripts/convert-prirucka-images.ts` | `npm run convert-images` | Manual image conversion |

## Test Structure

**Suite Organization:**
- Not applicable — no test suites exist

**Recommended pattern if adding unit tests for utils:**

```typescript
// src/utils/validate-prirucka.test.ts — hypothetical; follow this shape
import { describe, it, expect } from 'vitest';
import { validateDuplicateIds } from './validate-prirucka';

describe('validateDuplicateIds', () => {
  it('returns invalid when two published entries share id', () => {
    const entries = [
      { slug: 'a', data: { id: 'css-grid', published: true } },
      { slug: 'b', data: { id: 'css-grid', published: true } },
    ] as any[];
    const result = validateDuplicateIds(entries);
    expect(result.isValid).toBe(false);
    expect(result.errors[0].type).toBe('duplicate_id');
  });

  it('ignores unpublished entries with duplicate id', () => {
    const entries = [
      { slug: 'a', data: { id: 'chapter-1', published: true } },
      { slug: 'b', data: { id: 'chapter-1', published: false } },
    ] as any[];
    expect(validateDuplicateIds(entries).isValid).toBe(true);
  });
});
```

**Patterns to follow from existing validation code:**
- Test pure functions in `src/utils/` — `validateDuplicateIds`, `validateFrontmatter`, `formatValidationErrorsForDisplay`, `normalizeTag` logic
- Mock `getCollection` when testing `getRelatedArticles` — it calls Astro content APIs
- Do not test remark/rehype plugins via full Astro build unless using integration tests; prefer feeding sample HAST/MDAST trees

## Mocking

**Framework:** Not used

**What to Mock (if introducing tests):**
- `astro:content` `getCollection` — required for `src/utils/get-related-articles.ts`
- `fs.readFileSync` / `fs.existsSync` — for `vite-plugin-validate-frontmatter.ts`, `extract-content-fallback.ts`
- File path context in rehype plugins — `file.path` / `file.history` for entity detection in `rehype-prirucka-links.ts`

**What NOT to Mock:**
- Pure string/tree transforms in remark/rehype plugins — feed real AST snippets
- Zod schema transforms in `src/content/config.ts` — test with literal data objects

**Patterns:**
```typescript
// Mocking fs for plugin tests — hypothetical
import { vi } from 'vitest';

vi.mock('node:fs', () => ({
  readFileSync: vi.fn(() => '---\nid: test\npublished: true\n---\n# Title'),
  existsSync: vi.fn(() => true),
}));
```

## Fixtures and Factories

**Test Data:**
- No fixtures directory exists
- Use minimal inline objects matching `CollectionEntry` shape for util tests
- Sample markdown strings for plugin tests:

```markdown
---
id: css-grid
title: CSS Grid
published: true
---

# CSS Grid {#css-grid}

Odkaz na [Flexbox](css-flexbox.md).
```

**Location (recommended if adding):**
- `tests/fixtures/markdown/` — sample MD files for link/anchor transforms
- `tests/fixtures/collections/` — typed entry stubs

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# Not configured — would require adding vitest with:
# npx vitest run --coverage
```

## Test Types

**Unit Tests:**
- Not used
- Highest-value candidates: `src/utils/validate-prirucka.ts`, `src/utils/rehype-prirucka-links.ts`, `src/utils/rehype-heading-anchors.ts`, `src/utils/get-related-articles.ts`

**Integration Tests:**
- Not used
- De facto integration test: `npm run build` exercises full Astro pipeline (content → remark → rehype → static HTML)
- `npm run preview` + manual browser check for layout regressions

**E2E Tests:**
- Not used
- No Playwright/Cypress configuration
- Manual UAT: browse article pages, category pages, RSS at `src/pages/rss.ts`

## CI/CD Testing

**Deploy workflow:** `.github/workflows/deploy-ftp.yml`
- Triggers: push to `master` or `main`
- Steps: `npm ci` → `npm run build` → FTP deploy of `dist/`
- Test equivalent: build must pass; no separate test job

**Secret scan:** `.github/workflows/secret-scan.yml`
- Triggers: push and PR to `master`/`main`
- Tool: Gitleaks (`gitleaks/gitleaks-action@v2`)
- Purpose: prevent committed secrets — not functional testing

**Node version in CI:** 20 (`.github/workflows/deploy-ftp.yml`)

## Content Quality Checks (Manual / Agent-Driven)

Not automated in CI, but defined as pre-commit practices in `.cursor/skills/`:

| Check | Skill / Tool | Scope |
|-------|--------------|-------|
| Internal links as `.md` | `.cursor/skills/content-internal-links-md/SKILL.md` | `src/content/` |
| Czech proofreading | `.cursor/skills/czech-proofreading/SKILL.md` | MD text |
| Article structure & front matter | `.cursor/skills/vd-articles-write-edit/SKILL.md` | blog, podcast, prirucka |

Run these before committing content changes when no automated test exists.

## Dev-Mode Validation UI

**Component:** `src/components/ValidationErrors.astro`
- Included in prirucka pages
- Shows full-screen overlay only when `import.meta.env.DEV` and duplicate IDs detected
- Does not block dev server — informational overlay with close button
- Build still fails on duplicates via `getStaticPaths` throw

**How to verify during development:**
```bash
npm run dev
# Open any prirucka page — overlay appears if duplicate IDs exist
```

## Common Patterns

**Async Testing:**
- Not applicable today
- `getRelatedArticles` and `enrichPriruckaEntry` are async — use `await` in tests when added

**Error Testing:**
- Build failure messages are the current error contract
- Test that `vite-plugin-validate-frontmatter.ts` throws when MD lacks front matter:

```typescript
// Hypothetical — verify throw message contains fix hint
expect(() => plugin.buildStart()).toThrow(/check-frontmatter\.js --fix/);
```

**Link transform testing:**
- Input: `<a href="css-grid.md">` in prirucka context
- Expected output href: `/prirucka/css-grid`
- Cross-section: `../blog/258-ai.md` → `/blog/258-ai`
- Implement as unit test on `rehypePriruckaLinks` with mock `file.path`

## Where to Add New Tests

**Unit tests for utils/plugins:**
- Co-located: `src/utils/validate-prirucka.test.ts` next to source
- Or centralized: `tests/unit/validate-prirucka.test.ts`

**Integration tests for build pipeline:**
- `tests/integration/build.test.ts` — spawn `npm run build` and assert exit code 0
- Keep separate from unit tests — slow, run in CI only

**Content regression tests:**
- `tests/content/links.test.ts` — grep `src/content/` for forbidden URL patterns (`/prirucka/` without `.md` in markdown links)
- Can run as simple Node script without test framework

**Recommended first addition:**
1. Add Vitest as devDependency
2. Create `vitest.config.ts` at repo root
3. Test `validateDuplicateIds` and `rehypePriruckaLinks` — highest risk, pure logic, no Astro runtime
4. Add `npm test` script
5. Extend `.github/workflows/deploy-ftp.yml` with `npm test` before build (optional second job)

## Verification Checklist (Current Workflow)

Use this until automated tests exist:

```bash
# 1. Content front matter
npm run check-frontmatter

# 2. Full build (schema + duplicate ID + front matter plugin)
npm run build

# 3. Preview smoke test
npm run preview
# Manually check: homepage, one blog article, one prirucka article, one podcast episode

# 4. Content-specific (after editing articles)
# Run content-internal-links-md and czech-proofreading skills on changed MD files
```

## Test Coverage Gaps

| Untested area | Files | Risk | Priority |
|---------------|-------|------|----------|
| Duplicate ID validation | `src/utils/validate-prirucka.ts` | Build breaks or wrong routing | High |
| MD link rewriting | `src/utils/rehype-prirucka-links.ts` | Broken internal links in production | High |
| Heading anchor extraction | `src/utils/rehype-heading-anchors.ts` | Broken deep links | Medium |
| Related articles matching | `src/utils/get-related-articles.ts` | Wrong sidebar recommendations | Medium |
| Front matter auto-fix | `scripts/check-frontmatter.js` | Corrupt content metadata | Medium |
| Image conversion plugins | `vite-plugin-*.ts` | Missing/broken images | Medium |
| RSS generation | `src/pages/rss.ts` | Feed errors | Low |
| Category assignment script | `scripts/assign-categories.ts` | Miscategorized content | Low |

---

*Testing analysis: 2026-06-06*
