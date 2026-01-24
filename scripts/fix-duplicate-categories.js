#!/usr/bin/env node
/**
 * Script pro odstranění duplicitních prázdných category: [] z frontmatteru
 */

const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');

const CONTENT_DIRS = [
  join(process.cwd(), 'src/content/prirucka'),
  join(process.cwd(), 'src/content/blog'),
  join(process.cwd(), 'src/content/podcast'),
];

let fixed = 0;
let skipped = 0;

for (const dir of CONTENT_DIRS) {
  const files = readdirSync(dir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const filePath = join(dir, file);
    const content = readFileSync(filePath, 'utf-8');
    
    // Najít frontmatter
    if (!content.startsWith('---\n')) continue;
    const endIndex = content.indexOf('\n---\n', 4);
    if (endIndex === -1) continue;
    
    const frontMatter = content.substring(0, endIndex + 5);
    const body = content.substring(endIndex + 5);
    
    // Zkontrolovat, jestli má category: [] A zároveň jinou category
    const hasEmptyCategory = /^category: \[\]\s*$/m.test(frontMatter);
    const hasNonEmptyCategory = /^category:\s*\n\s+-/m.test(frontMatter) || 
                                 /^category: \[[^\]]+\]$/m.test(frontMatter);
    
    if (hasEmptyCategory && hasNonEmptyCategory) {
      // Odstranit prázdné category: []
      const newFrontMatter = frontMatter.replace(/^category: \[\]\s*\n/m, '');
      const newContent = newFrontMatter + body;
      
      writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✅ ${file}`);
      fixed++;
    } else if (hasEmptyCategory) {
      // Má jen prázdné category, nechat
      skipped++;
    }
  }
}

console.log(`\nOpraveno: ${fixed}, Přeskočeno: ${skipped}`);
