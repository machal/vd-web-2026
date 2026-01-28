#!/usr/bin/env node

/**
 * Skript pro opravu published: true u MD souborů v root adresáři prirucka
 * (ne v content-* podadresářích)
 * 
 * Tento skript vrátí published: true u souborů, které byly omylem nastaveny na false
 * a nejsou v content-* podadresářích.
 * 
 * Použití:
 *   node scripts/fix-published-in-root.js
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const priruckaDir = path.join(rootDir, 'src/content/prirucka');

/**
 * Zkontroluje, zda je soubor v content-* podadresáři
 */
function isInContentSubdir(filePath) {
  const relativePath = path.relative(priruckaDir, filePath);
  const parts = relativePath.split(path.sep);
  // Pokud první část cesty začíná na content-, je to v content-* podadresáři
  return parts.length > 0 && parts[0].startsWith('content-');
}

/**
 * Najde všechny MD soubory v root adresáři prirucka (ne v content-* podadresářích)
 */
function findRootMarkdownFiles(dir) {
  const files = [];
  
  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) {
      return;
    }
    
    const entries = fs.readdirSync(currentDir);
    
    for (const entryName of entries) {
      const fullPath = path.join(currentDir, entryName);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Pokud je to content-* adresář, přeskočíme ho
        if (entryName.startsWith('content-')) {
          continue;
        }
        // Jiné adresáře (např. assets) také přeskočíme - hledáme pouze v root
        // Pokud chceme prohledat i jiné podadresáře, můžeme to změnit
        continue;
      } else if (stat.isFile() && entryName.endsWith('.md')) {
        // Přidáme soubor pouze pokud není v content-* podadresáři
        if (!isInContentSubdir(fullPath)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
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
 * Upraví front-matter - nastaví published: true
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
      // Nastavíme na true
      updatedLines.push(`${publishedMatch[1]}published: true`);
    } else {
      updatedLines.push(line);
    }
  }
  
  // Pokud published neexistuje, přidáme ho na konec
  if (!hasPublished) {
    updatedLines.push('published: true');
  }
  
  return updatedLines.join('\n');
}

/**
 * Upraví soubor - nastaví published: true
 */
function updateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontMatter, body } = parseFrontMatter(content);
  
  if (!frontMatter) {
    // Pokud nemá front-matter, přeskočíme
    return false;
  }
  
  // Zkontrolujeme, zda má published: false
  if (!frontMatter.includes('published: false') && !frontMatter.includes('published:false')) {
    return false; // Už má published: true nebo jinou hodnotu
  }
  
  const updatedFrontMatter = updateFrontMatter(frontMatter);
  
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
  
  const mdFiles = findRootMarkdownFiles(priruckaDir);
  
  if (mdFiles.length === 0) {
    console.log('Nenalezeny žádné MD soubory v root adresáři prirucka');
    process.exit(0);
  }
  
  console.log(`Nalezeno ${mdFiles.length} MD souborů v root adresáři prirucka\n`);
  console.log('Kontroluji a opravuji published: false -> true...\n');
  
  let updated = 0;
  
  for (const file of mdFiles) {
    if (updateFile(file)) {
      const relative = path.relative(rootDir, file);
      console.log(`✓ ${relative}`);
      updated++;
    }
  }
  
  if (updated === 0) {
    console.log('✓ Všechny soubory v root adresáři už mají published: true');
  } else {
    console.log(`\n✓ Aktualizováno ${updated} souborů (published: false -> true)`);
  }
}

main();
