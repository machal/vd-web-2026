---
postID: 63
postTitle: 'BEM CSS: Jak se vyhnout častým chybám?'
postUrlId: bem-chyby
postDateTime: 2016-07-03
excerpt: 'David Berner prostřednictvím bezva článku na Smashing Magazine bojuje s častými problémy při používání BEM metodiky.'
postStatus: Published
authorID: 1
sectionID: 1
category: ['organizace-css']
no_ads: false
og_title: 'BEM CSS: Jak se vyhnout častým chybám?'
og_description: 'David Berner prostřednictvím bezva článku na Smashing Magazine bojuje s častými problémy při používání BEM metodiky.'
og_type: article
---
# BEM CSS: Jak se vyhnout častým chybám?

David Berner prostřednictvím bezva článku [na Smashing Magazine](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/) bojuje s častými problémy při používání [BEM metodiky](http://www.vzhurudolu.cz/prirucka/bem). Dovolil jsem si některé z nich ořezat na kost a doplnit svými komentáři. 

## V CSS nekopírujte DOM strukturu

Takhle ne:

```html
<div class="card">
  <div class="card__header">
    <h2 class="card__header__title">
      …
    </h2>
  </div>
</div>
```

Takhle ano:

```html
<div class="card">
  <div class="card__header">
    <h2 class="card__title">
      …
    </h2>
  </div>
</div>
```

Proč? Zanořování elementů i v selektorech by se vám totiž dříve nebo později vymklo z rukou a selektory by se staly nesnesitelně dlouhými. Respektování struktury DOMu nemá v CSS žádné mě známé výhody.

## Ampersandy jsou koření, šetřete s nimi

Takhle ne:

```sass
.card {
  &__header { … }
  &__title { … }
}
```

Takhle ano:

```sass
.card__header { … }
.card__title { … }
```

Na příkladu to není zase tak moc vidět, ale když si představíte opravdu dlouhý seznam deklarací zanořených do `.card`, snadno někde uprostřed ztratíte jistotu co vlastně onen ampersand (`&`) představuje. 

<!-- AdSnippet -->

Připadá vám hloupě psát `.card` pořád dokola? Rozumný editor vám s otravným psaním pomůže, od toho tu je.

Protože, přátelé, kód nepíšeme proto, aby se nám dobře *psal*, ale dobře *četl*.

## Křížení nechte rostlinářům, u komponent jej nezkoušejte

Takhle ne:

```html
<div class="card">
  <button class="button card__button">
    …
  </button>
</div>
```

Takhle ano:

```html
<div class="card">
  <button class="button button--small">
    …
  </button>
</div>
```

Pomocí `.card__button` totiž modifikujeme blok `.button`  uvnitř bloku `.card`. Nemáme na očích původní kód a může se nám snadno stát, že aplikace v HTML selže například při nedodržení pořadí tříd.

Důsledné používání BEMu ale není bez odpovídajícího [systému na straně designu](/prirucka/pattern-lab#designove-systemy) možné. Pokud bych tedy psal kód stránky, kde systém designu chybí, zákaz křížení a další pokročilá „dogmata“ psaní komponent bych nedodržoval. 

## Závináčové přípony pro aplikaci různého rozhraní na stejný obsah

Stalo se vám, že na malém displeji chcete komponentu zobrazit jako seznam položek a na velkém jako karusel? Uděláte to snadno pomocí responzivních zavináčových přípon:

```html
<ul class="
  c-image-list@small-screen 
  c-carousel@large-screen
">
```

Tohle je [další z příspěvků](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) Harryho Robertse, které jsem neznal a za které děkuji. 

## Používat předpony podle typu komponenty? Jen když je to velké

David Berner  spolu [s Harry Robertsem](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) navrhuje používání předpon – `c-` pro komponety, `l-` pro layout, `h-` pro helpery a další. Znáte to už z metodiky [SMACSS](http://www.vzhurudolu.cz/prirucka/smacss).

<!-- AdSnippet -->

Fajn. Ale já bych zde byl opatrný. Přidává to další úroveň složitosti. V BEM názvosloví se staráte o blok, element a modifikátor. K tomu si připočtěte další sadu kategorií: komponenta, layoutový modul, helper… Juniorního kodéra v tom snadno zamotáte. Můj názor zní: předpony přidávejte, až když je kód projektu tak složitý, že to bez nich nelze.

## Globální stav nebo modifikátor komponent? Za mě nejlépe data-atributy

```html
<!-- Globální stav: -->
<div class="c-card is-active">
  …
</div>

<!-- BEM modifikátor: -->
<div class="c-card c-card--is-active">
  …
</div>
```

První variantu David Berner obhajuje jako možný doplněk k BEM modifikátorům, které jsou obecně správnější. Globální stav mu připadá dobrý hlavně kvůli zjednodušení javascriptového kódu. Pro jeden typ chování totiž pak máte jen jeden kousek JS kódu. Může být, mě ale vždy připadalo lepší pro chování a vazbu mezi CSS a Javascriptem používat data-atributy.