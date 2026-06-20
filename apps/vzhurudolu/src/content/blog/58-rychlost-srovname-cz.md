---
postID: 58
postTitle: 'Případová studie Srovname.cz: jaký vliv má zrychlení webu na konverzní poměr?'
postUrlId: rychlost-srovname-cz
postDateTime: '2016-05-12 00:00:00'
excerpt: 'Srovname.cz jsem pomáhal se zrychlením webu. Na mobilech se tím povedlo zvýšit konverzní poměr o jednu čtvrtinu.'
postStatus: Published
authorID: 0
sectionID: 1
category:
  - rychlost
no_ads: false
og_title: 'Případová studie Srovname.cz: jaký vliv má zrychlení webu na konverzní poměr?'
og_description: 'Srovname.cz jsem pomáhal se zrychlením webu. Na mobilech se tím povedlo zvýšit konverzní poměr o jednu čtvrtinu.'
og_type: article
tags: ['rychlost-nacitani']
---
# Případová studie Srovname.cz: jaký vliv má zrychlení webu na konverzní poměr?

[Srovname.cz](http://www.srovname.cz/) jsem pomáhal se zrychlením webu. Na mobilech se tím povedlo zvýšit konverzní poměr o jednu čtvrtinu.

## Výchozí stav


Pomocí WebpageTest.org jsme měřili [SpeedIndex](http://www.vzhurudolu.cz/prirucka/rychlost-nastroje#1-speed-index) a [pomocí filmového pásu](http://www.vzhurudolu.cz/prirucka/rychlost-nastroje#4-filmovy-pas) i rychlost zobrazení textového obsahu. Pro obě čísla platí, že čím jsou menší, tím lépe.

<div class="rwd-scrollable">
<table>
<thead>
<tr>
<th style="text-align: left;"></th>
<th style="text-align: right;"><a href="http://www.srovname.cz/">Úvod</a></th>
<th style="text-align: right;"><a href="http://www.srovname.cz/sekce/mobilni-telefony/1.6">Seznam</a></th>
<th style="text-align: right;"><a href="http://www.srovname.cz/apple-iphone-6/srovnani-cen/k.3064159">Detail</a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">SpeedIndex</td>
<td style="text-align: right;white-space: nowrap;">6 664</td>
<td style="text-align: right;white-space: nowrap;">3 654</td>
<td style="text-align: right;white-space: nowrap;">4 001</td>
</tr>
<tr>
<td style="text-align: left;">Obsah</td>
<td style="text-align: right;white-space: nowrap;">6 s</td>
<td style="text-align: right;white-space: nowrap;">3 s</td>
<td style="text-align: right;white-space: nowrap;">4 s</td>
</tr>
</tbody>
</table>
</div>



<small>Nastavení WPT.org: Test Location = Praha, Browser = Chrome, Connection = 3G Slow, Chrome / Emulate Mobile = Nexus 5.</small>

Udělali jsme si také testy největších konkurentů. Jejich nejlepší SpeedIndex vychází kolem 2 700 bodů a zobrazení textového obsahu kolem dvou vteřin. Obvykle se ale na jejich webech obsah zobrazí po tří- až osmivteřinovém čekání.

Jako cíl jsme si stanovili zobrazení textového obsahu pod 1,5 vteřiny.

## Postup práce

Prošel jsem způsob načítání stránky a vytvořil seznam kroků ke zrychlení webu. Začali jsme od těch s největším efektem:

1. **Oprava servírování CSS.** Sjednotili jsme všechny styly do jednoho souboru a zmenšili jej. V druhém kroku pak nastavili proces vytváření [kritického CSS](/blog/35-critical-css). To vkládáme novým návštěvníkům přímo do HTML kódu a urychlíme tím zobrazení obsahu.
2. **Oprava servírování Javascriptu.** Zanalyzovali jsme skripty a ty, na které stránka nemusí čekat, nově posíláme jako [asynchronní](http://jecas.cz/async-defer). Pomohlo také sjednocení a zmenšení velikosti JS díky refaktoringu, se kterým si kluci ze Srovname.cz dali práci.

Způsobu vykreslování stránky taky pomohl převod důležitých grafických komponent [do SVG](/prirucka/svg) a jejich vložení přímo do HTML kódu. Prohlížeče tak pro podstatnou grafiku nemusejí posílat dotazy po pomalé síti.

<!-- AdSnippet -->

V seznamu věcí k úpravě jsou i další body. Ty uvedené už ale stačily ke splnění hlavního cíle. 

Kroky vypadají jednoduše, že? Vězte ale, že stály nezanedbatelné množství času a Srovname.cz v tomto není žádnou výjimkou. Další čas si vyžádalo nastavení firemního workflow tak, aby provedené úpravy nekomplikovaly další práci na webu. 

A výsledek?

## Konverzní poměr se na mobilech zvýšil o čtvrtinu

Čísla udávaná na WebpageTest.org se výrazně snížila:

<div class="rwd-scrollable">
<table>
<thead>
<tr>
<th style="text-align: left;"></th>
<th style="text-align: right;"><a href="http://www.srovname.cz/">Úvod</a></th>
<th style="text-align: right;"><a href="http://www.srovname.cz/sekce/mobilni-telefony/1.6">Seznam</a></th>
<th style="text-align: right;"><a href="http://www.srovname.cz/apple-iphone-6/srovnani-cen/k.3064159">Detail</a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;white-space: nowrap;">SpeedIndex před</td>
<td style="text-align: right;white-space: nowrap;">6 664</td>
<td style="text-align: right;white-space: nowrap;">3 654</td>
<td style="text-align: right;white-space: nowrap;">4 001</td>
</tr>
<tr>
<td style="text-align: left;white-space: nowrap;">SpeedIndex po</td>
<td style="text-align: right;white-space: nowrap;">1 340</td>
<td style="text-align: right;white-space: nowrap;">2 275</td>
<td style="text-align: right;white-space: nowrap;">1 506</td>
</tr>
</tbody>
</table>
</div>

Povedlo se díky tomu dosáhnout zrychlení vykreslení stránky:

![Srovname.cz - před optimalizací se obsah zobrazil kolem šesté vteřiny. Po ní už kolem první.](http://www.vzhurudolu.cz/assets/img/content/dest/srovname-pred-po.webp)

Nejvíce zajímavý je ale samozřejmě [dopad na obchodní ukazatele](/prirucka/rychlost-nacitani-proc). Rychlé vyhodnocení po prvním kole optimalizace ukazuje vylepšení konverzního poměru na všech zařízeních:

<div class="rwd-scrollable">
<table>
<thead>
<tr>
<th></th>
<th style="text-align: right;">Desktop</th>
<th style="text-align: right;">Tablet</th>
<th style="text-align: right;">Mobil</th>
</tr>
</thead>
<tbody>
<tr>
<td style="white-space: nowrap;">Konverzní poměr</td>
<td style="text-align: right; white-space: nowrap;">+ 1,3 %</td>
<td style="text-align: right; white-space: nowrap;">+ 4,5 %</td>
<td style="text-align: right; white-space: nowrap;">+ 24,8 %</td>
</tr>
</tbody>
</table>
</div>

<small>Zdroj: Google Analytics. Srovnáváno období 14. 4. 2016 – 13. 4. 2017 se stejným o rok dříve. Měřeno na návštěvnosti v řádu vyšších stovek tisíc. U mobilů jde o vyšší řády desítek tisíc návštěv.</small>

<div class="box">
  <p>Chcete pomoci se zrychlením webu? Pošlete své vývojáře na školení
  <a href="/kurzy/rychlost-nacitani">Optimalizace rychlosti načítání</a> nebo se 
  <a href="/martin">mi ozvěte</a>.	
  </p>
</div>