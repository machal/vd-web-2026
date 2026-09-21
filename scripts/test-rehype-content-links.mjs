#!/usr/bin/env node
/**
 * Regression tests for .md → URL rewriting (fragments, http-2.md, schemes).
 */
import { createRehypeContentLinks } from '../packages/shared/markdown/rehype-prirucka-links.ts';

const PRIRUCKA_FILE = 'apps/vzhurudolu/src/content/prirucka/dummy.md';
const BLOG_FILE = 'apps/vzhurudolu/src/content/blog/dummy.md';

function rewrite(href, filePath = PRIRUCKA_FILE) {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: { href },
        children: [{ type: 'text', value: 'link' }],
      },
    ],
  };
  const transform = createRehypeContentLinks()();
  transform(tree, { path: filePath });
  return tree.children[0].properties.href;
}

const cases = [
  {
    name: 'same-collection slug with fragment',
    href: 'vibe-coding.md#manazeri-agentu',
    expected: '/prirucka/vibe-coding#manazeri-agentu',
  },
  {
    name: 'cross-collection path with fragment',
    href: '../blog/266-ai-restart-frontkon.md#manazeri-agentu',
    expected: '/blog/266-ai-restart-frontkon#manazeri-agentu',
  },
  {
    name: 'query and fragment kept',
    href: 'http-2.md?x=1#intro',
    expected: '/prirucka/http-2?x=1#intro',
  },
  {
    name: 'http-2.md is not treated as an external URL',
    href: 'http-2.md',
    expected: '/prirucka/http-2',
  },
  {
    name: 'https.md is not treated as an external URL',
    href: 'https.md',
    expected: '/prirucka/https',
  },
  {
    name: 'absolute https URL left alone',
    href: 'https://example.com/x.md',
    expected: 'https://example.com/x.md',
  },
  {
    name: 'heading-only hash left alone',
    href: '#heading',
    expected: '#heading',
  },
  {
    name: 'blog-relative slug from a blog file',
    href: '264-ceo-bere-praci.md',
    filePath: BLOG_FILE,
    expected: '/blog/264-ceo-bere-praci',
  },
];

let failed = 0;
for (const { name, href, expected, filePath } of cases) {
  const actual = rewrite(href, filePath);
  if (actual !== expected) {
    failed += 1;
    console.error(`FAIL  ${name}`);
    console.error(`      href:     ${href}`);
    console.error(`      expected: ${expected}`);
    console.error(`      actual:   ${actual}`);
  } else {
    console.log(`PASS  ${name}`);
  }
}

if (failed) {
  console.error(`\n${failed} failing case(s)`);
  process.exit(1);
}

console.log(`\n${cases.length} passing`);
