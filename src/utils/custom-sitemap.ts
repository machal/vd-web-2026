import type { AstroIntegration } from 'astro';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Vlastní sitemap integrace, která obchází bug v @astrojs/sitemap
 * Bug: Cannot read properties of undefined (reading 'reduce')
 */
export function customSitemap(): AstroIntegration {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const site = 'https://www.vzhurudolu.cz';
        
        // Filtrovat style guide stránky
        const filteredPages = pages.filter(
          (page) => !page.pathname.includes('/style/')
        );

        // Generovat XML
        const urls = filteredPages.map((page) => {
          const url = new URL(page.pathname, site).href;
          // Přidat trailing slash pokud chybí
          const finalUrl = url.endsWith('/') ? url : url + '/';
          return `  <url>
    <loc>${finalUrl}</loc>
  </url>`;
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

        // Zapsat soubor
        const sitemapPath = join(dir.pathname, 'sitemap-0.xml');
        writeFileSync(sitemapPath, sitemap);
        
        // Zapsat sitemap index
        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;
        
        const indexPath = join(dir.pathname, 'sitemap-index.xml');
        writeFileSync(indexPath, sitemapIndex);
        
        console.log(`✓ Sitemap vygenerován: ${filteredPages.length} URL`);
      },
    },
  };
}
