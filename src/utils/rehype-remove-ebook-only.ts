import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visitParents } from 'unist-util-visit-parents';

/**
 * Rehype plugin, který odstraní všechny elementy s třídou "ebook-only" z HTML.
 * Tyto elementy slouží pouze pro generování ebooků a neměly by se zobrazovat na webu.
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

    // Shromáždit všechny uzly k odstranění s jejich rodiči a indexy
    const nodesToRemove: Array<{ node: any; parent: any; index: number }> = [];

    // Najít všechny uzly s třídou ebook-only pomocí visitParents
    visitParents(tree, (node: any, ancestors: any[]) => {
      if (node.type === 'element' && hasEbookOnlyClass(node)) {
        // Najít rodiče - poslední v ancestors je přímý rodič, nebo tree pokud není žádný
        const parent = ancestors.length > 0 ? ancestors[ancestors.length - 1] : tree;
        if (parent && parent.children && Array.isArray(parent.children)) {
          const index = parent.children.indexOf(node);
          if (index !== -1) {
            nodesToRemove.push({ node, parent, index });
          }
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
