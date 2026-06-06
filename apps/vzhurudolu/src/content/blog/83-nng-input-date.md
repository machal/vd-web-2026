---
postID: 83
postTitle: 'NN Group: Jak vylepšit formulářové prvky pro vložení datumu?'
category:
  - html
postUrlId: nng-input-date
postDateTime: '2017-02-09 00:00:00'
excerpt: 'Stručné shrnutí článku. Jak vylepšit input type=date z pohledu uživatelského.'
postStatus: Published
authorID: 0
sectionID: 1
no_ads: false
og_title: 'NN Group: Jak vylepšit formulářové prvky pro vložení datumu?'
og_description: 'Stručné shrnutí článku. Jak vylepšit input type=date z pohledu uživatelského.'
og_type: article
---

# NN Group: Jak vylepšit formulářové prvky pro vložení datumu?

Nielsen Norman Group přišli v článku „[Date-Input Form Fields: UX Design Guidelines](https://www.nngroup.com/articles/date-input/)“ se stručnými tipy, jak z pohledu uživatelského vylepšit vstup data. 

<!-- AdSnippet -->

Vybral jsem pro vás ty nejzajímavější:


1. **Hlašte chyby způsobem, který pomáhá**. Například „Chybný formát data“ nepomůže. „Datum prosím vložte ve formátu den. měsíc. rok.“ je už lepší. 
2. **Odstraňte nelogické volby data**. Například data narození před 130 lety a o podobně.
3. **Zachovejte práci uživatelů**. Pokud udělá chybu a vy mu ještě vymažete formulář, asi vám uteče. Uživatelský vstup dejte třeba do uložiště prohlížeče.  
4. **Snažte se vyhnout rozbalovacím nabídkám** (`<select>`). Obzvlášť, pokud je dělíte na tři pro měsíc, den a rok. Pro uživatele to je fakt hodně zbytečných kroků.
5. Pokud má uživatel jen **omezený počet možností** pro výběr datumu, vypište jen je a žádné jiné. 
6. Nevyžadujte, aby uživatelé museli vkládat **speciální znaky**. Například lomítka nebo pomlčky v mezinárodních formátech.

[V článku](https://www.nngroup.com/articles/date-input/) pak kromě toho najdete i pomoc s výběrem s pravného návrhového vzoru. 
 
<!-- AdSnippet -->
 
Související:
 
- O nativním vstupu data (`<input type="date">`) technicky [píše JeČas.cz](http://jecas.cz/datepicker).
- [Firefox](https://x.com/mozhacks/status/821005161602646016/photo/1?ref_src=twsrc%5Etfw) konečně ohlásil blížící se podporu nativního vstupu data ([Can I Use](http://caniuse.com/#search=date)). Takže jediný aktuální prohlížeč, který to nebude umět je desktopové Safari. To má ale [na trhu v Česku](/prirucka/prohlizece) jen malinký podíl.
- Peter-Paul Koch v článku „[Making input type=date complicated](https://medium.com/samsung-internet-dev/making-input-type-date-complicated-a544fd27c45a#.tg3dylr70)“ situaci s nativním vstupem data shrnuje a podivuje se, proč ho ještě webaři běžně nepoužívají. Zároveň přiznává, že s ním problémy jsou. Já si ale myslím, že přišel čas to zase začít zkoušet.