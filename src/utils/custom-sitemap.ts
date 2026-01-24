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
        
        // Filtrovat stránky, které nemají být v sitemap
        const filteredPages = pages.filter((page) => {
          const path = page.pathname;
          // Vyřadit style guide a 404 stránku
          if (path.includes('style/')) return false;
          if (path.includes('404')) return false;
          return true;
        });

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

        // Zapsat sitemap.xml přímo do rootu
        const sitemapPath = join(dir.pathname, 'sitemap.xml');
        writeFileSync(sitemapPath, sitemap);
        
        console.log(`✓ Sitemap vygenerován: ${filteredPages.length} URL`);
      },
    },
  };
}
