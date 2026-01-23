---
id: smacss
tags: ['organizace-css']
title: 'SMACSS'
heading: 'SMACSS'
date: 2014-02-22
perex: 'Scalable and Modular Architecture for CSS. Style guide od Jonathana Snooka.'
published: true
category:
  - css
  - etc
no_ads: false
og_title: 'SMACSS'
og_description: 'Scalable and Modular Architecture for CSS. Style guide od Jonathana Snooka.'
og_type: article
---# SMACSS

Starší style guide pro psaní CSS od Jonathana Snooka.

## Scalable and Modular Architecture for CSS

Je to daleko propracovanější, ale základní myšlenka je v oddělení rozdělení CSS deklarací do těchto kategorií a k nim náležejícím označením ve stylech.


<table>
<tr>
  <th>Základna</th>
  <td>stylování HTML tagů</td> 
</tr>
<tr>
  <th>Layout</th>
  <td><code>.l-content, .l-side, …</code></td>  
</tr>
<tr>
  <th>Modul</th>
  <td>všechny třídy bez prefixu</td>  
</tr>
<tr>
  <th>Stav</th>
  <td><code>.is-collapsed, .is-opened, …</code></td>  
</tr>
<tr>
  <th>Skinování</th>
  <td>v extra CSS souboru</td>  
</tr>
</table>

Pozn.: Jonathan neříká, že se mají třídy pro layout a stavy prefixovat zrovna takto. Je to na vás. Dělám to takhle na některých projektech a docela se osvědčilo.

[smacss.com](http://smacss.com/)

_Aktualizace k červenci 2021: SmaCSS dnes už beru za překonanou [metodiku organizace CSS](css-metodiky.md). Věnujte pozornost SuitCSS nebo [BEM](bem.md)._
