---
description: Pravidlo pro obrázky s popisky v příručce a blogu – figure, img, figcaption
globs: src/content/prirucka/**/*.md,src/content/blog/**/*.md
alwaysApply: false
---

# Obrázky s popisky v textech příručky a blogu

Při přidávání nebo úpravě obrázků s popiskem v příručce (`src/content/prirucka/`) a na blogu (`src/content/blog/`) používej **figure + img + figcaption**. Nepoužívej jen markdown `![alt](url)` tam, kde má obrázek mít viditelný popisek pod obrázkem.

## Formát

1. **`<figure>`** – obal obrázku a popisku.
2. **`<img src="..." alt="...">`** – obrázek, cesta pro příručku: `../dist/images/original/nazev.jpg` (build ji přepíše). Atribut `alt` stručně popisuje obsah (přístupnost).
3. **`<figcaption markdown="1">`** – popisek zobrazený pod obrázkem, v kurzívě (`*...*`).

### Příklad v Markdownu

```html
<figure>
<img src="../dist/images/original/nazev-souboru.jpg" alt="Stručný popis pro alt">
<figcaption markdown="1">
*Dlouhější popisek k obrázku – doplňuje kontext, zdroj nebo vysvětlení.*
</figcaption>
</figure>
```

## Popisek (figcaption)

- Piš v **kurzívě** (`*text*`).
- Popisek může být krátký (jedna věta) nebo rozšířený (kontext, zdroj).
- Není nutné uvádět „Obrázek:“ na začátku, pokud je z kontextu jasné, že jde o popis obrázku.
- **Odkazy jsou ve figcaption povolené** – typicky pro uvedení zdroje obrázku, grafu nebo nástroje, např. `Zdroj grafu: appka [SkillShaper](https://…)`.

## Reference

Stejný styl používají např. články: `weby-watchos.md`, `metrika-lps.md`, `picrights.md`, `css-utility.md`, `vibe-coding.md`.

## Kdy stačí jen markdown

Pro čistě dekorativní obrázky bez potřeby popisku pod obrázkem stačí `![alt text](cesta)`. Pokud má obrázek mít viditelný popisek pro čtenáře, vždy použij figure + figcaption.
