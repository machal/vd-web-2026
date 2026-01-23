---
id: test
heading: 'Testovací stránka pro všechny komponenty'
perex: 'Tato stránka obsahuje všechny možné komponenty z příručky pro testování transformací markdownu do HTML.'
published: true
category:
  - css
category_highlight: false
include_rss: false
no_ads: false
og_title: 'Testovací stránka pro všechny komponenty'
og_description: 'Tato stránka obsahuje všechny možné komponenty z příručky pro testování transformací markdownu do HTML.'
og_type: article
---

# Testovací stránka pro všechny komponenty

Tato stránka obsahuje všechny možné komponenty z příručky pro testování transformací markdownu do HTML.

## 1. Základní markdown elementy

### Nadpisy

# H1 nadpis
## H2 nadpis {#h2-nadpis}
### H3 nadpis
#### H4 nadpis
##### H5 nadpis
###### H6 nadpis

### Odkazy

- [Odkaz na jinou stránku](css-grid.md)
- [Odkaz s title](css-grid.md "Titulek odkazu")
- [Odkaz na externí stránku](https://www.vzhurudolu.cz)

### Obrázky

Markdown syntax:
![Alt text obrázku](../dist/images/original/vdlayout/grid-auto-flow.jpg)

HTML syntax:
<img src="../dist/images/original/vdlayout/grid-auto-flow.jpg" width="1920" height="540" alt="HTML obrázek">

### Seznamy

Neuspořádaný seznam:
- První položka
- Druhá položka
  - Vnořená položka
  - Další vnořená položka
- Třetí položka

Uspořádaný seznam:
1. První položka
2. Druhá položka
3. Třetí položka

### Tabulky (markdown syntax)

| Sloupec 1 | Sloupec 2 | Sloupec 3 |
|-----------|-----------|-----------|
| Buňka 1   | Buňka 2   | Buňka 3   |
| Buňka 4   | Buňka 5   | Buňka 6   |

## 2. HTML komponenty s markdown="1"

### web-only

<div class="web-only" markdown="1">

Tento obsah se zobrazí pouze na webu, ne v e-booku.

- [Odkaz 1](css-grid.md)
- [Odkaz 2](css-flexbox.md)

</div>

### ebook-only

<div class="ebook-only" markdown="1">

Tento obsah se zobrazí pouze v e-booku, ne na webu.

→ [vrdl.in/test](https://www.vzhurudolu.cz/prirucka/test)

</div>

### connected box

<div class="connected" markdown="1">

![CSS vlastnost](../dist/images/medium/vdlayout/schema-css-grid-auto-flow.jpg)

<div class="web-only" markdown="1">

Toto je obsah v connected boxu, který se zobrazí jen na webu.

</div>

<div class="ebook-only" markdown="1">

→ [vrdl.in/test](https://www.vzhurudolu.cz/prirucka/test)

</div>

</div>

### pbi-avoid (pro print)

<div class="pbi-avoid" markdown="1">

Tento obsah má třídu `pbi-avoid`, která zabraňuje zlomení stránky při tisku.

## Nadpis v pbi-avoid

Text pod nadpisem.

</div>

### Tabulka s markdown="1"

<div class="rwd-scrollable prop-table f-6" markdown="1">

| **Vlastnost** | **Hodnota** | **Popis** |
|---------------|-------------|-----------|
| `display` | `grid` | Nastaví grid formatting context |
| `grid-template-columns` | `1fr 1fr` | Definuje sloupce mřížky |
| `grid-template-rows` | `1fr 1fr` | Definuje řádky mřížky |

</div>

### figcaption s markdown="1"

<figure>
<img src="../dist/images/original/vdlayout/grid-auto-flow.jpg" width="1920" height="540" alt="Test obrázek">
<figcaption markdown="1">
*Toto je popisek obrázku s markdown="1" atributem. Může obsahovat [odkazy](css-grid.md) a **tučný text**.*
</figcaption>
</figure>

### related box

<div class="related" markdown="1">

- [CSS grid](css-grid.md)
- [CSS flexbox](css-flexbox.md)
- [CSS Multi-column](css-multicolumn.md)

</div>

### f-6 (velikost písma)

<div class="f-6" markdown="1">

Tento text má třídu `f-6`, která nastavuje velikost písma.

- První položka
- Druhá položka

</div>

## 3. Speciální komponenty

### book-index

<div class="book-index" data-book-index="Test komponenta"></div>

Tento div slouží pro generování indexu v e-booku.

### reference-items

<div class="reference-items">

  <article role="article" class="reference-items-item">
    <h4 id="test-1"><a href="css-grid.md">Test reference 1</a></h4>
    <p><a href="css-grid.md"><img src="../dist/images/small/vdlayout/schema-css-grid-auto-flow.jpg" alt="Test obrázek" /></a></p>
    <p>
      Popis reference 1. <br>
      <code>grid-auto-flow: column;</code>
    </p>
  </article>

  <article role="article" class="reference-items-item">
    <h4 id="test-2"><a href="css-flexbox.md">Test reference 2</a></h4>
    <p><a href="css-flexbox.md"><img src="../dist/images/small/vdlayout/schema-css-grid-auto-flow.jpg" alt="Test obrázek" /></a></p>
    <p>
      Popis reference 2. <br>
      <code>display: flex;</code>
    </p>
  </article>

</div>

### figure s figcaption

<figure class="figure-thirds">
<img src="../dist/images/original/vdlayout/css-grid-auto-flow-dense.jpg" width="1600" height="900" alt="Test obrázek">
<figcaption markdown="1">
Toto je popisek obrázku s markdown="1" atributem.
</figcaption>
</figure>

### AdSnippet komentář

<link rel="stylesheet" href="/assets/css/modules-standalone/min/ad-snippet.min.css?1710496181" /><script> </script>
<aside role="complementary" class="ad-snippet ad-snippet--reverse" aria-labelledby="ad-snippet-ebook">
  <h2 id="ad-snippet-ebook" class="ad-snippet__heading sr-only">Reklama</h2>
<svg class="ad-snippet__scissors ad-snippet__scissors-top" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
  <a class="ad-snippet__container" href="/css-layout/">
    <div class="ad-snippet__image maxw-7em">
      <img src="/assets/img/content/handmade/ebooks/vdlayout/vdlayout-model-both__760.webp" alt="Kniha a e-book „CSS: moderní layout"" loading="lazy" width="1540" height="1270">
    </div>
    <div class="ad-snippet__text">
      <h3 class="ad-snippet__text-heading" style="color:#f89b1d">
        Kniha „CSS: moderní layout"
      </h3>
      <p class="ad-snippet__text-content">
        Floaty šly spát, ale takhle kniha ve vás probudí CSS kodéra.
        <span class="td-u">Více</span> →
      </p>
    </div>
  </a>
<svg class="ad-snippet__scissors ad-snippet__scissors-bottom" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
</aside>


Tento komentář by měl být nahrazen HTML snippetem podle kategorie článku.

## 4. Složité případy

### Vnořené markdown="1" elementy

<div class="web-only" markdown="1">

Toto je web-only obsah.

<div class="f-6" markdown="1">

A toto je vnořený obsah s další třídou.

- První položka
- Druhá položka

</div>

</div>

### Kombinace více tříd s markdown="1"

<div class="pbi-avoid f-6" markdown="1">

Tento element má více tříd: `pbi-avoid` a `f-6`.

- První položka
- Druhá položka

</div>

### Tabulka v markdown="1" elementu

<div class="web-only" markdown="1">

Toto je tabulka uvnitř markdown="1" elementu:

| Sloupec A | Sloupec B |
|-----------|-----------|
| Hodnota 1 | Hodnota 2 |
| Hodnota 3 | Hodnota 4 |

</div>

### Obrázek v markdown="1" elementu

<div class="connected" markdown="1">

![Obrázek v connected boxu](../dist/images/medium/vdlayout/schema-css-grid-auto-flow.jpg)

Text pod obrázkem.

</div>

### Edge case: Prázdný element s markdown="1"

<div class="web-only" markdown="1">

</div>

### Edge case: Element s jen textem

<div class="web-only" markdown="1">
Jen text bez dalšího formátování.
</div>

### Edge case: Element s jen HTML (bez markdown)

<div class="web-only">
<p>Toto je HTML obsah bez markdown="1" atributu.</p>
</div>

### Kombinace všeho

<div class="connected" markdown="1">

![Obrázek](../dist/images/medium/vdlayout/schema-css-grid-auto-flow.jpg)

<div class="web-only" markdown="1">

Toto je web-only obsah v connected boxu.

| Tabulka | V boxu |
|---------|--------|
| Buňka 1 | Buňka 2 |

</div>

<div class="ebook-only" markdown="1">

→ [vrdl.in/test](https://www.vzhurudolu.cz/prirucka/test)

</div>

</div>

## 5. Kódové bloky

### Inline kód

Použijte `display: grid` pro vytvoření grid layoutu.

### Kódový blok

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

## 6. Citace

> Toto je citace.
> 
> Může obsahovat více řádků.

## 7. Horizontální čára

---

## 8. Závěrečné poznámky

Tato stránka slouží k testování všech transformací markdownu do HTML. Měla by obsahovat všechny možné komponenty a edge cases, které se v příručce používají.

<!-- AdSnippet -->
