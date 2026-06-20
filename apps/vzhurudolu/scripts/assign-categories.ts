#!/usr/bin/env npx tsx
/**
 * Script pro přidání hlavní kategorie k článkům
 * 
 * Projde všechny MD soubory a přidá jednu z 17 oficiálních kategorií,
 * pokud článek žádnou z nich nemá.
 * 
 * Použití:
 *   npx tsx scripts/assign-categories.ts          # Jen report (bez změn)
 *   npx tsx scripts/assign-categories.ts --write  # Zapsat změny do souborů
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// 17 oficiálních kategorií z homepage
const OFFICIAL_CATEGORIES = [
  'css',
  'rychlost-nacitani',
  'nastroje',
  'dovednosti',
  'responzivni-design',
  'javascript',
  'html',
  'svg',
  'bootstrap',
  'prohlizece',
  'netechnicke',
  'skoleni',
  'pristupnost',
  'organizace-css',
  'wordpress',
  'amp',
  'webdesign',
] as const;

type OfficialCategory = typeof OFFICIAL_CATEGORIES[number];

// Klíčová slova mapující na oficiální kategorie
const CATEGORY_KEYWORDS: Record<OfficialCategory, string[]> = {
  'css': [
    'css', 'css3', 'flexbox', 'grid', 'cssgrid', 'selektory', 'selektor',
    'kaskáda', 'styly', 'tailwind', 'sass', 'less', 'postcss', 'stylelint',
    'bem', 'oocss', 'smacss', 'utility', 'container queries', 'style queries',
    'media queries', 'animace', 'transitions', 'transforms', 'gradients',
    'box-shadow', 'border-radius', 'font-face', 'jednotky', 'rem', 'em',
    'viewport', 'clamp', 'calc', 'custom properties', 'proměnné', 'variables',
    'multicolumn', 'aspect-ratio', 'gap', 'align', 'justify', 'place',
    'display', 'position', 'float', 'clear', 'overflow', 'z-index',
  ],
  'javascript': [
    'javascript', 'js', 'typescript', 'react', 'vue', 'angular', 'svelte',
    'node', 'npm', 'webpack', 'vite', 'rollup', 'parcel', 'esbuild',
    'spa', 'pwa', 'service worker', 'web components', 'jquery', 'ajax',
    'fetch', 'async', 'await', 'promise', 'module', 'import', 'export',
    'es6', 'ecmascript', 'dom', 'event', 'listener', 'callback',
    'qwik', 'remix', 'next', 'nuxt', 'astro', 'gatsby',
  ],
  'rychlost-nacitani': [
    'rychlost', 'performance', 'lcp', 'cls', 'inp', 'fcp', 'fid', 'ttfb',
    'lighthouse', 'pagespeed', 'core web vitals', 'web vitals', 'metriky',
    'optimalizace', 'cache', 'cdn', 'preload', 'prefetch', 'preconnect',
    'lazy loading', 'critical css', 'above the fold', 'render blocking',
    'speed index', 'first paint', 'first contentful', 'largest contentful',
    'cumulative layout', 'interaction to next', 'time to interactive',
    'http2', 'http3', 'compression', 'gzip', 'brotli', 'minifikace',
  ],
  'nastroje': [
    'nástroje', 'nastroje', 'devtools', 'chrome devtools', 'firefox',
    'vscode', 'editor', 'ide', 'terminal', 'cli', 'command line',
    'gulp', 'grunt', 'automatizace', 'build', 'bundler', 'task runner',
    'git', 'github', 'bitbucket', 'version control', 'ci', 'cd',
    'docker', 'devstack', 'browsersync', 'pattern lab', 'figma',
  ],
  'responzivni-design': [
    'responzivní', 'responsive', 'rwd', 'mobile first', 'breakpoint',
    'viewport', 'media queries', 'adaptivní', 'adaptive', 'fluid',
    'pružný', 'elastický', 'mobilní', 'tablet', 'desktop',
    'picture', 'srcset', 'sizes', 'art direction',
  ],
  'html': [
    'html', 'html5', 'sémantika', 'semantic', 'strukturální', 'structure',
    'form', 'input', 'button', 'link', 'meta', 'head', 'body',
    'article', 'section', 'nav', 'header', 'footer', 'main', 'aside',
    'figure', 'figcaption', 'picture', 'video', 'audio', 'canvas',
    'dialog', 'details', 'summary', 'template', 'slot',
  ],
  'svg': [
    'svg', 'vektorová grafika', 'vektor', 'ikony', 'icon', 'sprite',
    'path', 'viewbox', 'symbol', 'use', 'defs', 'clippath',
    'animace svg', 'smil', 'inline svg',
  ],
  'bootstrap': [
    'bootstrap', 'bootstrap 4', 'bootstrap 5', 'bootstrap grid',
    'bootstrap komponenty', 'bootstrap utility',
  ],
  'prohlizece': [
    'prohlížeč', 'prohlizec', 'browser', 'chrome', 'firefox', 'safari',
    'edge', 'opera', 'ie', 'internet explorer', 'webkit', 'blink',
    'gecko', 'rendering engine', 'vendor prefix', 'caniuse',
    'polyfill', 'fallback', 'graceful degradation', 'progressive enhancement',
  ],
  'netechnicke': [
    'netechnické', 'soft skills', 'komunikace', 'prezentace', 'psaní',
    'produktivita', 'time management', 'práce', 'kariéra', 'freelance',
    'podnikání', 'byznys', 'marketing', 'osobní rozvoj', 'knihy', 'čtení',
    'inbox zero', 'email', 'hluboká práce', 'deep work', 'focus',
    'pohovor', 'životopis', 'cv', 'hr', 'nábor', 'tým',
  ],
  'skoleni': [
    'školení', 'kurz', 'workshop', 'webinář', 'přednáška', 'konference',
    'vzdělávání', 'učení', 'tutorial', 'návod', 'jak se naučit',
  ],
  'pristupnost': [
    'přístupnost', 'accessibility', 'a11y', 'aria', 'wai', 'wcag',
    'screen reader', 'odečítač', 'voiceover', 'nvda', 'jaws',
    'alt text', 'kontrast', 'focus', 'keyboard', 'klávesnice',
    'semantický', 'landmark', 'role', 'tabindex',
  ],
  'organizace-css': [
    'organizace css', 'metodika', 'architektura css', 'struktura css',
    'bem', 'oocss', 'smacss', 'itcss', 'atomic css', 'utility first',
    'komponenty', 'design system', 'pattern library', 'style guide',
    'naming convention', 'konvence', 'modularita', 'škálovatelnost',
  ],
  'wordpress': [
    'wordpress', 'wp', 'gutenberg', 'woocommerce', 'plugin wordpress',
    'theme wordpress', 'šablona wordpress', 'wordpress theme',
  ],
  'amp': [
    'amp', 'accelerated mobile pages', 'amp html', 'amp cache',
    'amp stories', 'amp email', 'amp komponenty',
  ],
  'webdesign': [
    'design', 'webdesign', 'ux', 'ui', 'user experience', 'user interface',
    'typografie', 'typography', 'písmo', 'font', 'barvy', 'color',
    'layout', 'kompozice', 'whitespace', 'spacing', 'mřížka',
    'wireframe', 'mockup', 'prototyp', 'figma', 'sketch', 'adobe xd',
  ],
  'dovednosti': [
    'dovednosti', 'skills', 'schopnosti', 'kompetence', 'růst',
    'kariéra', 'profesní rozvoj', 'učení', 'mentoring', 'koučink',
  ],
};

// Cesty k content složkám
const CONTENT_DIRS = [
  join(process.cwd(), 'src/content/prirucka'),
  join(process.cwd(), 'src/content/blog'),
  join(process.cwd(), 'src/content/podcast'),
];

interface ArticleAnalysis {
  filePath: string;
  fileName: string;
  collection: string;
  title: string;
  currentCategories: string[];
  hasOfficialCategory: boolean;
  suggestedCategory: OfficialCategory | null;
  matchedKeywords: string[];
}

/**
 * Parse front matter z MD souboru
 */
function parseFrontMatter(content: string): { data: Record<string, any>; body: string; raw: string } | null {
  if (!content.startsWith('---\n')) {
    return null;
  }
  
  const endIndex = content.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return null;
  }
  
  const frontMatterRaw = content.substring(4, endIndex);
  const body = content.substring(endIndex + 5);
  
  // Jednoduchý YAML parser pro naše potřeby
  const data: Record<string, any> = {};
  const lines = frontMatterRaw.split('\n');
  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;
  
  for (const line of lines) {
    // Array item
    if (line.match(/^\s+-\s+/)) {
      const value = line.replace(/^\s+-\s+/, '').replace(/['"]/g, '').trim();
      currentArray.push(value);
      continue;
    }
    
    // Inline array: key: ['val1', 'val2']
    const inlineArrayMatch = line.match(/^(\w+):\s*\[(.*)\]/);
    if (inlineArrayMatch) {
      if (inArray && currentKey) {
        data[currentKey] = currentArray;
      }
      inArray = false;
      currentKey = inlineArrayMatch[1];
      const values = inlineArrayMatch[2]
        .split(',')
        .map(v => v.trim().replace(/['"]/g, ''))
        .filter(v => v);
      data[currentKey] = values;
      continue;
    }
    
    // Key: value
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (inArray && currentKey) {
        data[currentKey] = currentArray;
      }
      
      currentKey = keyMatch[1];
      const value = keyMatch[2].replace(/['"]/g, '').trim();
      
      if (value === '') {
        // Možná začíná array na dalších řádcích
        inArray = true;
        currentArray = [];
      } else {
        inArray = false;
        data[currentKey] = value;
      }
    }
  }
  
  // Uložit poslední array
  if (inArray && currentKey) {
    data[currentKey] = currentArray;
  }
  
  return { data, body, raw: frontMatterRaw };
}

/**
 * Získá první odstavec z markdown body
 */
function getFirstParagraph(body: string): string {
  // Přeskočit H1 a prázdné řádky
  const lines = body.split('\n');
  let foundContent = false;
  const paragraphLines: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Přeskočit H1
    if (trimmed.startsWith('# ')) continue;
    
    // Přeskočit prázdné řádky na začátku
    if (!foundContent && trimmed === '') continue;
    
    // Přeskočit HTML komentáře a komponenty
    if (trimmed.startsWith('<!--') || trimmed.startsWith('<')) continue;
    
    // Našli jsme obsah
    if (trimmed !== '') {
      foundContent = true;
      paragraphLines.push(trimmed);
    } else if (foundContent) {
      // Konec prvního odstavce
      break;
    }
  }
  
  return paragraphLines.join(' ');
}

/**
 * Analyzuje článek a navrhne kategorii
 */
function analyzeArticle(filePath: string, collection: string): ArticleAnalysis {
  const content = readFileSync(filePath, 'utf-8');
  const parsed = parseFrontMatter(content);
  
  const fileName = filePath.split('/').pop() || '';
  
  if (!parsed) {
    return {
      filePath,
      fileName,
      collection,
      title: 'Unknown',
      currentCategories: [],
      hasOfficialCategory: false,
      suggestedCategory: null,
      matchedKeywords: [],
    };
  }
  
  const { data, body } = parsed;
  
  // Získat aktuální kategorie
  let currentCategories: string[] = [];
  if (Array.isArray(data.category)) {
    currentCategories = data.category;
  } else if (typeof data.category === 'string') {
    currentCategories = [data.category];
  }
  if (Array.isArray(data.tags)) {
    currentCategories = [...currentCategories, ...data.tags];
  }
  
  // Zkontrolovat, jestli už má oficiální kategorii
  const hasOfficialCategory = currentCategories.some(cat => 
    OFFICIAL_CATEGORIES.includes(cat as OfficialCategory)
  );
  
  // Pokud už má oficiální kategorii, nenavrhovat
  if (hasOfficialCategory) {
    return {
      filePath,
      fileName,
      collection,
      title: String(data.title || data.postTitle || data.heading || 'Unknown'),
      currentCategories,
      hasOfficialCategory: true,
      suggestedCategory: null,
      matchedKeywords: [],
    };
  }
  
  // Sestavit text k analýze
  const title = String(data.title || data.postTitle || data.heading || '');
  const perex = String(data.perex || data.excerpt || '');
  const heading = String(data.heading || '');
  const firstParagraph = getFirstParagraph(body);
  
  const textToAnalyze = [title, heading, perex, firstParagraph].join(' ').toLowerCase();
  
  // Najít shody s klíčovými slovy
  const categoryScores: Record<string, { score: number; keywords: string[] }> = {};
  
  for (const category of OFFICIAL_CATEGORIES) {
    categoryScores[category] = { score: 0, keywords: [] };
    
    for (const keyword of CATEGORY_KEYWORDS[category]) {
      // Hledat celá slova nebo fráze
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = textToAnalyze.match(regex);
      
      if (matches) {
        categoryScores[category].score += matches.length;
        if (!categoryScores[category].keywords.includes(keyword)) {
          categoryScores[category].keywords.push(keyword);
        }
      }
    }
  }
  
  // Najít kategorii s nejvyšším skóre
  let bestCategory: OfficialCategory | null = null;
  let bestScore = 0;
  let bestKeywords: string[] = [];
  
  for (const category of OFFICIAL_CATEGORIES) {
    if (categoryScores[category].score > bestScore) {
      bestScore = categoryScores[category].score;
      bestCategory = category;
      bestKeywords = categoryScores[category].keywords;
    }
  }
  
  return {
    filePath,
    fileName,
    collection,
    title: String(title || 'Unknown'),
    currentCategories,
    hasOfficialCategory: false,
    suggestedCategory: bestCategory,
    matchedKeywords: bestKeywords,
  };
}

/**
 * Přidá kategorii do front matter
 */
function addCategoryToFile(filePath: string, category: OfficialCategory): boolean {
  const content = readFileSync(filePath, 'utf-8');
  const parsed = parseFrontMatter(content);
  
  if (!parsed) return false;
  
  const { data, raw } = parsed;
  
  // Zjistit, jestli existuje pole category
  let newFrontMatter = raw;
  
  // Odstranit prázdné category: [] pokud existuje
  if (Array.isArray(data.category) && data.category.length === 0) {
    newFrontMatter = raw.replace(/^category: \[\]\s*\n?/m, '');
  }
  
  if (Array.isArray(data.category) && data.category.length > 0) {
    // Přidat do existujícího pole
    // Najít konec category pole
    const categoryArrayMatch = raw.match(/^category:\s*$/m);
    if (categoryArrayMatch) {
      // Multi-line array - najít poslední položku a přidat za ni
      const lines = raw.split('\n');
      const newLines: string[] = [];
      let inCategoryArray = false;
      let addedCategory = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        newLines.push(line);
        
        if (line.match(/^category:\s*$/)) {
          inCategoryArray = true;
          continue;
        }
        
        if (inCategoryArray) {
          if (line.match(/^\s+-\s+/)) {
            // Jsme v category array
            // Zkontrolovat, jestli další řádek není také položka
            const nextLine = lines[i + 1];
            if (!nextLine || !nextLine.match(/^\s+-\s+/)) {
              // Toto je poslední položka, přidat novou
              if (!addedCategory) {
                newLines.push(`  - ${category}`);
                addedCategory = true;
              }
              inCategoryArray = false;
            }
          } else {
            inCategoryArray = false;
          }
        }
      }
      
      newFrontMatter = newLines.join('\n');
    } else {
      // Inline array
      const inlineMatch = raw.match(/^(category:\s*\[)(.*?)(\])$/m);
      if (inlineMatch) {
        const existingValues = inlineMatch[2];
        const newValues = existingValues ? `${existingValues}, '${category}'` : `'${category}'`;
        newFrontMatter = raw.replace(
          /^category:\s*\[.*?\]$/m,
          `category: [${newValues}]`
        );
      }
    }
  } else if (typeof data.category === 'string' && data.category) {
    // Změnit string na array
    newFrontMatter = raw.replace(
      /^category:\s*['"]?([^'"\n]+)['"]?$/m,
      `category:\n  - $1\n  - ${category}`
    );
  } else {
    // Kategorie neexistuje nebo byla prázdná, přidat novou
    // Přidat za title/postTitle/heading nebo na začátek
    const baseRaw = newFrontMatter || raw;
    const titleMatch = baseRaw.match(/^(title|postTitle|heading):\s*.+$/m);
    if (titleMatch) {
      newFrontMatter = baseRaw.replace(
        titleMatch[0],
        `${titleMatch[0]}\ncategory:\n  - ${category}`
      );
    } else {
      // Přidat na konec front matter
      newFrontMatter = `${baseRaw}\ncategory:\n  - ${category}`;
    }
  }
  
  // Sestavit nový obsah
  const bodyStart = content.indexOf('\n---\n', 4) + 5;
  const body = content.substring(bodyStart);
  const newContent = `---\n${newFrontMatter}\n---\n${body}`;
  
  writeFileSync(filePath, newContent, 'utf-8');
  return true;
}

/**
 * Hlavní funkce
 */
function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  
  console.log('='.repeat(60));
  console.log('📊 Analýza kategorií článků');
  console.log('='.repeat(60));
  console.log(`Režim: ${writeMode ? '✏️  ZÁPIS' : '👁️  POUZE REPORT'}`);
  console.log();
  
  const allArticles: ArticleAnalysis[] = [];
  const categoryStats: Record<string, number> = {};
  
  // Projít všechny content složky
  for (const dir of CONTENT_DIRS) {
    const collection = dir.split('/').pop() || '';
    console.log(`📁 Procházím: ${collection}`);
    
    const files = readdirSync(dir).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      const filePath = join(dir, file);
      const analysis = analyzeArticle(filePath, collection);
      allArticles.push(analysis);
      
      // Statistiky kategorií
      for (const cat of analysis.currentCategories) {
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      }
    }
  }
  
  console.log();
  console.log('='.repeat(60));
  console.log('📈 STATISTIKY');
  console.log('='.repeat(60));
  
  const withOfficial = allArticles.filter(a => a.hasOfficialCategory);
  const withoutOfficial = allArticles.filter(a => !a.hasOfficialCategory);
  const withSuggestion = withoutOfficial.filter(a => a.suggestedCategory);
  const noSuggestion = withoutOfficial.filter(a => !a.suggestedCategory);
  
  console.log(`Celkem článků: ${allArticles.length}`);
  console.log(`S oficiální kategorií: ${withOfficial.length} (${(withOfficial.length / allArticles.length * 100).toFixed(1)}%)`);
  console.log(`Bez oficiální kategorie: ${withoutOfficial.length}`);
  console.log(`  - S návrhem: ${withSuggestion.length}`);
  console.log(`  - Bez návrhu: ${noSuggestion.length}`);
  
  console.log();
  console.log('='.repeat(60));
  console.log('📋 VŠECHNY POUŽITÉ KATEGORIE (seřazeno podle počtu)');
  console.log('='.repeat(60));
  
  const sortedCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1]);
  
  for (const [cat, count] of sortedCategories) {
    const isOfficial = OFFICIAL_CATEGORIES.includes(cat as OfficialCategory);
    const marker = isOfficial ? '✅' : '  ';
    console.log(`${marker} ${cat}: ${count}`);
  }
  
  console.log();
  console.log('='.repeat(60));
  console.log('🔍 OFICIÁLNÍ KATEGORIE - POKRYTÍ');
  console.log('='.repeat(60));
  
  for (const cat of OFFICIAL_CATEGORIES) {
    const count = categoryStats[cat] || 0;
    const bar = '█'.repeat(Math.min(count / 5, 30));
    console.log(`${cat.padEnd(20)} ${String(count).padStart(4)} ${bar}`);
  }
  
  console.log();
  console.log('='.repeat(60));
  console.log('📝 ČLÁNKY BEZ OFICIÁLNÍ KATEGORIE - NÁVRHY');
  console.log('='.repeat(60));
  
  // Seskupit podle navržené kategorie
  const suggestionsByCategory: Record<string, ArticleAnalysis[]> = {};
  for (const article of withSuggestion) {
    const cat = article.suggestedCategory!;
    if (!suggestionsByCategory[cat]) {
      suggestionsByCategory[cat] = [];
    }
    suggestionsByCategory[cat].push(article);
  }
  
  for (const [category, articles] of Object.entries(suggestionsByCategory).sort((a, b) => b[1].length - a[1].length)) {
    console.log();
    console.log(`📌 ${category} (${articles.length} článků)`);
    for (const article of articles.slice(0, 10)) {
      const titleStr = String(article.title || '');
      console.log(`   ${article.collection}/${article.fileName}`);
      console.log(`      "${titleStr.substring(0, 50)}${titleStr.length > 50 ? '...' : ''}"`);
      console.log(`      Klíčová slova: ${article.matchedKeywords.slice(0, 5).join(', ')}`);
    }
    if (articles.length > 10) {
      console.log(`   ... a dalších ${articles.length - 10} článků`);
    }
  }
  
  if (noSuggestion.length > 0) {
    console.log();
    console.log('='.repeat(60));
    console.log('❓ ČLÁNKY BEZ NÁVRHU (nelze určit kategorii)');
    console.log('='.repeat(60));
    for (const article of noSuggestion.slice(0, 20)) {
      const titleStr = String(article.title || '');
      console.log(`   ${article.collection}/${article.fileName}: "${titleStr.substring(0, 40)}..."`);
    }
    if (noSuggestion.length > 20) {
      console.log(`   ... a dalších ${noSuggestion.length - 20} článků`);
    }
  }
  
  // Zápis změn
  if (writeMode && withSuggestion.length > 0) {
    console.log();
    console.log('='.repeat(60));
    console.log('✏️  ZÁPIS ZMĚN');
    console.log('='.repeat(60));
    
    let updated = 0;
    let errors = 0;
    
    for (const article of withSuggestion) {
      try {
        const success = addCategoryToFile(article.filePath, article.suggestedCategory!);
        if (success) {
          console.log(`✅ ${article.collection}/${article.fileName} → ${article.suggestedCategory}`);
          updated++;
        } else {
          console.log(`⚠️  ${article.collection}/${article.fileName} - nepodařilo se`);
          errors++;
        }
      } catch (error: any) {
        console.log(`❌ ${article.collection}/${article.fileName} - ${error.message}`);
        errors++;
      }
    }
    
    console.log();
    console.log(`Aktualizováno: ${updated}, Chyby: ${errors}`);
  }
  
  console.log();
  console.log('✅ Hotovo!');
}

main();
