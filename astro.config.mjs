import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.vzhurudolu.cz',
  integrations: [
    sitemap({
      // Sitemap se vygeneruje automaticky z routes
    }),
  ],
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
