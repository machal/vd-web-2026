#!/usr/bin/env node

/**
 * Script pro odstranění pole 'slug' z frontmatter všech souborů příručky.
 * URL se budou generovat podle ID (což odpovídá názvu souboru bez přípony).
 */

const fs = require('fs');
const path = require('path');

const priruckaDir = path.join(__dirname, '../src/content/prirucka');

function removeSlugFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Kontrola, zda soubor obsahuje frontmatter
  if (!content.startsWith('---')) {
    console.log(`⚠️  Přeskočeno: ${path.basename(filePath)} (není frontmatter)`);
    return false;
  }
  
  // Najít konec frontmatter
  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) {
    console.log(`⚠️  Přeskočeno: ${path.basename(filePath)} (špatný formát frontmatter)`);
    return false;
  }
  
  const frontmatter = content.substring(3, frontmatterEnd);
  const body = content.substring(frontmatterEnd + 3);
  
  // Kontrola, zda obsahuje slug
  if (!frontmatter.includes('slug:')) {
    console.log(`✓ Přeskočeno: ${path.basename(filePath)} (nemá slug)`);
    return false;
  }
  
  // Odstranit řádek se slug
  const lines = frontmatter.split('\n');
  const newLines = [];
  let removed = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Odstranit řádek začínající na "slug:" (s možnými mezerami před ním)
    if (line.trim().startsWith('slug:')) {
      removed = true;
      continue; // Přeskočit tento řádek
    }
    newLines.push(line);
  }
  
  if (!removed) {
    console.log(`⚠️  Přeskočeno: ${path.basename(filePath)} (slug nebyl nalezen)`);
    return false;
  }
  
  // Sestavit nový obsah
  const newFrontmatter = newLines.join('\n');
  const newContent = `---${newFrontmatter}---${body}`;
  
  // Zapsat zpět
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Upraveno: ${path.basename(filePath)}`);
  return true;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let processed = 0;
  let skipped = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Rekurzivně zpracovat podadresáře
      const result = processDirectory(filePath);
      processed += result.processed;
      skipped += result.skipped;
    } else if (file.endsWith('.md')) {
      if (removeSlugFromFile(filePath)) {
        processed++;
      } else {
        skipped++;
      }
    }
  }
  
  return { processed, skipped };
}

console.log('Odstraňuji pole "slug" ze souborů příručky...\n');
const result = processDirectory(priruckaDir);
console.log(`\n✅ Hotovo!`);
console.log(`   Upraveno: ${result.processed} souborů`);
console.log(`   Přeskočeno: ${result.skipped} souborů`);
