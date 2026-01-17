---
postID: 33
postTitle: 'Prosím, aktualizujte Picturefill na 2.3.1'
postUrlId: picturefill-2-3-1
postDateTime: '2015-05-29 00:00:00'
excerpt: 'Pokud tak neučiníte, na webu vám mohou přestat fungovat obrázky. A nebo – ještě lépe – prohlížeče zmrví nativní implementaci responzivních obrázků.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Prosím, aktualizujte Picturefill na 2.3.1'
og_description: 'Pokud tak neučiníte, na webu vám mohou přestat fungovat obrázky. A nebo – ještě lépe – prohlížeče zmrví nativní implementaci responzivních obrázků.'
og_type: article
---

# Prosím, aktualizujte Picturefill na 2.3.1

Pokud tak neučiníte, na webu vám mohou přestat fungovat obrázky. A nebo – ještě lépe – prohlížeče zmrví nativní implementaci [responzivních obrázků](/prirucka/responzivni-obrazky).

Po čase zase krásná připomínka, že tvůrci webů drží v šachu tvůrce prohlížečů a tvůrci prohlížečů tvůrce webů. Souboj v klasickém westernu. Jako první střílí hoši od prohlížečů.

[Picturefill](/prirucka/picturefill) ve starších verzích spoléhá na detekci tagu [`<picture>`](/prirucka/picture). Pokud jej prohlížeč neumí, Picturefill se domnívá, že neumí celý [standard](https://html.spec.whatwg.org/multipage/embedded-content.html) responzivních obrázků a tak zvesela zapisuje do vlastnosti `currentSrc`.

Jenže tu máme prohlížeče, které neumí `<picture>`, ale vlastnost `currentSrc` mají naimplementovanou. Jako read-only. Takže Picturefill zvesela zapíše do vlastnosti jen ke čtení, což skončí výjimkou a žádné obrázky se na webu nezobrazí.

Starší verze Picturefillu je nasazená na tisícovkách webů a žádný prohlížeč si nelajzne zobrazování webů bez obrázků. Proto zvažují dočasné odstranění `currentSrc`. Microsoft Edge to už udělal.

Pokud používáte Picturefill 2, aktualizujte na 2.3.1:

- `npm update picturefill` nebo `bower update picturefill` a šup s výsledkem na produkci
- nebo si stáhněte [nezmenšenou](https://github.com/scottjehl/picturefill/blob/2.3.1/dist/picturefill.js) či [zmenšenou](https://github.com/scottjehl/picturefill/blob/2.3.1/dist/picturefill.min.js) verzi