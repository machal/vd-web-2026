# Astro Build Rules

## Provozní soubory v dist/

**PRAVIDLO:** Do produkčního buildu v `dist/` musí být zahrnuta složka `dist/_astro/`.

### Co musí zůstat v dist/

- `dist/_astro/` - Adresář obsahuje JavaScript soubory (např. `hoisted.*.js`), na které odkazuje vygenerované HTML. Tyto soubory **nesmí** být mazány ani vynechány při nasazení – prohlížeč je načítá podle odkazů v `<script src="/_astro/...">` a jejich absence způsobuje 404 na produkci.

### Důvod

Astro při buildu vkládá do stránek odkazy na skripty z `_astro/`. Pokud složka chybí (např. byla smazána po buildu nebo nebyla nasazena), na produkci vznikají chyby `GET /_astro/hoisted.XXX.js net::ERR_ABORTED 404`.

### Kontrola

Po buildu ověř, že `dist/_astro/` existuje a obsahuje soubory:
```bash
ls -la dist/_astro/
```
