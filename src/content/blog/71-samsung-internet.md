---
postID: 71
postTitle: 'Prohlížeč Samsung Internet a moje pokažené statistiky'
postUrlId: samsung-internet
postDateTime: '2016-10-12 00:00:00'
excerpt: 'V průvodci světem prohlížečů mám miminálně jednu chybu. Muvím o „mobilních Chrome“, ale to jsem jen naletěl obvyklé chybě měřičů návštěvnosti.'
postStatus: Published
authorID: 0
sectionID: 1
category:
  - rwd
  - responzivni-design
og_title: 'Prohlížeč Samsung Internet a moje pokažené statistiky'
og_description: 'V průvodci světem prohlížečů mám miminálně jednu chybu. Muvím o „mobilních Chrome“, ale to jsem jen naletěl obvyklé chybě měřičů návštěvnosti.'
og_type: article
---

# Prohlížeč Samsung Internet a moje pokažené statistiky

V [průvodci světem prohlížečů](/prirucka/prohlizece) mám minimálně jednu chybu. Píšu v něm o „mobilních Chrome“, ale to jsem jen naletěl obvyklé chybě měřičů návštěvnosti.  

Můj zdroj, Rankings.cz, totiž  (podobně jako další zdroje) jako „Chrome“ zřejmě označuje skupinu prohlížečů postavených na jádře Chromium. Sedmina tohoto „mobilního Chrome“ může být [Samsung Internet](http://developer.samsung.com/technical-doc/view.do?v=T000000202), nový prohlížeč od největšího výrobce mobilních zařízení na světě.

Píše to můj oblíbený vyvraceč bludů [Peter Paul Koch na Smashing Magazine](https://www.smashingmagazine.com/2016/10/whats-the-deal-with-the-samsung-internet-browser/).

## Chrome, Chromium… není to jedno?

Raději si nejdřív ujasněme pojmy:

- [Blink](https://en.wikipedia.org/wiki/Blink_(web_engine)) je renderovací jádro prohlížeče. (Pokud neznáte, pak vám asi něco říká WebKit, ze kterého Blink vyšel.)
- [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) je open source prohlížeč využívající renderovací jádro Blink.
- [Google Chrome](https://en.wikipedia.org/wiki/Google_Chrome) je to co určitě znáte – konkrétní prohlížeč od konkrétní firmy postavený na projektu Chromium.
- [Samsung Internet](http://developer.samsung.com/internet) je relativně nový prohlížeč od Samsungu postavený na projektu Chromium.

## Problém číslo jedna: analytické nástroje měří Chromium jako Chrome

Rankings.cz, ze kterého obvykle vycházím, žádný [Samsung Internet nezná](http://rankings.cz/en/rankings/web-browsers-details.html). Neobjevuje se [ani v Google Analytics](/prirucka/google-analytics-vyvojari).

## Problém číslo dva: nemají zanedbatelný podíl

Samsung prodává nejvíc zařízení i v Česku, takže s ním trošku počítat musíme, že? [Statcounter](http://gs.statcounter.com/#mobile_browser-ww-monthly-201510-201609) jako jediný jejich prohlížeč umí změřit. Celosvětově je asi na 15 procentech všech Chromií. U nás by to znamenalo: **podíl na trhu kolem dvou procent** ze všech prohlížečů.

## Problém číslo tři: není to totožný prohlížeč

Že by Samsung jen udělal kopii Chrome? Těžko. V prvé řadě to nejde, protože Chrome si Chromium upravuje a jediné co Samsung může „kopírovat“ tedy je onen open source projekt Chromium. 

Samsung je velký hráč a tak bude dělat prohlížeč, který podporuje jeho zájmy. Z pohledu uživatele tam prý – narozdíl od Chrome – mají podporu pluginů. (Pokud můžete potvrdit, zmiňte se do komentářů, prosím. Je to výchozí prohlížeč na Galaxy S4 a novějších zařízení.)

Z pohledu podpory technologií je **mezi Chrome a Samsung Internet řada rozdílů**. Samsung třeba podporuje SVG fonty, Chrome ne. U `pointer-events` je to zase naopak. [Podívejte se CanIUse](http://caniuse.com/#compare=chrome+55,samsung+4).

## Problém číslo čtyři: Samsung Internet není jediný

Jak [uvádí Peter Paul Koch](https://www.smashingmagazine.com/2016/10/whats-the-deal-with-the-samsung-internet-browser/), mobilních prohlížečů postavených na Chromiu je více: něco má LG, něco HTC… Ale ty nebudou mít tak silné zastoupení jako prohlížeč od Samsungu. 

Více o prohlížeči Samsung Internet:

- [Homepage](http://developer.samsung.com/internet)
- [Twitter](https://twitter.com/sbrowserdevrel)
- [Kanál na Medium](https://medium.com/samsung-internet-dev)
- [Google Play](https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser&hl=cs)

Takže — pro některé z nás se tady náhle vyloupl nový prohlížeč. ;) Odhad dvouprocentního podílu pro Česko zkusím časem upřesnit. Pro vývojáře to znamená další prohlížeč k testování. Pokud máte ve firmě Samsung zařízení, pravděpodobně už to děláte. Jen ho možná – podobně jako já – považujete za už vymírající výchozí Android prohlížeč. V BrowserStacku je prohlížeč samozřejmě přítomný, jen se nespouští automaticky.