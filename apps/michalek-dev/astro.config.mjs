import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { createCustomSitemap } from '@vd/shared/seo/custom-sitemap';
import { createMarkdownConfig } from '@vd/shared/markdown';
import { vitePluginContentImages } from '@vd/shared/vite-plugins/vite-plugin-content-images';
import { vitePluginDesignImages } from '@vd/shared/vite-plugins/vite-plugin-design-images';
import { vitePluginValidateFrontmatter } from '@vd/shared/vite-plugins/vite-plugin-validate-frontmatter';

function copyRecursiveSync(src, dest) {
  try {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      for (const name of fs.readdirSync(src)) {
        copyRecursiveSync(path.join(src, name), path.join(dest, name));
      }
    } else {
      if (fs.existsSync(dest)) {
        try {
          const srcStat = fs.statSync(src);
          const destStat = fs.statSync(dest);
          if (srcStat.size === destStat.size && srcStat.mtimeMs === destStat.mtimeMs) {
            return;
          }
        } catch {
          // continue with copy
        }
      }
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    if (error.code !== 'EIO' && error.code !== 'ENOENT') {
      console.warn(`[copy-public-to-dist] Warning copying ${src} -> ${dest}:`, error.message);
    }
  }
}

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

          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }

          for (const name of fs.readdirSync(publicDir)) {
            const src = path.join(publicDir, name);
            const dest = path.join(outDir, name);
            copyRecursiveSync(src, dest);
          }
          console.log('[copy-public-to-dist] public/ copied to dist/');
        } catch (error) {
          console.warn('[copy-public-to-dist] Copy error:', error.message);
        }
      },
    },
  };
}

export default defineConfig({
  output: 'static',
  site: 'https://michalek.blog',
  trailingSlash: 'never',
  server: {
    port: 4322,
  },
  integrations: [
    createCustomSitemap({ site: 'https://michalek.blog' }),
  ],
  markdown: createMarkdownConfig({
    contentPathPrefix: '/guide',
    collections: ['blog', 'guide'],
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
      vitePluginValidateFrontmatter(),
      vitePluginContentImages(),
      vitePluginDesignImages(),
      vitePluginCopyPublicToDist(),
    ],
  },
  publicDir: 'public',
});
