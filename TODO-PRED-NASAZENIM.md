# TODO před nasazením

Tento soubor obsahuje seznam úkolů, které je potřeba splnit před nasazením nového webu na produkci.

---

## Ruční akce potřebné před nasazením

### 1. Zkopírovat legacy soubory do `public/data/`

Z produkčního serveru VD.cz zkopírovat staré soubory do odpovídajících složek:

- [ ] `/30/` → `public/data/30/`
- [ ] `/archiv/` → `public/data/archiv/`
- [ ] `/blank/` → `public/data/blank/`
- [ ] `/css-frameworks/` → `public/data/css-frameworks/`
- [ ] `/fagaras/` → `public/data/fagaras/`
- [ ] `/historie/` → `public/data/historie/`
- [ ] `/images/` → `public/data/images-till-2012/`
- [ ] `/public/` a `/projects/` → `public/data/projects/`
- [ ] `/tumblr/` → `public/data/tumblr-till-2012/`

### 2. Zkopírovat soubory do `public/files/`

- [ ] Zkopírovat obsah `/files/` z produkce do `public/files/`
- [ ] Zejména `/files/vdamp/demo/` pro AMP e-book demo soubory

### 3. Ověřit fonty

- [ ] Zkontrolovat, že fonty v `assets/fonts/` jsou správně servírovány
- [ ] Otestovat CORS hlavičky pro fonty (CodePen, externí domény)

---

## Po nasazení

### 4. Otestovat redirecty

Použít checklist v `public/HTACCESS-TEST.md` nebo tyto příkazy:

```bash
# HTTPS redirect
curl -I http://vzhurudolu.cz

# Ebook redirecty
curl -I https://www.vzhurudolu.cz/kniha-rwd
curl -I https://www.vzhurudolu.cz/ebook

# Krátké zkratky
curl -I https://www.vzhurudolu.cz/p/css-flexbox

# CSS přejmenování
curl -I https://www.vzhurudolu.cz/prirucka/css3-flexbox
```

### 5. Zkontrolovat 404 stránky

- [ ] Ověřit, že `/node_modules/` vrací 404
- [ ] Ověřit, že dotfiles (`.git/`) vrací 403

---

## Poznámky

- Kompletní .htaccess konfigurace je v `public/.htaccess`
- Detailní test checklist je v `public/HTACCESS-TEST.md`
