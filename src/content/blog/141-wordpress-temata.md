---
postID: 141
postTitle: 'WordPress: Startovací témata vzhledu pro frontendisty'
postUrlId: wordpress-temata
postDateTime: 2019-04-22
excerpt: 'Honza Bien vám v textu doporučí několik ověřených stavebních kamenů pro WordPress.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - wordpress
no_ads: false
include_rss: true
category_highlight: true
og_title: 'WordPress: Startovací témata vzhledu pro frontendisty'
og_description: 'Honza Bien vám v textu doporučí několik ověřených stavebních kamenů pro WordPress.'
og_type: article
---

# WordPress: Startovací témata vzhledu pro frontendisty

*[Honza Bien](https://www.webmistr.wtf/), lektor našeho [školení WordPressu](https://www.vzhurudolu.cz/kurzy/wordpress), vám v textu doporučí několik základních stavebních kamenů pro vybudování vlastního tématu vzhledu a to včetně frontendového devstacku.*

Nejprve si ale pojďme ujasnit terminologii:

* *Téma vzhledu (theme)* – celý balík souborů, který se stará o vzhled webu.
* *Šablona (template)* – soubor v tématu vzhledu, který se používá pro vykreslení obsahu.

To bychom měli. Teď už pojďme na ta startovací témata vzhledu.

## Minimalistická Laura {#laura}

Pokud chcete začít úplně na zelené louce, lze to udělat s výjimečně malým tématem vzhledu [laura1](https://github.com/janbien/laura/tree/master/wp-content/themes/laura1) od autora článku. To obsahuje jen nezbytné minimum. Zbytek už je na vás.

Většinou chce ale člověk začít se základnou, která už nějak vypadá, má v sobě [frontendový devstack](https://www.vzhurudolu.cz/prirucka/devstacky) a už nějak předdefinované prostředí. A pokud ji člověk zároveň nechce vytvářet po svém, nabízí se využít některé ze startovacích témat.

Výhoda startovacích témat také je, že více „vedou za ruku“ a navádějí konkrétními postupy. Samotná [dokumentace WordPressu](https://developer.wordpress.org/themes/) zde autorům nechává hodně volnosti – nehodnotíme, zda je to dobře nebo špatně.

## Sage {#sage}


Sage od [Roots](https://roots.io/) má za sebou nejdelší historii. Odstartovala v roce [2011](https://twitter.com/smashingmag/statuses/54646060458590208) stavěním na HTML5 Boilerplate a CSS frameworku Blueprint. Později využívá Grunt, Gulp nebo Bower. Pro čtenáře Vzhůru dolů může být zajímavé, že Sage zavádí frontendové novinky vždy jako první. 

<figure>
[cms:asset 89]
<figcaption markdown="1">
*Obrázek: Startovací téma Sage*
</figcaption>
</figure>

Poslední, [devátá verze](https://roots.io/sage-9/) je postavená na následujících nástrojích: Webpack, NPM, Yarn. Má podpora ES6 a používá šablonovací systém [Blade](https://roots.io/sage/docs/blade-templates/) pro PHP.
	
Sage je pamětník, který ale velmi progresivně implementuje ověřené inovace. Sage o sobě na rovinu říká, že se zaměřuje na vývojáře, kteří už si nějakým vývojem prošli a vědí, co dělají – takové je totiž i tohle téma startovací téma vzhledu. Autor, skupina Roots, navíc patří mezi nejvýrazněji inovátory v komunitě kolem WordPressu. 

Sage má asi největší podporu a komunitu – živé [fórum](https://discourse.roots.io/c/sage) i [Github](https://github.com/roots/sage/) (2 200 commitů, 51 vydání, 190 přispěvatelů). Výborný je také ebook [Theme Development with Sage](https://roots.io/books/theme-development-with-sage/), který rozhodně stojí za pozornost přinejmenším pro inspiraci, ať se Sage rozhodnete používat nebo ne. 

Více na [roots.io/sage](https://roots.io/sage/).

## Mythic {#mythic}

Podobně jako Sage je Mythic určený pokročilejším autorům webů. Jeho výhodou je méně závislostí, díky čemuž do něj člověk více vidí.

<figure>
[cms:asset 91]
<figcaption markdown="1">
*Obrázek: Téma Mythic je pro pokročilejší*
</figcaption>
</figure>

Autor Justin Tadlock je v komunitě velmi známý: napsal [knihu o vývoji pluginů pro WordPress](https://www.amazon.com/gp/product/0470916222?ie=UTF8&tag=justtadl-20), je autorem pluginu [Members](https://cs.wordpress.org/plugins/members/) nebo frameworku [Hybrid core](https://themehybrid.com/hybrid-core).

Frontend je postavený na populárním devstacku [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) postaveném kolem Webpacku. Nevymýšlí tak kolo a nabízí již existující dokumentaci a komunitu.

Také je zde potřeba poznamenat, že Mythic ve světě WordPressu nabízí konečně moderní PHP. Viz například [Container](https://github.com/justintadlock/mythic/wiki/Container) nebo [pokročilý systém Views](https://github.com/justintadlock/mythic/wiki/Views), kde je pěkně vyřešené posílání dat do šablony. Nepoužívá šablonový systém (žádný Blade, Twig…) a vývojář píše přímo PHP. Justin Tadlock k tomu říká, že vybral *„The WordPress Way“*.

Více na [themehybrid.com/themes/mythic](https://themehybrid.com/themes/mythic).

## Underscores neboli _s  {#underscores}

Tohle téma se bude líbit začátečníkům. Neobsahuje [frontendový devstack](/prirucka/devstacky), jen výchozí CSS soubor. Je tedy nejméně inovativní, ale také nejjednodušší pro pochopení.

<figure>
[cms:asset 93]
<figcaption markdown="1">
*Obrázek: Underscores – pokud se nechcete trápit s frontendovým devstackem*
</figcaption>
</figure>

Je základem výchozích wordpressových šablon [Twenty](https://cs.wordpress.org/themes/author/wordpressdotorg/). Stojí za ním společnost [Automattic](https://automattic.com/), která vládne celému WordPressu. 

<div class="related" markdown="1">
- [Podcast: S Honzou Bienem o WordPressu 5](/podcast/134-podcast-gutenberg)
- [Příručka: Editor Gutenberg](/prirucka/gutenberg)
</div>

Z Underscores vychází také [Gutenberg theme](https://github.com/WordPress/gutenberg-starter-theme), plně podporující nový editor, na kterém se zatím pracuje.

Více na [underscores.me](https://underscores.me/).

## WP Rig  {#wp-rig}

Přijde mi zajímavá hlavně některými nápady – byť se mi zdají nedotažené – například podpora [CSS uvnitř body](https://wprig.io/learn/in-body-modular-style-sheets/) nebo [přednačtení frontendových prvků](https://wprig.io/learn/configure-conditional-preloading/).

WP Rig je postavený na Gulpu. Template system je opět klasické PHP. Je dobré vědět, že nemá psanou nápovědu – jen [video kurzy](https://wprig.io/learn/). 

Více na [wprig.io](https://wprig.io/).

## Univerzální témata vzhledu  {#univerzalni}

Pokud má vývojář či vývojářka nízký rozpočet a tedy nedisponuje prostorem pro otevírání editoru a psaní kódu – prostě když chce jen nahodit šablonu a spustit web – hodí se (kromě výchozích WP témat Twenty) univerzální témata vzhledu:

* [GeneratePress](https://generatepress.com/)
* [WP Astra](https://wpastra.com/)
* [OceanWP](https://oceanwp.org/)

A zmínil bych minimalistickou [Exhale](https://themehybrid.com/themes/exhale) (od již zmíněného Justina Tadlocka), která je postavená na tématu Mythic.

<!-- AdSnippet -->