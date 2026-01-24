import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap'; // Vypnuto - bug s undefined.reduce()
import { customSitemap } from './src/utils/custom-sitemap';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { remarkHeadingIds } from './src/utils/remark-heading-ids.ts';
import { remarkProcessMarkdownAttributes } from './src/utils/remark-process-markdown-attributes.ts';
import { remarkPriruckaImages } from './src/utils/remark-prirucka-images.ts';
import { rehypeRemoveFirstH1 } from './src/utils/rehype-remove-first-h1.ts';
import { rehypeRemoveEbookOnly } from './src/utils/rehype-remove-ebook-only.ts';
import { rehypeHeadingAnchors } from './src/utils/rehype-heading-anchors.ts';
import { rehypePriruckaLinks } from './src/utils/rehype-prirucka-links.ts';
import { rehypePriruckaImages } from './src/utils/rehype-prirucka-images.ts';
import { rehypeConnectedElements } from './src/utils/rehype-connected-elements.ts';
import { rehypeRelatedToInnerBox } from './src/utils/rehype-related-to-inner-box.ts';
import { vitePluginPriruckaImages } from './vite-plugin-prirucka-images.ts';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.vzhurudolu.cz',
  integrations: [
    customSitemap(),
  ],
  markdown: {
    // Shiki syntax highlighting - používáme css-variables pro možnost přepsání barev
    shikiConfig: {
      theme: 'css-variables',
    },
    // FÁZE 1: Základní HTML generování z markdownu
    // Pouze základní parsování markdownu a zpracování markdown="1" atributů
    remarkPlugins: [
      remarkGfm, // GitHub Flavored Markdown (standardní rozšíření)
      remarkPriruckaImages, // Transformace cest k obrázkům - nutné před zpracováním Astro assets (pouze úprava cest, ne transformace obsahu)
      remarkProcessMarkdownAttributes, // Zpracování markdown="1" atributů - potřebné pro generování základního HTML
      // VYPNUTO - transformace budou až na hotovém HTML:
      // remarkHeadingIds, // Přesunuto do rehype fáze (rehypeHeadingAnchors)
    ],
    // Povolit raw HTML v Markdownu (nutné pro markdown="1" atributy)
    remarkRehype: {
      allowDangerousHtml: true,
    },
    // FÁZE 2: Transformace na hotovém HTML
    rehypePlugins: [
      rehypeRaw, // Převod raw HTML na HAST uzly (nutné pro zobrazení HTML v markdownu)
      rehypePriruckaImages, // Transformace cest k obrázkům v HTML elementech (z ../dist/images/ na /prirucka/images/)
      rehypeRemoveEbookOnly, // Odstranění elementů s třídou "ebook-only" (včetně jejich dětí)
      rehypeConnectedElements, // Transformace elementů s třídou "connected" (přidání tříd, úprava obrázků)
      rehypeRelatedToInnerBox, // Transformace elementů s třídou "related" na inner-box inner-box--side
      rehypeHeadingAnchors, // Přidání anchorů k nadpisům (odstraní {#id} z textu, opraví duplikované ID)
      rehypePriruckaLinks, // Transformace odkazů příručky (css-grid.md -> /prirucka/css-grid)
      rehypeRemoveFirstH1, // Odstranění prvního H1 z HTML (nadpis je už v zelené ploše nahoře)
    ],
  },
  vite: {
    plugins: [
      vitePluginPriruckaImages(), // Automatická konverze obrázků příručky
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // Cesty k SCSS souborům
          includePaths: ['assets/scss'],
        },
      },
    },
  },
  // Public assets budou v /public
  // Pokud assets jsou v root, použijeme publicDir: 'public' nebo je zkopírujeme
  publicDir: 'public',
});
