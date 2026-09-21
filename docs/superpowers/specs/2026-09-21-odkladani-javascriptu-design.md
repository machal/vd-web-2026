# Design: „Odkládání JavaScriptu není optimalizace, ale přesouvání problému“

Datum: 2026-09-21
Branch: `blog/267-odkladani-javascriptu`
Stav: research ověřený, čeká na rozhodnutí o délce (viz Otevřená otázka)

## Cíl

Republikovat sekci [„Odkládání JavaScriptu není optimalizace, ale přesouvání problému“](https://pagespeed.one/blog/lighthouse-score-hacking#deferring-javascript)
z článku o hackování Lighthouse skóre na vzhurudolu.cz jako samostatný blogový článek — a rozšířit ji o konkrétní
pluginy, které tuhle funkci nabízejí.

Čtyři požadavky zadavatele:

1. Nový pohled na téma na VD.cz (samostatný článek, ne jen odkaz).
2. Zpětný odkaz na článek na PageSpeed.ONE.
3. Potenciál na sociálních sítích.
4. Víc detailů — konkrétní WordPress pluginy a známé „one-click“ optimalizátory.

Anglická verze pro michalek.blog přijde v samostatné session (rozhodnutí zadavatele), ne teď.

## Rozhodnutí

| Otázka | Rozhodnutí |
|--------|-----------|
| Umístění | Blog VD.cz, `postID: 267` |
| Soubor | `apps/vzhurudolu/src/content/blog/267-odkladani-javascriptu.md` |
| Titulek | „Odkládání JavaScriptu není optimalizace, ale přesouvání problému“ (autorův, z PS.ONE) |
| Délka | **otevřeno** — původně 600–900 slov, research unesl víc (viz níže) |
| Vztah k originálu | Republikace sekce (adaptovaná formulace) + nová část o pluginech |
| Záběr pluginů | WordPress + známé one-click optimalizátory; ne e-shop platformy |
| Rozšíření nad originál | Tabulka pluginů, odstavec „kdy je odkládání v pořádku“, „jak to poznat“ |
| OG obrázek | Adaptace ilustrace `defer-all-js.webp` z PS.ONE na 1200×630 — **hotovo** |
| EN verze | Později, samostatně |
| Sociální sítě | Bez draftů příspěvků; sdílitelnost nese titulek + tabulka |

## Otevřená otázka: délka

Research přinesl podstatně silnější materiál, než s jakým design počítal — zejména vyjádření Barryho Pollarda
z Google Chrome, sebeusvědčující formulace v dokumentaci WP Rocket a zjištění, že LiteSpeed Cache má tuhle
funkci ve výchozím stavu zapnutou na 7 milionech instalací. Do 600–900 slov se to vejde jen za cenu vypuštění
citací, které článek dělají.

Dvě varianty ke rozhodnutí:

- **A) Držet 600–900 slov.** Tabulka + rizika, citace jen jedna (Pollard). Vypustit: WP Rocket „Is that
  cheating?“, LiteSpeed default-on, čísla 46 → 86, sekci „co do téhle skupiny nepatří“.
- **B) Rozšířit na 1100–1300 slov.** Vejde se Pollard, sebeusvědčení WP Rocket, LiteSpeed default-on i
  vymezení vůči plain `defer`. Stále čtivé na jedno sezení, pořád kratší než originál na PS.ONE.

Doporučení: **B**. Materiál typu „výrobce to sám přiznává v dokumentaci“ je přesně to, co táhne na sociálních
sítích, a bez citace to nefunguje.

## Struktura článku

1. **Perex + úvod** — zatržítko, které za pět sekund práce zvedne Lighthouse skóre o desítky bodů.
   Hned v úvodu atribuce + zpětný odkaz na PS.ONE článek (první obrazovka, kde se na odkaz reálně klikne).
2. **Proč to na Lighthouse funguje** `{#proc-to-funguje}` — Lighthouse nescrolluje, nekliká, nedotkne se
   obrazovky. Odložený JS v testu nikdy neproběhne, z měření zmizí TBT (váha 30 %), zlepší se LCP.
   Odkazy: `metrika-tbt.md`, `metrika-lcp.md`, `metrika-lps.md`.
   Citace Barryho Pollarda (Google Chrome) — viz Citace níže.
3. **Které pluginy to nabízejí** `{#pluginy}` — hlavní nová hodnota, ověřená tabulka (viz níže).
   Figure se screenshotem dokumentace WP Rocket.
4. **Výrobci to vědí** `{#vyrobci}` *(jen ve variantě B)* — WP Rocket, LiteSpeed a Autoptimize popisují dopad
   na testy ve vlastní dokumentaci. Tři citace, každá s odkazem na zdroj.
5. **Čtyři rizika** `{#rizika}` — INP, CLS, funkčnost měření, znehodnocení Lighthouse skóre.
   Odkazy: `metrika-inp.md`, `metrika-cls.md`, `metrika-lps.md`.
6. **Co do téhle skupiny nepatří** `{#neplet-si}` *(jen ve variantě B)* — plain `defer` není odkládání na
   interakci. Konkrétně: Breeze, Jetpack Boost, SiteGround Speed Optimizer, Cloudflare Rocket Loader.
   Zabrání nejčastější chybě čtenáře a je to ověřené ze zdrojového kódu.
7. **Kdy je odkládání v pořádku** `{#kdy-ano}` — rozdíl mezi odložením *jedné konkrétní* třetí strany
   (facade pattern) a odložením *veškerého* JS. Odkazy: `third-party.md`, `lazy-loading.md`.
   Pointa: Lighthouse má audit, který facade pattern **doporučuje**, a zároveň nemá nic, co by odhalilo
   plošné odkládání.
8. **Jak to poznat na svém webu** `{#jak-poznat}` — markery v HTML (viz níže), test v Network panelu bez
   doteku myši, porovnání s daty od uživatelů.
9. **Závěr** — rozhodnout, co se má načíst kdy a v jakém pořadí, je inženýrská práce; jedno zatržítko ji
   nezastane. Druhý odkaz na PS.ONE článek kvůli pátrání okolo Website Speedy.
10. **Výzva** — `<small>*…*</small>`, odkaz na sociální sítě doplnit až po publikaci (URL zatím není).

## Ověřená tabulka pluginů

Sloupce: plugin / nastavení / výchozí stav / varuje dokumentace před riziky?

| Plugin | Nastavení | Výchozí stav | Varování v dokumentaci |
|--------|-----------|--------------|------------------------|
| WP Rocket | „Delay JavaScript Execution“ | vypnuto, ale od verze 3.9 s prázdným seznamem výjimek = odloží vše | na stránce funkce žádné; dopad na INP zmiňuje jen na odlehlé stránce |
| LiteSpeed Cache | „Guest Optimization“ (+ „Load JS Deferred → Delayed“) | **Guest Optimization zapnuto ve výchozím stavu** | ano, otevřeně — přiznává i maskování problémů |
| WP-Optimize | „Delay JS“ | vypnuto | jen o funkčnosti webu; navíc stále obsahuje samostatné „Exclude scripts from page speed tests“ |
| Perfmatters | „Delay JavaScript“ → „Delay all scripts“ | vypnuto | ne; dokumentace naopak sama uvádí, že je to „for Google Lighthouse“ |
| NitroPack | „Delay loading of non-critical resources“ | **zapnuto v režimu Ludicrous** | jen o funkčnosti webu |
| WP Meteor | „Infinite Delay“ | vypnuto | ano — autor sám tuhle volbu nedoporučuje |
| Autoptimize Pro | „Delay JavaScript“ s timeoutem `0` | vypnuto | ano — autor to sám nazývá „a teeny bit shady“ |
| SpeedyCache | „Delay JS“ → „Delay All“ | vypnuto | ano — jediný varuje před dopadem na analytiku |

Zdroje na řádek se doplní jako odkazy v textu, ne do tabulky (tabulka musí zůstat čitelná na mobilu).

Instalační základna pro kontext v textu: LiteSpeed Cache 7 mil.+, WP-Optimize 1 mil.+, SpeedyCache 600 tis.+,
NitroPack 90 tis.+ (WordPress.org, 2026-09-21). WP Rocket, Perfmatters, FlyingPress a Autoptimize Pro jsou
placené mimo WordPress.org, čísla nejsou veřejná.

**Timeout jako ukazatel poctivosti** — dobrý rámec pro odstavec: produkty, které vynucují timeout (Flying
Scripts, WP Meteor v režimu 1 s / 2 s), skript nakonec spustí i bez interakce. Produkty, které timeout nemají
nebo umožňují `0`, čekají navždy — a právě ty Lighthouse neuvidí.

## Citace (ověřené, s odkazy)

1. **Barry Pollard, Google Chrome** — nejsilnější vyjádření z Googlu, mimochodem se v témže příspěvku dovolává
   Goodhartova zákona stejně jako náš článek na PS.ONE:
   > „A common pattern I see is to delay ALL JS until the user interacts with a page: Great for Lighthouse
   > scores! Often terrible for users.“

   Citovat přes [Search Engine Journal](https://www.searchenginejournal.com/why-google-lighthouse-doesnt-include-inp-a-core-web-vital/528734/)
   (originál na LinkedInu je za přihlášením).

2. **WP Rocket, vlastní blog k verzi 3.9** — sebeusvědčení:
   > „This means the JavaScript files won't be detected by Lighthouse… Is that cheating? Not really…“

   Zdroj: [wp-rocket.me/blog/wp-rocket-3-9/](https://wp-rocket.me/blog/wp-rocket-3-9/)

3. **LiteSpeed, vlastní dokumentace** — přiznává skóre i maskování:
   > „This setting can greatly improve page speed scores… Additionally, Guest Optimization can 'mask' any real
   > problems your site may have.“

   Zdroj: [docs.litespeedtech.com/lscache/lscwp/general/](https://docs.litespeedtech.com/lscache/lscwp/general/)

4. **Frank Goossens, autor Autoptimize** — o timeoutu `0`:
   > „you are hiding those assets for performance tests“

   Zdroj: [blog.futtta.be, 14. 3. 2023](https://blog.futtta.be/2023/03/14/aopro-1-2-delay-js-css-html-as-long-as-you-want/)

Případně do závorky: WP Rocket na vlastním webu s touto funkcí vykázal posun mobilního skóre **46 → 86**
([wp-rocket.me/blog/wp-rocket-3-7/](https://wp-rocket.me/blog/wp-rocket-3-7/)), a ve vlastním testu k INP
uvádí, že se INP **nezměnilo**.

Rules: v citacích české uvozovky, blockquote + prázdný řádek + `– *<cite>[Jméno](url)</cite>*`.

## Markery pro sekci „jak to poznat“

Ověřené ze zdrojového kódu pluginů. Jednořádkový test do článku:

```bash
curl -s https://example.com/ | grep -oE 'rocketlazyloadscript|pmdelayedscript|litespeed/javascript|javascript/blocked'
```

| Plugin | Marker v HTML |
|--------|---------------|
| WP Rocket | `type="text/rocketlazyloadscript"`, `data-rocket-src` |
| Perfmatters | `type="pmdelayedscript"` |
| LiteSpeed Cache | `type="litespeed/javascript"` |
| WP Meteor | `type="javascript/blocked"` |
| WP-Optimize | `type="text/plain"` + `data-src` |
| Flying Scripts | `data-type="lazy"` |

Plus dva testy bez čtení kódu: (1) načíst stránku s otevřeným Network panelem a nehýbat myší — pak myší hýbnout
a sledovat dávku požadavků na JS; (2) porovnat lokální Lighthouse v anonymním okně s PageSpeed Insights.

## Front matter

```yaml
postID: 267
postTitle: 'Odkládání JavaScriptu není optimalizace, ale přesouvání problému'
postUrlId: odkladani-javascriptu
postDateTime: 2026-09-21
excerpt: '<2–3 věty, 220–400 znaků>'
postStatus: Published
category:
  - rychlost-nacitani
  - javascript
  - wordpress
include_rss: true
category_highlight: true
og_title: '…'
og_description: '<sladit s excerpt>'
og_image: /assets/img/content/dest/odkladani-javascriptu-og.webp
og_type: article
```

`pairId` se doplní až při EN adaptaci.

## Obrázky — hotovo

| Účel | Cíl | Rozměry |
|------|-----|---------|
| OG | `src/assets/img/content/odkladani-javascriptu-og.jpg` | 1200×630 |
| Ilustrace v článku | `src/assets/img/content/odkladani-javascriptu.jpg` | 1600×903 |
| Screenshot dokumentace WP Rocket | `src/assets/img/content/wp-rocket-delay-js.jpg` | 1600×898 |

Otevřená otázka: ilustrace má **anglické** popisky. Zadavatel zvážil, případně předěláme do češtiny.

## Zpětné odkazy do existujících článků

Drafty ke schválení, ne rovnou zápis. Všechna čtyři místa už se tématu dotýkají:

| Soubor | Místo | Důvod |
|--------|-------|-------|
| `prirucka/metrika-inp.md` | „Obecná rada? Optimalizujte JavaScript“ | Text už doporučuje „odkládání stahování a spouštění kódu“ — chybí varování, že plošná verze škodí |
| `prirucka/metrika-tbt.md` | „Jak TBT optimalizovat?“ | Odložení všeho TBT schová, neopraví |
| `prirucka/third-party.md` | seznam lazy loadingu (odrážky *Klik*, *Posun stránky*) | Legitimní varianta techniky — vymezit proti plošné |
| `prirucka/metrika-lps.md` | „Zavádějící metrika“ | Sekce už argumentuje, že skóre není cíl |

## Co článek netvrdí

- Že odkládání JS na interakci je vždy podvod. Facade pattern u třetích stran je legitimní a Google ho sám
  doporučuje.
- Že konkrétní plugin detekuje Lighthouse. To je jiné obvinění (Website Speedy, WP-Optimize) a patří do článku
  na PS.ONE, ne sem.
- **Že máme naměřené zhoršení INP.** Research to potvrdil jako mechanismus (Pollard, dokumentace WP Rocket),
  ale veřejná field studie neexistuje. V článku formulovat jako riziko a mechanismus, ne jako změřený dopad.
  Tohle je nejdůležitější omezení celého textu.
- Kvantifikované dopady napříč projekty. Data máme z jednoho klientského webu, viz metodika v PS.ONE článku.

## Rizika a jak je řešíme

| Riziko | Řešení |
|--------|--------|
| Duplicitní obsah PS.ONE vs. VD.cz | Republikovanou část přeformulovat, ne kopírovat; atribuce s odkazem v úvodu |
| Anglické popisky v ilustraci | Nabídnout zadavateli českou variantu; jinak ponechat |
| Neověřená tvrzení o pluginech | Do tabulky jen řádky s primárním zdrojem. **Vynechat** FlyingPress, WP Fastest Cache a Swift Performance u markerů (closed-source, neověřeno) |
| Záměna `defer` s odkládáním na interakci | Samostatná sekce „co do téhle skupiny nepatří“ |
| Právní/reputační dopad jmenování výrobců | Držet se citací z veřejné dokumentace, žádné spekulace o motivaci |
| Váha TBT 25 % → 30 % v Lighthouse 8 | Tvrzení neověřené, **v článku nepoužívat**; použít jen aktuální váhu 30 % z `metrika-lps.md` |

## Validace

```bash
npm run check-frontmatter
npm run build -w @vd/vzhurudolu
```

Plus vizuální kontrola článku na `http://localhost:4321` a kontrola OG obrázku.

## Materiál, který se do tohoto článku nevejde (nápady na jinam)

- **Shoptet:** žádný addon s touhle funkcí se nenašel, a má to strukturální důvod — Shoptet má vlastní
  oficiální místa pro vkládání HTML, takže neexistuje poptávka po pluginu, který to obchází. Technika bují
  hlavně na platformách bez oficiálního vkládání kódu. Na samostatný český článek nebo odstavec jinde.
- **Shopify:** našel cheating u zhruba 15 % rozšíření slibujících optimalizaci na jedno kliknutí a napsal
  o tom vlastní výbornou stránku. Materiál na samostatný text.
- **Adaptační cyklus:** Google zavře jednu cestu detekce Lighthouse (user agent, client hints), výrobci najdou
  jinou (`window.__nativePromise`). Doloženo issues v repozitáři Lighthouse. Materiál na samostatný text.
- **HTTP Archive:** prevalence téhle techniky nikdy nikdo nezměřil. Dotaz nad HTTP Archive by z Vzhůru dolů
  udělal referenční zdroj k tématu. Nápad na projekt, ne na tenhle článek.
