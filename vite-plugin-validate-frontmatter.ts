/**
 * Vite plugin pro validaci front-matter v Markdown souborech
 * Selže build, pokud nějaký MD soubor nemá front-matter
 */

import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Zkontroluje, zda soubor má front-matter
 */
function hasFrontMatter(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const trimmed = content.trim();
    
    // Front-matter musí začínat na prvním řádku s ---
    if (!trimmed.startsWith('---')) {
      return false;
    }
    
    // Musí být alespoň jeden další --- pro ukončení front-matter
    const lines = trimmed.split('\n');
    if (lines.length < 2) {
      return false;
    }
    
    // Najdeme druhý ---
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    // Pokud nelze soubor přečíst, vrátíme false
    return false;
  }
}

/**
 * Najde všechny MD soubory v adresáři
 */
function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  function walk(currentDir: string) {
    try {
      const entries = fs.readdirSync(currentDir);
      
      for (const entryName of entries) {
        const fullPath = path.join(currentDir, entryName);
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            walk(fullPath);
          } else if (stat.isFile() && entryName.endsWith('.md')) {
            files.push(fullPath);
          }
        } catch (error) {
          // Ignorujeme chyby při čtení jednotlivých souborů/adresářů
        }
      }
    } catch (error) {
      // Ignorujeme chyby při čtení adresáře
    }
  }
  
  walk(dir);
  return files;
}

export function vitePluginValidateFrontmatter(): Plugin {
  return {
    name: 'validate-frontmatter',
    apply: 'build',
    buildStart() {
      const contentDir = path.resolve('src/content');
      
      if (!fs.existsSync(contentDir)) {
        console.warn(`[validate-frontmatter] Adresář ${contentDir} neexistuje, přeskočeno`);
        return;
      }
      
      const mdFiles = findMarkdownFiles(contentDir);
      const filesWithoutFrontMatter: string[] = [];
      
      for (const file of mdFiles) {
        if (!hasFrontMatter(file)) {
          filesWithoutFrontMatter.push(file);
        }
      }
      
      if (filesWithoutFrontMatter.length > 0) {
        const relativeFiles = filesWithoutFrontMatter.map(f => path.relative(process.cwd(), f));
        
        console.error('\n❌ CHYBA: Nalezeny Markdown soubory bez front-matter:\n');
        for (const file of relativeFiles) {
          console.error(`  - ${file}`);
        }
        console.error('\nPro opravu spusťte: node scripts/check-frontmatter.js --fix\n');
        
        throw new Error(
          `Build selhal: ${filesWithoutFrontMatter.length} Markdown souborů nemá front-matter. ` +
          `Spusťte 'node scripts/check-frontmatter.js --fix' pro opravu.`
        );
      }
      
      console.log(`✓ [validate-frontmatter] Všechny Markdown soubory mají front-matter (${mdFiles.length} souborů)`);
    },
  };
}
