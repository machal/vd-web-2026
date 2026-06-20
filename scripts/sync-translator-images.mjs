#!/usr/bin/env node
/**
 * Sync images referenced in a CS (or EN) article from vzhurudolu into michalek-dev.
 *
 * Usage:
 *   node scripts/sync-translator-images.mjs apps/vzhurudolu/src/content/blog/264-ceo-bere-praci.md
 *
 * Handles:
 *   /assets/img/content/dest/...  → copy JPG sources + WebP to michalek-dev
 *   /prirucka/images/...          → copy WebP from vzhurudolu public to michalek-dev public
 */
import { readFile, copyFile, mkdir, access } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VZH = join(ROOT, 'apps/vzhurudolu');
const EN = join(ROOT, 'apps/michalek-dev');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function extractImagePaths(markdown) {
  const paths = new Set();

  const fmMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const og = fmMatch[1].match(/^ogImage:\s*(.+)$/m);
    if (og) paths.add(og[1].trim().replace(/^['"]|['"]$/g, ''));
    const ogImg = fmMatch[1].match(/^og_image:\s*(.+)$/m);
    if (ogImg) paths.add(ogImg[1].trim().replace(/^['"]|['"]$/g, ''));
  }

  for (const match of markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    paths.add(match[1].trim());
  }

  for (const match of markdown.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
    paths.add(match[1].trim());
  }

  return [...paths].filter((p) => p.startsWith('/assets/') || p.startsWith('/prirucka/'));
}

async function copyFileEnsuringDir(src, dest) {
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(src, dest);
}

async function findContentImageSource(relativeDestPath) {
  // relativeDestPath e.g. "blog/foo.webp" or "foo.webp"
  const baseName = basename(relativeDestPath, extname(relativeDestPath));
  const subDir = dirname(relativeDestPath);
  const subPath = subDir === '.' ? '' : `${subDir}/`;

  const candidates = [];
  for (const ext of ['.jpg', '.jpeg', '.png']) {
    candidates.push(
      join(VZH, 'src/assets/img/content', subPath, `${baseName}${ext}`),
      join(VZH, 'src/assets/img/blog', `${baseName}${ext}`),
      join(VZH, 'src/assets/img/content', `${baseName}${ext}`),
    );
  }

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }
  return undefined;
}

async function syncContentImage(publicPath) {
  // /assets/img/content/dest/blog/foo.webp
  const prefix = '/assets/img/content/dest/';
  if (!publicPath.startsWith(prefix)) return { skipped: publicPath };

  const relative = publicPath.slice(prefix.length);
  const vzhWebp = join(VZH, 'public/assets/img/content/dest', relative);
  const enWebp = join(EN, 'public/assets/img/content/dest', relative);

  const copied = [];

  const source = await findContentImageSource(relative);
  if (source) {
    const relFromContent = source.includes('/src/assets/img/content/')
      ? source.split('/src/assets/img/content/')[1]
      : source.includes('/src/assets/img/blog/')
        ? `blog/${basename(source)}`
        : basename(source);
    const enSource = join(EN, 'src/assets/img/content', relFromContent);
    if (!(await fileExists(enSource))) {
      await copyFileEnsuringDir(source, enSource);
      copied.push(`source → ${relFromContent}`);
    }
  }

  if (await fileExists(vzhWebp)) {
    if (!(await fileExists(enWebp))) {
      await copyFileEnsuringDir(vzhWebp, enWebp);
      copied.push(`webp → public/.../dest/${relative}`);
    }
  } else if (source) {
    return {
      error: `webp missing on vzhurudolu public for ${publicPath} — run CS build first or copy from public/assets/img/content/dest/${relative}`,
    };
  } else {
    return { error: `content image not found on vzhurudolu: ${publicPath}` };
  }

  if (!(await fileExists(enWebp))) {
    return { error: `EN webp still missing after sync: ${publicPath}` };
  }

  return copied.length ? { ok: publicPath, copied } : { unchanged: publicPath };
}

async function syncPriruckaImage(publicPath) {
  // /prirucka/images/foo.jpg or .webp
  const prefix = '/prirucka/images/';
  if (!publicPath.startsWith(prefix)) return { skipped: publicPath };

  const relative = publicPath.slice(prefix.length);
  const baseName = basename(relative, extname(relative));
  const subDir = dirname(relative);
  const subPath = subDir === '.' ? '' : `${subDir}/`;

  const copied = [];

  for (const ext of ['.jpg', '.jpeg', '.png']) {
    const vzhSource = join(VZH, 'src/content/prirucka/assets/images', subPath, `${baseName}${ext}`);
    if (await fileExists(vzhSource)) {
      // michalek-dev has no prirucka source pipeline — sync built WebP only
      break;
    }
  }

  const webpRelative = `${subPath}${baseName}.webp`;
  const vzhWebp = join(VZH, 'public/prirucka/images', webpRelative);
  const enWebp = join(EN, 'public/prirucka/images', webpRelative);

  if (await fileExists(vzhWebp)) {
    if (!(await fileExists(enWebp))) {
      await copyFileEnsuringDir(vzhWebp, enWebp);
      copied.push(`webp → public/prirucka/images/${webpRelative}`);
    }
  } else {
    return { error: `prirucka image not found on vzhurudolu: ${publicPath} (expected ${webpRelative})` };
  }

  return copied.length ? { ok: publicPath, copied } : { unchanged: publicPath };
}

async function main() {
  const mdPath = process.argv[2];
  if (!mdPath) {
    console.error('Usage: node scripts/sync-translator-images.mjs <path-to-cs-or-en-article.md>');
    process.exit(1);
  }

  const absPath = mdPath.startsWith('/') ? mdPath : join(ROOT, mdPath);
  const markdown = await readFile(absPath, 'utf8');
  const imagePaths = extractImagePaths(markdown);

  if (imagePaths.length === 0) {
    console.log('No local image paths found in article.');
    return;
  }

  console.log(`Syncing ${imagePaths.length} image(s) to michalek-dev…`);

  let errors = 0;
  for (const publicPath of imagePaths) {
    const result = publicPath.startsWith('/prirucka/')
      ? await syncPriruckaImage(publicPath)
      : await syncContentImage(publicPath);

    if (result.error) {
      console.error(`✗ ${result.error}`);
      errors++;
    } else if (result.copied) {
      console.log(`✓ ${publicPath}`);
      for (const line of result.copied) console.log(`  ${line}`);
    } else if (result.unchanged) {
      console.log(`· ${publicPath} (already present)`);
    } else if (result.skipped) {
      console.log(`? skipped: ${result.skipped}`);
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} image(s) could not be synced.`);
    process.exit(1);
  }

  console.log('\nDone. Refresh http://localhost:4322 — no build required.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
