---
postID: 25
postTitle: 'Více H1 ve stránce? Klidně, ale ne s HTML5 osnovou dokumentu'
postUrlId: vice-h1
postDateTime: 2014-08-22
excerpt: 'Více H1 ve stránce mít lze, ale nepočítejte, že to bude fungovat tak jako nastiňuje článek The Truth About Multiple H1 Tags in the HTML5 Era.'
postStatus: Published
authorID: 1
sectionID: 1
category: []
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Více H1 ve stránce? Klidně, ale ne s HTML5 osnovou dokumentu'
og_description: 'Více H1 ve stránce mít lze, ale nepočítejte, že to bude fungovat tak jako nastiňuje článek The Truth About Multiple H1 Tags in the HTML5 Era.'
og_type: article
---

# Více H1 ve stránce? Klidně, ale ne s HTML5 osnovou dokumentu

Více `<h1>` ve stránce mít lze, ale nepočítejte, že to bude fungovat tak jako nastiňuje článek [The Truth About Multiple H1 Tags in the HTML5 Era](http://webdesign.tutsplus.com/articles/the-truth-about-multiple-h1-tags-in-the-html5-era--webdesign-16824). Tam totiž tvrdí, že když napíšete toto…

```html
<h1>Hlavní nadpis</h1>
<section>
    <h1>Nadpis 2. úrovně</h1>
    <h1>Další nadpis 2. úrovně</h1>
    <section>
        <h1>Nadpis 3. úrovně</h1>
        <h1>Další nadpis 3. úrovně</h1>
    </section>
</section>
```

…osnova dokumentu (jinak řečeno struktura jeho obsahu) bude podle HTML5 vypadat takto:

```html
* Hlavní nadpis
    * Nadpis 2. úrovně
    * Další nadpis 2. úrovně
        * Nadpis 3. úrovně
        * Další nadpis 3. úrovně
```        

To by bylo skvělé, jenže [on novou HTML5 osnovu žádný prohlížeč neimplementoval](http://html5doctor.com/outlines/#real-world-outlines):

> At the time of writing, browsers and screen readers do not support these new outlines, so if you do use multiple `<h1>`s in your documents, it may confuse your users. It’s best if you use logical heading levels — `<h1>`–`<h6>`.

Slabý argument? Pak si přečtěte to hezké červené [varování na webu W3C](https://twitter.com/AdamKudrna/status/497374280662126593), které objevil Adam Kudrna.

HTML5 outline tedy existuje jen na papíře. A tak bude osnova výšeuvedeného dokumentu v praxi vypadat takto:

```
* Hlavní nadpis
* Nadpis 2. úrovně
* Další nadpis 2. úrovně
* Nadpis 3. úrovně
* Další nadpis 3. úrovně
```

Osnova ([outline](http://html5doctor.com/outlines/)) dokumentu je dost zásadní věc pro sémanticky správné zpracování dokumentu. Tedy pro přístupnost. Nejen obligátní slepecké čtečky, ale třeba i vyhledávače. 

## Více `<h1>` ve stránce s HTML4 osnovou? Ano, někdy to smysl dává

Třeba v jednostránkových webech ([onepage](http://onepagelove.com/)):

```html
<h1>Nadpis 1. sekce</h1>
<h2>Podnadpis</h2>
<h1>Nadpis 2. sekce</h1>
<h1>Nadpis 3. sekce</h1>
```

Osnova vypadá takto:

```
* Nadpis 1. sekce
    * Podnadpis
* Nadpis 2. sekce
* Nadpis 3. sekce
```

Z pohledu [přístupnosti](https://twitter.com/radlicek/status/498031110052278272) ani [vyhledávačů](https://twitter.com/MarekP/status/497653984048709632) by s tím žádný problém být neměl.

Můžeme si z toho vzít hned 3 ponaučení:

1. [HTML5 strukturální elementy jsou uživateli k ničemu](http://kratce.vzhurudolu.cz/post/38371151431/html5-elementy). Nikdo vám jejich použití sice zakázat nemůže, ale osnovu dokumentu s jejich pomocí vytvořit rozhodně nelze.
2. Více `<h1>` ve stránce je i s HTML4 osnovou zcela v pořádku.
3. A v neposlední řadě, přátelé, pozor na články o HTML5 co nezmiňují podporu v prohlížečích. Šíří bludy.