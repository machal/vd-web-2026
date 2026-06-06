---
postID: 65
postTitle: 'Problémy v CSS kódu: závorková pekla, komentáře a „zlomostřednost“'
postUrlId: css-kod-problemy
postDateTime: 2016-07-21
excerpt: 'Během spolupráce na nové verzi eshopového řešení ShopSys dělám review CSS kódu. Podívejme se společně na pár špeků.'
postStatus: Published
authorID: 0
sectionID: 1
category:
  - css
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Problémy v CSS kódu: závorková pekla, komentáře a „zlomostřednost“'
og_description: 'Během spolupráce na nové verzi eshopového řešení ShopSys dělám review CSS kódu. Podívejme se společně na pár špeků.'
og_type: article
---

# Problémy v CSS kódu: závorková pekla, komentáře a „zlomostřednost“

Během spolupráce na nové verzi [eshopového řešení ShopSys](https://www.shopsys.cz/) dělám review CSS kódu. Z jednoho konkrétního souboru mám pár postřehů, o kterých jsem dříve na Vzhůru dolů nepsal. Proto je s laskavým svolením autorů zveřejňuji.

Mrkneme se na soubor `header.less`. Je dobré vědět, že jde o prototyp pro tvorbu hlaviček webů, nikoliv hotovou komponentu. I proto se s ním, narozdíl od jiných částí kódu, autoři zase tak moc nepárali. Díky tomu se ale perfektně hodí pro potřeby případové studie, protože obsahuje všechny chyby, které ve stylech poslední dobou vídávám. Podívejte se na [původní podobu header.less](https://gist.github.com/machal/aed6b391d6de9e38c6bfcb52e342d281).

Identifikoval jsem tady čtyři hlavní problémy:

1. Závorkové peklo a monolitičnost
2. Chybějící komentáře
3. „Zlomostřednost“, organizace kódu přes breakpointy
4. Nedostatečné zobecnění

## 1. Závorkové peklo a monolitičnost

Užití [preprocesoru](/blog/12-css-preprocesory-1) často vede k přehnanému zanořování. Tady to ještě není tak zlé, i tak ale zploštění kódu prospěje čitelnosti. Ve větších komponentách bych se vyhýbal hlavně zanořování [BEM](/prirucka/bem) elementů:

```less
.header {
  &__middle {
    width: 440px;
  }
}
```

Věřte mi, že lépe se to bude číst vždy v kuse:

```less
.header__middle {
  width: 440px;
}
```

K té monolitičnosti – ve svém kódu si dávám pozor na dlouhé deklarace:

```less
.header__top {
 // 20 řádků deklarací
} 
```

Daleko čitelnějších výsledků dosáhneme rozdělením kódu do více deklarací se stejným selektorem. Můžem pak také seskupovat pravidla podle nějaké logiky:

```less
.header__top {
 // 10 řádků deklarací 
 // o typografii, barvách atd.
} 

.header__top {
 // 10 řádků deklarací 
 // o layoutu
} 
```

Nevznikne tak syndrom „opuštěné ukončovací závorky“: situace, kdy blok ukončený zárovkou začíná v kódu až vysoko mimo aktuální  zobrazení mého editoru.

## 2. Chybějící komentáře

Rozhodně nesouhlasím s postojem, že „dobrý kód nepotřebuje komentáře“. V CSS jsou komentáře naprosto nutné k pochopení dvou věcí:

1. **Důvodu.** Když se na kód díváme cizíma očima, musíme se pořád ptát *„Proč?“* – Proč je to pojmenované právě takto? Proč je to napsané takhle a ne jinak? Proč je to tady a ne jinde? … 
2. **Kontextu.** CSS je [na kontext](http://www.jakpsatweb.cz/css/css-kaskadovani.html) dost náchylné. Máme tu dědičnost, specificitu, pořadí… Když se čtenář dívá na konkrétní deklaraci, neví co z dřívějšího kódu ji ovlivňuje a co z pozdějšího ovlivní ona sama. 

Vezměme tenhle kus kódu:

```less
.header {
  padding-bottom: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}	
```

A teď se na něj podívejme očima někoho, kdo nezná design a neviděl HTML.  Navíc nepsal kód jej ovliňující ani jím ovlivněný:

- Co je to vlastně „header“? Hlavička webu nebo třeba univerzální hlavička pro všechny komponenty? 
- Proč má odsazení zezdola zrovna 10 pixelů?
- Proč se tady používá relativní pozice? Je to vždy kontejner pro absolutní pozicování?
- Vidím [flexbox](/prirucka/css3-flexbox), takže se bude používat layout. Proč se centruje a zalamuje?

Zkusme lepší verzi:

```less
/* Hlavička webu
   =============
     
   Prototyp hlavičky, ne hotová komponenta.
   Používá se na všech stránkách s výjimkou
   nákupního procesu.
*/     
     

// Hlavní blok
// --------------

// [1] Jde o relativně pozicovaný kontejner, což využijeme
//     v komponentách z adresáře header/.
// [2] Flexbox potřebujeme kvůli layoutu vnitřních komponent 
//     a taky změně pořadí pro .header__top na 
//     @query-lg breakpointu.

.header {
  padding-bottom: @lineHeight / 2;
  position: relative; // [1]
  display: flex; // [2]
  flex-wrap: wrap;
  align-items: center;
}	
```

Asi jste si všimli, že jsem zavedl globální proměnnou `@lineHeight`. Místo ní je samozřejmě možné použít `em` nebo `rem` jednotky, které mohou být dostatečně vypovídající:

```less
padding-bottom: .5rem;
```

Všimněte si také dvou typů komentářů:

- **CSS komentáře**`/* */` – používám pro název souboru a hlavní informace o něm. Zůstanou ve výsledném zkompilovaném CSS, kde mi občas při debugování pomohou najít to správné místo. V produkčním, minifikovavaném stylopisu už pak nejsou.
- **„Preprocesorové“ komentáře** `//` – slouží pro interní, vývojářské komentáře a do žádného verze kompilovaného CSS je nepřenáším.

Asi jste si všimli, že v komentářích používám Markdown nadpisy. Osvědčilo se mi to. Kódu přidávají strukturovanost a přehlednost. Taky se dají dobře automaticky zpracovávat, třeba při generování dokumentace.


## 3. „Zlomostřednost“, organizace kódu přes breakpointy

Hlavní organizační jednotkou v CSS mohou být komponenty nebo právě breakpointy. Jak jste si všimli, to druhé nedoporučuji.

Ano, ve vašem projektu nemusí být možné breakpointy [podle obsahu](http://kratce.vzhurudolu.cz/post/46416507703/jak%C3%A9-breakpointy-zvolit-v-responzivn%C3%ADm-webdesignu) tvořit. Když děláte obecný framework, nebylo by to efektivní. Právě proto má třeba Bootstrap breakpointy definované globálně a na tvrdo a nikoliv na úrovni komponent a podle obsahu. 

Pokud můžete, vždy kód organizujte přes komponenty. 

Tohle je původní verze:

```less
.header__middle {
  width: 100%;
  margin: 10px 0;
  order: 2;
}

// Spousta řádků kódu…

@media @query-lg {
  .header__middle {
    order: 2;
    width: 280px;
    margin: 0;
  }
}	

// Spousta řádků kódu…

@media @query-vl {
  .header__middle {
    width: 440px;
  }
}
```

Takto organizovaný kód označuji za „zlomostředný“. To je dostatečně strašidelné pojmenování na to, aby bylo jasné, že v CSS je potřeba se mu vyhnout.

Následuje lepší verze. Když upravujete `.header__middle`, měli byste vidět  responzivní kontext v jeho celé šíři a nehledat jej na jiných místech kódu. Vždyť jaký typ pravidel je stylům bližší než ty responzivní?

```less
.header__middle {
  margin: 10px 0;
  order: 2;
  
  @media @query-lg {
    width: 280px;
    margin: 0;
  }	
	
  @media @query-vl {
     width: 440px;
  }
}

// Spousta řádků kódu…
```

## 4. Nedostatečné zobecnění

Vezměme tuhle původní část kódu:

```less
width: calc(~"100% - 38px");
```

Čtenář kódu se musí samozřejmě ptát: „Milé číslo 38, odkud se sakra bereš?“

Po chvíli pátrání zjistíme, že na jiném místě kódu je pro `.header__cart` nastaveno `width: 38px`. Aha! Tohle dokážeme vyřešit LESS proměnnou:

```less
@headerCartWidth: 38px;

.header_cart {
  width: @headerCartWidth;
}

.header_mobile {
  width: calc(~"100% - @{headerCartWidth}");
}	
```

Tímto považuji hlavní problémy kódu za odstraněné. Podívejte se na [výslednou podobu header.less](https://gist.github.com/machal/0c7503b35688b802a5c53ebcc602c522).

Co si z článku vzít? 

- Pokuste se na svůj CSS kód dívat vždy cizíma očima. 
- Ptejte se mnohokrát „Proč?“.
- Ptejte se „Co z předchozího kódu ovlivňuje to na co se dívám?“ a „Co z následujícího kódu ovlivní to na co se dívám?“. 

A ano, v kódu by se daly najít i další problémy nebo zavést možná vylepšení. Nechci zatěžovat detaily nebo se pouštět do rozebírání věcí souvisejících s celkovým designem frameworku. Jakmile vás ale napadne cokoliv k mým čtyřem úpravám, neváhejte komentovat.