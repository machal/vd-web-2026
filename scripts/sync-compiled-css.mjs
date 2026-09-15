#!/usr/bin/env node
/**
 * Copy compiled CSS from Vzhůru dolů (source of SCSS) into michalek-dev.
 *
 * SCSS lives only in apps/vzhurudolu/public/assets/scss/.
 * After compiling there, run:
 *   npm run sync:css
 */
import { copyFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FROM = join(ROOT, 'apps/vzhurudolu/public/assets/css');
const TO = join(ROOT, 'apps/michalek-dev/public/assets/css');

const FILES = [
  '1-base.css',
  '1-base.min.css',
  '2-components.css',
  '2-components.min.css',
  '3-libraries.css',
  '3-libraries.min.css',
  '4-helpers.css',
  '4-helpers.min.css',
  'all.css',
  'all.min.css',
];

async function main() {
  for (const file of FILES) {
    const src = join(FROM, file);
    const dest = join(TO, file);
    await access(src);
    await copyFile(src, dest);
    console.log(`· ${file}`);
  }
  console.log(`Synced ${FILES.length} CSS files to michalek-dev.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
