# Test checklist pro .htaccess redirecty

Po nasazení na Apache server otestujte následující URL:

## HTTPS a www redirecty

- [ ] `http://vzhurudolu.cz` → `https://www.vzhurudolu.cz`
- [ ] `http://www.vzhurudolu.cz` → `https://www.vzhurudolu.cz`

## E-booky

- [ ] `/kniha-rwd` → `/kniha-responzivni-design`
- [ ] `/ebook-responzivni` → `/kniha-responzivni-design`
- [ ] `/ebook` → `/ebook-css3`

## Krátké zkratky

- [ ] `/p/css-flexbox` → `/prirucka/css-flexbox`
- [ ] `/b/261-rok-2025` → `/blog/261-rok-2025`
- [ ] `/k/` → `/kurzy/`
- [ ] `/v/` → `/video/`

## Kurzy

- [ ] `/kurzy/responzivni-webdesign` → `/kurzy`
- [ ] `/frontend-kurz` → `/kurzy`

## CSS přejmenování

- [ ] `/prirucka/css3-flexbox` → `/prirucka/css-flexbox`
- [ ] `/prirucka/css3-multicolumn` → `/prirucka/css-multicolumn`
- [ ] `/prirucka/viewport-mobily` → `/prirucka/viewport`

## Ostatní

- [ ] `/prirucka` → `/css`
- [ ] `/checklist` → `/prirucka/checklist`
- [ ] `/frontend-frameworky` → `/bootstrap`
- [ ] `/amp/prirucka/amp-html` → `/prirucka/amp-html`

## Bezpečnost

- [ ] `/.git/` → 403 Forbidden
- [ ] `/node_modules/` → 404

## Legacy /data/ (po zkopírování souborů)

- [ ] `/30/soubor.html` → `/data/30/soubor.html`
- [ ] `/archiv/soubor.html` → `/data/archiv/soubor.html`

---

Testovat lze pomocí `curl -I URL` pro zobrazení response headers.
