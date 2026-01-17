import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkHeadingIds } from './src/utils/remark-heading-ids.ts';
import { rehypeRemoveFirstH1 } from './src/utils/rehype-remove-first-h1.ts';
import { rehypeHeadingAnchors } from './src/utils/rehype-heading-anchors.ts';

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
    rehypePlugins: [rehypeRemoveFirstH1, rehypeHeadingAnchors],
  },
  vite: {
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
