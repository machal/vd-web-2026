#!/usr/bin/env node
/**
 * Skript pro přidání tagů do front matter článků na základě odkazů v TOC komponentách
 * 
 * Projde všechny TOC komponenty kategorií a přidá odpovídající tag do front matter
 * článků, které jsou v těchto rozcestnících nalinkované.
 */

const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');

const TOC_DIR = join(process.cwd(), 'src/components/categories');
const PRIRUCKA_DIR = join(process.cwd(), 'src/content/prirucka');
const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const PODCAST_DIR = join(process.cwd(), 'src/content/podcast');

// Mapování TOC komponent na tagy kategorií
const TOC_TO_TAG = {
  'CategoryTOCCSS.astro': 'css',
  'CategoryTOCNastroje.astro': 'nastroje',
  'CategoryTOCOrganizaceCSS.astro': 'organizace-css',
  'CategoryTOCResponzivniDesign.astro': 'responzivni-design',
  'CategoryTOCRychlostNacitani.astro': 'rychlost-nacitani',
};

/**
 * Najde front matter v souboru a vrátí jeho pozici
 */
function findFrontMatter(content) {
  if (!content.startsWith('---\n')) {
    return null;
  }
  
  const endIndex = content.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return null;
  }
  
  return {
    start: 0,
    end: endIndex + 5, // +5 pro '\n---\n'
    content: content.substring(4, endIndex), // Bez počátečního '---\n'
  };
}

/**
 * Extrahuje odkazy z TOC komponenty
 */
function extractLinksFromTOC(tocContent) {
  const links = [];
  // Najít všechny odkazy <a href="/prirucka/...">, <a href="/blog/...">, <a href="/podcast/...">
  const linkRegex = /<a\s+href="\/(prirucka|blog|podcast)\/([^"]+)">/g;
  let match;
  
  while ((match = linkRegex.exec(tocContent)) !== null) {
    const type = match[1]; // prirucka, blog, nebo podcast
    const slug = match[2]; // slug článku
    links.push({ type, slug });
  }
  
  return links;
}

/**
 * Najde markdown soubor podle slug
 */
function findMarkdownFile(type, slug) {
  let dir;
  if (type === 'prirucka') {
    dir = PRIRUCKA_DIR;
  } else if (type === 'blog') {
    dir = BLOG_DIR;
  } else if (type === 'podcast') {
    dir = PODCAST_DIR;
  } else {
    return null;
  }
  
  // Pro blog a podcast může být slug ve formátu "id-slug" nebo jen "slug"
  // Pro příručku je to obvykle jen "slug"
  const files = readdirSync(dir);
  
  // Zkusit najít přesný match
  let file = files.find(f => f === `${slug}.md`);
  if (file) {
    return join(dir, file);
  }
  
  // Pro blog/podcast zkusit najít podle id-slug formátu
  if (type === 'blog' || type === 'podcast') {
    file = files.find(f => f.startsWith(`${slug}-`) || f.endsWith(`-${slug}.md`));
    if (file) {
      return join(dir, file);
    }
  }
  
  return null;
}

/**
 * Přidá tag do front matter, pokud tam ještě není
 */
function addTagToFrontMatter(frontMatter, tag) {
  // Najít pole tags nebo category
  const tagsMatch = frontMatter.match(/^(tags|category):\s*\[(.*?)\]/ms);
  
  if (tagsMatch) {
    const fieldName = tagsMatch[1];
    const existingTags = tagsMatch[2]
      .split(',')
      .map(t => t.trim().replace(/['"]/g, ''))
      .filter(t => t);
    
    // Pokud tag už existuje, nic nedělat
    if (existingTags.includes(tag)) {
      return frontMatter;
    }
    
    // Přidat tag
    existingTags.push(tag);
    const newTags = existingTags.map(t => `'${t}'`).join(', ');
    return frontMatter.replace(
      new RegExp(`^(${fieldName}):\\s*\\[.*?\\]`, 'ms'),
      `$1: [${newTags}]`
    );
  }
  
  // Pokud tags/category neexistuje, přidat ho po id (pokud existuje)
  const idPattern = /^(id:\s*.+)$/m;
  if (idPattern.test(frontMatter)) {
    return frontMatter.replace(idPattern, `$1\ntags: ['${tag}']`);
  }
  
  // Jinak přidat na konec front matter
  return `${frontMatter}\ntags: ['${tag}']`;
}

function main() {
  console.log('Procházím TOC komponenty a přidávám tagy do front matter...\n');
  
  const allFiles = readdirSync(TOC_DIR);
  const tocFiles = allFiles.filter(f => f.startsWith('CategoryTOC') && f.endsWith('.astro'));
  
  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  for (const tocFile of tocFiles) {
    const tag = TOC_TO_TAG[tocFile];
    if (!tag) {
      console.log(`⚠️  ${tocFile}: Nenalezen tag, přeskočeno`);
      continue;
    }
    
    console.log(`\n📁 ${tocFile} -> tag: ${tag}`);
    
    const tocPath = join(TOC_DIR, tocFile);
    const tocContent = readFileSync(tocPath, 'utf-8');
    const links = extractLinksFromTOC(tocContent);
    
    console.log(`   Nalezeno ${links.length} odkazů`);
    
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const link of links) {
      const filePath = findMarkdownFile(link.type, link.slug);
      
      if (!filePath) {
        console.log(`   ⚠️  ${link.type}/${link.slug}: Soubor nenalezen`);
        skipped++;
        continue;
      }
      
      try {
        const content = readFileSync(filePath, 'utf-8');
        const fm = findFrontMatter(content);
        
        if (!fm) {
          console.log(`   ⚠️  ${link.type}/${link.slug}: Nenalezeno front matter`);
          skipped++;
          continue;
        }
        
        // Zkontrolovat, jestli tag už existuje
        const existingTags = fm.content.match(/^(tags|category):\s*\[(.*?)\]/ms);
        if (existingTags) {
          const tags = existingTags[2]
            .split(',')
            .map(t => t.trim().replace(/['"]/g, ''))
            .filter(t => t);
          
          if (tags.includes(tag)) {
            // Tag už existuje, přeskočit
            continue;
          }
        }
        
        // Přidat tag
        const updatedFrontMatter = addTagToFrontMatter(fm.content, tag);
        const markdownContent = content.substring(fm.end);
        const newContent = `---\n${updatedFrontMatter}\n---${markdownContent}`;
        
        writeFileSync(filePath, newContent, 'utf-8');
        console.log(`   ✅ ${link.type}/${link.slug}: přidán tag ${tag}`);
        updated++;
        
      } catch (error) {
        console.error(`   ❌ ${link.type}/${link.slug}: Chyba - ${error.message}`);
        errors++;
      }
    }
    
    console.log(`   Aktualizováno: ${updated}, Přeskočeno: ${skipped}, Chyby: ${errors}`);
    totalUpdated += updated;
    totalSkipped += skipped;
    totalErrors += errors;
  }
  
  console.log(`\n✅ Hotovo!`);
  console.log(`   Celkem aktualizováno: ${totalUpdated}`);
  console.log(`   Celkem přeskočeno: ${totalSkipped}`);
  console.log(`   Celkem chyb: ${totalErrors}`);
}

main();
