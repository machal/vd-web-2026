import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin, který transformuje elementy s třídou "related" na strukturu inner-box inner-box--side.
 * 
 * Transformace:
 * 1. Změní třídu z "related" na "inner-box inner-box--side"
 * 2. Přidá nadpis "SOUVISEJÍCÍ" jako první dítě
 * 3. Transformuje <ul> na <ul class="inner-box__list">
 * 4. Transformuje všechny <a> uvnitř <li> na <a class="inner-box__list-item">
 * 
 * Původní struktura:
 * <div class="related"><ul><li><a href="...">text</a></li></ul></div>
 * 
 * Cílová struktura:
 * <div class="inner-box inner-box--side">
 *   <h2 class="inner-box__heading">SOUVISEJÍCÍ</h2>
 *   <ul class="inner-box__list">
 *     <li><a class="inner-box__list-item" href="...">text</a></li>
 *   </ul>
 * </div>
 */
export const rehypeRelatedToInnerBox: Plugin<[], Root> = () => {
  return (tree) => {
    /**
     * Zkontroluje, zda element má třídu
     */
    function hasClass(node: any, className: string): boolean {
      if (!node.properties) {
        return false;
      }

      const classNames = node.properties.className || node.properties.class;
      
      if (!classNames) {
        return false;
      }
      
      if (Array.isArray(classNames)) {
        return classNames.includes(className);
      }
      
      if (typeof classNames === 'string') {
        const classes = classNames.split(/\s+/).filter((c: string) => c.trim());
        return classes.includes(className);
      }
      
      return false;
    }

    /**
     * Nastaví třídy elementu (nahradí existující)
     */
    function setClasses(node: any, classes: string[]): void {
      if (!node.properties) {
        node.properties = {};
      }

      node.properties.className = classes;
    }

    /**
     * Přidá třídu do elementu
     */
    function addClass(node: any, className: string): void {
      if (!node.properties) {
        node.properties = {};
      }

      const classNames = node.properties.className || node.properties.class || [];
      const classesArray = Array.isArray(classNames) ? [...classNames] : 
                          typeof classNames === 'string' ? classNames.split(/\s+/).filter((c: string) => c.trim()) : 
                          [];

      if (!classesArray.includes(className)) {
        classesArray.push(className);
      }

      node.properties.className = classesArray;
    }

    /**
     * Transformuje <li> elementy a jejich obsah
     * - Pokud <li> obsahuje <a>, přidá třídu inner-box__list-item na <a>
     * - Pokud <li> neobsahuje <a> (aktivní položka), přidá třídu inner-box__list-item--active na <li>
     */
    function transformListItems(node: any): void {
      if (!node.children || !Array.isArray(node.children)) {
        return;
      }

      for (const child of node.children) {
        if (child.type === 'element') {
          if (child.tagName === 'li') {
            // Zkontrolovat, zda <li> obsahuje <a> tag
            const hasLink = child.children && child.children.some(
              (c: any) => c.type === 'element' && c.tagName === 'a'
            );

            if (hasLink) {
              // Pokud má odkaz, přidat třídu inner-box__list-item na <a>
              for (const liChild of child.children || []) {
                if (liChild.type === 'element' && liChild.tagName === 'a') {
                  addClass(liChild, 'inner-box__list-item');
                }
              }
            } else {
              // Pokud nemá odkaz (aktivní položka), přidat třídu na <li>
              addClass(child, 'inner-box__list-item--active');
            }
          }
          
          // Rekurzivně zpracovat děti
          transformListItems(child);
        }
      }
    }

    // Najít všechny elementy s třídou "related"
    visit(tree, 'element', (node: any) => {
      if (hasClass(node, 'related')) {
        // Změnit třídu z "related" na "inner-box inner-box--side"
        setClasses(node, ['inner-box', 'inner-box--side']);

        // Vytvořit nadpis "SOUVISEJÍCÍ"
        const heading = {
          type: 'element',
          tagName: 'h2',
          properties: {
            className: ['inner-box__heading']
          },
          children: [
            {
              type: 'text',
              value: 'SOUVISEJÍCÍ'
            }
          ]
        };

        // Přidat nadpis jako první dítě
        if (!node.children) {
          node.children = [];
        }
        node.children.unshift(heading);

        // Najít a transformovat <ul> na <ul class="inner-box__list">
        if (node.children && Array.isArray(node.children)) {
          for (const child of node.children) {
            if (child.type === 'element' && child.tagName === 'ul') {
              // Nastavit třídu inner-box__list
              setClasses(child, ['inner-box__list']);
              
              // Transformovat všechny <li> elementy a jejich obsah
              transformListItems(child);
            }
          }
        }
      }
    });
  };
};
