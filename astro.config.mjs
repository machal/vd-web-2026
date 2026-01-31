import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
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
import { vitePluginContentImages } from './vite-plugin-content-images.ts';
import { vitePluginDesignImages } from './vite-plugin-design-images.ts';
import { vitePluginValidateFrontmatter } from './vite-plugin-validate-frontmatter.ts';

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
