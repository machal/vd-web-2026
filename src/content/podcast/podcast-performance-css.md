---
postID: 238
postTitle: 'LIVE: Diskuze o performance a CSS (in JS)'
postUrlId: podcast-performance-css
postDateTime: 2024-01-22
excerpt: 'V první části naší předvánoční živé diskuze v pražských kancelářích Productboardu jsme si povídali o rychlosti a výkonu JavaScriptu a pak o moderních způsobech vkládání CSS do JS, přičemž nemůžeme minout Tailwind.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - javascript
  - rychlost
  - performance
  - css
  - tailwind
no_ads: true
include_rss: true
category_highlight: true
og_title: 'LIVE: Diskuze o performance a CSS (in JS)'
og_description: 'V první části naší předvánoční živé diskuze v pražských kancelářích Productboardu jsme si povídali o rychlosti a výkonu JavaScriptu a pak o moderních způsobech vkládání CSS do JS, přičemž nemůžeme minout Tailwind.'
og_type: article
---

# LIVE: Diskuze o performance a CSS (in JS)

V první části naší předvánoční živé diskuze v pražských kancelářích Productboardu jsme si povídali o rychlosti a výkonu JavaScriptu a pak o moderních způsobech vkládání CSS do JS, přičemž nemůžeme minout Tailwind.

Našimi milými hosty byli Riki Fridrich, Libor Vaněk a Petr Glaser.

Shodli jsme se na několika bodech, které zde míním. Ohledně performance:

* Problém performance je využívání klientského JavaScriptu na věci, kde není vůbec potřeba.
* Ačkoliv jsme si mnozí stále myslí, že SPA je cesta k lepší performance, data ukazují pravý opak.
* My vývojáři si musíme uvědomit, že sedíme u násobně rychlejších zařízení než lidé tam venku.
* Základ je začít performance rozumně měřit a řešit už během vývoje.

Ohledně CSS (in JS):

* CSS in JS je nadužívaný koncept, vhodný zejména pro velké projekty.
* Problém většiny CSS in JS řešení je závislost na JavaScriptu a runtime zpracování stylů. Proto jsou zajímavé systémy, které dokáží generovat styly staticky, jako StyleX.
* U Tailwindu velmi zaleží na způsobu vaší práce – např. pro živý design a prototypování v prohlížeči je to skvělé.

## Podcast {#podcast}

<div class="rwd-media">
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/3zB00HU4FKD0oanko6i7jV?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</div>

## Celá epizoda na videu {#video}

<div class="rwd-media">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ozHnQEO8UmM?si=D993QX9D4DcdkanU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Hosté {#hoste}

### Riki Fridrich

<div class="row f-6 mt-0 mb-3">
<div class="col w-25-xs" markdown="1">

![Riki Fridrich](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1678779102/vzhurudolu-podcast/riki-fridrich_vpcb8k.jpg)

</div>
<div class="col w-75-xs" markdown="1">

Riki  píše JavaScript ve firmě [Outreach](https://www.outreach.io/). [Učí ostatní](https://www.vzhurudolu.cz/lektori/riki-fridrich), jak psát Javascript. Přednáší na konferencích a setkáních. Většinou o Javascriptu. Riki je z Ládví.

[Web](https://fczbkk.com/) – [Twitter](https://twitter.com/fczbkk) – [Github](https://github.com/fczbkk) – [LinkedIn](https://www.linkedin.com/in/fczbkk/)

</div>
</div>

### Libor Vaněk

<div class="row f-6 mt-0 mb-3">
<div class="col w-25-xs" markdown="1">

![Libor Vaněk](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1686102028/vzhurudolu-podcast/libor-vanek_o7mraa.jpg)

</div>
<div class="col w-75-xs" markdown="1">

Head of Front-End Development v [CDN77](https://www.cdn77.com/), kde poskytují infrastrukturu pro globální internet. Fanoušek World Wide Web platformy a rozumného přístupu k web developmentu. Má rád všechny JS frameworky, ale ještě radši je podrobuje kritickému pohledu. Kdysi dělal meetupy Vue.js, dneska migruje většinu věcí z Nextu na SvelteKit. Ve volném čase dělá pro bono projekty, jako např. web a newsletter pro novináře [Davida Klimeše](https://davidklimes.cz/) a konzultuje architekturu a výkon webových aplikací.

[LinkedIn](https://www.linkedin.com/in/liborvanekcz/) – [Twitter](https://twitter.com/liborvanek)  

</div>
</div>

### Petr Glaser

<div class="row f-6 mt-0 mb-3">
<div class="col w-25-xs" markdown="1">

![Petr Glaser](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1690352813/vzhurudolu-podcast/petr-glaser_kconyf.jpg)

</div>
<div class="col w-75-xs" markdown="1">

Petr Glaser v rámci projektu [Nauč mě IT](https://naucme.it/) pomáhá lidem získat dovednosti a znalosti vhodné pro práci v IT. Říká o sobě, že je vývojář zapálený pro technologie a vzdělávání. Zaměřuje se na performance, kterou vnímá jako součást UX a přístupnosti. I díky tomu si oblíbil framework Qwik, o kterém je řeč v podcastu.

[LinkedIn](https://www.linkedin.com/in/petr-pegak-glaser/) – [Twitter](https://twitter.com/PetrPegakGlaser)

</div>
</div>

## O čem si povídáme? {#obsah}

* Představení hostů (0:55)
* Navazujeme na [diskuzi na FrontKonu](https://www.youtube.com/watch?v=OrpfxnWGoJY)(2:45)
* Statistická vsuvka a všechna naše výročí (3:20)
* První téma: performance (5:00)
* Aktuální stav JS, SPA, zacyklení mezi serverem a klientem, MPA (9:15)
* Jak z toho ven a nová [metrika INP](https://www.vzhurudolu.cz/prirucka/metrika-inp)(16:30)
* [Velký rozdíl](https://infrequently.org/2022/12/performance-baseline-2023/) mezi našim zařízeními a těmi mězi lidmi tam venku (21:30)
* Dotazy z publika (HTMX, AMP, jQuery…) (29:15)
* Druhé téma: CSS a zápis CSS v JS (32:30)
* Zase ten [Tailwind](https://www.vzhurudolu.cz/prirucka/tailwind-css) (navazujema na starší [podcast](https://www.vzhurudolu.cz/podcast/198-podcast-tailwind)) (34:30)
* Rikiho obhajoba sémantického webu (47:00)
* Otázky: utility v Bootstrapu, správné přístupy u různých projektů (55:00)
* [StyleX](https://stylexjs.com/docs/learn/) a obecně statický export CSS (58:00)  

[Přepis celého dílu](https://docs.google.com/document/d/1Zy8jHGmcpwEFOQuvKPWIMkItbKIFTdPJHYtN7mjmpDY/edit) (automatický a experimentální).

## Děkujeme za spolupráci {#diky}

Jiří Nečas, [Productboard](https://www.productboard.com/) (prostory, organizace) — Vladimír Příhoda, Productboard (technika, střih, záznamy) — Honza Michálek (Milíčovská postprodukce) — Johana Kratochvílová, [Signatura](https://signatura.cz/) (pohledy k podepisování).  

Přejeme vám příjemný poslech!

## Odebírejte podcast ze Vzhůru dolů {#odber}  

[Spotify](https://open.spotify.com/show/1G2kH2YrIwD9BABg4L7xGC) – [iTunes](https://itunes.apple.com/cz/podcast/vzhuru-dolu-podcast/id1176274658) – [Google Podcasty](https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy84MjMxMmViNC9wb2RjYXN0L3Jzcw?hl=cs) – [TuneIn](https://tunein.com/podcasts/Technology-News/Vzhuru-dolu-podcast-p1177693/) – [RSS podcastů](https://anchor.fm/s/82312eb4/podcast/rss)

Nápad? Chyba? Připomínka? Pochvala? Pište nám na e-mail [podcast@vzhurudolu.cz](mailto:podcast@vzhurudolu.cz) nebo kamkoliv jinam, hlavně, aby se to k nám dostalo.