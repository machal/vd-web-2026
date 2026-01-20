import type { Plugin } from 'vite';
import { watch } from 'chokidar';
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, relative, extname, basename } from 'path';
import { existsSync } from 'fs';

const SOURCE_DIR = 'src/content/prirucka/assets/images';
const OUTPUT_DIR = 'public/prirucka/images';
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 85;

interface ImageFile {
  inputPath: string;
  outputPath: string;
  relativePath: string;
}

/**
 * Konvertuje jeden obrázek na WebP formát
 */
async function convertImage(inputPath: string, outputPath: string): Promise<void> {
  try {
    // Zkontrolovat, zda vstupní soubor existuje
    if (!existsSync(inputPath)) {
      console.warn(`⚠️  Vstupní soubor neexistuje: ${inputPath}`);
      return;
    }

    // Vytvořit výstupní adresář, pokud neexistuje
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    // Konvertovat obrázek
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const inputRel = relative(process.cwd(), inputPath);
    const outputRel = relative(process.cwd(), outputPath);
    console.log(`✓ Konvertováno: ${inputRel} → ${outputRel}`);
  } catch (error) {
    console.error(`✗ Chyba při konverzi ${inputPath}:`, error);
  }
}

/**
 * Najde všechny obrázky v adresáři a jeho podsložkách
 */
async function findImages(dir: string, baseDir: string = dir): Promise<ImageFile[]> {
  const images: ImageFile[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Rekurzivně projít podsložky
        const subImages = await findImages(fullPath, baseDir);
        images.push(...subImages);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const relativePath = relative(baseDir, fullPath);
          const nameWithoutExt = basename(entry.name, ext);
          const relativeDir = dirname(relativePath);
          
          // Vytvořit výstupní cestu s .webp příponou
          const outputRelativePath = relativeDir === '.'
            ? `${nameWithoutExt}.webp`
            : `${relativeDir}/${nameWithoutExt}.webp`;
          
          images.push({
            inputPath: fullPath,
            outputPath: join(process.cwd(), OUTPUT_DIR, outputRelativePath),
            relativePath: outputRelativePath,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Chyba při procházení ${dir}:`, error);
  }
  
  return images;
}

/**
 * Zkontroluje, zda je potřeba konvertovat obrázek (změněn nebo neexistuje)
 */
async function needsConversion(inputPath: string, outputPath: string): Promise<boolean> {
  if (!existsSync(outputPath)) {
    return true;
  }
  
  try {
    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);
    
    // Konvertovat, pokud je vstupní soubor novější
    return inputStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    return true;
  }
}

/**
 * Konvertuje všechny obrázky
 */
async function convertAllImages(): Promise<void> {
  console.log('🖼️  Konverze obrázků příručky...');
  
  const images = await findImages(SOURCE_DIR);
  let converted = 0;
  let skipped = 0;
  
  for (const image of images) {
    if (await needsConversion(image.inputPath, image.outputPath)) {
      await convertImage(image.inputPath, image.outputPath);
      converted++;
    } else {
      skipped++;
    }
  }
  
  console.log(`✓ Hotovo: ${converted} konvertováno, ${skipped} přeskočeno\n`);
}

/**
 * Vite plugin pro automatickou konverzi obrázků příručky
 */
export function vitePluginPriruckaImages(): Plugin {
  let watcher: ReturnType<typeof watch> | null = null;
  let isBuilding = false;
  
  return {
    name: 'vite-plugin-prirucka-images',
    
    async buildStart() {
      // Při startu buildu konvertovat všechny obrázky
      isBuilding = true;
      await convertAllImages();
    },
    
    configureServer(server) {
      // Při startu dev serveru konvertovat všechny obrázky
      convertAllImages();
      
      // V dev módu nastavit watch pro automatickou konverzi při změnách
      watcher = watch(`${SOURCE_DIR}/**/*.{jpg,jpeg,png}`, {
        ignored: /node_modules/,
        persistent: true,
        ignoreInitial: true, // Ignorovat počáteční soubory, už jsme je zpracovali
      });
      
      const handleImageChange = async (path: string) => {
        // Zkontrolovat, zda je soubor v našem source adresáři
        if (!path.includes(SOURCE_DIR)) {
          return;
        }
        
        try {
          const relativePath = relative(SOURCE_DIR, path);
          const ext = extname(path);
          const nameWithoutExt = basename(path, ext);
          const relativeDir = dirname(relativePath);
          
          const outputRelativePath = relativeDir === '.'
            ? `${nameWithoutExt}.webp`
            : `${relativeDir}/${nameWithoutExt}.webp`;
          
          const outputPath = join(process.cwd(), OUTPUT_DIR, outputRelativePath);
          await convertImage(path, outputPath);
        } catch (error) {
          console.error(`Chyba při zpracování změny ${path}:`, error);
        }
      };
      
      watcher.on('add', handleImageChange);
      watcher.on('change', handleImageChange);
    },
    
    buildEnd() {
      isBuilding = false;
    },
    
    closeBundle() {
      // Zavřít watcher při ukončení
      if (watcher) {
        watcher.close();
        watcher = null;
      }
    },
  };
}
