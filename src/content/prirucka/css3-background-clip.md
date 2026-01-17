---
id: css3-background-clip
heading: 'CSS3 Background Clip'
date: 2013-12-16
perex: 'Určuje kde všude se uvnitř elementu vykresluje obrázek na pozadí.'
published: true
category:
  - css3
og_title: 'CSS3 Background Clip'
og_description: 'Určuje kde všude se uvnitř elementu vykresluje obrázek na pozadí.'
og_type: article
---

CSS3 Background Clip: míra roztažení pozadí
===========================================

Určuje, kde všude se uvnitř elementu vykresluje obrázek nebo barva na pozadí.

Výchozí hodnota je:

```css
background-clip: border-box;
```

Znamená, že pozadí se vykreslí i pod rámečkem elementu.

Další možnosti míry roztažení pozadí:

`padding-box` – jen pod obsahovým boxem a paddingem

`content-box` – jen pod obsahovým boxem

Pokud není úplně zřejmé, jaký je rozdíl mezi `border-`, `padding-` a `content-box`, mrkněte se na schéma u vlastnosti [box-sizing](css3-box-sizing.md).

Příklad k vyzkoušení – [cdpn.io/e/yamFI](https://codepen.io/machal/pen/yamFI).


Podpora v prohlížečích
----------------------

IE9+. Polyfilly pro IE8 snad ani neexistují a není se čemu divit. Těžko hledat příklad, kdy by byly nezbytné.
