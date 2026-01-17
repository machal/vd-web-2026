---
postID: 125
postTitle: 'Jsou weby na WordPressu skutečně pomalé? Pár poznámek ke studii Dannyho Richmana'
postUrlId: wordpress-richman
postDateTime: 2018-10-25
excerpt: 'Weby na WordPressu z principu pomalé být nemusí. Je to chyba implementátorů, nikoliv tohoto nejpopulárnějšího systému pro správu webů.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
  - wordpress
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Jsou weby na WordPressu skutečně pomalé? Pár poznámek ke studii Dannyho Richmana'
og_description: 'Weby na WordPressu z principu pomalé být nemusí. Je to chyba implementátorů, nikoliv tohoto nejpopulárnějšího systému pro správu webů.'
og_type: article
---

# Jsou weby na WordPressu skutečně pomalé? Pár poznámek ke studii Dannyho Richmana

Weby na WordPressu z principu pomalé být nemusí. Je to chyba implementátorů, nikoliv tohoto nejpopulárnějšího systému pro správu webů. 

Docela často narážím na zmínky o „pomalosti“ WordPressu. Danny Richman navíc nedávno publikoval zajímavý průzkum – [Which CMS platforms perform best on Google?](https://www.seotraininglondon.org/which-cms-performs-best-google/) – kde se mimojiné objevuje následující graf:

<figure markdown="1">
[cms:asset 48] 
<figcaption markdown="1">
*Obrázek: Porovnání rychlosti odpovědi serveru u jednotlivých CMS. Prováděno na milionu webů, které podle BuiltWith.com používají WordPress. Zdroj: [Danny Richman](https://www.seotraininglondon.org/which-cms-performs-best-google/)*
</figcaption>
</figure>

Z grafu je zřejmé, že pomalý backend mají zejména řešení instalovaná na  hosting vybraný implementátorem (*self-hosted*): WordPress, Prestashop, Magento a Opencart. 

Jenže pohled na graf je jedna věc, ale co z něj vyplývá je věc druhá. Zkusil jsem tedy změřit několik webů, postavených na WordPressu.

## Vlastní měření: WordPress vrací HTML do půl vteřiny {#mereni}

Lektor našeho [školení WordPressu](https://www.vzhurudolu.cz/kurzy/wordpress), Honza Bien, mi poskytl čistou instalaci WordPressu a dva své větší weby k otestování. 

<figure markdown="1">

| Web                         | TTFB   |
|:----------------------------|-------:|
| test.j5n.cz (čistý WP) | [0,38 s](http://www.webpagetest.org/lighthouse.php?test=181020_WN_749cd892253f2abb93b4117174c47209&run=2) |
| blog.seznam.cz              | [0,17 s](http://www.webpagetest.org/lighthouse.php?test=181023_78_e4c06572dccfff910aced60b14546780&run=2) |
| o.seznam.cz                 | [0,28 s](http://www.webpagetest.org/lighthouse.php?test=181023_W9_90c2e99e503df82d6db2f6a3976d32c3&run=2) |

<figcaption markdown="1">
*Tabulka: [Time To First Byte](https://www.vzhurudolu.cz/prirucka/metriky-rychlosti#TTFB) (serverový čas) pro tři weby [od Honzy Biena](https://www.webmistr.wtf/). Měřeno je to nástrojem [Lighthouse](https://www.vzhurudolu.cz/prirucka/lighthouse)*
</figcaption>
</figure>

Překvapení se nekonalo – WordPress umí být dostatečně rychlý.

Problém prostě obvykle není v platformám samotných, ale ve způsobech implementace a rozšiřování.

## Kdo může za pomalý WordPress: Platforma nebo způsob použití? {#implementatori}

Nejspíš to druhé, že ano? Dany Richman ostatně ve své studii píše:

> Study tells us more about the typical users a CMS has rather than the capabilities of the platform.

Honza Bien k tomu dodává:

> Platforma WordPressu klade velmi malé vstupné požadavky na znalosti implementátora. Udělat rychlý web je ale odborná práce vyžadující vysokou kvalifikaci.

Jde jednak o výběr hostingu ze strany provozovatele a pak samozřejmě – to byste nečekali – pluginy. „WordPress sužují špatně napsané pluginy“ píše doslova autor odkazované studie.

<!-- AdSnippet -->

Takže problém „pomalého“ WordPressu je spíše problém špatné implementace na backendu. Špatného výběru hostingu, špatného nastavení WordPressu, bezhlavého instalování pluginů a tak dále.

Ale co s tím? Spolu s Honzou nabízíme alespoň velmi stručný návod, jak si pomoci:

1. Měřte serverový čas – buď například v Chrome DevTools (záložka Network) nebo nástrojem Lighthouse. (Více [o nástrojích](https://www.vzhurudolu.cz/prirucka/rychlost-nastroje).) Držte ho ideálně hluboko pod půlvteřinou.
2. Analyzujte výkon pluginů – jednodušší nástroj je [P3](https://cs.wordpress.org/plugins/p3-profiler/), komplexnější (a dražší) pak [New Relic](https://newrelic.com/).

Prostě měřte a vyhodnocujte. 

A já ještě dodám dvě poznámky k měření „pomalosti”. Dany Richman totiž měřil jen serverový čas a datový objem. To je málo.

## První poznámka k měření: Většina problémů bývá na frontendu {#prvni-poznamka}

Moje zkušenost ze zakázek při optimalizaci rychlosti webu totiž říká, že naprostá většina problémů, které weby mají, se netýká backendu:

<blockquote class="twitter-tweet" data-lang="en"><p lang="cs" dir="ltr">Zajímavé, jak rozšířená je myšlenka „náš web je pomalý, protože běží na pomalé platformě [dosaďte oblíbenou]“.<br>90 % problémů je přitom na frontendu.</p>— Martin Michálek (@machal) <a href="https://twitter.com/machal/status/1047423382017462272?ref_src=twsrc%5Etfw">October 3, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Backend – tedy rychlost generování stránek WordPressem či jinou platformou – samozřejmě bude mít významný vliv na vnímanou rychlost uživatelů sedících u rychlých připojení.  

Čas serveru je také vcelku důležitý pro SEO – má vliv na [crawl budget](https://www.contentkingapp.cz/akademie/crawl-budget/), dobu, kterou je robot vyhledávače ochoten věnovat vašemu webu. To se nejspíš týká ale jen opravdu velkých webů.

<!-- AdSnippet -->

Takže – pomalý backend nemusí znamenat pomalý web. 

## Druhá poznámka k měření: Vypovídá něco průměrná datová velikost stránky? Nic moc {#druha-poznamka}

Mrkněme se ještě na další graf ze studie Dannyho Richmana. Ten měřil i datový objem průměrné stránky:

<figure markdown="1">
[cms:asset 50] 
<figcaption markdown="1">
*Obrázek: Datový objem průměrné stránky postavené na dané platformě. Zdroj: [Danny Richman](https://www.seotraininglondon.org/which-cms-performs-best-google/)*
</figcaption>
</figure>

WordPress zde figuruje opět mezi horšími. Ale nejhorší je překvapivě Shopify, platforma s poměrně solidním renomé. Znamená to tedy, že weby na Shopify budou datově obézní a tudíž pomalé? Autor opět klidní závěry o platformách tím, že tohle vypovídá spíše o jejich typickém použití:

> …Shopify and Magento are more typically used by larger ecommerce businesses … the home page of these sites contains more images…

Navíc – vy už víte, že datový objem stránky není příliš důležitý ukazatel rychlosti webu. Že je lepší se soustředit na Speed Index, Time To Interactive [a další metriky](https://www.vzhurudolu.cz/prirucka/metriky-rychlosti).

Ano, je to tak. WordPress, Shopify a jiné platformy jsou jen nástroje. A ty za pomalé nebo jinak pokažené weby nemohou. Mohou za ně lidé.

<!-- AdSnippet -->