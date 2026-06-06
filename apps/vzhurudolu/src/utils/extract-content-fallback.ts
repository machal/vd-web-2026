import type { CollectionEntry } from 'astro:content';

/**
 * Odstraní HTML tagy a markdown syntax z textu
 */
function stripMarkdownAndHtml(text: string): string {
  return text
    // Odstranit HTML tagy
    .replace(/<[^>]*>/g, '')
    // Odstranit markdown odkazy [text](url) -> text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Odstranit markdown obrázky ![alt](url) -> alt
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
    // Odstranit markdown bold **text** -> text
    .replace(/\*\*([^\*]+)\*\*/g, '$1')
    // Odstranit markdown italic *text* -> text
    .replace(/\*([^\*]+)\*/g, '$1')
    // Odstranit markdown inline code `code` -> code
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

/**
 * Extrahuje první H1 z markdownu pomocí regex
 */
function extractFirstH1(markdown: string): string | null {
  try {
    // Najít první H1 (# text nebo #text)
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    if (h1Match && h1Match[1]) {
      return stripMarkdownAndHtml(h1Match[1]);
    }
    return null;
  } catch (error) {
    console.warn('Error extracting first H1:', error);
    return null;
  }
}

/**
 * Extrahuje první odstavec z markdownu (bez HTML a markdown syntaxe)
 */
function extractFirstParagraph(markdown: string): string | null {
  try {
    // Najít první neprázdný odstavec (řádek, který není prázdný, není nadpis, není seznam, není kód)
    const lines = markdown.split('\n');
    let paragraphLines: string[] = [];
    let inCodeBlock = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Sledovat kódové bloky
      if (trimmed.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      
      if (inCodeBlock) continue;
      
      // Přeskočit prázdné řádky
      if (!trimmed) {
        // Pokud máme nějaké řádky v odstavci, ukončit ho
        if (paragraphLines.length > 0) {
          break;
        }
        continue;
      }
      
      // Přeskočit nadpisy
      if (trimmed.startsWith('#')) {
        if (paragraphLines.length > 0) break;
        continue;
      }
      
      // Přeskočit seznamy
      if (trimmed.match(/^[-*+]\s/)) {
        if (paragraphLines.length > 0) break;
        continue;
      }
      if (trimmed.match(/^\d+\.\s/)) {
        if (paragraphLines.length > 0) break;
        continue;
      }
      
      // Přeskočit HTML tagy samostatně
      if (trimmed.match(/^<[^>]+>$/)) {
        if (paragraphLines.length > 0) break;
        continue;
      }
      
      // Přeskočit HTML komentáře
      if (trimmed.startsWith('<!--')) continue;
      
      // Přidat řádek do odstavce
      paragraphLines.push(trimmed);
    }
    
    // Spojit řádky odstavce a vyčistit
    if (paragraphLines.length > 0) {
      const paragraph = paragraphLines.join(' ');
      const cleaned = stripMarkdownAndHtml(paragraph);
      if (cleaned && cleaned.length > 10) { // Minimálně 10 znaků
        // Omezit délku na rozumnou hodnotu (např. 200 znaků)
        return cleaned.length > 200 ? cleaned.substring(0, 197) + '...' : cleaned;
      }
    }
    
    return null;
  } catch (error) {
    console.warn('Error extracting first paragraph:', error);
    return null;
  }
}

/**
 * Helper funkce pro doplnění chybějících polí z markdown obsahu
 * 
 * @param entry - Entry z kolekce příručky
 * @param markdownContent - Raw markdown obsah (bez front matter)
 * @returns Upravená data s doplněnými hodnotami
 */
export async function enrichPriruckaEntry(
  entry: CollectionEntry<'prirucka'>,
  markdownContent: string
): Promise<CollectionEntry<'prirucka'>['data']> {
  const data = { ...entry.data };
  
  // Extrahovat první H1 a první odstavec
  const firstH1 = extractFirstH1(markdownContent);
  const firstParagraph = extractFirstParagraph(markdownContent);
  
  // Doplnit heading, pokud chybí nebo je prázdný
  if (!data.heading || data.heading.trim() === '') {
    if (firstH1) {
      data.heading = firstH1;
      // Přepsat title pouze pokud je prázdný nebo je stejný jako id (což znamená, že byl nastaven jako fallback v transform funkci)
      if (!data.title || data.title.trim() === '' || data.title === data.id) {
        data.title = firstH1;
      }
    }
  } else {
    // Pokud heading existuje, ale title je stejný jako id, použijeme heading jako title
    if (data.title === data.id && data.heading.trim() !== '') {
      data.title = data.heading;
    }
  }
  
  // Doplnit perex, pokud chybí nebo je prázdný
  if (!data.perex || data.perex.trim() === '') {
    if (firstParagraph) {
      data.perex = firstParagraph;
      data.description = data.description || firstParagraph;
    }
  }
  
  // Doplnit OG title, pokud chybí nebo je prázdný
  if (!data.og_title || data.og_title.trim() === '') {
    const ogTitle = data.heading || data.title || firstH1 || '';
    if (ogTitle) {
      data.og_title = ogTitle;
    }
  }
  
  // Doplnit OG description, pokud chybí nebo je prázdný
  if (!data.og_description || data.og_description.trim() === '') {
    const ogDescription = data.perex || data.description || firstParagraph || '';
    if (ogDescription) {
      data.og_description = ogDescription;
    }
  }
  
  return data;
}
