#!/usr/bin/env node

/**
 * Skript pro nastavení published: false u všech MD souborů v content-* podadresářích
 * 
 * Tyto soubory jsou součástí ebooků a duplicita ID je očekávaná a v pořádku.
 * 
 * Použití:
 *   node scripts/set-ebook-published-false.js
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const priruckaDir = path.join(rootDir, 'src/content/prirucka');

/**
 * Najde všechny MD soubory v content-* podadresářích
 */
function findEbookMarkdownFiles(dir) {
  const files = [];
  
  function walk(currentDir, isInContentDir = false) {
    if (!fs.existsSync(currentDir)) {
      return;
    }
    
    const entries = fs.readdirSync(currentDir);
    
    for (const entryName of entries) {
      const fullPath = path.join(currentDir, entryName);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Pokud je to content-* adresář, prohledáme ho a označíme, že jsme uvnitř
        if (entryName.startsWith('content-')) {
          walk(fullPath, true);
        }
        // Jiné adresáře (např. assets) přeskočíme
      } else if (stat.isFile() && entryName.endsWith('.md')) {
        // Přidáme soubor pouze pokud jsme uvnitř content-* podadresáře
        if (isInContentDir) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir, false);
  return files;
}

/**
 * Parsuje front-matter z obsahu souboru
 */
function parseFrontMatter(content) {
  const trimmed = content.trim();
  
  if (!trimmed.startsWith('---')) {
    return { frontMatter: null, body: content };
  }
  
  const lines = trimmed.split('\n');
  let frontMatterEnd = -1;
  
  // Najdeme konec front-matter (druhý ---)
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontMatterEnd = i;
      break;
    }
  }
  
  if (frontMatterEnd === -1) {
    return { frontMatter: null, body: content };
  }
  
  const frontMatterLines = lines.slice(1, frontMatterEnd);
  const body = lines.slice(frontMatterEnd + 1).join('\n');
  
  return { frontMatter: frontMatterLines.join('\n'), body };
}

/**
 * Upraví front-matter - nastaví nebo přidá published: false
 */
function updateFrontMatter(frontMatterText) {
  const lines = frontMatterText.split('\n');
  const updatedLines = [];
  let hasPublished = false;
  
  for (const line of lines) {
    // Zkontrolujeme, zda je to řádek s published
    const publishedMatch = line.match(/^(\s*)published\s*:\s*(.+)$/);
    if (publishedMatch) {
      hasPublished = true;
      // Nastavíme na false
      updatedLines.push(`${publishedMatch[1]}published: false`);
    } else {
      updatedLines.push(line);
    }
  }
  
  // Pokud published neexistuje, přidáme ho na konec
  if (!hasPublished) {
    updatedLines.push('published: false');
  }
  
  return updatedLines.join('\n');
}

/**
 * Upraví soubor - nastaví published: false
 */
function updateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontMatter, body } = parseFrontMatter(content);
  
  if (!frontMatter) {
    // Pokud nemá front-matter, přeskočíme (mělo by být řešeno jiným skriptem)
    return false;
  }
  
  const updatedFrontMatter = updateFrontMatter(frontMatter);
  
  // Zkontrolujeme, zda se něco změnilo
  if (updatedFrontMatter === frontMatter) {
    // Zkontrolujeme, zda už není published: false
    if (frontMatter.includes('published: false') || frontMatter.includes('published:false')) {
      return false; // Už je nastaveno
    }
  }
  
  // Sestavíme nový obsah
  const newContent = `---\n${updatedFrontMatter}\n---\n${body}`;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  
  return true;
}

/**
 * Hlavní funkce
 */
function main() {
  if (!fs.existsSync(priruckaDir)) {
    console.error(`Adresář ${priruckaDir} neexistuje`);
    process.exit(1);
  }
  
  const mdFiles = findEbookMarkdownFiles(priruckaDir);
  
  if (mdFiles.length === 0) {
    console.log('Nenalezeny žádné MD soubory v content-* podadresářích');
    process.exit(0);
  }
  
  console.log(`Nalezeno ${mdFiles.length} MD souborů v content-* podadresářích\n`);
  console.log('Nastavuji published: false...\n');
  
  let updated = 0;
  
  for (const file of mdFiles) {
    if (updateFile(file)) {
      const relative = path.relative(rootDir, file);
      console.log(`✓ ${relative}`);
      updated++;
    }
  }
  
  if (updated === 0) {
    console.log('✓ Všechny soubory už mají published: false');
  } else {
    console.log(`\n✓ Aktualizováno ${updated} souborů`);
  }
}

main();
