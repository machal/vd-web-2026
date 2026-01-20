import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin, který odstraní všechny elementy s třídou "ebook-only" z HTML.
 * Tyto elementy slouží pouze pro generování ebooků a neměly by se zobrazovat na webu.
 * 
 * Odstraní celý element včetně všech jeho dětí.
 */
export const rehypeRemoveEbookOnly: Plugin<[], Root> = () => {
  return (tree) => {
    /**
     * Zkontroluje, zda element má třídu "ebook-only"
     */
    function hasEbookOnlyClass(node: any): boolean {
      if (!node.properties) {
        return false;
      }

      // V HAST se třídy ukládají jako className (ne class) a jako pole stringů
      // Např. className: ["ebook-only"] nebo className: ["ebook-only", "markdown"]
      const className = node.properties.className || node.properties.class;
      
      if (!className) {
        return false;
      }
      
      // Pokud je className pole, zkontrolujeme každý prvek
      if (Array.isArray(className)) {
        // Pole obsahuje jednotlivé třídy jako stringy
        return className.includes('ebook-only');
      }
      
      // Pokud je className string, rozdělíme ho na jednotlivé třídy a zkontrolujeme
      if (typeof className === 'string') {
        if (className === 'ebook-only') return true;
        const classes = className.split(/\s+/).filter((c: string) => c.trim());
        return classes.includes('ebook-only');
      }
      
      return false;
    }

    // Shromáždit všechny uzly k odstranění
    const nodesToRemove: Array<{ node: any; parent: any; index: number }> = [];

    // Najít všechny uzly s třídou ebook-only
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (hasEbookOnlyClass(node)) {
        if (parent && parent.children && Array.isArray(parent.children) && index !== undefined) {
          nodesToRemove.push({ node, parent, index });
        }
      }
    });

    // Odstranit uzly pozpátku (aby se indexy neměnily při odstraňování)
    nodesToRemove.reverse().forEach(({ parent, index }) => {
      if (parent && parent.children && Array.isArray(parent.children) && index >= 0 && index < parent.children.length) {
        parent.children.splice(index, 1);
      }
    });
  };
};
