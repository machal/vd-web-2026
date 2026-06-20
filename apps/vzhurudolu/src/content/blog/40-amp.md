---
postID: 40
postTitle: 'AMP opravuje a zároveň rozbíjí World Wide Web'
category:
  - rychlost-nacitani
postUrlId: amp
postDateTime: 2015-10-13
excerpt: 'Google řeší elegantně a otevřeně problém s rychlostí načítání. Na druhou stranu tady vzniká možnost závislosti velké části Webu na jeho vrtoších.'
postStatus: Published
authorID: 1
sectionID: 1
no_ads: false
include_rss: true
category_highlight: true
og_title: 'AMP opravuje a zároveň rozbíjí World Wide Web'
og_description: 'Google řeší elegantně a otevřeně problém s rychlostí načítání. Na druhou stranu tady vzniká možnost závislosti velké části Webu na jeho vrtoších.'
og_type: article
---

# AMP opravuje a zároveň rozbíjí World Wide Web

Google řeší elegantně a otevřeně problém s rychlostí načítání. Na druhou stranu tady vzniká možnost závislosti velké části Webu na jeho vrtoších.

[Accelerated Mobile Pages](https://www.ampproject.org/) (AMP)  je [nová iniciativa Google](https://googleblog.blogspot.cz/2015/10/introducing-accelerated-mobile-pages.html) pro zrychlení servírování statického obsahu uživatelům Webu. 

Není to nic pro tvůrce aplikací, her a pravděpodobně ani eshopů. Zajímat bude hlavně vydavatele statického obsahu. Noviny a bloggery.

Jak by to mělo fungovat?

1. Vyrobíte speciální AMP HTML verzi stránky. S omezenou množinou HTML tagů a CSS. Ale bez vlastních javascriptových knihoven, využít můžete jen jednu oficiální. Technikálie najdete [u Bohouše Jahody](http://jecas.cz/amp-html). Z běžné HTML5 verze se pak na tuto speciální odkážete.
2. AMP stránka by se v prohlížeči měla načíst velmi rychle. Specifikace AMP HTML je podmnožinou HTML5 a jde naproti všem možným ověřeným postupům pro zrychlení načtení a vykreslení stránek v prohlížeči.
3. Google navíc slibuje kešování AMP stránek na vlastních serverech.
4. V konkrétních případech použití (mobilní vyhledávání zpráv atd.) pak Google v rámci své domény zobrazí AMP verzi stránky.

Rychlé to pak může být šíleně. Takhle:

<iframe width="646" height="392" src="https://www.youtube.com/embed/i2_lAEzmOPo" frameborder="0" allowfullscreen></iframe>

## Není to nový WAP ani XHTML/MP?

Není. Speciálním mobilním webům nebo speciálním mobilním formátům (WAP, XHTML MP) chyběl a chybí kromě jiného bod tři z předchozího seznamu – uložení obsahu na kešovacích serverech od Google. Zásadní inovace AMPu leží právě v distribuci.

## Je to lepší cesta než Instant Articles a Apple News

Podobné řešení od Facebooku – Instant Articles – slibuje vylepšení načítání článků na Facebooku. Na Facebooku, nikoliv Webu. Apple News jsou na tom podobně. Obě firmy své specifikace uzavřely pro vlastní verzi obsahového Webu. 

Google specifikaci AMP opensourcoval. Tím nám za prvé dává možnost spoluvytvářet její budoucnost. Za druhé pak poskytuje ostatním agregátorům obsahu – jako jsou RSS čtečky a různé aplikace pro snadnější čtení – možnost využívat benefitu takřka okamžitého načtení.

## Současné weby jsou často nepoužitelná a pomalu se načítající monstra

Uživatelé se rozhodně bez desítek vteřin čekání na zobrazení obsahu obejdou, že ano? 

Platí také, že někteří z nich si už dnes dokáží obsahové weby přizpůsobit tak, aby se jejich obsah dal konzumovat příjemně. Pokud se vám pokaždé, když čtete o AMP, do mysli dostávají blokátory reklamy a aplikace pro snadnější čtení, jste na správné stopě. 

Mnoho tvůrců webů AMPu zazlívá hlavně nepřítomnost Javascriptu. 

Zlé jazyky tvrdí, že s AMPem se vracíme o 10 až 20 let nazpátek. To je ale dobře.

Jak vypadají stránky velkých mediálních domů, když si zapnete blokátor reklamy? Není to taky web jak jsme jej znali před dvaceti lety? A není to to, co uživatelé chtějí? Web s dobře formátovaným obsahem. Web s rozumnou, nikoliv nepříčetnou, mírou reklamy. Web, který se načte prakticky okamžitě. 

AMP omezí možnosti nejen vývojářům uživatelského rozhraní, ale i grafikům, designérům, produkťákům, marketingovým oddělením a všem, kteří si do webu chtěli ještě něco přidat. Aby z něj vytvořili nepoužitelné a pomalu se načítající monstrum. Problém, o kterém se tady mluví už léta.

## Omezení výrazových prostředků je u obsahových webů ku prospěchu

HTML5 je neuvěřitelně mocné. Pro obsahové weby až moc. A javascriptové knihovny umějí z obsahového webu udělat nepoužitelného molocha. O základní elementy uživatelského rozhraní jako jsou lightboxy nebo karusely ovšem nepřijdeme. Jen budeme opět vybírat z omezené nabídky komponent. 

## Je AMP nová verze WWW pro obsahové weby?

To jediné co mě na AMP trápí, ale míří to jeho podstatě – AMP je nová verze World Wide Webu pro obsahové weby. 

Nejobvyklejší scénář použití AMPu bude koexistence dvou webů – plnohodnotného HTML5 a jeho AMP verze. Vytváření dvou verzí webu ovšem neudělá radost žádnému webaři. 

Sami autoři AMP zatím nemají jasno v tom, [zda AMP web může být jedinou verzí webu](https://groups.google.com/forum/#!topic/amphtml-discuss/TxoKtSXK148). AMP je ale podmnožinou HTML5 a tak si umím představit, že třeba VzhůruDolů.cz by bylo možné postavit jen za použití AMP technologie.

A pak – rozumní vydavatelé (příkladem budiž NY Times, Guardian nebo v Česku Respekt) usilovně pracovali na rychlosti svého plnohodnotného HTML5 webu. 

Proč Google nenabídne nějakou formu kešování na vlastních serverech i dobře udělaným HTML5 webům? 

Opravdu by nenašel sadu vlastností a javascriptových knihoven, které je možné používat? Pokud ne, asi je to tak, že právě AMP tu správnou sadu tvoří. A může to pak opravdu znamenat, že mnozí tvůrci obsahových webů dají přednost jediné verzi webu – vytvořené pomocí AMP.

Je pak docela dobře možné, že za pár let budeme obsahové weby dělat pomocí AMP, nikoliv HTML5. Pomocí opensource, ovšem v držení Google. Se všemi možnými pozitivními i negativními důsledky.

Vedle HTML5 pro eshopy, aplikace, hry a další může vzniknout „Google obsahový Web“ postavený na AMP.

Google na jednu stranu zachraňuje Web, který jsme pokazili my, tvůrci. Na druhou stranu hrozí, že jeho část dostane zcela pod svou taktovku. Tohle bude ještě zajímavé.