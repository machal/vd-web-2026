# Astro Build Rules

## Provozní soubory v dist/

**PRAVIDLO:** Provozní a build-time soubory se nesmí dostat do produkčního buildu v `dist/`.

### Co se automaticky odstraňuje

- `dist/_astro/` - Adresář obsahuje build-time JavaScript soubory (hoisted.*.js), které nejsou potřeba pro statický web na produkci. Automaticky se odstraňuje po buildu pomocí `vitePluginRemoveAstroBuildDir()` v `astro.config.mjs`.

### Důvod

Adresář `_astro` obsahuje soubory generované Astro během buildu pro client-side hydrataci a podobné build-time operace. Pro statický web (SSG) tyto soubory nejsou potřeba a zbytečně zvyšují velikost buildu.

### Implementace

- Vite plugin `vitePluginRemoveAstroBuildDir()` v `astro.config.mjs` automaticky smaže `dist/_astro/` po dokončení buildu.
- Plugin běží v `closeBundle` hooku, takže se spustí až po dokončení celého buildu.

### Kontrola

Po buildu zkontroluj, že `dist/_astro/` neexistuje:
```bash
ls -la dist/_astro/  # Mělo by vrátit "No such file or directory"
```
