import type { AstroIntegration } from 'astro';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface DistManifest {
  generatedAt: string;
  files: Record<string, string>;
}

/**
 * Spočítá MD5 hash obsahu souboru (rychlejší než SHA).
 */
function getFileHash(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Rekurzivně projde adresář a vrátí mapu souborů s jejich content hashem.
 */
function walkDir(dir: string, baseDir: string, files: Record<string, string> = {}): Record<string, string> {
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      walkDir(fullPath, baseDir, files);
    } else if (entry.isFile()) {
      try {
        files[relativePath] = getFileHash(fullPath);
      } catch {
        // Přeskočit soubory, které nelze přečíst
      }
    }
  }
  return files;
}

/**
 * Astro integrace, která po každém buildu vypíše seznam změněných souborů v dist/,
 * které je potřeba nahrát při nasazení.
 */
export function changedFilesIntegration(): AstroIntegration {
  return {
    name: 'changed-files',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        try {
          const distPath = fileURLToPath(dir);
          if (!fs.existsSync(distPath)) {
            logger.warn('dist/ adresář neexistuje');
            return;
          }

          const manifestPath = path.resolve('.astro', 'dist-manifest.json');
          const currentFiles = walkDir(distPath, distPath, {});

          let changedFiles: string[] = [];
          let prevManifest: DistManifest | null = null;

          if (fs.existsSync(manifestPath)) {
            try {
              const content = fs.readFileSync(manifestPath, 'utf-8');
              prevManifest = JSON.parse(content) as DistManifest;
            } catch {
              prevManifest = null;
            }
          }

          if (prevManifest?.files) {
            const prev = prevManifest.files;

            // Nové nebo změněné soubory
            for (const [file, hash] of Object.entries(currentFiles)) {
              if (prev[file] !== hash) {
                changedFiles.push(file);
              }
            }

            // Smazané soubory (byly v předchozím buildu, teď ne)
            for (const file of Object.keys(prev)) {
              if (!(file in currentFiles)) {
                changedFiles.push(file);
              }
            }

            changedFiles.sort();
          } else {
            // První build – vypsat všechny soubory
            changedFiles = Object.keys(currentFiles).sort();
          }

          // Uložit manifest pro příští build
          const manifestDir = path.dirname(manifestPath);
          if (!fs.existsSync(manifestDir)) {
            fs.mkdirSync(manifestDir, { recursive: true });
          }
          const newManifest: DistManifest = {
            generatedAt: new Date().toISOString(),
            files: currentFiles,
          };
          fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2), 'utf-8');

          // Výstup do konzole
          if (changedFiles.length > 0) {
            logger.info('Soubory k nahrání (změněné od posledního buildu):');
            for (const file of changedFiles) {
              console.log(`  ${file}`);
            }
            logger.info(`Celkem: ${changedFiles.length} souborů`);
          } else {
            logger.info('Žádné změny od posledního buildu – není potřeba nic nahrávat.');
          }
        } catch (error) {
          logger.warn(`Chyba při výpisu změněných souborů: ${error instanceof Error ? error.message : String(error)}`);
        }
      },
    },
  };
}
