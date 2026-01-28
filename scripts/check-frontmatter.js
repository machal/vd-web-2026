#!/usr/bin/env node

/**
 * Skript pro kontrolu a generování front-matter v Markdown souborech
 * 
 * Použití:
 *   node scripts/check-frontmatter.js --check    # Pouze kontrola
 *   node scripts/check-frontmatter.js --fix       # Opraví soubory bez front-matter
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

/**
 * Zkontroluje, zda soubor má front-matter
 */
function hasFrontMatter(filePath) {
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
}

/**
 * Extrahuje první H1 z Markdown souboru
 */
function extractFirstH1(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim();
    }
  }
  
  return null;
}

/**
 * Escapuje YAML hodnotu - přidá uvozovky pokud obsahuje speciální znaky
 */
function escapeYamlValue(value) {
  if (!value) return '';
  // Pokud obsahuje dvojtečku, uvozovky, nebo jiné speciální znaky, dáme do uvozovek
  if (value.includes(':') || value.includes('"') || value.includes("'") || value.includes('\n') || value.includes('[') || value.includes(']')) {
    // Escapujeme uvozovky v hodnotě
    const escaped = value.replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  return value;
}

/**
 * Vygeneruje front-matter pro soubor
 */
function generateFrontMatter(filePath, h1Title) {
  const relativePath = path.relative(path.join(rootDir, 'src/content'), filePath);
  const dir = path.dirname(relativePath);
  const basename = path.basename(filePath, '.md');
  
  // Určíme typ kolekce podle adresáře
  let collectionType = 'prirucka';
  if (dir.startsWith('blog')) {
    collectionType = 'blog';
  } else if (dir.startsWith('podcast')) {
    collectionType = 'podcast';
  }
  
  // Pro příručku použijeme jednodušší front-matter
  if (collectionType === 'prirucka') {
    const title = h1Title || basename;
    return `---
id: ${basename}
title: ${escapeYamlValue(title)}
heading: ${escapeYamlValue(title)}
published: true
---
`;
  }
  
  // Pro blog a podcast bychom potřebovali více informací, ale použijeme minimální
  const title = h1Title || basename;
  return `---
postTitle: ${escapeYamlValue(title)}
title: ${escapeYamlValue(title)}
published: false
---
`;
}

/**
 * Přidá front-matter do souboru
 */
function addFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const h1Title = extractFirstH1(filePath);
  const frontMatter = generateFrontMatter(filePath, h1Title);
  
  // Přidáme front-matter na začátek a jeden prázdný řádek
  const newContent = frontMatter + '\n' + content;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  
  return h1Title;
}

/**
 * Najde všechny MD soubory v adresáři
 */
function findMarkdownFiles(dir) {
  const files = [];
  
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir);
    
    for (const entryName of entries) {
      const fullPath = path.join(currentDir, entryName);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile() && entryName.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

/**
 * Hlavní funkce
 */
function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const fix = args.includes('--fix');
  
  if (!checkOnly && !fix) {
    console.error('Použití: node scripts/check-frontmatter.js --check | --fix');
    process.exit(1);
  }
  
  const contentDir = path.join(rootDir, 'src/content');
  if (!fs.existsSync(contentDir)) {
    console.error(`Adresář ${contentDir} neexistuje`);
    process.exit(1);
  }
  
  const mdFiles = findMarkdownFiles(contentDir);
  const filesWithoutFrontMatter = [];
  
  for (const file of mdFiles) {
    if (!hasFrontMatter(file)) {
      filesWithoutFrontMatter.push(file);
    }
  }
  
  if (filesWithoutFrontMatter.length === 0) {
    console.log('✓ Všechny Markdown soubory mají front-matter');
    process.exit(0);
  }
  
  console.log(`\nNalezeno ${filesWithoutFrontMatter.length} souborů bez front-matter:\n`);
  for (const file of filesWithoutFrontMatter) {
    const relative = path.relative(rootDir, file);
    console.log(`  - ${relative}`);
  }
  
  if (checkOnly) {
    console.log('\nPro opravu spusťte: node scripts/check-frontmatter.js --fix');
    process.exit(1);
  }
  
  if (fix) {
    console.log('\nOpravuji soubory...\n');
    for (const file of filesWithoutFrontMatter) {
      const relative = path.relative(rootDir, file);
      const h1Title = addFrontMatter(file);
      console.log(`✓ ${relative}${h1Title ? ` (nadpis: ${h1Title})` : ''}`);
    }
    console.log(`\n✓ Opraveno ${filesWithoutFrontMatter.length} souborů`);
    process.exit(0);
  }
}

main();
