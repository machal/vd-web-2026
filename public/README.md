# Public Assets

Pro rychlý start vytvoř symlinky nebo zkopíruj assets:

```bash
# Symlinky (doporučeno pro dev)
ln -s ../assets public/assets
ln -s ../favicon public/favicon

# Nebo zkopírovat (pro produkci)
cp -r ../assets public/
cp -r ../favicon public/
```

Astro automaticky servuje soubory z `public/` adresáře na root URL.

## Trvalé soubory (data, files)

- **`data/`** – soubory dostupné na **/data/…** (archiv, legacy; část starých URL se sem přesměrovává z `.htaccess`).
- **`files/`** – soubory dostupné na **/files/…**.

Obojí je v repozitáři a při buildu se kopíruje do `dist/` společně s ostatním obsahem `public/`.

## FTP (Transmit)

Při nahrávání na server přes FTP (např. Transmit) je v kořeni `public/` (a po buildu v `dist/`) soubor **`.transmitignore`**, který při synchronizaci vynechá složky `data/` a `files/` – ty se na server nahrávají zvlášť nebo tam už jsou.
