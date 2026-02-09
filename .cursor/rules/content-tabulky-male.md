---
description: Tabulky v článcích příručky a blogu obalit divem s třídou pro malé písmo a scroll
globs: src/content/prirucka/**/*.md,src/content/blog/**/*.md
alwaysApply: false
---

# Tabulky v textech – malé písmo

Při psaní nebo úpravě článků v příručce a na blogu **každou markdown tabulku** obal divem s těmito třídami:

- **`rwd-scrollable`** – horizontální scroll na malých obrazovkách
- **`f-6`** – zmenšené písmo tabulky
- **`markdown="1"`** – aby se uvnitř divu zpracoval markdown (řádky s `|`)

## Formát v Markdownu

```markdown
<div class="rwd-scrollable f-6" markdown="1">

| Sloupec A | Sloupec B |
| :-------- | :-------- |
| hodnota   | hodnota   |

</div>
```

Mezi `<div>` a tabulku patří prázdný řádek; mezi koncem tabulky a `</div>` taky prázdný řádek.

## Varianty tříd (volitelně)

- **Referenční / přehledové tabulky:** lze přidat `prop-table` a šířkovou třídu, např. `table-1-quarter`, `table-1-third`, `table-1-half` (viz `jednotky.md`, `css-display.md`, `css-selektory.md`).
- Pro běžné obsahové tabulky stačí `rwd-scrollable f-6`.

## Reference

Příklady: `jednotky.md`, `html-script.md`, `metrika-lps.md`, `cookieless.md`, `vibe-coding.md`, `bootstrap-4-grid.md` (tam navíc `font-size-08em`).
