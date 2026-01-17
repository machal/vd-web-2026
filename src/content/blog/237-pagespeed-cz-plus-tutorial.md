---
postID: 237
postTitle: 'PageSpeed.cz tester PLUS pro vývojáře: jak monitorovat a ladit rychlost webu'
postUrlId: pagespeed-cz-plus-tutorial
postDateTime: 2024-01-08
excerpt: 'Po letech vývoje přicházíme s tarifem PLUS, navržený pro vývojáře, kteří chtějí zlepšit rychlost svých webů. V článku ukážu, jak PLUS odhaluje a pomáhá opravit nejčastější problémy, s praktickým příkladem na webu Goldea.cz.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
no_ads: true
include_rss: true
category_highlight: true
og_title: 'PageSpeed.cz tester PLUS pro vývojáře: jak monitorovat a ladit rychlost webu'
og_description: 'Po letech vývoje přicházíme s tarifem PLUS, navržený pro vývojáře, kteří chtějí zlepšit rychlost svých webů. V článku ukážu, jak PLUS odhaluje a pomáhá opravit nejčastější problémy, s praktickým příkladem na webu Goldea.cz.'
og_type: article
---

# PageSpeed.cz tester PLUS pro vývojáře: jak monitorovat a ladit rychlost webu

V PageSpeed.cz jsme po několika letech práce na [testeru pro měření rychlosti](https://app.pagespeed.cz/) spustili také jeho placenou variantu, [tarif PLUS](https://app.pagespeed.cz/plus).

Stojí kolem 5 tis. Kč bez DPH ročně na jeden web. Postavili jsme jej pro majitele webu, marketéry a vývojáře a to na základě mnohaleté zkušenosti [s poradenstvím k rychlosti](https://www.pagespeed.cz/sluzby).

V tomhle článku vám ukážu, jaké problémy tester PLUS nám a našim klientům řeší. Na jedné případové studii pak budu ilustrovat proces ladění konkrétního problému s pomocí našeho nástroje.

Pokud se raději chcete podívat na video s velmi podobným obsahem, který je v článku, pak mrkněte [na YouTube](https://youtu.be/GXCQDdqgiNs):

<div class="rwd-media">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/GXCQDdqgiNs?si=OtFUF1zkx4DRhSlo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Rychlost je důležitá, jenže se často kazí, aniž byste to věděli {#dulezita}

> Kdo neměří, ten neřídí.

V přednášce jsem si dělal legraci, že to řekl Baron von Blitzenschnell, otec moderního měření rychlosti webu.

Ve skutečnosti nikdo neví, kdo to prohlásil. Ale je to moudrý výrok.

Po mnohaletých zkušenostech s optimalizací rychlosti u desítek webů vím, že pokud existuje nějaký základní kámen, bez kterého to celé nefunguje, je to spolehlivý monitoring rychlosti.

Bez měření rychlosti nevíte, co se na webu děje a nemůžete na to reagovat. Bez měření neznáte výsledky vašich optimalizací. Bez měření nemůžete říct, jak si vedete, kam směřujete.

Bez měření neřídíte optimalizaci rychlosti, takže ji nemůžete dělat. Rychlost přitom [zvyšuje konverze](https://www.vzhurudolu.cz/blog/58-rychlost-srovname-cz), ale má také [další pozitivní dopady](https://www.vzhurudolu.cz/prirucka/rychlost-nacitani-proc).

## Co tester PLUS přináší oproti verzi zdarma? {#co-prinasi-plus}

Náš [tester rychlosti](https://app.pagespeed.cz/) můžete používat už zhruba dva roky. Co tedy odlišuje novou placenou verzi od té stávající?

Zjednodušeně řečeno je to stabilita výsledků, možnost detailního zkoumání příčin a v neposlední řadě také [Hlídač](https://www.pagespeed.cz/blog/tester-hlidac-notifikace), který vám umožní na rychlost zase tak moc nemyslet.

[![Tarif PLUS z PageSpeed.cz](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269311/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-001_weujjd.jpg)](https://app.pagespeed.cz/plus)

Jste zvědaví? Vše vám vysvětlím, chvíli vydržte.

Nejprve je ale potřeba říct, že vám tu neprodávám nový a neodzkoušený produkt.

Tester PLUS už více než půl roku používá většina našich klientů, počínaje velkými značkami jako je [Dr. Max](https://www.drmax.cz/), [Sazka](https://www.sazka.cz/), [Livesport](https://www.livesport.cz/) až po středně velké nebo menší e-shopy jako je [Čisté dřevo](https://www.cistedrevo.cz/), [Goldea](https://www.goldea.cz/) a další.

„Plusko“ je odladěné na základě připomínek těchto a dalších více než 50 značek, kterým s rychlosti pomáháme.

Pojďme teď na ty fíčury, na ty se jistě těšíte nejvíc.

### Stabilní infrastruktura {#stabilni-infra}

Ve stávající bezplatné verzi testů na [app.pagespeed.cz](https://app.pagespeed.cz/) testujeme vaše URL méně často a výsledky bereme z API PageSpeed Insight od Googlu.

Jak na následujícím grafu sami uvidíte, výsledky PageSpeed Insight nepatří zrovna k etalonům stability:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269309/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-003_r5t1wm.jpg" width="1600" height="900" alt="FCP a LCP u PLUS a zdarma">
<figcaption markdown="1">
Obrázek: Metriky [FCP](https://www.vzhurudolu.cz/prirucka/metrika-fcp) a [LCP](https://www.vzhurudolu.cz/prirucka/metrika-lcp) pro tentýž web. U verze PLUS to prostě „neskáče“.
</figcaption>
</figure>

Příčinou velmi různorodých výsledků z API od Googlu je kromě jiného to, že Google testuje weby na různých serverech různě rozmístěných po světě.

Pro tarif PLUS jsme připravili vlastní infrastrukturu postavenou na evropském Amazon Web Services (AWS), takže můžeme garantovat, že zkreslení způsobené měřením je zde velmi malé.

Důležité je, aby byl jednoznačně patrný krátkodobý trend metrik, takže můžeme identifikovat případné problémy.

Kromě toho testujeme vícekrát a častěji než ve verzi zdarma, tudíž můžeme eliminovat výrazně odlišné hodnoty, které občas testy vracejí.

Shrňme si to ještě v tabulce:

| Vlastnost testování         | Verze zdarma | Tarif PLUS   |
| --------------------------- |:------------:|:------------:|
| Počet testů týdně           | 3            | 7            |
| Počet testování jednoho URL | 1            | 5            |
| Infrastruktura              | PSI API      | vlastní, AWS |
| Denní výsledky              | nestabilní   | stabilní     |

Jste webaři-hobbíci a stačí vám vidět trend z týdne na týden a tříměsíční období? Volte verzi zdarma, v opačném případě vám doporučuji [PLUS](https://app.pagespeed.cz/plus).

Dále se pojďme zabývat tím, co v PageSpeed.cz PLUS potěší vývojáře, a to sice detailním technickým rozborem.

## Technické detaily pro pátrání po příčinách {#tech-detaily}

Do tarifu PLUS jsme přidali několik možností, jak se dopátrat příčině zhoršení nebo zlepšení rychlosti a najít ty správné příležitosti:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269310/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-004_hemppw.jpg" width="1600" height="900" alt="Detailní reporty Technické">
<figcaption markdown="1">
*Obrázek: Detailní reporty pro všechno možné. Vysvětlení čísel je níže.*
</figcaption>
</figure>

Co na obrázku vidíte? První dvě ilustrace pocházejí z nového reportu „Technické“, kde najdete technické ukazatele jako velikost DOMu nebo datový objem CSS či JS.

Pravá část ukazuje detailní výsledky nástroje [Lighthouse](https://www.vzhurudolu.cz/prirucka/lighthouse), kde máte k dispozici opravdu hodně informací.

Zaměřme se nyní na čísla v obrázku:

1. Tady vidíte graf s datovým objemem HTML, který se u tohoto webu po spuštění redesignu razantně snížil. Palec hore, tohle vždy pomůže!
2. Datový objem fontů zde narostl, ale vidíte, že díky grafu jsme si toho mohli všimnout a pak pomoci s opravou tohoto problému.
3. V detailním reportu Lighthouse máte k dispozici JSON se všemi výstupy tohoto nástroje (lze použít např. pro srovnání v rámci [Lighthouse Diff](https://googlechrome.github.io/lighthouse-ci/difftool/)), dále Trace (pro otevření v [Chrome DevTools](https://www.vzhurudolu.cz/video/webinar-devtools-rychlost) a panelu Performance) a HAR (s možností prohlédnout si dění na síti v panelu Network).

Tahle technická data vám usnadní optimalizace a hledání příčin zhoršení. Vydržte chvilku a ukážu vám to na případové studii za pár odstavců.

Mimochodem, všimli jste si poznámek v grafech? I to je vlastnost tarifu PLUS, která vám usnadní dohledávání změn.

### Hlídač hlídá, zatímco vy můžete… třeba spát {#hlidac}

„Hlídač“ je vlastnost, ze které mám opravdu velkou radost, a se kterou jsme se piplali nejvíce. Z poradenské praxe totiž víme, že většina nástrojů člověka rychle zahltí zbytečnými notifikacemi.

Vezměme příklad z následujícího obrázku:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269309/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-005_ekobmb.jpg" width="1600" height="900" alt="Peaky v grafu">
<figcaption markdown="1">
*Obrázek: Některé vrcholky nestojí za to zdolávat.*
</figcaption>
</figure>

Na prvním kopečku je vidět, že hodnoty metriky LCP jeden den vylétly, ale hned se vrátily zpět. Šlo tedy o krátký „peak“, špičku, která představovala výjimku.

Druhá šipka zase ukazuje na mírné dvoudenní překročení stanoveného limitu. Zajímá vás tohle?

Zde musím říct, že jistě existují týmy, které sledují performance na hodinové nebo dokonce minutové bázi. Je jich ale jen zlomek. Ono to totiž vyžaduje, aby rychlost měla naprostou prioritu a vy jste měli kapacity ji každý den řešit.

Naprostá většina našich klientů má sice rychlost ve svých prioritách vysoko, ale reálně na ni pracuje jednou za pár dní. Ti menší dokonce jednou za týdny nebo v měsíčních cyklech.

Právě pro tyto případy stavíme našeho Hlídače. Ten začne „panikařit“ a posílat notifikace až po několika dnech, kdy se původní hodnota zhoršila a zůstala na nové horší úrovni. To vám ušetří vyhodnocování spousty notifikačních hlášení.

Do Hlídače jsme ale přidali ještě jednu vychytávku. Jde o automatické nastavování hladin rychlosti ([performance budgets](https://developer.mozilla.org/en-US/docs/Web/Performance/Performance_budgets)). Však se podívejte na následující obrázek, z toho budete moudřejší:

![Limity rychlosti v PageSpeed.cz](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269310/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-006_h4vq8x.jpg)

Červená linka zda ukazuje limit rychlosti, tedy maximální hladinu. V tomto případě se však metrika FCP postupně zlepšuje.

V jiných nástrojích byste museli pravidelně prohlížet grafy a limity rychlosti si ručně přenastavovat podle změn v rychlosti webu. Kdo z vás to ale reálně dělá?

Náš Hlídač nastavuje limity sám podle algoritmu, který jsme ladili několik měsíců. Takže pokud dojde ke zlepšení, schůdek v grafu se nastaví automaticky.

Navíc vám pošleme notifikaci, protože dobrých zpráv kolem rychlosti není nikdy dost.

Sečteno, podrtženo:

- Hlídač vám obstará automatické sledování rychlosti webu.
- Nebude vás zahlcovat velkým množství zpráv.
- Funguje automaticky, takže vy můžete dále dělat, co vás baví – rozvoj webu, programování nebo prostě flákání se.

Notifikace z hlídače chodí do e-mailu, do Teams nebo do Slacku.

Tester rychlosti od PageSpeed.cz vám však umožní jít dál. V momentě, kdy nastane skutečný problém, můžete se díky výše uvedeným technickým detailům dopátrat až k příčině zhoršení a tu pak opravit.

Pojďme se na optimalizaci rychlosti s pomocí tarifu PLUS podívat prostřednictvím příběhu z praxe.

## Případovka: ladění CLS na Goldea.cz {#pripadovka}

Web [Goldea.cz](https://www.goldea.cz/) funguje z pohledu rychlosti webu skvěle. Je radost spolupracovat s klientem, který rychlost považuje za důležitou, a vývojáři, kteří jsou velmi kompetentní.

Podívejte se na čísla z [Chrome UX Reportu](https://www.vzhurudolu.cz/prirucka/chrome-ux-report), tedy od uživatelů Google. Jsou výborná:

![Čísla CrUX jsou zelená](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269308/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-009_idipia.jpg)

Ale my v PageSpeed.cz moc dobře víme, že monitoring rychlosti se vyplatí i u webů, které jsou technicky stabilní a obstaráváné schopnými lidmi.

Stále se totiž nasazují nové úpravy, nejen na straně vývojářů, ale třeba i [přes GTM](https://www.vzhurudolu.cz/prirucka/google-tag-manager). Problémy se prostě dějí pořád.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269310/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-008_nivghl.jpg" width="1600" height="900" alt="">
<figcaption markdown="1">
*Obrázek: Chybička se vloudí.*
</figcaption>
</figure>

Problém s [metrikou CLS](https://www.vzhurudolu.cz/prirucka/metrika-cls) nám Hlídač nahlásil po třech dnech, když už bylo jasné, že nejde o náhodnou špičku. Navíc šlo o výrazné zhoršení hodnot. Takže jsme to šli řešit.

V testeru je možné si každý graf rozkliknout do modálního okna, které vám ukáže přesné hodnoty testů pro jednotlivé typové stránky. Tohle je stav, kdy všechno bylo zelené:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269308/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-010_ycnrbz.jpg" width="1600" height="900" alt="">
<figcaption markdown="1">
*Obrázek: Před zhoršením jsou hodnoty CLS nulové nebo skoro nulové. Krása.*
</figcaption>
</figure>

Tohle je stav po zhoršení:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269308/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-011_xsu065.jpg" width="1600" height="900" alt="">
<figcaption markdown="1">
*Obrázek: Ajaj, co se nám to tady přihodilo?*
</figcaption>
</figure>

Snadno zde vidíme, že problém je u typové stránky BlogPost, tedy u detailu článku.

Kliknutím na čas testu se pak dostanete do detailního výsledku testování s výpisem reportu nástroje Lighthouse:

![Detailní výpis Lighthouse](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269309/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-012_dywkys.jpg)

I zde vidíme vysokou hodnotu CLS. Nástroj Lighthouse nám občas může poradit relevantní rady, proto se podíváme, co nám říká k CLS.

Ukazuje na velký posun tohoto objektu:

```html
<main role="main" id="content">
```

Kódeři a specialisté na rychlost mezi námi už mohou něco začít tušit, protože podle názvu elementu a hodnoty posunu může jít o posun celé stránky.

Jak zkoumat dál? Ve výsledku testu si v testeru PageSpeed.cz můžu stáhnout tzv. Trace, což je detailní záznam práce prohlížeče při stahování a renderingu stránky.

Soubor z Trace můžu otevřít v nástroji Performance Insights, který mám z Chrome DevTools nejraději právě pro ladění metriky CLS.

Tady vidíme to, co potřebujeme:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269308/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-013_b5zyar.jpg" width="1600" height="900" alt="">
<figcaption markdown="1">
*Obrázek: Dvě místa v Performance Insights, která mi ukáží problém s CLS.*
</figcaption>
</figure>

Šipka nahoře ukazuje na panel, který informuje o nechtěných posunech, jež metrika CLS zaznamenává.

Vidíme tam oranžový sloupec, takže vysoká hodnota shiftu a pak screenshot, co se tam přesně renderuje. Větší screenshot také ukazuje spodní šipka.

Můj obrázek je statický, takže vám neukáže rozdíl mezi renderem před a pro. K tomu jsem vám udělal ještě jeden obrázek:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704793543/ps-plus-tutorial-014_pcmixb.jpg" width="1600" height="900" alt="">
<figcaption markdown="1">
*Obrázek: Před a po. A našli jsme viníka.*
</figcaption>
</figure>

Už je vám to jasné? Na webu proběhne ke změna výšky horní zelené lišty. Dojde k tomu kvůli náhradě systémového písma za webfont.

Co s tím? Nebojte, poradím vám. V týmu PageSpeed.cz jsou pro nás tyhle horní lišty takovým vánočním evergreenem, který pravidelně velké části webů ničí kvůli poskočení layoutu čitelnost obsahu a tím i metriku CLS.

Možnosti řešení jsou například tyto:

- Lépe ošetřit rozdíly mezi systémovým písmem a webfontem, např. pomocí [vlastnosti `size-adjust`](https://www.vzhurudolu.cz/prirucka/css-size-adjust).
- Zajistit u autora nebo autorky textu, aby jeho délka ani na mobilu nepřetekla na druhý řádek.
- Ošetřit „jednořádkovost“ na straně kódu, např. pomocí vlastnosti overflow a vytečkování pomocí [vlastnosti `text-overflow`](https://www.vzhurudolu.cz/prirucka/css3-text-overflow).

Možné jsou i kombinace těchto postupů, kreativitě se meze nekladou. Metrika CLS je v tomto přísná, protože je citlivá i na velmi krátké posunutí celého layoutu.

Tak. Už se blížíme k závěru. Teď se pojďme podívat, co za tarif PLUS zaplatíte a co přesně vám nabídne.

## Tarif PLUS {#plus}

Za cenu 5 148 Kč ročně (429 Kč měsíčně) bez DPH za jeden detailně monitorovaný web dostanete:

- 5 detailně sledovaných URL jednoho webu (testy Lighthouse na naší infrastruktuře).
- 5 domén – kromě té hlavní ji klienti využívají na subdomény, jazykové mutace nebo konkurenci (sledování CrUX dat od uživatelů Googlu).
- Vlastnosti o kterých hovořím výše: hlídač rychlosti, detailní technické informace, stabilní infrastrukturu, poznámky v grafech a tak dále.

Stavíme to tak, aby to bylo dostupné i pro menší, ale vydělávající weby.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1704269308/vzhurudolu-blog/page-speed-cz/ps-plus-tutorial-015_ow1lfb.jpg" width="1600" height="900" alt="">
<figcaption markdown="1">
*Obrázek: Nastavení PLUS testu může vypadat třeba takhle.*
</figcaption>
</figure>

Samozřejmě zde dále platí výhody stávající bezplatné verze – máte k dispozici týmový dashboard, kam si můžete pozvat libovolný počet spolupracovníků, můžete si tam přidávat testy zdarma (např. pro sledování konkurence) a chodí vám pravidelné měsíční reporty.

S onboardingem a nastavením testu vám navíc osobně pomůžu.

Více o tarifu PLUS, včetně srovnání s verzí zdarma: [app.pagespeed.cz/plus](https://app.pagespeed.cz/plus)

## Co si zapamatovat? {#pamatovat}

Tohle je to nejdůležitější, co byste si mohli z článku odnést:

- Měření je základ performance.
- V PLUS dostanete detailní a spolehlivý monitoring.
- Hlídač vás nebude otravovat, ale dá včas vědět, že se něco děje.
- V PLUS dostanete všechny technické podklady pro optimalizaci.
- 5 148 Kč ročně bez DPH za jeden detailně monitorovaný web.

Shrnutí? Rychlost je důležitá, jenže se často kazí. My ji za vás pohlídáme, zatímco vy se soustředíte na to, co umíte nejlépe.

Samozřejmě budeme rádi za každý váš feedback, buď přímo sem nebo třeba na e-mail [info@pagespeed.cz](mailto:info@pagespeed.cz).