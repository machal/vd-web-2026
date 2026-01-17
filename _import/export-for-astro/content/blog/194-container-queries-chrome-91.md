---
postID: 194
postTitle: 'Container Queries jsou teď experimentálně v Chrome Canary'
postUrlId: container-queries-chrome-91
postDateTime: 2021-04-02
excerpt: 'Jde o něco, co samozřejmě v CSS chceme a při vývoji webů opravdu hodně potřebujeme. Od možnosti to používat jsme ale ještě pořád daleko.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
no_ads: false
include_rss: true
category_highlight: false
og_title: 'Container Queries jsou teď experimentálně v Chrome Canary'
og_description: 'Jde o něco, co samozřejmě v CSS chceme a při vývoji webů opravdu hodně potřebujeme. Od možnosti to používat jsme ale ještě pořád daleko.'
og_type: article
---

# Container Queries jsou teď experimentálně v Chrome Canary

[Container Queries](https://www.vzhurudolu.cz/prirucka/element-queries) jsou něco jako [Media Queries](https://www.vzhurudolu.cz/prirucka/css3-media-queries), jen pro konkrétní komponenty, nikoliv pro celou stránku.

Jde o něco, co samozřejmě v CSS chceme a při vývoji webů opravdu hodně potřebujeme. Webdesign je totiž stále více o komponentách, nikoliv o stránkách.

<blockquote class="twitter-tweet"><p lang="cs" dir="ltr">Container Queries přistály v Chrome Canary. <br>Je fakt mazec, jak jde ten vývoj rychle.<a href="https://t.co/pLFKHnBs55">https://t.co/pLFKHnBs55</a></p>— Martin Michálek (@machal) <a href="https://twitter.com/machal/status/1377513564236357632?ref_src=twsrc%5Etfw">April 1, 2021</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Před lety to ale ještě nevypadalo dobře. Provázely to různé problémy a hlášení o „nemožné implementaci“. Napsal jsem o tom [podrobný článek na blog](https://www.vzhurudolu.cz/prirucka/element-queries) a prohlásil, že to asi nikdy nedostaneme. Jsem rád, že jsem se spletl.

Po letech vývoje do Chromia přichází experimentální implementace, která by toto dovolovala.

<!-- AdSnippet -->

Vezměme tuto krátkou ukázku:


```css  
/* (1) Container */  
main,
aside {
  contain: size;
}

.media-object {
  display: grid;
  gap: 1em;
}

/* (2) Container Query */
@container (max-width: 45em) {
  .media-object {
    grid-template: 'img content' auto / auto 1fr;
  }
}
```

Stručně vysvětlíme:

1. [Vlastnost `contain`](https://www.vzhurudolu.cz/prirucka/css-contain) s hodnotou `size` tvoří zapouzdří prvek do samostatné jednotky, která zde poslouží jako rodič pro container query.
2. Klíčové slovo `@container` je jako `@media`, jen necílí na šířku viewportu, ale šířku rodiče.

Jak to otestovat?

1. Potřebujete Chromium 91.0.4459.0 (nyní dostupné v [Chrome Canary](https://www.google.com/intl/cs/chrome/canary/)). 
2. Jděte do vlaječkového nastavení: `chrome://flags`.
3. Povolte možnost „Enable CSS Container Queries".

Demo:

* Bram.us: [https://cdpn.io/bramus/debug/LYxNpeE](https://cdpn.io/bramus/debug/LYxNpeE)
* Una Kravets: [https://codepen.io/una/pen/LYbvKpK?editors=1100](https://codepen.io/una/pen/LYbvKpK?editors=1100)

Více informací:

* [Bram.us: Container Queries are coming to Chromium!](https://www.bram.us/2020/11/05/container-queries-are-coming-to-chromium/)
* [Piccalil.li: Container Queries are actually coming](https://piccalil.li/blog/container-queries-are-actually-coming)

Jen prosím pozor, implementace je označena jako experimentální a zatím ani není potvrzená od CSS Working Group ze standardizační organizace W3C. Od možnosti takové věci používat jsme ještě pořád daleko. Ale vypadá to velice nadějně!

<!-- AdSnippet -->