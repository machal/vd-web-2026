import type { Plugin } from 'unified';
import type { Root } from 'hast';

/**
 * Rehype plugin, který převádí odkazy na .md soubory na odkazy příručky.
 * 
 * Transformuje: <a href="css-jazyk-problemy.md"> -> <a href="/prirucka/css-jazyk-problemy">
 * Transformuje: <a href="bem.md"> -> <a href="/prirucka/bem">
 * 
 * Jednoduchá textová transformace - odstraní .md příponu a přidá /prirucka/ prefix.
 */
export const rehypePriruckaLinks: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      // Zpracovat odkazy
      if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string;
        
        // Zkontrolovat, zda odkaz končí na .md a není absolutní URL
        if (href.endsWith('.md') && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('/')) {
          // Odstranit .md příponu a případné cesty
          const filename = href.replace(/\.md$/, '').split('/').pop() || '';
          
          // Převést na URL příručky
          node.properties.href = `/prirucka/${filename}`;
        }
      }
      
      // Rekurzivně projít všechny děti
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(processNode);
      }
    }
    
    processNode(tree);
  };
};
