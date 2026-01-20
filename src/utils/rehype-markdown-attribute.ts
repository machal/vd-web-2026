import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { fromHtml } from 'hast-util-from-html';
import { toText } from 'hast-util-to-text';
import { toHtml } from 'hast-util-to-html';
import { remarkHeadingIds } from './remark-heading-ids.ts';

/**
 * Rehype plugin, který zpracovává HTML elementy s atributem markdown="1"
 * a zpracovává jejich obsah jako Markdown.
 * 
 * Transformuje:
 * <div markdown="1">- [Link](url.md)</div>
 * 
 * Na:
 * <div><ul><li><a href="url.md">Link</a></li></ul></div>
 */
export const rehypeMarkdownAttribute: Plugin<[], Root> = () => {
  return (tree) => {
    // Vytvořit unified pipeline pro zpracování Markdownu
    // Použít stejné pluginy jako v hlavní Astro konfiguraci pro konzistenci
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm) // Podpora pro GitHub Flavored Markdown (tabulky, atd.)
      .use(remarkHeadingIds) // Stejný plugin jako v hlavní konfiguraci
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true });

    // Použít visit pro efektivní procházení stromu
    visit(tree, 'element', (node: any) => {
      // Zkontrolovat, zda je to element s markdown="1" atributem
      if (
        node.properties &&
        (node.properties.markdown === '1' || node.properties.markdown === true)
      ) {
        // Vytvořit kopii uzlu pouze s dětmi (bez vlastního elementu)
        // Pro markdown tabulky potřebujeme zachovat strukturu včetně nových řádků
        const contentNode = {
          type: 'root',
          children: node.children || []
        };
        
        // Převést HAST děti zpět na HTML string
        // Toto zachová strukturu, kterou pak můžeme zpracovat jako markdown
        const htmlContent = toHtml(contentNode);
        
        // Pokud obsah obsahuje HTML tabulku, musíme ji převést zpět na markdown tabulku
        // Jinak použijeme textový obsah
        let textContent = '';
        
        if (htmlContent.includes('<table') || htmlContent.includes('<tr') || htmlContent.includes('<td')) {
          // Pokud obsahuje HTML tabulku, musíme ji převést zpět na markdown tabulku
          // Pro jednoduchost použijeme toText, který by měl zachovat strukturu
          textContent = toText(contentNode, { whitespace: 'pre' });
          
          // Pokud toText nefunguje dobře, použijeme fallback - převedeme HTML tabulku na markdown
          if (!textContent.includes('|') || textContent.split('\n').length < 3) {
            // Fallback: převedeme HTML tabulku na markdown tabulku ručně
            textContent = convertHtmlTableToMarkdown(htmlContent);
          }
        } else {
          // Pro ne-tabulkový obsah použijeme toText
          textContent = toText(contentNode, { whitespace: 'pre' });
          
          // Pokud jsme nic nedostali, použijeme fallback
          if (!textContent.trim()) {
            textContent = '';
            for (const child of node.children || []) {
              if (child.type === 'text') {
                textContent += child.value || '';
              } else if (child.type === 'element') {
                const childText = toText(child, { whitespace: 'pre' });
                textContent += childText;
                // Přidáme nový řádek po blokových elementech
                if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol'].includes(child.tagName)) {
                  textContent += '\n';
                }
              }
            }
          }
        }
        
        if (textContent.trim()) {
          try {
            // Zpracovat Markdown na HTML string (synchronně)
            const htmlString = processor.processSync(textContent);
            const html = String(htmlString);
            
            // Převést HTML string zpět na HAST uzly
            const newNodes = fromHtml(html, { fragment: true });
            
            // Nahradit obsah elementu zpracovaným obsahem
            node.children = newNodes.children || [];
            
            // Odstranit markdown atribut (už není potřeba)
            delete node.properties.markdown;
          } catch (error) {
            // Pokud se zpracování nepovede, ponechat původní obsah
            console.warn('Failed to process markdown attribute:', error, '\nContent:', textContent.substring(0, 200));
          }
        }
      }
    });
  };
};

/**
 * Převede HTML tabulku na markdown tabulku
 */
function convertHtmlTableToMarkdown(html: string): string {
  // Odstraníme HTML tagy a extrahujeme obsah buněk
  // Toto je zjednodušená verze - pro složitější tabulky by bylo potřeba použít parser
  const rows: string[][] = [];
  
  // Najdeme všechny řádky tabulky
  const rowMatches = html.matchAll(/<tr[^>]*>(.*?)<\/tr>/gis);
  for (const rowMatch of rowMatches) {
    const rowHtml = rowMatch[1];
    const cells: string[] = [];
    
    // Najdeme všechny buňky v řádku
    const cellMatches = rowHtml.matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/gis);
    for (const cellMatch of cellMatches) {
      let cellContent = cellMatch[1];
      // Odstraníme HTML tagy z obsahu buňky
      cellContent = cellContent.replace(/<[^>]+>/g, '').trim();
      // Dekódujeme HTML entity
      cellContent = cellContent
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      cells.push(cellContent);
    }
    
    if (cells.length > 0) {
      rows.push(cells);
    }
  }
  
  if (rows.length === 0) {
    return '';
  }
  
  // Vytvoříme markdown tabulku
  let markdown = '';
  const numColumns = Math.max(...rows.map(row => row.length));
  
  // Hlavička tabulky
  if (rows.length > 0) {
    markdown += '| ' + rows[0].join(' | ') + ' |\n';
    // Oddělovač
    markdown += '|' + ' --- |'.repeat(numColumns) + '\n';
    // Zbývající řádky
    for (let i = 1; i < rows.length; i++) {
      markdown += '| ' + rows[i].join(' | ') + ' |\n';
    }
  }
  
  return markdown;
}

