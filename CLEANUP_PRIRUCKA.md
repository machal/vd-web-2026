# Úklid příručky - co přesunout/smazat

## 📦 Adresáře k přesunu (e-booky, nejsou na webu)

Tyto adresáře obsahují soubory pro e-booky, které nejsou součástí hlavní příručky na webu:

```
content/prirucka/content-ebook/     (34 MD souborů)
content/prirucka/content-vdamp/     (24 MD souborů)
content/prirucka/content-vdlayout/  (46 MD souborů)
content/prirucka/content-vdwd/      (45 MD souborů)
```

**Celkem: 149 MD souborů pro e-booky**

### Doporučení
- Přesunout do samostatného adresáře, např.:
  - `content/ebooks/` nebo
  - `_archive/ebooks/` nebo
  - `_import/ebooks/`

## 🗑️ Importní soubory k smazání

### V `content/prirucka/`:
- `content/` - obsahuje syrové MD soubory (371 souborů), které už byly transformovány do `src/content/prirucka/`
- `README.md` - pokud už není potřeba

### V `_import/export-for-astro/`:
- `content/prirucka/` - exportované soubory (525 souborů), které už byly transformovány
- Ostatní soubory v `_import/export-for-astro/` pravděpodobně ponechat (skripty, dokumentace)

## 📊 Souhrn

### Přesunout (e-booky):
- `content/prirucka/content-ebook/`
- `content/prirucka/content-vdamp/`
- `content/prirucka/content-vdlayout/`
- `content/prirucka/content-vdwd/`

### Smazat (importní soubory):
- `content/prirucka/content/` (371 MD souborů - už transformováno do `src/content/prirucka/`)
- `content/prirucka/README.md` (pokud už není potřeba)
- `_import/export-for-astro/content/prirucka/` (525 MD souborů - už transformováno)

### Ponechat:
- `content/prirucka/src/images/` - zdrojové obrázky (používá Vite plugin)
- `src/content/prirucka/` - aktivní soubory pro Astro
- `_import/export-for-astro/*.py` - transformační skripty
- `_import/export-for-astro/*.md` - dokumentace migrace

## ⚠️ Poznámka

Před smazáním doporučuji:
1. Zkontrolovat, že všechny důležité soubory jsou v `src/content/prirucka/`
2. Vytvořit backup (nebo commit do gitu)
3. Smazat postupně a otestovat, že Astro build stále funguje
