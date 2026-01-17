---
postID: 53
postTitle: 'Reboot je další evoluční krok pro resetovací CSS'
postUrlId: reboot
postDateTime: 2016-03-10
excerpt: 'Bootstrap 4 přichází kromě jiného s náhradou Normalize.css. vlastním kódem pro sjednocení výchozích nastavení prohlížeče – Reboot.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - bootstrap
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Reboot je další evoluční krok pro resetovací CSS'
og_description: 'Bootstrap 4 přichází kromě jiného s náhradou Normalize.css. vlastním kódem pro sjednocení výchozích nastavení prohlížeče – Reboot.'
og_type: article
---

# Reboot je další evoluční krok pro resetovací CSS

[Bootstrap 4](/blog/39-bootstrap-4) přichází kromě jiného s náhradou Normalize.css. Vlastním kódem pro sjednocení výchozích nastavení prohlížeče – [Reboot](http://v4-alpha.getbootstrap.com/content/reboot/).

Od dob dnes už přežitého [Reset CSS](http://meyerweb.com/eric/tools/css/reset/) se mnohé změnilo. [Normalize.css](https://necolas.github.io/normalize.css/) přišlo s citlivějším přístupem – namísto nulování všech hodnot prostě jen sjednocuje zobrazování základních stylů v prohlížečích. V navazujícím kódu pak nastavujeme jen hodnoty, se kterými nesouhlasíme. 

## Reboot navazuje na Normalize a přidává dva koncepty, které velmi vítám

Mám radost, protože oba na projektech nepostavených na Bootstrapu používám:

1. Veškeré typografické míry jsou [v jednotkách `rem`](http://www.vzhurudolu.cz/prirucka/css3-jednotky#rem), aby se dalo rozhraní globálně zvětšovat a zmenšovat z jedné výchozí hodnoty.
2. Pro nastavení vertikálního odsazení se používá jen jeden směr vnějších okrajů – `margin-bottom`. Je pak samozřejmě snadnější na takový typografický rytmus navazovat ve vlastním kódu. 

Pokud chcete výsledky Rebootu i Normalize detailně studovat, vyrobil jsem pro ty účely dva „kódpeny“ – [Normalize.css](http://cdpn.io/e/qZZzPa) a [Reboot](http://cdpn.io/e/KzzjXE).

## Pár zajímavostí z kódu Rebootu

Co mě [v kódu](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss) dál zaujalo?

### Border Box všude

Počítání rozměrů elementů [včetně vnitřního okraje a rámečku](/prirucka/css3-box-sizing). Tady konečně i s deklarací pro pseudoelementy `::before` a `::after`. ([Celý kód](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss#L9))

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

### Viewport na Windows Phone

Už víte, že na zápis `@-ms-viewport` [nesmíte zapomenout](http://www.vzhurudolu.cz/prirucka/viewport-windows).  Co možná neznáte, je [Sass direktiva `@at-root`](http://www.sitepoint.com/sass-reference/at-root/), která vynucuje vložení pravidla do nejvyšší úrovně a tedy mimo všechna zanoření. ([Celý kód](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss#L33))

```sass
@at-root {
  @-ms-viewport { width: device-width; }
}
```

Nasazením tohoto pravidla se ale začnou v IE11 a Edge [trochu divně chovat](https://github.com/twbs/bootstrap/issues/18543) rolovátka. Cheat pro další úroveň boje s Microsoftem tedy vypadá takhle:

```css
body {
  -ms-overflow-style: scrollbar;
}
```

### Odstranění 300ms prodlevy mezi tapnutím a akcí

```css
a,
area,
button,
[role="button"],
input,
label,
select,
summary,
textarea {
  touch-action: manipulation;
}
```

Jak už jste si mohli [přečíst v newsletteru](http://us2.campaign-archive1.com/?u=d6be2f1899eba6a7651157403&id=7a824da1b7), vlastnost `touch-action` konečně [podporuje i mobilní Safari](http://caniuse.com/#search=touch-action), takže brzy nebude potřeba používat knihovnu FastClick. V Reboot je to už připraveno. ([Celý kód](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss#L241)) 

### Reset pro `min-width: min-content`

Možná neznáte jednu z nových hodnot [pro vlastnost min-width](http://tympanus.net/codrops/css_reference/min-width/) – `min-content`. Nastavuje minimální šířku elementu podle *jemu vlastní* minimální šířky, což je šířka nejdelšího slova nebo šířka tabulky či obrázku. Reboot [odstraňuje problémy](https://github.com/twbs/bootstrap/issues/12359), které v některých prohlížečích vznikají jeho nastavením pro `fieldset`.

```css
fieldset {
  /* Chrome a Firefox zde nastavují 
      min-width: min-content */
  min-width: 0;
}
```

Reboot zatím nejde stáhnout nebo instalovat samostatně, ale v dokumentaci Bootstrapu 4 je pro to nějaká příprava. Každopádně – copy/paste instalace [funguje i tady](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss).