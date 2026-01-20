import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { fromHtml } from 'hast-util-from-html';
import { remarkHeadingIds } from './remark-heading-ids.ts';

/**
 * Remark plugin, který zpracovává HTML elementy s atributem markdown="1"
 * a zpracovává jejich obsah jako Markdown PŘED převodem na rehype.
 * 
 * Tento plugin běží v remark fázi, aby zajistil, že markdown="1" je zpracováno
 * jako součást generování základního HTML, ne jako transformace.
 * 
 * Transformuje:
 * <div markdown="1">- [Link](url.md)</div>
 * 
 * Na: HTML s zpracovaným obsahem (v remark fázi jako HTML string)
 */
export const remarkProcessMarkdownAttributes: Plugin<[], Root> = () => {
  return (tree) => {
    // Vytvořit unified pipeline pro zpracování Markdownu
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm) // Podpora pro GitHub Flavored Markdown (tabulky, atd.)
      .use(remarkHeadingIds) // Stejný plugin jako v hlavní konfiguraci
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true });

    // Najít všechny HTML uzly v markdown AST
    visit(tree, 'html', (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      
      const htmlContent = node.value || '';
      
      // Najít všechny elementy s markdown="1" atributem
      const markdownAttrRegex = /<(\w+)([^>]*?)\s+markdown=["']1["']([^>]*?)>/gi;
      let match;
      const replacements: Array<{ start: number; end: number; replacement: string }> = [];
      
      // Najít všechny otevírací tagy s markdown="1"
      const openTags: Array<{ tagName: string; startIndex: number; fullMatch: string; attrs: string }> = [];
      while ((match = markdownAttrRegex.exec(htmlContent)) !== null) {
        const [fullMatch, tagName, attrsBefore, attrsAfter] = match;
        openTags.push({
          tagName,
          startIndex: match.index,
          fullMatch,
          attrs: attrsBefore + attrsAfter
        });
      }
      
      // Pro každý otevírací tag najít odpovídající uzavírací tag a zpracovat obsah
      for (const openTag of openTags.reverse()) {
        const tagName = openTag.tagName;
        const openTagEnd = openTag.startIndex + openTag.fullMatch.length;
        
        // Najít odpovídající uzavírací tag
        const closeTagRegex = new RegExp(`</${tagName}>`, 'gi');
        closeTagRegex.lastIndex = openTagEnd;
        const closeMatch = closeTagRegex.exec(htmlContent);
        
        if (closeMatch) {
          const closeTagStart = closeMatch.index;
          const innerContent = htmlContent.substring(openTagEnd, closeTagStart);
          
          // Zpracovat vnitřní obsah jako markdown
          try {
            const processedHtml = processor.processSync(innerContent);
            const processedHtmlString = String(processedHtml);
            
            // Vytvořit nový HTML element bez markdown atributu, ale s původními atributy
            const attrsWithoutMarkdown = openTag.attrs.replace(/\s+markdown=["']1["']/gi, '').trim();
            const attrsString = attrsWithoutMarkdown ? ' ' + attrsWithoutMarkdown : '';
            const newHtml = `<${tagName}${attrsString}>${processedHtmlString}</${tagName}>`;
            
            replacements.push({
              start: openTag.startIndex,
              end: closeMatch.index + closeMatch[0].length,
              replacement: newHtml
            });
          } catch (error) {
            console.warn('Failed to process markdown attribute in remark plugin:', error, '\nContent:', innerContent.substring(0, 100));
          }
        }
      }
      
      // Aplikovat nahrazení v opačném pořadí (od konce), aby se indexy nezměnily
      if (replacements.length > 0) {
        replacements.reverse();
        let newHtml = htmlContent;
        for (const replacement of replacements) {
          newHtml = 
            newHtml.substring(0, replacement.start) + 
            replacement.replacement + 
            newHtml.substring(replacement.end);
        }
        
        // Aktualizovat hodnotu HTML uzlu
        node.value = newHtml;
      }
    });
  };
};
