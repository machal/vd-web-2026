import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import { remarkHeadingIds } from './src/utils/remark-heading-ids.ts';
import { rehypeRemoveFirstH1 } from './src/utils/rehype-remove-first-h1.ts';
import { rehypeHeadingAnchors } from './src/utils/rehype-heading-anchors.ts';
import { rehypePriruckaLinks } from './src/utils/rehype-prirucka-links.ts';
import { rehypeMarkdownAttribute } from './src/utils/rehype-markdown-attribute.ts';
import { rehypePriruckaImages } from './src/utils/rehype-prirucka-images.ts';
import { vitePluginPriruckaImages } from './vite-plugin-prirucka-images.ts';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.vzhurudolu.cz',
  integrations: [
    sitemap({
      // Sitemap se vygeneruje automaticky z routes
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingIds],
    // Povolit raw HTML v Markdownu (nutné pro markdown="1" atributy)
    remarkRehype: {
      allowDangerousHtml: true,
    },
    // rehype-raw musí být PRVNÍ, aby převedl raw HTML na HAST uzly
    // rehypeMarkdownAttribute musí být PO rehype-raw, aby mohl zpracovat HTML elementy
    // rehypePriruckaImages musí být PO rehype-raw, aby mohl zpracovat HTML elementy
    rehypePlugins: [
      rehypeRaw, // Převod raw HTML na HAST uzly
      rehypeMarkdownAttribute, // Zpracování markdown="1" atributů
      rehypePriruckaImages, // Transformace cest k obrázkům příručky
      rehypeRemoveFirstH1,
      rehypeHeadingAnchors,
      rehypePriruckaLinks,
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
