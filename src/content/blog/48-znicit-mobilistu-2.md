---
postID: 48
postTitle: 'Jak zničit mobilní uživatele podruhé: zakažte zoomování nebo schovejte obsah'
postUrlId: znicit-mobilistu-2
postDateTime: 2016-01-18
excerpt: 'Pokud vám na webu řádí obzvlášť odolný mobilní uživatel a přežil všech devět kroků z přechozího návodu, nevěšte hlavu. Přináším sedm kroků, které vás těch otravných potvůrek nadobro zbaví.'
postStatus: Published
authorID: 1
sectionID: 1
category: ['responzivni-design']
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Jak zničit mobilní uživatele podruhé: zakažte zoomování nebo schovejte obsah'
og_description: 'Pokud vám na webu řádí obzvlášť odolný mobilní uživatel a přežil všech devět kroků z přechozího návodu, nevěšte hlavu. Přináším sedm kroků, které vás těch otravných potvůrek nadobro zbaví.'
og_type: article
---
# Jak zničit mobilní uživatele podruhé: zakažte zoomování nebo schovejte obsah

Pokud vám na webu řádí obzvlášť odolný mobilní uživatel a přežil [všech devět kroků z přechozího návodu](/blog/47-znicit-mobilistu-1), nevěšte hlavu. Přináším sedm kroků, které vás těch otravných potvůrek nadobro zbaví.

## 10) Zakažte jim zoomování

*Tohle je jen pro otrlé hubiče mobilních uživatelů. Nelidská, ale účinná metoda. Ty potvory si už nikdy žádnou selfie neudělají.*

Ale vážně. Zákazem přiblížení nebo oddálení nekomplikujete používání webu jen lidem s horším zrakem. I naprosto zdraví [uživatelé na mobilech velmi často zoomují](http://ux.stackexchange.com/a/37513) – aby se podívali na detail obrázku, aby se jim lépe vybírat text, aby si zvětšili méně kontrastní obsah v horších světelných podmínkách…

Pokud všichni uživatelé desktopu neumějí žít bez dvou věcí – tlačítka „zpět“ a scrollování – u mobilních si připočtěte ještě třetí – zoomování. 

## 11) Webfonty servírujte špatně

*Když už se dočkali načtení stránky, doražte je probliky fontů nebo rovnou jejich zneviditelněním.*

Použití webových fontů na stránkách rozhodně není obecně špatně, ale je potřeba [dohlédnout](/kurzy/rychlost-nacitani) aby se načetly mezi prvními prvky designu stránky. Některé prohlížeče čekají se zobrazením textového obsahu stránky až na donačtení webových fontů. Jiné zase klidně zobrazí systémové písmo, zrovna když jej tam jako autoři chcete nejméně. Nechtěné schovávání obsahu (FOIT) i nechtěný problik systémového písma (FOUT) [je možné technicky vyřešit](https://www.souki.cz/jak-efektivne-nacitat-webfonty). Je ale nutné si zvolit jedno z těchto chování a ve všech prohlížečích jej sjednotit.

## 12) Vaše slajdery musejí být na dotykových zařízeních nefunkční

*Tohle je jako past na myš. A sýrem je posuvník, který láká k posouvání. Jenže neposouvá. MUHEHEHE.*

Milý webaři, na mobilech dvakrát měř, pak teprve řež. U všech nesystémových nebo nestandardních webových ovládacích prvků tohle fakt platí. Posuvníky sloužící pro zadávání rozsahu (např. ve filtrech produktů v kategoriích) nejsou výjimkou. Kdo nikdy na tabletu marně neposunoval slajder v některém českém eshopu? Je tady snad nějaká slajderová panna nebo slajderový panic?

## 13) Dej tam tlačítka sociálních sítí

*Pokud jej neotrávíš vlastním jedem, zkus ten sousedův.*

Tlačítka Facebooku, X nebo Google+ jsou pro uživatele smartphonů nepříjemné (*MUHEHEHE*) ze tří důvodů: 

1. Stahují [velké množství dat](https://x.com/machal/status/390092744116301824) a zpomalují načtení a vykreslování stránky. 
2. Většinou jsou zbytečná. [Sdílení je integrováno](http://support.apple.com/kb/HT5500) v hlavních mobilních operačních systémech. 
3. Sdílení obsahu přes tlačítka sociálních sítí ve stránkách je na smartphonech uživatelsky komplikované. 

O tom, že naprostá většina užití tlačítek sociálních sítí je zbytečná i na desktopu, mluvit nebudeme. Hubíme bestie s mobily.

Pokud čirou náhodou nechcete mobilisty hubit a sociální tlačítka mít musíte, na mobilní verzi stránek zkuste přidávat odkazy na [sdílecí adresy sítí](https://github.com/bradvin/social-share-urls#google). Můžete také použít pluginy typu [Social Likes](http://sapegin.github.io/social-likes/), které sociální tlačítka implementují s menším dopadem na rychlost načítání stránky.

## 14) Pokaž přesměrování mezi desktopem a mobilní verzí

*Hubič, který vlastní „m tečka“ web, má o jednu trávicí metodu navíc. Hurá!*

[Pokažené přesměrovní](https://developers.google.com/webmasters/mobile-sites/mobile-seo/common-mistakes/faulty-redirects) má snad každý druhý „m tečka" web. 

Správně implementováno to vypadá asi takto:

1. Pokud uživatel přijde na adresu `www.example.cz/priklad` mobilem, serverová detekce jej přesměruje na `m.example.cz/priklad` (nikoliv `m.example.cz`). Obdobně v případě přístupu na mobilní verzi přes desktop.
2. Vyhledávače indexují jen desktopovou verzi stránky. Robotům vyhledávačů instrukce o tom předáváme pomocí [kanonického URL](http://napoveda.seznam.cz/cz/fulltext-hledani-v-internetu/komunikace-s-vyhledavacim-robotem/kanonicke-url/). 
3. Pokud adresa na mobilním webu neexistuje, je lepší uživatele mobilu nechat na desktopové verzi, než jej přesměrovávat na úvodní stránku „m tečka“ webu.

Ideálním řešením je samozřejmě [responzivní web](/kurzy/responzivni-design), který má URL adresy stejné pro všechna zařízení. 

Teď už zbývá schovat na stránce zbytečnosti. Třeba obsah:

![Schovaný obsah na damejidlo.cz](/assets/img/content/dest/mobily-obsah.webp)


## 15) Hlavička webu musí zabrat alespoň polovinu mobilního displeje

*Schovej mobilnímu uživateli obsah, beztak ho nepotřebuje. Díl první.*

Ať se vám to líbí nebo ne, lidé weby navštěvují kvůli obsahu. Ano, mezi tak zlomyslnými tvory jsme odsouzeni dožít život! 

Servisní části rozhraní webu typu hlavičky nebo navigace by nikdy neměly komplikovat přístup k hlavnímu obsahu. Dvakrát to platí hlavně na omezeném prostoru obrazovek chytrých telefonů, zejména na nejmenších obrazovkách, které mívají 320 nebo dokonce 240 pixelů. Považuji za důležité dostat nad spodní okraj obrazovky alespoň část hlavního obsahu i na těch nejmenších rozlišeních. 

## 16) Fixně pozicovaná cookie lišta musí zabrat druhou polovinu mobilního displeje

*Schovej mobilnímu uživateli obsah, beztak ho nepotřebuje. Díl druhý.*

Fixně pozicovaná lišta s informací o cookie politice… Ach bože, mě je těch mobilních uživatelů někdy tak líto!

Překrývá obsah webu a ještě více zmenšuje viditelnou plochu okna prohlížeče. Doporučuji vyřešit [staticky pozicovanou vrstvou](/blog/36-cookie-lista), které scrolluje se zbytkem webu. 

## 17) Zbytek prostoru pro obsah musí zabrat okno online chatu

*Schovej mobilnímu uživateli obsah, beztak ho nepotřebuje. Díl třetí.*

Online chat je cookie lišta křížená s vloženými lajkovacími tlačítky. Smějící se bestie,  požírající obrazovkový prostor a zpomalující načítání stránky. 

Myslím, že pravděpodobnost užití chatu nebo dokonce konverze skrze chat je na mobilech nízká. Zvažte umístění online chatu do kontaktní sekce. Fakt!

---

A to je vše, přátelé. Kolik mobilních uživatelů jste dnes zničili vy?

Nenechte si ujít také [minulý díl](/blog/47-znicit-mobilistu-1), kde jsme mobilního uživatele potírali schováváním navigace, pomalým načítáním webu nebo karuselem.

Zajímají vás i další nové články? Je to daleko jednodušší, než vyhnat mobilního uživatele ze své webařské zahrádky. [Přihlaste se k měsíčnímu newsletteru](http://vzhurudolu.us2.list-manage.com/subscribe?u=d6be2f1899eba6a7651157403&id=3189eb2248).