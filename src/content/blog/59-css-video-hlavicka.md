---
postID: 59
postTitle: 'CSS řešení: hlavička s videem na pozadí'
postUrlId: css-video-hlavicka
postDateTime: '2016-05-18 00:00:00'
excerpt: 'Hlavička na celou výšku okna, video na pozadí a centrované. Na mobilech video není. Jak na to?'
postStatus: Published
authorID: 0
sectionID: 1
category:
  - css
og_title: 'CSS řešení: hlavička s videem na pozadí'
og_description: 'Hlavička na celou výšku okna, video na pozadí a centrované. Na mobilech video není. Jak na to?'
og_type: article
---

# CSS řešení: hlavička s videem na pozadí

Na posledním firemním školení [v Creoxu](http://www.creox.cz/) jsme otevřeli kodérský oříšek, který s dovolením sdílím, protože obsahuje hned tři zajímavosti.

Takhle vypadá zadání:

![Úkol: Hlavička je na celou výšku okna, video na pozadí a centrované a na mobilech video není.](/assets/img/content/dest/original/reseni-hlavicka.jpg)

Postupně si to rozebereme, nebo si prostě [prohlédněte hotové řešení](http://codepen.io/machal/pen/bpZRvW?editors=1100).

## Hlavička na celou výšku okna. Spodní část má fixní výšku

Tohle je to nejjednodušší. Tedy pokud znáte [flexbox](/prirucka/css3-flexbox). ;)

HTML vypadá asi takto:

```html
<div class="jumbo">
	<div class="jumbo-typo">
	   <div class="jumbo-typo-main">    
	       <!-- Nápis „I'm the masthead…“ -->
	   </div>  
	   <div class="jumbo-typo-bar">
	      <!-- Lišta u spodní hrany: „Page content is below“ -->
	   </div>    
	</div>
	<div class="jumbo-video">
		<!-- Video na pozadí -->
	</div>
</div>	
```

Na celou výšku okna (respektive [viewportu](/prirucka/viewport-mobily)) hlavičku roztáhneme pomocí nové [jednotky `vh`](/prirucka/css3-jednotky):

```css
.jumbo {
  height: 100vh;
}
```

Pojďme nejprve na část s obsahem – `.jumbo-typo`. Chceme, aby `.jumbo-typo-bar` zabral fixní výšku u spodní hrany a `.jumbo-typo-main` zbytek svislé plochy.

Nejprve z rodiče uděláme flexbox a změníme směr layoutu na zezhora dolů:

```css
.jumbo-typo {
  display: flex;
  flex-direction: column;
}
```

Spodní lišta má výšku definovanou podle aktuálního obsahu a velikosti písma:

```css
.jumbo-typo-bar {
  padding: 1em;
}  
```

Hlavní část zabere zbytek. Prostě jí přikážeme, ať *flexí*:

```css
.jumbo-typo-main {
  flex: 1;
}
```

OK? Pojďme na video na pozadí.

## Video je na pozadí a centrované vodorovně i svisle

Video nelze dát na pozadí do CSS a proto jej budeme pozicovat pod už hotovou typografickou částí `.jumbo-typo`. Nejprve na to musíme připravit rodiče. Vytvoříme z něj relativně pozicovaný kontejner a k tomu mu zakážeme zobrazovat vše co čouhá ven:

```css
.jumbo {
  position: relative;
  overflow: hidden; 
}
```

Pro vycentrování videa a zároveň zachování jeho poměru stran si musíme pomoci méně známým, ale konzistentně fungujícím [trikem](http://codepen.io/shshaw/pen/OVGWLG). Je to takový `background-size: cover` pro video:

```css
.jumbo-video {
  /* Video nesmí být menší než plocha, 
    kterou obývá: */
  min-width: 100%; 
  min-height: 100%;   
  /* Prohlížeči zakážeme video zmenšit 
    nebo zvětšit jen na jedné straně: */
  width: auto;
  height: auto;  
  /* Video vycentrujeme: */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);  
}
```

## Na mobilních zařízeních video nahradíme obrázkem

Samozřejmě, že nás to může svádět k něčemu jako `.jumbo-video { display: none; }` na mobilních velikostech okna. To je ale samozřejmě špatně! Video se tak či tak stáhne, prohlížeč tatrankou neukecáte. 

Daleko lepší je na to jít opačně – [Mobile First](/prirucka/mobile-first) cestou. Do stránky namísto videa vložíme obrázek: 

```html
<img 
 src="Wave-Sitting.jpg"
 data-videosrc="Wave-Sitting.mp4"
 alt="Wave Sitting"
 class="jumbo-video">
```     

Ten pak Javascriptem zaměníme za značku `<video>`. Zjednodušeně třeba takto:

```javascript
$('.jumbo-video').replaceWith('
  <video class="jumbo-video" autoplay loop preload>
    <source 
      src="'+$('.jumbo-video').attr('data-videosrc')+'" 
      type="video/mp4">
  </video>
');
```

Teď přemýšlejme nad podmínkou, pro kterou se Javascript spouští. Nabízí se použít [Media Query](/prirucka/css3-media-queries). To by ale zase bylo špatně.

Musíme si odpovědět na otázku proč vlastně video  na mobilech nechceme? Kromě nedostatku prostoru na obrazovce a zátěže pro rychlost načítání si musíme uvědomit, že v mobilní prohlížečích nefunguje vlastnost `autoplay` pro HTML5. 

Takže můžeme výjimečně napsat [funkci pro detekci podle user agent řetězce](http://stackoverflow.com/a/11381730/889682) a pro video verzi všechny smartphony a tablety vyloučit:

```javascript
if (!isMobile()) {
  $('.jumbo-video')
    .replaceWith(' /* … */ ');
}
```

## Náhradní řešení pro prohlížeče co neumí flexbox

Chybí nám ještě alternativní verze IE9- a staré prohlížeče na Androidu, kde se vám layout kvůli použití flexboxu rozpadne. Ta bude velmi jednoduchá. Je důležité nechat zobrazit nerozbitý obsah. Veškeré stylování můžeme zahodit. 

Využijeme detekci vlastnosti pomocí knihovny Modernizr a vytvoříme definovaný fallback:

```css3
.no-flexbox .jumbo {
  overflow: visible;
  position: static;
}
```

Podobně to provedeme i u dalších „nebezpečných vlastností“.

Prohlédněte si [výslednou stránku](http://s.codepen.io/machal/debug/bpZRvW), její [kompletní zdroják](http://codepen.io/machal/pen/bpZRvW?editors=1100). A do komentářů mně napište, pokud byste něco řešili jinak.