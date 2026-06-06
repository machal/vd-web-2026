import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Mapování neznámých jazyků na jazyky, které Shiki umí.
 * Astro sice bere langAlias v shikiConfig, ale do codeToHtml předává původní lang,
 * takže Shiki dostane např. "url" a hodí chybu. Tento plugin přepíše lang v AST
 * před rehype, takže Shiki už dostane "text" nebo "xml".
 */
const LANG_ALIAS: Record<string, string> = {
  url: 'text',
  terminal: 'text',
  img: 'text',
  htaccess: 'text',
  robotstxt: 'text',
  svg: 'xml',
  css3: 'css',
};

export const remarkNormalizeCodeLang: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang && LANG_ALIAS[node.lang]) {
        node.lang = LANG_ALIAS[node.lang];
      }
    });
  };
};
