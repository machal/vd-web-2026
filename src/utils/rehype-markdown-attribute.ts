import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { fromHtml } from 'hast-util-from-html';
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
        // Získat textový obsah elementu
        const textContent = extractTextContent(node);
        
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
            console.warn('Failed to process markdown attribute:', error);
          }
        }
      }
    });
  };
};

/**
 * Extrahuje textový obsah z HAST uzlu
 */
function extractTextContent(node: any): string {
  if (node.type === 'text') {
    return node.value || '';
  }
  
  if (node.type === 'element' && node.children) {
    return node.children
      .map((child: any) => extractTextContent(child))
      .join('');
  }
  
  return '';
}
