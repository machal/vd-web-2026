import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
// import sitemap from '@astrojs/sitemap'; // Vypnuto - bug s undefined.reduce()
import { createCustomSitemap } from '@vd/shared/seo/custom-sitemap';
import { changedFilesIntegration } from './src/utils/changed-files-integration';
import { createMarkdownConfig } from '@vd/shared/markdown';
import { vitePluginPriruckaImages } from '@vd/shared/vite-plugins/vite-plugin-prirucka-images';
import { vitePluginContentImages } from '@vd/shared/vite-plugins/vite-plugin-content-images';
import { vitePluginDesignImages } from '@vd/shared/vite-plugins/vite-plugin-design-images';
import { vitePluginValidateFrontmatter } from '@vd/shared/vite-plugins/vite-plugin-validate-frontmatter';

/**
 * Rekurzivní kopírování souboru nebo adresáře (včetně dotfiles).
 */
function copyRecursiveSync(src, dest) {
  try {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      for (const name of fs.readdirSync(src)) {
        copyRecursiveSync(path.join(src, name), path.join(dest, name));
      }
    } else {
      // Pokud cílový soubor už existuje a je stejný, přeskočíme ho
      if (fs.existsSync(dest)) {
        try {
          const srcStat = fs.statSync(src);
          const destStat = fs.statSync(dest);
          // Pokud jsou soubory stejné (velikost a čas modifikace), přeskočíme
          if (srcStat.size === destStat.size && srcStat.mtimeMs === destStat.mtimeMs) {
            return;
          }
        } catch (e) {
          // Pokud nelze zkontrolovat, pokračujeme s kopírováním
        }
      }
      // Zajistíme, že cílový adresář existuje
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    // Ignorujeme I/O chyby - může to být způsobeno tím, že Astro už soubor zkopíroval
    // nebo že soubor je právě používán jiným procesem
    if (error.code !== 'EIO' && error.code !== 'ENOENT') {
      console.warn(`[copy-public-to-dist] Varování při kopírování ${src} -> ${dest}:`, error.message);
    }
  }
}

/**
 * Vite plugin zajišťující kopírování celého public/ do dist/ při buildu.
 * Astro s publicDir sice public kopíruje, ale dotfiles (např. .htaccess) mohou být
 * v některých verzích ignorované. Tento krok po closeBundle zaručí, že vše z public/
 * v dist/ je, včetně skrytých souborů.
 */
function vitePluginCopyPublicToDist() {
  return {
    name: 'copy-public-to-dist',
    apply: 'build',
    closeBundle: {
      sequential: true,
      handler() {
        try {
          const publicDir = path.resolve('public');
          const outDir = path.resolve('dist');
          if (!fs.existsSync(publicDir)) return;

          // Zajistíme, že výstupní adresář existuje
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }

          for (const name of fs.readdirSync(publicDir)) {
            const src = path.join(publicDir, name);
            const dest = path.join(outDir, name);
            copyRecursiveSync(src, dest);
          }
          console.log('[copy-public-to-dist] public/ zkopírováno do dist/');
        } catch (error) {
          // Necháme build pokračovat i při chybách kopírování
          console.warn('[copy-public-to-dist] Chyba při kopírování:', error.message);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.vzhurudolu.cz',
  trailingSlash: 'never', // Generovat URL bez trailing slash (kromě root /)
  server: {
    port: 4321,
  },
  integrations: [
    createCustomSitemap({ site: 'https://www.vzhurudolu.cz' }),
    changedFilesIntegration(),
  ],
  markdown: createMarkdownConfig({
    contentPathPrefix: '/prirucka',
    collections: ['prirucka', 'blog', 'podcast'],
  }),
  vite: {
    define: {
      'import.meta.env.PUBLIC_ASSET_VERSION': JSON.stringify(
        process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'dev',
      ),
    },
    ssr: {
      noExternal: ['@vd/shared'],
    },
    plugins: [
      vitePluginValidateFrontmatter(), // Validace front-matter v Markdown souborech
      vitePluginPriruckaImages(), // Automatická konverze obrázků příručky
      vitePluginContentImages(), // Content obrázky (blog, lectors, logos...) → WebP
      vitePluginDesignImages(), // Design ikony (SVG optimalizace)
      vitePluginCopyPublicToDist(), // Zaručí, že celý public/ (včetně .htaccess, favicon.ico, …) skončí v dist/
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
