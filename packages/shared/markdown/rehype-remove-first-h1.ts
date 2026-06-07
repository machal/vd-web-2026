import type { Plugin } from 'unified';
import type { Root } from 'hast';

/**
 * Rehype plugin, který odstraní první H1 z HTML
 * Používá jednoduchou rekurzivní funkci místo unist-util-visit
 */
export const rehypeRemoveFirstH1: Plugin<[], Root> = () => {
  return (tree) => {
    let firstH1Found = false;
    
    function removeFirstH1(node: any): boolean {
      if (firstH1Found) return true;
      
      if (node.children && Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.type === 'element' && child.tagName === 'h1') {
            // Našli jsme první H1 - odstranit ho
            firstH1Found = true;
            node.children.splice(i, 1);
            return true;
          }
          // Rekurzivně prohledat děti
          if (removeFirstH1(child)) {
            return true;
          }
        }
      }
      return false;
    }
    
    removeFirstH1(tree);
  };
};
