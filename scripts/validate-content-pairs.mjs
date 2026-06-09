#!/usr/bin/env node
/**
 * CLI wrapper for content pairing validation.
 * Exits 1 on errors, 0 when clean. Warnings do not fail the build.
 */
import { readdir, readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONTENT_PAIRS,
  validateContentPairs,
} from '../packages/shared/content-pairing/index.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const CONTENT_DIRS = [
  { site: 'vzhurudolu', collection: 'prirucka', dir: 'apps/vzhurudolu/src/content/prirucka' },
  { site: 'vzhurudolu', collection: 'blog', dir: 'apps/vzhurudolu/src/content/blog' },
  { site: 'michalek-dev', collection: 'guide', dir: 'apps/michalek-dev/src/content/guide' },
  { site: 'michalek-dev', collection: 'blog', dir: 'apps/michalek-dev/src/content/blog' },
];

function extractPairId(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return undefined;
  const fm = match[1];
  const pairMatch = fm.match(/^pairId:\s*['"]?([^'"\n]+)['"]?\s*$/m);
  return pairMatch?.[1]?.trim();
}

function contentKey(site, collection, filename, content) {
  if (collection === 'prirucka') {
    const idMatch = content.match(/^id:\s*['"]?([^'"\n]+)['"]?\s*$/m);
    if (idMatch) return idMatch[1].trim();
  }
  return filename.replace(/\.md$/, '');
}

async function buildFrontmatterIndex() {
  const index = new Map();

  for (const { site, collection, dir } of CONTENT_DIRS) {
    const absDir = join(ROOT, dir);
    let files;
    try {
      files = (await readdir(absDir)).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }

    for (const file of files) {
      const content = await readFile(join(absDir, file), 'utf8');
      const pairId = extractPairId(content);
      if (!pairId) continue;

      const key = contentKey(site, collection, file, content);
      const entry = { site, collection, key };
      const existing = index.get(pairId) ?? [];
      existing.push(entry);
      index.set(pairId, existing);
    }
  }

  return index;
}

async function checkMissingEnFiles(warnings) {
  for (const pair of CONTENT_PAIRS) {
    const { collection, key } = pair.en;
    if (collection === 'page') continue;

    const dir =
      collection === 'guide'
        ? join(ROOT, 'apps/michalek-dev/src/content/guide')
        : join(ROOT, 'apps/michalek-dev/src/content/blog');
    const filePath = join(dir, `${key}.md`);

    try {
      await access(filePath);
    } catch {
      warnings.push(`Missing EN content file for pairId "${pair.pairId}": ${filePath}`);
    }
  }
}

async function main() {
  const frontmatterIndex = await buildFrontmatterIndex();
  const result = validateContentPairs(CONTENT_PAIRS, { frontmatterIndex });

  await checkMissingEnFiles(result.warnings);

  for (const warning of result.warnings) {
    console.warn(`WARN: ${warning}`);
  }

  if (!result.ok) {
    for (const error of result.errors) {
      console.error(`ERROR: ${error}`);
    }
    process.exit(1);
  }

  console.log(`Content pairs validation passed (${CONTENT_PAIRS.length} pairs)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
