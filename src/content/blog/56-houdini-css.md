---
postID: 56
postTitle: 'Houdini: specifikace co může radikálně zrychlit přidávání CSS vlastností do prohlížečů'
postUrlId: houdini-css
postDateTime: '2016-03-29 00:00:00'
excerpt: 'Představte si třeba, že stáhnete polyfill pro Flexbox, který bude konzistentně fungovat ve všech prohlížečích. A bez přehnaných nároků na výkon.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
og_title: 'Houdini: specifikace co může radikálně zrychlit přidávání CSS vlastností do prohlížečů'
og_description: 'Představte si třeba, že stáhnete polyfill pro Flexbox, který bude konzistentně fungovat ve všech prohlížečích. A bez přehnaných nároků na výkon.'
og_type: article
tags: ['css']
---
# Houdini: specifikace co může radikálně zrychlit přidávání CSS vlastností do prohlížečů

[Phillip Walton pro Smashing Magazine napsal](https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/) vynikající materiál o vznikající W3 specifikaci, která může dramaticky změnit vývoj CSS. [Houdini](https://wiki.css-houdini.org/).

Představte si, že si vymyslíte vlastní, úplně nový, typ layoutu v CSS, naprogramujete ho a zveřejníte jako [polyfill](/prirucka/polyfill). Další webaři si jej stáhnou a přiloží ke svým webům. A ve všech prohlížečích to – světe div se – bude fungovat. 

Nebo si představte, že stáhnete polyfill pro [Flexbox](/prirucka/css3-flexbox), který bude konzistentně fungovat ve všech prohlížečích. A bez přehnaných nároků na výkon.

Houdini je W3 specifikace v rané fázi vývoje, která přesně tohle může zařídit. Jde o návrh postupů, kterými by výrobci prohlížečů mohli sjednotit a vývojářům přes API zpřístupnit různé části vykreslovacího procesu.

## Současné pokusy o polyfilování CSS se týkají jen DOMu a proto jsou obvykle neúspěšné

Aktuálně renderování probíhá [nějak takhle](http://jecas.cz/vykreslovani):

```
Parsování → DOM & CSSOM → Kaskáda → Layout 
  → Vykreslení (Paint) → Složení (Composite)
```

Jenže my vývojáři se Javacriptem dostaneme jen do DOMu a částečně CSSOMu. V CSSOMu ale nemáme přístup k vlastnostem, které prohlížeč nezná. A ejhle – přidávát vlastnosti co prohlížeč nezná – to je přesně to co pro polyfilovaní potřebujete. 

Proto se veškeré pokusy o polyfilování  stylů javascriptem točí kolem DOMu a proto je to obvykle takový průšvih na výkon během vykreslování a v zásadě se moc nedělá. 

Houdini se tedy přes aplikační rozhraní snaží zpřístupnit všechny kroky vykreslování.

Hudba budoucnosti? Možná. Podle článku si ale všichni výrobci prohlížečů odsouhlasili, že o něco takového mají zájem. Chcete to i vy? Teď asi nejvíc pomůže ukázat zájem. Pro začátek [Houdinimu ohvězdičkujte repozitář](https://github.com/w3c/css-houdini-drafts) a sledujte [Vzhůru dolů na sociálních sítích](#touch). Občas o tom něco napíšu.