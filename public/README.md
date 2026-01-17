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
