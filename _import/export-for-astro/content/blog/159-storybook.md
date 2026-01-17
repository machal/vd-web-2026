---
postID: 159
postTitle: 'Jak v ContentKing děláme design systém za pomocí Sketche, InVision a Storybooku'
postUrlId: storybook
postDateTime: 2020-02-26
excerpt: 'Rozebíráme motivaci pro vytvoření systému designu v ContentKing, postup a nástroje, které použili, včetně Storybooku.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - design systém
  - dokumentace
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Jak v ContentKing děláme design systém za pomocí Sketche, InVision a Storybooku'
og_description: 'Rozebíráme motivaci pro vytvoření systému designu v ContentKing, postup a nástroje, které použili, včetně Storybooku.'
og_type: article
---

# Jak v ContentKing děláme design systém za pomocí Sketche, InVision a Storybooku

_[Martin Pešout](http://www.martinpesout.cz/), frontendový vývojář z [ContentKing](https://www.contentking.cz/) vám v dnešním textu ukáže, jak vzniká jejich systém designu._

## Proč vlastně v ContentKing máme design systém? {#proc}

Rozhodnutí začít vytvářet dokumentaci komponent vzešlo ode mě. Potrpím si na detail a už nějakou dobu mě trápilo, že se v designech objevují prvky vyjadřující stejné věci, ale designér je nakreslil znovu a jinak. Jednou to byla navigace, pak nějaký boxík, což se v takovém množství komponent stává.

Chtěl jsem v prvé řadě vytvořit přehledný katalog používaných komponent. Když se pracuje na větším projektu, znovupoužitelnost je hodně důležitá. Nějaký seznam komponent by pak měl být po ruce, když už někdo snaží dohledat co už existuje a co ne.

Seznam komponent byl jen první krok, vznikl design systém, na který se můžete podívat: [styleguide.contentkingapp.com](https://styleguide.contentkingapp.com/).

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1582694780/vzhurudolu-blog/storybook.001_pnaoks.jpg" alt="">
<figcaption markdown="1">
*Obrázek: To je ona, style guide od ContentKing.*
</figcaption>
</figure>

Nyní plánujeme katalog rozšiřovat. Design systém by měl správně obsahovat i popis typografie, přehled a význam použitých barev apod. Tyhle věci bych rád také sepsal, ať se o to můžeme opírat při další práci. Náš tým se postupně rozrůstá, takže pro nové členy může být naše style guide dobrý zdroj informací.

## Dvě hlavní motivace: Pojďme zamezit duplicitám a vymýšlet názvy společně {#motivace}

Měl jsem  představu, že když vytvořím zmíněný katalog komponent, bude snadnější designérům a vedení ukázat, že už někde existuje například záložková navigace a není ji potřeba navrhovat znovu. Musím říct, že to se opravdu podařilo a mám z toho radost.

<!-- AdSnippet -->

Uběhla nicméně řada měsíců než lidi v týmu změnili své návyky a začali potřebné informace hledat v naší knihovně. Před měsícem k nám nastoupil druhý designér, kterému přítomnost knihovny komponent pomohla pochopit celou strukturu aplikace během krátké chvilky.

Druhou věcí, kterou jsem si přál, byla větší spolupráce při pojmenovávání komponent. Tím, že komponentě přiřadím nějaký název, tak ji vlastně dávám i konkrétní význam a je pak jasnější, kde všude ji bude možné použít.

Spolupráce na pojmenování se nám ještě stále nedaří. Názvy elementů řeším jen já a jak se aplikace rozrůstá, je to pro mě stále těžší a těžší. Je to rozhodně něco, co bych chtěl do budoucna vyřešit.

Zrovna minulý týden jsem zavedl nový kanál `#design-system` na našem Slacku a moje představa je taková, že zde zkusíme řešit ono pojmenovávání. Nikdo z týmu není vynechaný a každý může přispět svou troškou do mlýna.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1582694780/vzhurudolu-blog/storybook.002_ljephl.jpg" alt="">
<figcaption markdown="1">
*Obrázek: Jak v ContentKing diskutujeme o vlastním systému designu?*
</figcaption>
</figure>

## Organizace práce: Frontendista systému designu šéfuje a intenzivně komunikuje s designérem {#organizace}

V současnosti jsem to já, frontendový vývojář, kdo zodpovídá za design systém. Spolupráce v týmu pak probíhá asi takto:

1. Designér vytváří potřebné mockupy a celou představu komunikuje s naším product managerem, který zná představy managementu.
2. Z mockupů poté vznikají konkrétní designy. Designer pak svou práci nahrává do nástroje [InVision](https://www.invisionapp.com/), kde je možné vše komentovat a připomínkovat.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1582694780/vzhurudolu-blog/storybook.003_guxikq.jpg" alt="">
<figcaption markdown="1">
*Obrázek: Diskuze k designu ContentKingu v nástroji Invision.*
</figcaption>
</figure>

Pokud to jde, designér se snaží vše poskládat z připravených komponent. Ale co si budeme říkat, takto ideální situace nikdy nenastává a nastávat nebude.

Vždycky bude třeba sem tam něco nového navrhnout. Když si designer není jistý, řešíme spolu, zda má smysl navrhovat novou komponentu nebo mu pomůžu najít takovou, která by se pro danou situaci hodila. Výhodou je, že máme pracovní stoly vedle sebe, proto je to vždy otázka chvilky.

<div class="related" markdown="1">
- [Atomický design a Pattern Lab](/prirucka/pattern-lab)
- [Systém designu v newsletterech](/prirucka/design-system-newslettery)
- [Podcast: O systému designu v Kiwi.com](/podcast/126-podcast-kiwi-design-system)
</div>

Tyhle naše diskuze jsou hodně důležité. Já, jako správce design systému, držím ochrannou ruku nad tím, aby komponenty zbytečně nebobtnaly. Pokud by tohle nikdo nehlídal, máme tu desítky různých tlačítek, boxíků nebo nadpisů. Prostě chaos. Za pár měsíců by nám to vše přerostlo přes hlavu.

## Naše nástroje: Sketch s Abstractem pro designéry, Invision Inspect pro frontendisty {#nastroje}

Při spolupráci v týmu je asi největším problémem předávání souborů s designy z nástroje [Sketch](https://www.sketch.com/). Designéři v ContentKing mezi sebou používají [Abstract](https://www.abstract.com/), což je nástroj, který jim umožňuje zálohovat své výstupy a zároveň to pomáhá v situacích, kdy více designérů pracuje na jednom projektu. V podstatě takový verzovací nástroj pro grafiky.

Jakmile je práce designérů schválená, já, jako UI designer (a frontendový vývojář), už pak Sketch soubory vůbec neotvírám. Vše, co potřebuji, mám dostupné stále v [InVision Inspect](https://www.invisionapp.com/feature/inspect/), ve kterém je možné jednotlivé objekty v designech proklikat a získat si tak potřebné CSS vlastnosti. Sketch je fajn, ale toto je pro mě pohodlnější cesta. Už kvůli tomu, že se nemusím starat o to, zda stažená verze designu je ta aktuální.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1582694780/vzhurudolu-blog/storybook.004_lo8ahr.jpg" alt="">
<figcaption markdown="1">
*Obrázek: Invision Inspect v akci.*
</figcaption>
</figure>

## Storybook jako dokumentační nástroj a vývoj komponent přímo v něm {#storybook}

Naše aplikace – ContentKing – je napsaná v Reactu. Pro nás bylo tedy podstatné, aby v dokumentaci šlo o ty samé komponenty, které používáme v aplikaci. Storybook má toto zvládnuté na výbornou. Další jeho výhodou bylo, že umožňuje editovat jednotlivé údaje přímo při prohlížení.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1582694780/vzhurudolu-blog/storybook.005_lwgjq2.jpg" alt="">
<figcaption markdown="1">
*Obrázek: Storybook.*
</figcaption>
</figure>

Použití Storybooku bylo na začátku spíše takovým experimentem. Já jsem často vyvíjel věci uvnitř aplikace a do Storybooku jsem se pak chodil zdokumentovat až výsledky mé práce. To se ale ukázalo jako neefektivní. Podařilo se mi však najít lepší způsob práce.

### Postup práce: Z HTML/CSS a Storybooku do JS a aplikace {#storybook-postup}

Většinu komponent chystám pouze ve Storybooku. Vše co potřebuji ke své práci tu mám. Jednoduše si tak nasimuluji různá rozlišení nebo nachystám testovací data. Je pak jen na mě, jak dobře všechno navrhnu a zdokumentuji, aby to další vývojáři pochopili.

Moje výstupy poté přebírá JavaScriptový vývojář. On vezme připravené stavební bloky a poskládá je do konkrétních stránek v aplikaci. JavaScriptový vývojář nepíše HTML ani CSS, pracuje pouze s hotovými komponentami. On je také ten člověk, který řeší napojení těchto komponent na reálná data a umožní jim provádět konkrétní akce.

### Zapojení dalších lidí, jedna z výhod systému designu {#storybook-zapojeni}

Mimochodem, nedávno bylo třeba najmout externistu, aby pro nás vytvořil rozšíření do Chrome. Aplikaci před tím vůbec neznal. Nicméně díky naší style guide dokázal vše poskládat během chvilky. A to jsou ty momenty, kdy si říkám, že to úsilí mělo skutečně smysl.

## Atomický design upravený logickými komponentami {#atomic-design}

Dělení komponent v ContentKing sice vychází z [Atomic Designu](https://www.vzhurudolu.cz/prirucka/pattern-lab), nevyužíváme však celou jeho hierarchii. Dělíme komponenty pouze na:

- atomy
- molekuly
- logické komponenty

Atomy lze považovat za základní stavební bloky a jako jediné obsahují HTML kód a CSS styly. Molekuly pak vznikají jako komponenty složené z několika atomů či molekul dohromady. Tyto komponenty nic nevykonávají a ani zobrazují reálná data. Díky tomuto rozdělení mají atomy a molekuly zajištěnu co největší znovupoužitelnost.

Fungující stránky vznikají ještě o jednu úroveň výše. Atomy a molekuly vytváří složitější struktury a poprvé dochází k zobrazení reálných dat. V ContentKing tuto část nazýváme jako „logické komponenty“. Komponenty zde ožívají a dokážou tak vykonávat konkrétní akce.

Je dost možné, že i tuto úroveň časem rozdělíme dále na _organismy_, _šablony_ a _stránky_, podle metodiky atomického designu. Jestli to bude nutné, ukáže až čas.

<figure>
<img src="https://www.vzhurudolu.cz/prirucka-content/dist/images/medium/atomic-design.jpg" alt="">
<figcaption markdown="1">
*Obrázek: Dělení komponent podle Atomic Designu Brada Frosta.*
</figcaption>
</figure>

## A co kritický bod systému designu – psaní dokumentace?

Když jsem začal knihovnu komponent vytvářet, bylo mně jasné, že pokud nebudou komponenty dokumentované rovnou, bude mnohem složitější se k tomu v budoucnu dostat a situaci napravit. Nicméně i v tomto směru máme stále nedostatky. Dokumentace jednotlivých komponent je zatím jen krátký popis toho, k čemu je komponenta určená a jaké atributy u ní dokážeme nastavit.

<p class="video">
Video: <a href="https://www.youtube.com/watch?v=Dc9ZC9ObSMk">React z pohledu UI vývojáře</a> ~ Martin Pešout ve své starší přednášce ukazuje React frontendovým kodérům.
</p>

Je to třeba brát tak, že i tenhle stav, který máme, je pro ContentKing veliký úspěch. Jsme malý tým a časem stávající stav určitě vylepšíme.

## Ukázka komponenty Rating Stars

Pojďme si například ukázat použití komponenty nazvané jako „Rating stars“. Jedná se o hvězdičky, které slouží k zobrazení hodnocení.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1582694780/vzhurudolu-blog/storybook.006_wylhaj.jpg" alt="">
<figcaption markdown="1">
*Obrázek: Komponenta Rating stars.*
</figcaption>
</figure>

Tato komponenta vznikla nejprve v rámci Storybooku. Zobrazit si ji může každý na [této adrese](https://styleguide.contentkingapp.com/?path=/story/atoms-scores-rating-stars--default-usage). Nastavit lze různé parametry: od samotného skóre až po počet zobrazených hvězdiček. Samotný kód komponenty není nikterak složitý.

CodePen: [cdpn.io/e/qBdRwxq](https://codepen.io/martinpesout/pen/qBdRwxq?editors=0010)

Jedná se o atomickou komponentu. Lze tedy použít bez jakýchkoliv omezení. A to dokonce i mimo samotnou aplikaci.

Použití takové komponenty je pak jednoduché. Nastavíme potřebné parametry a máme hotovo.

CodePen: [cdpn.io/e/YzXNMLx](https://codepen.io/martinpesout/pen/YzXNMLx?editors=0010)