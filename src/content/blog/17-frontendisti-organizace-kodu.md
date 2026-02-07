---
postID: 17
postTitle: 'Frontendisti.cz — Organizace kódu v Ostravě'
postUrlId: frontendisti-organizace-kodu
postDateTime: '2014-05-15 00:00:00'
excerpt: 'Poznámky k přednáškám o organizaci frontend kódu z posledního srazu Frontendistů v Ostravě.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Frontendisti.cz — Organizace kódu v Ostravě'
og_description: 'Poznámky k přednáškám o organizaci frontend kódu z posledního srazu Frontendistů v Ostravě.'
og_type: article
---

# Frontendisti.cz — Organizace kódu v Ostravě

Poznámky k přednáškám o organizaci frontend kódu z posledního [srazu Frontendistů](http://srazy.info/frontendisti/4470) v Ostravě.

## [Patrik Illy](https://x.com/illycz) — OOCSS, SMACSS, BEM 

<p class="rwd-media">
<iframe width="736" height="414" src="//www.youtube.com/embed/obx1PawM2WE?rel=0" frameborder="0" allowfullscreen></iframe></p>

* Pokud nemáte sami motivaci změnit organizaci CSS kódu, je zbytečné vám ji nutit.
* První Patrikova motivace: přehlednost. CSS soubory jsou občas tak nepřehledné, že se v nich vývojáři bojí cokoliv upravovat. Maximálně přidají něco na konec. Jsou to write-only soubory.
* Druhá Patrikova motivace: znovupoužitelnost. Dobře napsaný kód můžu použít na jiném projektu, kódu pak může být méně, tzn. nakonec se kromě jiného web rychleji načítá.
* Není jediná správná cesta organizace CSS.
* OOCSS od Nicole Sullivan. 
    1. Přemýšlím v objektech, ne ve stránkách. Objekty jsou znovupoužitelné, stránky ne. Objekt je třeba navigace, hlavička, patička, media object.
    2. Rozšiřujte objekt použitím více tříd.
    3. Oddělujte strukturu od vzhledu.
    4. Vyhněte se závislosti na kontextu. Takový `html body .header .nav {} `se bude špatně přetěžovat, protože má vysokou specifičnost a není možné ji použít jinde. `.nav {}` je lepší`.`
    5. Používejte mřížku. Přestanete si zbytečně hlídat jak se elementy pozicují.
    6. Nepoužívejte ID selektory. ID v HTML jsou v pořádku, ale nepoužívejte je v CSS. ID jednak není znovupoužitelné, jednak má příliš vysokou specifičnost.
    7. Nesvazujte selektor s konkrétním elementem. ` a.btn {}` se nedá znovu použít, ale `.btn {}` ano.
* SMACSS od Jonathana Snooka.
    8. Kategorie pravidel: Base, Layout (`l-inline {}`), Module, State (`.is-active {}`), Theme.
* `shame.css` – soubor, kam se ukládají hotfixy. Úkoly pro vývojáře pro pozdější refaktoring .

## [Tomáš Musiol](https://x.com/kozleek) — BEM & Preprocesory

<p class="rwd-media"><iframe width="736" height="414" src="//www.youtube.com/embed/xzB-tMR1IcY?rel=0" frameborder="0" allowfullscreen></iframe></p>

* BEM = Block, Element, Modifier.
* Je to konvence pro pojmenovávání komponent (hlavička, patička, seznam článků…).
* Opět nepoužívá ID. 
* Blok: `.blok`, Element: .`blok__element`, Modifikátor: `.blok--modifikator`.
* Komponentu lze vzít a přesunout na jiný projekt.
* Výhody: Modulárnost CSS; Znovupoužitelnost kódu; Přehled v prioritě selektorů; Snadnější orientace v git repozitáři; Snadno pochopitelné pro všechny členy týmu; 
* Nevýhody: Dluhé názvy tříd, Zbytečně složité na malých projektech, Nepořádek v souborech když se nedodržují pravidla.
* V SASS lze použít placeholder selector – např. `.player__control { @extend %control }`, aby se do kódu zbytečně nevypisoval obsah třídy `%control`.
* Proč `.player__info` a ne `.player .info`? Druhý zápis má vyšší specifičnost (20), první jen (10), což se dá přetěžit jakoukoliv jinou jednou třídou.
* Struktura souborů v SASS pak podle rozdělení do bloků tzn. např. `modules/_player.scss`, u velkých projektů i projektů i pro elementy např. `modules/player/_control.scss`. Cílem je vyhnout se velkým diffům ve zbytečně velkých souborech při commitování.
* Sublime Text packages pro BEM: All Autocomplete, Syntax highlight SASS, SublimeGit, GitGutter.

## [Robin Pokorný](https://x.com/robinpokorny) – Organizace kódu v týmu

<p class="rwd-media"><iframe width="736" height="414" src="//www.youtube.com/embed/Eda7dYUJXd0?rel=0" frameborder="0" allowfullscreen></iframe></p>

* Robin se jako frontendista podílí na redesignu Jobs.cz.
* Jde o organizaci kódu v týmu, ale i o organizaci větších projektů.
* Specifika větších projektů: udržuje se delší dobu, navíc nekontinuelně (dlouho se nic nedělá, a najednou je požadavek něco změnit), přicházejí a odcházejí lidé.
* Styleguide (nebo pattern library) – centrální místo kam se ukládají komponenty a dokumentace jejich použití. Viz třeba Bootstrap dokumentace. V Jobs.cz mají Jobs UI: [http://www.jobs.cz/ui/](http://www.jobs.cz/ui/)
* Podmínky dobré styleguide:
    * Dokumentace se  zapisuje přímo do kódu.
    * Musí se automaticky generovat. 
    * Předchozí dva body se musí realizovat jednoduše, bez technologických složitostí.
    * Musí být živá v prohlížeči. Můžu si ji otestovat na smartphonu atd.
    * Musí být verzovaná, abychom věděli která část aplikace používá kterou verzi. Viz semversion.
* S výslednou styleguide nepracuje jen frontenďák, ale i produkťák nebo UXák.
* Příklad dobré styleguide – Mailchimp Pattern Library.
* Komponenta není jen o CSSku, obsahuje i Javascript a vlastní obrázky. Například komponenta Dropdown bude v adresáři `dropdown/` a v ní `js`, `less` soubor i adresář `images/`.
* Ve zdrojovém less souboru komponenty je na začátku Markdown text, ze kterého se generuje dokumentace včetně ukázetkkódu. Robin používá KSS, další jsou DSS a StyleDocco.
* Zabere hrozně moc času dokumentaci popsat. V LMC to berou jako investici, která se jim jednou vrátí při vytváření dalších sekcí.
* Hodí se pro každý větší projekt. A nikdy nevíte, jestli váš projekt bude velký nebo ne. Ať má každý projekt svoji UI knihovnu.

Pokud vás zajímá i to ostatní o čem jsme si povídali, pusťte si [diskuzi](https://soundcloud.com/frontendisti/diskuze-organizace-kodu), která následovala po přednáškách.

## Sledujte Frontendisti.cz

Veřejně jsme vidět hlavně na Srazy.info. Tam se rovnou můžete přihlásit k příštímu srazu. Tentokrát o [UX v Praze](http://srazy.info/frontendisti/4539).

Sledujte novinky na [X](https://x.com/Frontendisti), [Facebooku](https://www.facebook.com/frontendisti) nebo [Google+](https://plus.google.com/110936223026742005054/posts). Máme i [Youtube kanál](https://www.youtube.com/channel/UCxs7KDC0LFOezVujLG_leRw).

Diskutujte o frontend tématech ve [Facebook skupině](https://www.facebook.com/groups/frontendisti/). Pište a čtěte nabídky práce ve [Frontendisti práce](https://www.facebook.com/groups/frontendistiprace/).