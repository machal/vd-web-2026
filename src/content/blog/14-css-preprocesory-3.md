---
postID: 14
postTitle: 'Průvodce CSS preprocesory: jak vám vylepší pracovní postupy'
postUrlId: css-preprocesory-3
postDateTime: '2014-03-24 00:00:00'
excerpt: 'V článcích o CSS preprocesorech je obvykle argumetováno jejich technickými vlastnostmi. Ty jsme rozebrali v minulém díle seriálu.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
og_title: 'Průvodce CSS preprocesory: jak vám vylepší pracovní postupy'
og_description: 'V článcích o CSS preprocesorech je obvykle argumetováno jejich technickými vlastnostmi. Ty jsme rozebrali v minulém díle seriálu.'
og_type: article
---

# Průvodce CSS preprocesory: jak vám vylepší pracovní postupy

Tohle je 3. část seriálu o CSS preprocesorech:

1. [Co a jak?](/blog/12-css-preprocesory-1)
2. [Technické vlastnosti](/blog/13-css-preprocesory-2)
3. Jak vám vylepší pracovní postupy?
4. [Který vybrat?](/blog/15-css-preprocesory-4)

V článcích o CSS preprocesorech je obvykle argumetováno jejich [technickými vlastnostmi](/blog/13-css-preprocesory-2). Ty jsme  rozebrali v minulém díle seriálu.

Daleko zajímavější z pohledu odpovědi na otázku *„Proč preprocesory používat?”* je ovšem jejich vliv na efektivitu a kvalitu pracovních postupů. 

Myslím si, že s CSS preprocesorem vyprodukujete v kratším čase kvalitnější kód než bez něj.

## Kvalita kódu

* **Spravovatelnost**  
Metodiky organizace CSS kódu jako [OOCSS](http://www.vzhurudolu.cz/prirucka/oocss), [BEM](http://www.vzhurudolu.cz/prirucka/bem), [SMACSS](http://www.vzhurudolu.cz/prirucka/smacss) mají bez preprocesorů tak poloviční dopad.  Konkrétně BEM můžete krásně kombinovat se [zanořováním](/blog/13-css-preprocesory-2#zanorovani) v preprocesorech.

* **Organizace**  
Podívejte se do předchozího dílu na vlastnost [`@import`](/blog/13-css-preprocesory-2#promenne). Díky ní můžete zapomenout na organizaci kódu orientovanou na stránky nebo na celostránkové [breakpointy](http://kratce.vzhurudolu.cz/post/46416507703/jake-breakpointy-zvolit-v-responzivnim-webdesignu) v media queries. Preprocesor vám kód umožní organizovat přes moduly, malé kousky kódu vztažené ke konkrétní komponentě uživatelského rozhraní jako je třeba navigace, článek nebo třeba karusel. 


## Rychlost vývoje

* **Rychlejší psaní kódu a změny v něm**  
Odvolávám se tady hlavně na [mixiny](/blog/13-css-preprocesory-2#mixiny), funkce nebo [proměnné](/blog/13-css-preprocesory-2#promenne). Zkuste si třeba narychlo změnit jednu barvu v Bootstrapu, pokud jej používáte v CSS verzi namísto LESS a nemůžete použít [generátor](http://getbootstrap.com/customize/). Takhle vypadá peklo pro zlobivé kódery!

* **Využívání hotových knihoven**  
Díky preprocesorům se už i frontend designér může těšit výhodám hotových opensource knihoven nebo rovnou frameworků, které donedávna znali hlavně backend programátoři. Příkladem budiž frameworky jako [Bootstrap](http://getbootstrap.com/), [Foundation](http://foundation.zurb.com/) nebo knihovny CSS3 mixinů [Bourbon](http://bourbon.io/), [Compass](http://compass-style.org/) nebo [LESShat](http://lesshat.madebysource.com/).

* **Vlastní knihovny**  
Každý český PHP programátor chce mít vlastní PHP framework. Teď už vlastní framework může mít i každý český CSS kóder! :-) S preprocesory je snadné a často i vhodné si pro potřeby opakujících se úkonů napsat vlastní sadu mixinů nebo rovnou framework typu Bootstapu. 

Tolik ke vlivu CSS preprocesorů na pracovní postupy. 

V příštím a posledním díle seriálu půjde do tuhého. Porovnáme si LESS, SASS a Stylus a zkusím vám doporučit, který začít používat.