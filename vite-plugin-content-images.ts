import type { Plugin } from 'vite';
import { watch } from 'chokidar';
import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, relative, extname, basename } from 'path';
import { existsSync } from 'fs';

const SOURCE_DIRS_REL = ['src/assets/img/content', 'src/assets/img/blog'];
const OUTPUT_DIR_REL = 'public/assets/img/content/dest';
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 85;

interface ImageFile {
  inputPath: string;
  outputPath: string;
  relativePath: string;
  isSvg: boolean;
}

/**
 * Najde všechny obrázky v adresáři a jeho podsložkách
 */
async function findImages(
  dirs: string[],
  outputDir: string
): Promise<ImageFile[]> {
  const images: ImageFile[] = [];

  for (const dir of dirs) {
    const absDir = join(process.cwd(), dir);
    if (!existsSync(absDir)) continue;

    async function walk(currentDir: string, baseDir: string): Promise<void> {
      try {
        const entries = await readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(currentDir, entry.name);

          if (entry.isDirectory()) {
            await walk(fullPath, baseDir);
          } else if (entry.isFile()) {
            const ext = extname(entry.name).toLowerCase();
            const relFromBase = relative(baseDir, fullPath);
            const relDir = dirname(relFromBase);
            const nameWithoutExt = basename(entry.name, ext);

            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
              const outputRelativePath =
                relDir === '.' ? `${nameWithoutExt}.webp` : `${relDir}/${nameWithoutExt}.webp`;

              images.push({
                inputPath: fullPath,
                outputPath: join(outputDir, outputRelativePath),
                relativePath: outputRelativePath,
                isSvg: false,
              });
            } else if (ext === '.svg') {
              const outputRelativePath =
                relDir === '.' ? `${entry.name}` : `${relDir}/${entry.name}`;

              images.push({
                inputPath: fullPath,
                outputPath: join(outputDir, outputRelativePath),
                relativePath: outputRelativePath,
                isSvg: true,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Chyba při procházení ${currentDir}:`, error);
      }
    }

    await walk(absDir, absDir);
  }

  return images;
}

/**
 * Konvertuje rastrový obrázek na WebP
 */
async function convertRasterImage(inputPath: string, outputPath: string): Promise<void> {
  try {
    if (!existsSync(inputPath)) {
      console.warn(`⚠️  Vstupní soubor neexistuje: ${inputPath}`);
      return;
    }

    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    console.log(`✓ Konvertováno: ${relative(process.cwd(), inputPath)} → ${relative(process.cwd(), outputPath)}`);
  } catch (error) {
    console.error(`✗ Chyba při konverzi ${inputPath}:`, error);
  }
}

/**
 * Optimizuje SVG pomocí SVGO
 */
async function optimizeSvg(inputPath: string, outputPath: string): Promise<void> {
  try {
    if (!existsSync(inputPath)) {
      console.warn(`⚠️  Vstupní soubor neexistuje: ${inputPath}`);
      return;
    }

    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    const { optimize } = await import('svgo');
    const input = await readFile(inputPath, 'utf-8');
    const result = optimize(input, {
      path: inputPath,
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ],
    });

    await writeFile(outputPath, result.data);
    console.log(`✓ SVG: ${relative(process.cwd(), inputPath)} → ${relative(process.cwd(), outputPath)}`);
  } catch (error) {
    console.error(`✗ Chyba při optimalizaci SVG ${inputPath}:`, error);
    // Fallback: zkopírovat
    const fs = await import('fs/promises');
    await fs.mkdir(dirname(outputPath), { recursive: true });
    await fs.copyFile(inputPath, outputPath);
  }
}

async function processImage(image: ImageFile): Promise<void> {
  if (image.isSvg) {
    await optimizeSvg(image.inputPath, image.outputPath);
  } else {
    await convertRasterImage(image.inputPath, image.outputPath);
  }
}

async function needsConversion(inputPath: string, outputPath: string): Promise<boolean> {
  if (!existsSync(outputPath)) return true;
  try {
    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);
    return inputStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    return true;
  }
}

export async function convertAllContentImages(): Promise<void> {
  const outputDir = join(process.cwd(), OUTPUT_DIR_REL);
  const sourceDirs = SOURCE_DIRS_REL.map((d) => join(process.cwd(), d));
  const hasAnySource = sourceDirs.some((d) => existsSync(d));

  if (!hasAnySource) {
    console.log('🖼️  Content obrázky: žádné zdrojové složky');
    return;
  }

  console.log('🖼️  Konverze content obrázků...');

  const images = await findImages(SOURCE_DIRS_REL, outputDir);
  let processed = 0;

  for (const image of images) {
    if (await needsConversion(image.inputPath, image.outputPath)) {
      await processImage(image);
      processed++;
    }
  }

  console.log(`✓ Content obrázky: ${processed} zpracováno, ${images.length - processed} přeskočeno\n`);
}

export function vitePluginContentImages(): Plugin {
  let watcher: ReturnType<typeof watch> | null = null;

  return {
    name: 'vite-plugin-content-images',

    async buildStart() {
      await convertAllContentImages();
    },

    configureServer() {
      convertAllContentImages();

      watcher = watch(
        SOURCE_DIRS_REL.map((d) => `${d}/**/*.{jpg,jpeg,png,svg}`),
        {
          ignored: /node_modules/,
          persistent: true,
          ignoreInitial: true,
        }
      );

      const handleChange = async (path: string) => {
        const outputDir = join(process.cwd(), OUTPUT_DIR_REL);
        for (const srcDir of SOURCE_DIRS_REL) {
          const absSrc = join(process.cwd(), srcDir);
          if (path.startsWith(absSrc)) {
            const ext = extname(path).toLowerCase();
            const relPath = relative(absSrc, path);
            const nameWithoutExt = basename(path, ext);
            const relDir = dirname(relPath);

            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
              const outputRelativePath =
                relDir === '.' ? `${nameWithoutExt}.webp` : `${relDir}/${nameWithoutExt}.webp`;
              await convertRasterImage(path, join(outputDir, outputRelativePath));
            } else if (ext === '.svg') {
              const outputRelativePath = relDir === '.' ? basename(path) : `${relDir}/${basename(path)}`;
              await optimizeSvg(path, join(outputDir, outputRelativePath));
            }
            break;
          }
        }
      };

      watcher.on('add', handleChange);
      watcher.on('change', handleChange);
    },

    closeBundle() {
      if (watcher) {
        watcher.close();
        watcher = null;
      }
    },
  };
}
