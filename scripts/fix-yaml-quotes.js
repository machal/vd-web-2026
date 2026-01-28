#!/usr/bin/env node

/**
 * Skript pro opravu YAML front-matter - přidá uvozovky k hodnotám obsahujícím dvojtečku
 * 
 * Použití:
 *   node scripts/fix-yaml-quotes.js
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

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
 * Opraví YAML hodnotu - přidá uvozovky pokud obsahuje dvojtečku nebo jiné speciální znaky
 */
function fixYamlValue(line) {
  // Najdeme klíč a hodnotu
  const match = line.match(/^(\s*)([^:]+):\s*(.+)$/);
  if (!match) return line;
  
  const indent = match[1];
  const key = match[2].trim();
  let value = match[3].trim();
  
  // Pokud hodnota už je v uvozovkách, přeskočíme
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return line;
  }
  
  // Pokud hodnota obsahuje dvojtečku, přidáme uvozovky
  if (value.includes(':') || value.includes('[') || value.includes(']') || 
      value.includes('{') || value.includes('}') || value.includes('|') ||
      value.includes('&') || value.includes('*') || value.includes('#')) {
    // Escapujeme uvozovky v hodnotě
    const escaped = value.replace(/"/g, '\\"');
    return `${indent}${key}: "${escaped}"`;
  }
  
  return line;
}

/**
 * Opraví front-matter v souboru
 */
function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const trimmed = content.trim();
  
  // Zkontrolujeme, zda má front-matter
  if (!trimmed.startsWith('---')) {
    return false;
  }
  
  const lines = trimmed.split('\n');
  let inFrontMatter = false;
  let frontMatterEnd = -1;
  let modified = false;
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    if (trimmedLine === '---') {
      if (!inFrontMatter) {
        inFrontMatter = true;
        newLines.push(line);
        continue;
      } else {
        frontMatterEnd = i;
        newLines.push(line);
        // Zbytek souboru zkopírujeme beze změny
        for (let j = i + 1; j < lines.length; j++) {
          newLines.push(lines[j]);
        }
        break;
      }
    }
    
    if (inFrontMatter) {
      // Opravíme řádky s title, heading, postTitle atd.
      if (trimmedLine.match(/^(title|heading|postTitle|og_title|og_description|description|excerpt|perex):/)) {
        const fixed = fixYamlValue(line);
        if (fixed !== line) {
          modified = true;
        }
        newLines.push(fixed);
      } else {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    return true;
  }
  
  return false;
}

/**
 * Hlavní funkce
 */
function main() {
  const contentDir = path.join(rootDir, 'src/content');
  if (!fs.existsSync(contentDir)) {
    console.error(`Adresář ${contentDir} neexistuje`);
    process.exit(1);
  }
  
  const mdFiles = findMarkdownFiles(contentDir);
  let fixed = 0;
  
  console.log('Kontroluji a opravuji YAML front-matter...\n');
  
  for (const file of mdFiles) {
    if (fixFile(file)) {
      const relative = path.relative(rootDir, file);
      console.log(`✓ ${relative}`);
      fixed++;
    }
  }
  
  if (fixed === 0) {
    console.log('✓ Všechny soubory mají správně formátované front-matter');
  } else {
    console.log(`\n✓ Opraveno ${fixed} souborů`);
  }
}

main();
