---
postID: 213
postTitle: 'Novinky z Google I/O 2022 a proč prohlížeče najednou táhnou za jeden provaz?'
postUrlId: google-io-2022
postDateTime: 2022-05-18
excerpt: 'Vývojářskou konferenci Googlu po očku sleduji každý rok, ale tentokrát je nutné k ní i něco napsat.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
  - html
  - javascript
  - js
  - rychlost
  - prohlížeče
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Novinky z Google I/O 2022 a proč prohlížeče najednou táhnou za jeden provaz?'
og_description: 'Vývojářskou konferenci Googlu po očku sleduji každý rok, ale tentokrát je nutné k ní i něco napsat.'
og_type: article
---

# Novinky z Google I/O 2022 a proč prohlížeče najednou táhnou za jeden provaz?

Google na každoroční konferenci pro vývojáře mnohé oznámil a leccos ukázal. Akci jako celek nesleduji, ale během ní a po ní si ze záznamů a ohlasů na socsítích vyzobávám to, co mě nejvíc zajímá – frontend, a tedy HTML, CSS, performance a občas trochu JavaScript.

<link rel="stylesheet" href="/assets/css/modules-standalone/min/ad-snippet.min.css?1710496181" /><script> </script>
<aside role="complementary" class="ad-snippet ad-snippet--reverse" aria-labelledby="ad-snippet-ebook">
  <h2 id="ad-snippet-ebook" class="ad-snippet__heading sr-only">Reklama</h2>
<svg class="ad-snippet__scissors ad-snippet__scissors-top" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
  <a class="ad-snippet__container" href="/css-layout/">
    <div class="ad-snippet__image maxw-7em">
      <img src="/assets/img/content/handmade/ebooks/vdlayout/vdlayout-model-both__760.webp" alt="Kniha a e-book „CSS: moderní layout"" loading="lazy" width="1540" height="1270">
    </div>
    <div class="ad-snippet__text">
      <h3 class="ad-snippet__text-heading" style="color:#f89b1d">
        Kniha „CSS: moderní layout"
      </h3>
      <p class="ad-snippet__text-content">
        Floaty šly spát, ale takhle kniha ve vás probudí CSS kodéra.
        <span class="td-u">Více</span> →
      </p>
    </div>
  </a>
<svg class="ad-snippet__scissors ad-snippet__scissors-bottom" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
</aside>


Mám pocit, že letos to bylo docela velké. A hlavně se jedna podstatná věc změnila – prohlížeče si méně konkurují a více spolupracují. Alespoň z pohledu webového vývojáře.

## Proč na Vzhůru dolů píšu zrovna o letošním ročníku? {#proc}

Letos jsem se rozhodl, že se o ty novinky musím podělit i s vámi, čtenáři Vzhůru dolů. Jednak zde vnímám dluh, protože jsem se téhle konferenci zde ještě přímo nevěnoval. Ale ten bezprostřední impulz k sepsání byl jiný.

Nejspíš patřím mezi nejstarší frontendisty v Česku. Nás, starochy, spojuje obvykle jedna věc – povyk kolem nových technologií a kolem nových úžasných možností prohlížečů nás nechává relativně chladnými. Už jsme to zažili mnohokrát a to také u technologií, které se prostě neujaly.

<!-- AdSnippet -->

Zdá se mi ovšem, že Google I/O 2022 vcelku slušně vyhajpoval i relativně klidného Michálka. Novinek, zejména kolem CSS, je strašně moc a navíc bych řekl, že mnoho z nich může být onen pověstný „game-changer“. 

Vezměme třeba [Container Queries](https://www.vzhurudolu.cz/blog/194-container-queries-chrome-91), [selektor „rodiče“ :has](https://www.vzhurudolu.cz/prirucka/css-selektor-has) nebo [Cascade Layers (@layer)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). Už jen tato trojice pravděpodobně výrazně změní způsob, jak píšeme styly, pričemž zdaleka nejde o osamocené [novinky v CSS](https://web.dev/state-of-css-2022/).

Když jsem pátral po příčinách implementace tolika novinek a zároveň v tolika prohlížečích najednou, musel jsem skončit [u Rachel Andrew](https://www.youtube.com/watch?v=fGlhRnp5M-g).

[![Rachel Andrew: Learn how browsers are working together to make it easier to build for the web](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1652857967/vzhurudolu-blog/google-io-22-rachel_ryvavy.jpg)](https://www.youtube.com/watch?v=fGlhRnp5M-g)

## Tolik novinek a podpora v prohlížečích k tomu. Díky Compat 2021 a Interop 2022! {#diky}

Vývojáři prohlížečů totiž prakticky poprvé v historii spolupracují, aby vyřešili nekompatibility v podpoře webových technologiích. Loni byla výstupem [iniciativa Compat 2021](https://web.dev/compat2021/), která pomohla vyřešit nepříjemné rozdíly v implementaci [gridu](https://www.vzhurudolu.cz/prirucka/css-grid) a [flexboxu](https://www.vzhurudolu.cz/prirucka/css-flexbox) – a například také přidat použitelnost [vlastnosti `gap`](https://www.vzhurudolu.cz/prirucka/css-gap) ve flexboxu.

Letošní iniciativa [Interop 2022](https://web.dev/interop-2022/) má za úkol sladit priority ve vývoji a je domluveno, že prohlížeče co nejdříve naimplementují tyto vlastnosti:

* Color spaces & CSS color functions (funkce `color-mix()` - pro míchání barev známé ze [Sassu](https://www.vzhurudolu.cz/blog/15-css-preprocesory-4), `color-contrast()` - pro automatický výběr správně kontrastní barvy)
* Jednotky pro viewport (`dvh`, `lvh`, `svh` doplní známé jednotky `vh`, `vw`)
* Scrollování ([Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap), a vlastnosti jako `scroll-behavior` a `overscroll-behavior`)
* [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) (grid uvnitř gridu, který drží mřížku, mimochodem představuji [v knížce](https://www.vzhurudolu.cz/css-layout))
* [CSS Containment](https://www.vzhurudolu.cz/prirucka/css-contain) (vlastnost `contain`, nutné pro podporu Container Queries)

Už se naopak povedlo naimplementovat následující:

* [Cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) (@layer pro možnost změny vrstvení CSS kvůli specificitě)
* [`accent-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) (obarvujte formulářové prvky v CSS)
* [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) (nativní modál v HTML)
* [`<input type=datetime-local>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) (nativní nastavení data a času)
* [bfcache](https://web.dev/bfcache/) (back/forward cache, zde se čekalo na Chrome)
* Vlastnost [`size-adjust`](https://www.vzhurudolu.cz/prirucka/css-size-adjust) (upravte velikost fontu)

Je toho více a vypadá to opravdu zajímavě. Podstatné je, že skupina lidí sdružená v této iniciativě stanovuje prioritizaci vývoje technologií i na základě průzkumů mezi vývojáři (např. [State of CSS](https://stateofcss.com/) nebo [průzkumy MDN](https://insights.developer.mozilla.org/)), což je myslím docela silný důvod se takových dotazníkových šetření zúčastnit.

Průběžný vývoj můžete sledovat na webu [Interop 2022 Dashboard](https://wpt.fyi/interop-2022).

[![Interop 2022 Dashboard](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1652857967/vzhurudolu-blog/google-io-22-interop_omxylh.jpg)](https://wpt.fyi/interop-2022)

Mimochodem, aktuálně tam skóring vede Safari, což je už několikátý signál o velkých změnách ve vedení vývoje tohoto zaostávajícího prohlížeče.

Abych to shrnul – vývoj specifikací a jejich implementací v prohlížečích byl překotný po celou dobu zhruba poslední dekády.

<!-- AdSnippet -->

Změnilo se to, že výrobci prohlížečů synchronizují priority v implementaci. My vývojáři z toho budeme profitovat tak, že důležité novinky uvidíme v krátké době ve všech moderních prohlížečích.

## Co mě na Google I/O dále zaujalo? {#dale}

Tohle měl být stručný článek, takže si toho hodně budu muset nechat pro sebe. Nebo víte co? Ty další zajímavosti zde uvedu alespoň na jedné malé číslované hromádce.

* K rychlosti: [Video](https://www.youtube.com/watch?v=fWoI9DXmpdk), jak optimalizovat [metriku LCP](https://www.vzhurudolu.cz/prirucka/metrika-lcp).
* Nová metrika [Interaction to Next Paint (INP)](https://web.dev/inp/), která asi jednou nahradí [FID](https://www.vzhurudolu.cz/prirucka/metrika-fid). [Video](https://www.youtube.com/watch?v=Mizzbsvv8Os) o jejím vzniku.  
* Rozšířená realita v brýlích v kombinaci s překladačem umožňuje lidem povídat si spolu. [X](https://x.com/Google/status/1524464030668177409).
* Chrome na Androidu umožní při platbách kartou generovat jednorázové číslo. [X](https://x.com/wadearnold/status/1524450893860458497).
* [Page Transitions](https://github.com/WICG/shared-element-transitions/blob/main/developer-guide.md) (možná) umožní animovat přechody mezi stránkami, tohle je fakt cool! [Video](https://www.youtube.com/watch?v=JCJUPJ_zDQ4).

Google pak důležité novinky shrnuje [v článku](https://web.dev/googleio22-recap/).

Co zaujalo vás? Napište [na X](https://x.com/vzhurudolu/status/1526130210923487235) nebo [Facebook](https://www.facebook.com/VzhuruDolu/posts/pfbid0CqLFf14ppoNoF5pfkHcFui1pDXMokFwb5A2f4ziEsPF2EeXdh1iVefygsbycagPWl) Vzhůru dolů.