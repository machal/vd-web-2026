import type { Plugin } from 'vite';
import { watch } from 'chokidar';
import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, relative, extname } from 'path';
import { existsSync } from 'fs';

const ICONS_SOURCE_REL = 'src/assets/img/design/icons';
const ICONS_OUTPUT_REL = 'public/assets/img/icons/dest';
const STYLE_SOURCE_REL = 'src/assets/img/design/style';
const STYLE_OUTPUT_REL = 'public/assets/img/style';
const MAX_WIDTH = 1024;

/**
 * Najde všechny obrázky (SVG, PNG, JPG) v adresáři
 */
async function findDesignImages(
  dir: string,
  baseDir: string,
  outputDir: string,
  results: { inputPath: string; outputPath: string; ext: string }[] = []
): Promise<{ inputPath: string; outputPath: string; ext: string }[]> {
  if (!existsSync(dir)) return results;

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await findDesignImages(fullPath, baseDir, outputDir, results);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (['.svg', '.png', '.jpg', '.jpeg'].includes(ext)) {
          const relPath = relative(baseDir, fullPath);
          const outputPath = join(outputDir, relPath);
          results.push({ inputPath: fullPath, outputPath, ext });
        }
      }
    }
  } catch (error) {
    console.error(`Chyba při procházení ${dir}:`, error);
  }

  return results;
}

/**
 * Optimizuje SVG pomocí SVGO
 */
async function optimizeSvg(inputPath: string, outputPath: string): Promise<void> {
  try {
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
              removeHiddenElems: true,
              cleanupNumericValues: true,
            },
          },
        },
      ],
    });

    await writeFile(outputPath, result.data);
    console.log(`✓ Design SVG: ${relative(process.cwd(), inputPath)}`);
  } catch (error) {
    console.error(`✗ Chyba při optimalizaci SVG ${inputPath}:`, error);
    const fs = await import('fs/promises');
    await fs.mkdir(dirname(outputPath), { recursive: true });
    await fs.copyFile(inputPath, outputPath);
  }
}

/**
 * Optimizuje rastrový obrázek (PNG/JPG) - zachová formát
 */
async function optimizeRaster(inputPath: string, outputPath: string): Promise<void> {
  try {
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    const ext = extname(outputPath).toLowerCase();
    const pipeline = sharp(inputPath).resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });

    if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
    } else {
      await pipeline.jpeg({ quality: 90 }).toFile(outputPath);
    }

    console.log(`✓ Design raster: ${relative(process.cwd(), inputPath)}`);
  } catch (error) {
    console.error(`✗ Chyba při optimalizaci ${inputPath}:`, error);
    const fs = await import('fs/promises');
    await fs.mkdir(dirname(outputPath), { recursive: true });
    await fs.copyFile(inputPath, outputPath);
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

async function processDesignDir(
  sourceDir: string,
  outputDir: string,
  label: string
): Promise<number> {
  if (!existsSync(sourceDir)) return 0;

  const images = await findDesignImages(sourceDir, sourceDir, outputDir);
  let processed = 0;

  for (const { inputPath, outputPath, ext } of images) {
    if (await needsConversion(inputPath, outputPath)) {
      if (ext === '.svg') {
        await optimizeSvg(inputPath, outputPath);
      } else {
        await optimizeRaster(inputPath, outputPath);
      }
      processed++;
    }
  }
  return processed;
}

export async function convertAllDesignImages(): Promise<void> {
  const iconsSource = join(process.cwd(), ICONS_SOURCE_REL);
  const iconsOutput = join(process.cwd(), ICONS_OUTPUT_REL);
  const styleSource = join(process.cwd(), STYLE_SOURCE_REL);
  const styleOutput = join(process.cwd(), STYLE_OUTPUT_REL);

  if (!existsSync(iconsSource) && !existsSync(styleSource)) {
    console.log('🖼️  Design: žádné zdrojové složky');
    return;
  }

  console.log('🖼️  Konverze design (ikony + style)...');

  const iconsCount = await processDesignDir(iconsSource, iconsOutput, 'ikony');
  const styleCount = await processDesignDir(styleSource, styleOutput, 'style');

  console.log(`✓ Design: ikony ${iconsCount}, style ${styleCount}\n`);
}

export function vitePluginDesignImages(): Plugin {
  let watcher: ReturnType<typeof watch> | null = null;

  return {
    name: 'vite-plugin-design-images',

    async buildStart() {
      await convertAllDesignImages();
    },

    configureServer() {
      convertAllDesignImages();

      watcher = watch(
        [
          `${ICONS_SOURCE_REL}/**/*.{svg,png,jpg,jpeg}`,
          `${STYLE_SOURCE_REL}/**/*.{svg,png,jpg,jpeg}`,
        ],
        {
          ignored: /node_modules/,
          persistent: true,
          ignoreInitial: true,
        }
      );

      const handleChange = async (path: string) => {
        const iconsSource = join(process.cwd(), ICONS_SOURCE_REL);
        const iconsOutput = join(process.cwd(), ICONS_OUTPUT_REL);
        const styleSource = join(process.cwd(), STYLE_SOURCE_REL);
        const styleOutput = join(process.cwd(), STYLE_OUTPUT_REL);

        const ext = extname(path).toLowerCase();
        let outputPath: string;

        if (path.startsWith(iconsSource)) {
          outputPath = join(iconsOutput, relative(iconsSource, path));
        } else if (path.startsWith(styleSource)) {
          outputPath = join(styleOutput, relative(styleSource, path));
        } else return;

        if (ext === '.svg') {
          await optimizeSvg(path, outputPath);
        } else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          await optimizeRaster(path, outputPath);
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
