---
postID: 92
postTitle: 'Pár poznámek ke komentářům v CSS'
postUrlId: css-komentare
postDateTime: 2017-07-10
excerpt: 'Keith J. Grant napsal moc hezký článek o komentářích v CSS: „Thoughts on Self-Documenting CSS“. Tady je to nejdůležitější doplněné o mé poznámky.'
postStatus: Published
authorID: 0
sectionID: 1
category:
  - css
no_ads: false
og_title: 'Pár poznámek ke komentářům v CSS'
og_description: 'Keith J. Grant napsal moc hezký článek o komentářích v CSS: „Thoughts on Self-Documenting CSS“. Tady je to nejdůležitější doplněné o mé poznámky.'
og_type: article
---

# Pár poznámek ke komentářům v CSS

Keith J. Grant napsal moc hezký článek o komentářích v CSS: [„Thoughts on Self-Documenting CSS“](http://keithjgrant.com/posts/2017/06/self-documenting-css/). Tady je to nejdůležitější doplněné o mé poznámky.

Obecně s textem naprosto souhlasím v tom, že striktně „sebedokumentující“ kód v CSS prostě psát nejde. U stylů totiž nezáleží jen na kódu samotném, to bychom pak mohli hojně používat [preprocesorové mixiny](/blog/13-css-preprocesory-2) a kód se bez komentářu téměř obešel. Záleží také na velikosti výsledného CSS souboru a dalších faktorech.

<!-- AdSnippet -->

Přesto je většina obvyklých komentářů v CSS kódu zbytečná. Prostě je píšeme tam, kam se psát nemají a nepíšeme tam, kam se psát mají. Začneme těmi prvními.

## Zbytečné komentáře {#zbytecne}

Vynechávám očividné zlo jako zapomenuté staré komentáře nebo „TODO“ komentáře zmíněné v článku. I tak bychom ale ve sbírce CSS kódů světa našli zbytečných komentářů dost:

### Popisující jazyk {#jazyk}

Nemusíte popisovat selektory…

```scss
// Unordered and Ordered lists
ul,
ol {…}
```

…ani vysvětlovat CSS vlastnosti:

```scss
// Allow breaking very long words so they don't overflow the tooltip's bounds
word-wrap: break-word;
```

Mimochodem, ukázky jsou z Bootstrapu.


### Popisující knihovnu {#knihovna}

Nemělo by být potřeba vysvětlovat každé volání mixinu v preprocesorech: 

```scss
// Our parent element can be arbitrary since tooltips are by default inserted as a
// sibling of their target element. So reset our font and text properties to avoid
// inheriting weird values.
@include reset-text();
```

Tady by pravděpodobně stačilo lépe pojmenovat mixin doslovněji – například `reset-inherited-font()`.

### Popisující strukturu {#struktura}

V původním článku se uvádí příklad s oddělovači sekcí ve staromódním přístupu, kdy se všechny styly psaly do jednoho CSS souboru: 

```css
/* -----------------
 * TOOLTIPS
 * ----------------- */
``` 

Ano, je lepší soubory dělit do komponent – to pak nutnost oddělovačů odpadá.

<!-- AdSnippet -->

Přinutilo mě to ale k zamyšlení nad související věcí. Ve svém kódu často používám Markdown nadpisy pro vyznačení struktury komponenty. Vypadalo by to asi takhle:

```css
/* 
 Tooltips
 ========

 Info…
*/

.tooltip {…}

/* 
 Element: Inner
 -------------- 
*/

.tooltip__in {…}

/* 
 Modifier: Reversed
 ------------------
*/

.tooltip--reversed {…}
```

Po úvaze si ale myslím, že to je zbytečné. Díky [BEM](/prirucka/bem) dobře vím, zda jde o komponentu, element nebo modifikátor. Líbí se mi navíc vyznačení struktury DOMu pomocí odsazení, takže nová verze by vypadala takto:

```css
/* 
 Tooltips
 ========

 Info…
*/

.tooltip {…}

  .tooltip__in {…}

.tooltip--reversed {…}
```

Hlavní strukturální komentář v komponentě nechávám. Obvykle nese stručné informace o způsobu použití, autorovi nebo odkaz na plnou dokumentaci.

## Dobré komentáře

Autor jako dobré uvádí tzv. „mandatory comments“ - hlavičkové komentáře pro generátory dokumentace jako je KSS. Souhlasím, ale ne ve všech situacích. Je to prostě složitější a proto tento bod vynechávám.

### Prohlížečové obskurnosti {#prohlizece}

Dobrý příklad, kdy CSS komentovat musíte, našel autor v Normalize.CSS:

```css
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}
```

### Vysvětlení důvodů a kontextu {#duvod-kontext}

V původním článku se to neuvádí, takže vás ještě odkážu na svůj starší [text o problémech v CSS kódu](/blog/65-css-kod-problemy) – zejména do části o komentářích.  V CSS totiž často používáme vlastnosti, které se nám hodí na zcela jiných místech kódu než ty, které čteme. 

<!-- AdSnippet -->