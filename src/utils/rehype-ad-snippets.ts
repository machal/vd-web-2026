import type { Plugin } from 'unified';
import type { Root } from 'hast';
import type { VFile } from 'vfile';
import { fromHtml } from 'hast-util-from-html';

/**
 * Konfigurace snippetu pro kategorii
 */
interface AdSnippetConfig {
  /** HTML obsah snippetu */
  html: string;
}

/**
 * Mapování kategorií na snippety
 */
type AdSnippetsMap = Record<string, AdSnippetConfig>;

/**
 * CSS layout snippet pro kategorii 'css'
 */
const CSS_LAYOUT_SNIPPET = `<aside role="complementary" class="ad-snippet ad-snippet--reverse" aria-labelledby="ad-snippet-ebook">
  <h2 id="ad-snippet-ebook" class="ad-snippet__heading sr-only">Reklama</h2>
<svg class="ad-snippet__scissors ad-snippet__scissors-top" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
  <a class="ad-snippet__container" href="/css-layout/">
    <div class="ad-snippet__image maxw-7em">
      <img src="/assets/img/content/handmade/ebooks/vdlayout/vdlayout-model-both__760.webp" alt="Kniha a e-book „CSS: moderní layout" loading="lazy" width="1540" height="1270">
    </div>
    <div class="ad-snippet__text">
      <h3 class="ad-snippet__text-heading" style="color:#f89b1d">
        Kniha „CSS: moderní layout"
      </h3>
      <p class="ad-snippet__text-content">
        Floaty šly spát, ale takhle kniha ve vás probudí CSS kodéra.
        <span class="td-u">Více</span>&nbsp;→
      </p>
    </div>
  </a>
<svg class="ad-snippet__scissors ad-snippet__scissors-bottom" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
</aside>`;

/**
 * Výchozí mapování kategorií na snippety
 */
const DEFAULT_SNIPPETS: AdSnippetsMap = {
  css: {
    html: CSS_LAYOUT_SNIPPET,
  },
};

/**
 * Rehype plugin, který nahradí komentáře <!-- AdSnippet --> HTML snippety
 * podle kategorií článku.
 * 
 * Plugin kontroluje:
 * - Zda článek nemá no_ads: true
 * - Zda má článek některou z kategorií, pro kterou existuje snippet
 * 
 * Pokud jsou podmínky splněny, nahradí komentář příslušným HTML snippetem.
 * 
 * @param snippets - Volitelné mapování kategorií na snippety (výchozí obsahuje 'css')
 */
export function rehypeAdSnippets(snippets: AdSnippetsMap = DEFAULT_SNIPPETS): Plugin<[], Root> {
  return (tree, file: VFile) => {
    try {
      // Získat frontmatter z Astro
      if (!file || !file.data) {
        // Pokud není file nebo data dostupné, plugin nic nedělá
        return;
      }

      const astroData = (file.data as any)?.astro;
      if (!astroData || !astroData.frontmatter || typeof astroData.frontmatter !== 'object') {
        // Pokud není frontmatter dostupné, plugin nic nedělá
        return;
      }

      const frontmatter = astroData.frontmatter as {
        no_ads?: boolean | string;
        category?: string[];
        tags?: string[];
      };

      // Zkontrolovat, zda má článek zakázané reklamy
      const noAds = frontmatter.no_ads === true || frontmatter.no_ads === 'true';
      if (noAds) {
        return;
      }

      // Získat kategorie/tagy článku
      const categories = frontmatter.category || frontmatter.tags || [];
      
      // Najít první kategorii, pro kterou existuje snippet
      let matchingSnippet: AdSnippetConfig | null = null;

      for (const category of categories) {
        if (snippets[category]) {
          matchingSnippet = snippets[category];
          break;
        }
      }

      // Pokud není žádná shoda, plugin nic nedělá
      if (!matchingSnippet) {
        return;
      }

      // Parsovat HTML snippet na HAST uzly
      let snippetNodes: any[];
      try {
        const parsedSnippet = fromHtml(matchingSnippet.html, { fragment: true });
        snippetNodes = parsedSnippet.children || [];
      } catch (error) {
        console.warn('Failed to parse ad snippet HTML:', error);
        return;
      }

      // Najít a nahradit komentáře <!-- AdSnippet -->
      function processNode(node: any, parent: any, index: number): void {
        // Zpracovat komentáře
        if (node.type === 'comment' && node.value?.trim() === 'AdSnippet') {
          // Nahradit komentář HAST uzly ze snippetu
          if (parent && Array.isArray(parent.children)) {
            // Vložit všechny uzly snippetu na místo komentáře
            parent.children.splice(index, 1, ...snippetNodes);
          }
          return;
        }

        // Rekurzivně projít všechny děti
        if (node.children && Array.isArray(node.children)) {
          // Procházet pozpátku, abychom mohli bezpečně měnit pole během iterace
          for (let i = node.children.length - 1; i >= 0; i--) {
            processNode(node.children[i], node, i);
          }
        }
      }

      // Projít celý strom
      if (tree.children && Array.isArray(tree.children)) {
        // Procházet pozpátku, abychom mohli bezpečně měnit pole během iterace
        for (let i = tree.children.length - 1; i >= 0; i--) {
          processNode(tree.children[i], tree, i);
        }
      }
    } catch (error) {
      // Pokud dojde k chybě, logovat ji ale nepřerušit build
      console.warn('Error in rehypeAdSnippets plugin:', error);
      if (error instanceof Error) {
        console.warn('Error message:', error.message);
        console.warn('Error stack:', error.stack);
      }
      return;
    }
  };
}
