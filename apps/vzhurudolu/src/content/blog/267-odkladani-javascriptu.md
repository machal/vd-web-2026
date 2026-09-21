---
postID: 267
postTitle: 'Odkládání JavaScriptu není optimalizace, ale přesouvání problému'
postUrlId: odkladani-javascriptu
postDateTime: 2026-09-21
excerpt: 'Řada zrychlovacích pluginů nabízí zatržítko, které odloží spuštění veškerého JavaScriptu až na první interakci uživatele. Lighthouse skóre vyskočí o desítky bodů, ale pro návštěvníky se nezlepší nic.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost-nacitani
  - lighthouse
  - javascript
  - wordpress
include_rss: true
category_highlight: true
og_title: 'Odkládání JavaScriptu není optimalizace, ale přesouvání problému'
og_description: 'Řada zrychlovacích pluginů nabízí zatržítko, které odloží spuštění veškerého JavaScriptu až na první interakci uživatele. Lighthouse skóre vyskočí o desítky bodů, ale pro návštěvníky se nezlepší nic.'
og_image: /assets/img/content/dest/odkladani-javascriptu-og.webp
og_type: article
---

# Odkládání JavaScriptu není optimalizace, ale přesouvání problému

Tohle mě štve. Velké množství dnešních „zrychlovacích“ pluginů má jedno zatržítko, které umí zvednout Lighthouse skóre mrknutím oka.

Odloží totiž spuštění veškerého JavaScriptu až na první interakci uživatele, tedy na scroll, kliknutí nebo dotek.

Jenže na reálnou rychlost u reálných uživatelů to vliv nemá. Naopak to může rychlost zhoršit nebo poškodit analytiku.

Je to takový malý podvůdek, který celý obor pořád tiše akceptuje.

Tohle je rozšířená verze části článku [Falešně rychlé weby: jak se hackuje Lighthouse skóre](https://pagespeed.one/blog/lighthouse-score-hacking), který jsem vydal na blogu PageSpeed.ONE. Tady se dívám jen na tuhle jednu techniku a hlavně na konkrétní pluginy, které ji prodávají.

Proč odkládat načtení všech JS, když jsme v PageSpeed.ONE zoptimalizovali stovky webů a tuhle techniku jsme klientům nikdy nedoporučili?

## Proč je odložení JS špatně, ale na Lighthouse funguje tak spolehlivě? {#proc-funguje}

[Lighthouse](../prirucka/lighthouse.md) stránku načte a změří. Nescrolluje, nekliká, obrazovky se nedotkne.

Odložený JavaScript tedy v testu nikdy neproběhne. Z měření tím zmizí [Total Blocking Time](../prirucka/metrika-tbt.md), tedy metrika s největší váhou v Lighthouse skóre, celých třicet procent. Zlepší se také [rychlost načtení (LCP)](../prirucka/metrika-lcp.md), protože prohlížeč nemá co spouštět.

Skóre vyskočí nahoru, přitom se web nezrychlil. JavaScripty se přesunuly na později, často do nejhoršího možného momentu.

<figure>
<img src="/assets/img/content/dest/odkladani-javascriptu.webp" alt="Srovnání běžného načtení JavaScriptu a načtení odloženého až na interakci uživatele">
<figcaption markdown="1">
*Ilustrace odložení JavaScriptu. Skripty se načtou až po uživatelské interakci. Je to zlo.*
</figcaption>
</figure>

V tomhle názoru nejsem sám. Barry Pollard, který se rychlosti webu věnuje v Googlu, tenhle vzorec pojmenoval už dříve:

> „A common pattern I see is to delay ALL JS until the user interacts with a page: Great for Lighthouse scores! Often terrible for users.“
>
> – *<cite>[Barry Pollard, Google Chrome](https://www.searchenginejournal.com/why-google-lighthouse-doesnt-include-inp-a-core-web-vital/528734/)</cite>*

Proč je vlastně odložení všech JS špatné?

## Čtyři rizika odložení všech JavaScriptů {#rizika}

1. **Negativní vliv na interakce ([INP](../prirucka/metrika-inp.md)).** Uživatel dorazí na stránku, přečte si nadpis a klikne. V tu chvíli se spustí všechen odložený JavaScript, který se do té doby hromadil. Hlavní vlákno prohlížeče se zablokuje a první kliknutí uživatele čeká.
2. **Negativní vliv na posuny layoutu ([CLS](../prirucka/metrika-cls.md)).** Skripty, které dorenderovávají obsah, tedy karusely nebo personalizace, se spustí pozdě. V Lighthouse testu se přitom žádný posun nezměří, protože se ten kód nikdy nespustil. Skutečnou hodnotu CLS tak nevidíte ani vy.
3. **Funkčnost měření.** Analytika, souhlas s cookies, chat, A/B testy a měření konverzí se odkládají spolu se vším ostatním. Data vám pak nemusí sedět a nikdo neví proč.
4. **Znehodnocení Lighthouse skóre.** Lighthouse skóre sice není metrika rychlosti webu, ale pro diagnostiku změn je užitečné. Tím, že v něm není žádný JavaScript, měříte úplně něco jiného než svůj web.

U prvního bodu buďme přesní. Veřejná studie z reálného provozu, která by zhoršení INP po zapnutí téhle funkce změřila, neexistuje. Máme mechanismus, popsaný lidmi z Googlu, a přiznání od WP Rocket, že se INP v jejich vlastním testu nezlepšilo. To je silná indicie, ne změřený dopad.

Pojďme nebýt slušní a jmenovat konkrétní hříšníky.

## Hříšníci. Které pluginy tohle nabízejí? {#pluginy}

Prošli jsme nejznámější optimalizační pluginy pro WordPress a takzvané one-click optimalizátory. U každého jsme hledali tři věci: jak se nastavení jmenuje, jestli je zapnuté ve výchozím stavu a jestli dokumentace zmiňuje rizika.

<div class="rwd-scrollable f-6" markdown="1">

| Plugin | Nastavení | Výchozí stav | Varuje? |
|:-------|:----------|:-------------|:--------|
| [WP Rocket](https://docs.wp-rocket.me/article/1349-delay-JavaScript-execution) | Delay JavaScript Execution | vypnuto | ne |
| [LiteSpeed Cache](https://docs.litespeedtech.com/lscache/lscwp/general/) | Guest Optimization | **zapnuto** | ano |
| [WP-Optimize](https://teamupdraft.com/blog/wp-optimize-release-v4-0-0/) | Delay JS | vypnuto | částečně |
| [Perfmatters](https://perfmatters.io/docs/delay-javascript/) | Delay all scripts | vypnuto | ne |
| [NitroPack](https://nitropack.io/) | Delay non-critical resources | zapnuto v Ludicrous | částečně |
| [WP Meteor](https://wordpress.org/plugins/wp-meteor/) | Infinite Delay | vypnuto | ano |
| [Autoptimize Pro](https://autoptimize.com/pro/) | Delay JavaScript (timeout 0) | vypnuto | ano |
| [SpeedyCache](https://speedycache.com/docs/file-optimization/how-to-delay-js-until-user-interaction) | Delay All | vypnuto | ano |

</div>

Poslední sloupec potřebuje vysvětlení. „Částečně“ znamená, že dokumentace varuje jen před tím, že se vám může rozbít web, ale o dopadu na Lighthouse skóre a na uživatele nepíše nic.

Jediný plugin, SpeedyCache, upozorňuje i na to, že se vám rozbije analytika.

Dva řádky si pak zaslouží komentář.

**LiteSpeed Cache je ten největší případ.** Má přes sedm milionů instalací a funkci Guest Optimization zapnutou ve výchozím stavu. Navíc má [otevřenou chybu](https://github.com/litespeedtech/lscache_wp/issues/997), kdy Guest Optimization přebije to, co jste si nastavili u odkládání JavaScriptu, a ignoruje váš seznam výjimek. Autor hlášení dodává, že na hostingu Hostinger je tohle nastavení výchozí. Hodně majitelů webů tedy tuhle techniku používá, aniž by ji kdy zapnuli.

**WP Rocket změnil pravidla hry ve verzi 3.9.** Do té doby jste museli vyjmenovat skripty, které se mají odložit. Od 3.9 se odloží všechny a vy máte vyjmenovat výjimky. Pro nové uživatele zůstává seznam výjimek prázdný, takže jakmile funkci zapnete, odkládá se úplně vše. Buďme fér: riziko zhoršení INP WP Rocket zmiňuje, ale na jiné, mnohem méně navštěvované stránce nápovědy. Na stránce samotné funkce o něm není ani slovo.

Dobrým ukazatelem poctivosti je **timeout**. Pluginy, které vynucují časový limit, skript nakonec spustí i bez interakce, takže ho Lighthouse uvidí. Produkty, které timeout nemají nebo dovolí nastavit nulu, čekají na interakci navždy. A přesně ty v testu zmizí.

## Výrobci to vědí. Někteří to i napsali {#vyrobci}

Nemusíme spekulovat o tom, jestli výrobci vědí, co jejich funkce dělá s testy rychlosti. Někteří to mají černé na bílém ve vlastní dokumentaci.

WP Rocket při vydání verze 3.9 napsal:

> „This means the JavaScript files won't be detected by Lighthouse… Is that cheating? Not really if you consider the following points…“
>
> – *<cite>[Blog WP Rocket](https://wp-rocket.me/blog/wp-rocket-3-9/)</cite>*

LiteSpeed jde ve své dokumentaci ještě dál a přiznává i to, že funkce zamaskuje skutečné problémy webu:

> „This setting can greatly improve page speed scores… Additionally, Guest Optimization can 'mask' any real problems your site may have.“
>
> – *<cite>[Dokumentace LiteSpeed Cache](https://docs.litespeedtech.com/lscache/lscwp/general/)</cite>*

A Frank Goossens, autor pluginu Autoptimize, napsal o možnosti nastavit timeout na nulu tohle:

> „Setting the delay to 0 is a bit shady because at that point you are hiding those assets for performance tests.“
>
> – *<cite>[Frank Goossens](https://blog.futtta.be/2023/03/14/aopro-1-2-delay-js-css-html-as-long-as-you-want/)</cite>*

Za zmínku stojí i čísla, která WP Rocket zveřejnil při [vydání verze 3.7](https://wp-rocket.me/blog/wp-rocket-3-7/). Na vlastním webu s touhle funkcí vykázal posun mobilního skóre ze 46 na 86 bodů. Zároveň ve svém [vlastním testu k metrice INP](https://wp-rocket.me/google-core-web-vitals-wordpress/interaction-to-next-paint-insight/) uvádí, že se hodnota INP nezměnila.

<figure>
<img src="/assets/img/content/dest/wp-rocket-delay-js.webp" alt="Dokumentace WP Rocket k nastavení Delay JavaScript execution">
<figcaption markdown="1">
*WP Rocket píše jen o výhodách nastavení „Delay JS execution“, ale už nezmiňuje rizika.*
</figcaption>
</figure>

## Pozor, není každý hříšník, kdo jako hříšník vypadá {#neplette-si}

Slovo „delay“ se v pluginech používá dost volně a snadno se spálíte. Tyhle funkce odkládání na interakci **nedělají**, i když to tak podle názvu může vypadat:

- **Breeze** od Cloudways má nastavení „Delay All JavaScript“, ale ve skutečnosti přidává atribut `defer` a načítá skripty jako moduly.
- **Jetpack Boost** ve funkci „Defer Non-Essential JavaScript“ přesouvá značky `<script>` na konec dokumentu.
- **Speed Optimizer** od SiteGroundu u „Defer Render-blocking JavaScript“ přidává obyčejný `defer`.
- **Rocket Loader** od [Cloudflare](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) používá stejný trik s přepsáním atributu `type`, ale skripty vrací do hry po vykreslení stránky, ne až po interakci. Lighthouse je tedy spustí a změří.

Všechny čtyři mohou působit jiné problémy, třeba s pořadím načítání skriptů. Lighthouse skóre ale umělě nenadhodnocují.

## Kdy je odkládání naopak v pořádku {#kdy-ano}

Aby to bylo fér: odložit načtení kódu až na interakci uživatele je někdy úplně správné řešení. Rozdíl je v tom, jestli odkládáte *jednu konkrétní komponentu*, nebo *všechno*.

Typickým příkladem je takzvaný facade pattern. Místo vloženého videa z YouTube ukážete náhledový obrázek s tlačítkem a skutečný přehrávač načtete po kliknutí. Stejně se to dělá u chatovacích widgetů, map nebo komentářů. Víc o tom píšu v textech o [třetích stranách](../prirucka/third-party.md) a [lazy loadingu](../prirucka/lazy-loading.md).

Nejlépe je to vidět na tom, jak se k oběma technikám staví Lighthouse. Na facade pattern má samostatný audit, který ho doporučuje. Na plošné odložení veškerého JavaScriptu nemá vůbec nic.

## Jak špatné odkládání JS poznáte na svém webu? {#jak-poznat}

Pluginy po sobě v HTML nechávají celkem jasné stopy. Nejčastěji přepíšou atribut `type` u značky `<script>` na hodnotu, které prohlížeč nerozumí, a původní adresu skriptu schovají do vlastního atributu.

Co hledat ve zdrojovém kódu stránky:

- `type="text/rocketlazyloadscript"` a `data-rocket-src` – WP Rocket
- `type="litespeed/javascript"` – LiteSpeed Cache
- `type="pmdelayedscript"` – Perfmatters
- `type="javascript/blocked"` – WP Meteor
- `type="text/plain"` s atributem `data-src` – WP-Optimize

Pokud nechcete číst kód, načtěte stránku s otevřeným panelem Network a nehýbejte myší. Pak myší hýbněte. Když se v tu chvíli spustí dávka požadavků na JavaScript, máte jasno.

A nakonec se vždycky podívejte na [data od reálných uživatelů](../prirucka/web-vitals.md). Zelenější laboratorní skóre bez zlepšení uživatelských dat není výhra.

## Jedno zatržítko nezastane inženýrskou práci {#zaver}

Rozhodnout, co se má načíst kdy a v jakém pořadí, je inženýrská práce, která vyžaduje znalost konkrétního webu.

Jedno zatržítko, které odloží veškerý JavaScript, tuhle práci nezastane.

Jak to vypadá, když se tímhle směrem vydá celý obor, popisujeme v článku [Falešně rychlé weby: jak se hackuje Lighthouse skóre](https://pagespeed.one/blog/lighthouse-score-hacking).

Najdete tam i naše pátrání kolem pluginu Website Speedy, u kterého jsme po vypnutí viděli propad skóre z 95 na 60 bodů, aniž by se u uživatelů změřila jakákoliv změna rychlosti.

<small>*Narazili jste na tohle zatržítko u klienta nebo ve svém webu? Jak jste to řešili? Napište mi nebo pojďme o tom diskutovat na sociálních sítích.*</small>
