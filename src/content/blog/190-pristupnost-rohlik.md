---
postID: 190
postTitle: 'Případová studie: Přístupnost na Rohlík.cz'
postUrlId: pristupnost-rohlik
postDateTime: 2021-02-19
excerpt: 'V Rohlíku jsme přístupnost řešili vždy, ale na novou úroveň ji dostal audit a zjištění, že naše služba může být pro uživatele se zdravotními omezeními opravdu užitečná.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - přístupnost
  - html
no_ads: true
include_rss: true
category_highlight: true
og_title: 'Případová studie: Přístupnost na Rohlík.cz'
og_description: 'V Rohlíku jsme přístupnost řešili vždy, ale na novou úroveň ji dostal audit a zjištění, že naše služba může být pro uživatele se zdravotními omezeními opravdu užitečná.'
og_type: article
---

# Případová studie: Přístupnost na Rohlík.cz

V Rohlíku jsme přístupnost řešili vždy, ale na novou úroveň ji dostal audit a zjištění, že naše služba může být pro uživatele se zdravotními omezeními opravdu užitečná.

Zaměřili jsme se nejprve na návrat `outline`, správnou sémantiku (raději `<button>` než `<div>`), chybové hlášky ve formuláři, orientační body WAI-ARIA a další. Věřím, že popis našeho postupu bude užitečný i pro vás.  

## Proč Rohlík řeší přístupnost? {#proc}

Na přístupnost se v Rohlíku vždy myslelo v rámci vývoje, ale moc se netestovala a nedělaly se audity, které by nás významně inspirovaly k hlubšímu zaměření tímto směrem.

Impulsem k tomu se výrazněji zabývat přístupností byl právě [audit přístupnosti](https://www.master.cz/analyza-pristupnosti-webu/), který pro nás udělal Roman Kabelka ze společnosti Master Internet. Audit i přednášku o užívání Rohlik.cz zrakově znevýhodněnými tehdy iniciovalo produktové oddělení.

<p class="video">
Video: <a href="https://www.youtube.com/watch?v=L8m6wyBxeY0">Přístupnost prakticky na Rohlík.cz</a> ~ Video-verze obsahu článku, kterou Veronika přednášela na streamu Frontendisti.cz v prosinci 2020.
</p>

Od Romana jsme obdrželi seznam bariér přístupnosti od klíčových až po méně naléhavé, který nás vedl v tom, jak přístupnost posunout na uživatelsky příjemnější úroveň.

Dalším impulsem bylo školení od Radka Pavlíčka (znáte [z Poslepu.cz](https://poslepu.cz/)) a už zmíněného Romana Kabelky.

## Důležité zjištění: Rohlík může slabozrakým opravdu pomoci {#zjisteni}

Roman nám na školení detailně popsal, jak dokáže naše služba ulehčit život zdravotně znevýhodněným lidem.

Člověk se zrakovým handicapem může nakoupit potraviny online a nemusí se složitě přepravovat do obchodu, kde žádá o asistenci a je v podstatě ze sta procent závislý na tom, jak ochotného zaměstnance potká.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1613712556/vzhurudolu-blog/rohlik_n6s304.jpg" alt="Rohlík.cz - rozhraní košíku">
<figcaption markdown="1">
*E-shop s potravinami. Nebo také užitečná služba pro nevidomé.*
</figcaption>
</figure>

Při nakupování na Rohlíku přitom zvládne vše sám od výběru po přečtení složení, zjištění, co je zrovna ve slevě a nákup dostane doručený až ke dveřím.

## Začínáme s prací: návrat outline a polyfill focus-visible {#zaciname}

Když jsem si prvně začala procházet stránku z klávesnice, narazila jsem na problém, že některé prvky se z klávesnice vůbec nedaly zaměřit. Někdy to bylo špatně [nastaveným tabindex](https://jecas.cz/tabindex), ale z větší části to způsoboval outline, obrys prvku používaný kvůli zvýraznění pro handicapované uživatele, nastavený na nulu:

```css
:focus {
  outline:0
}
```

Uvědomila jsem si, jak nepřístupné to je.

Proč je to problém? Odpověď na tuto otázku nejlépe vystihuje David Gilbertson [v článku „Removing that ugly :focus ring (and keeping it too)“](https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2), kde píše:

> Odstranit focus outline je jako odstranit u školy rampu pro invalidní vozík, protože to neodpovídá estetice.

Možnost navigovat a ovládat prvky z klávesnice jsou jednou z nejdůležitějších složek přístupnosti. Uživatelé s motorickým znevýhodněním jsou na ní závislí. Stejně tak jsou zvyklí ji používat zrakově znevýhodnění, kteří používají čtečky (screen readery).

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1613712668/vzhurudolu-blog/outline_p0pekg.png" alt="Outline na nativním HTML tlačítku">
<figcaption markdown="1">
*Vypnutí outline je špatná věc. Znemožníte tím sekvenční navigaci z klávesnice a zemře mnoho koťátek. Zdroj: Přednáška [Přístupnost v kódu](https://slideslive.com/38902622/pristupnost-v-kodu-ukazky-a-navrhove-vzory) na WebExpo 2017.*
</figcaption>
</figure>

Zároveň by se ale přidáním `outline` a `tabindex` na aktivní elementy začalo zobrazovat zvýraznění obrysem i při použití myši, což by byl problém z hlediska designu. Začala jsem proto hledat řešení, které by ideálně vyšlo vstříc na obě strany.

Nejvhodnější nástroj, na který jsem narazila, byl [polyfill focus-visible](https://github.com/WICG/focus-visible).

<!-- AdSnippet -->

Ten zaručuje, že se obrys nad prvkem (_focus ring_) nastaví na elementy za předpokladu, že se uživatel po stránce pohybuje přes klávesnici. Při pohybu myší se nezobrazuje. Toto řešení tak kombinuje dobrou přístupnosti a zároveň odpovídá potřebě designu.

Použití polyfillu je velmi jednoduché, nainstalovali jsme polyfill focus-visible do projektu a do stylů přidali:

```css
 *:focus:not(.focus-visible) {
   outline: none;
 }
```

Polyfill zpřístupňuje [nativní pseudoselektor :focus-visible](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo), který zatím ale [nepodporuje Safari](https://caniuse.com/css-focus-visible).

## Správná tlačítka: `<button>` a `<a>` na místo `<span>` a `<div>` {#tlacitka}

Pokud napříč webem používáme prvky `<button>` nebo `<a>`, je přístupnost zaručená nativně. Pokud ale potřebujeme z různých důvodů použít jiný element, jako například `<div>` nebo `<span>`, které mají zastupovat například roli tlačítka, tyto prvky se bez další práce stanou nepřístupnými. Uživatel klávesnice se na ně nebude moct dostat a ani s nimi interagovat.

To je obecně známé. Možná ale neuškodí opakování, které si můžete [o tlačítkách v HTML přečíst na Vzhůru dolů](https://www.vzhurudolu.cz/prirucka/button).

Jak konkrétně jsme to vyřešili?  V případech nutnosti zachování bezvýznamových prvků (`<div>` nebo `<span>`) jsme na element dodali, abychom zajistili jeho přístupnost:

- roli z hlediska významu a přístupnosti (atribut `role`),
- atribut `tabindex` kvůli dosažitelnosti při navigace z klávesnice,
- události vyvolané stiskem klávesy, klikem myši nebo [atributy jako aria-label](https://www.vzhurudolu.cz/prirucka/wai-aria).

Na Rohlíku pracujeme v Reactu. Ukážu zde kousek kódu:

```javascript
<LoginAddress
  className="modalLink"
  onClick={handleShowModal}
  onKeyUp={getOnKeyUpCallback(handleShowModal)}
  tabIndex={0}
  role="button"
  data-test="changeAddress"
>
  {address || deliveryPoint ? t('user:addressChange') : t('user:addressSet')}
</LoginAddress>
```

Nově jsme také přidali pomocnou funkci. Tu přidáváme na prvky, které mají roli tlačítka, ale z principu nereagují na stisknutí kláves ENTER nebo SPACE:

```javascript
export const getOnKeyUpCallback = (
 callback: Nullable<(event: any) => any>,
 keys: Keys[] = [Keys.ENTER, Keys.SPACE]
) => (e: React.KeyboardEvent) => {
 keys.includes(e.key as Keys) && callback?.(e);
};
```

Další bod k řešení, který vyšel z analýz, se týkal uživatelského vstupu.

## Formuláře a chybové hlášky {#formulare}

Naše formuláře nebyly přístupné, zvláště pro případy, kdy uživatel zadal špatná data.

Chybové hlášky se zobrazovaly dynamicky, ale uživatel čtečky o nich nebyl informován, dokud je cíleně nehledal. Chyběla také indikace, která pole jsou povinná.

Jak jsme to změnili? K povinným polím jsme přidali [atribut aria-required](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-required_attribute), aby uživatel při prvním průchodu formulářem věděl, které pole je povinné a které ne.

Dále jsme dodali [atribut aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute), který indikuje, zda jsou zadané hodnoty validní.

Chybovým hláškám jsme přiřadili <code>[role="alert"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)</code>, informaci o tom, že jde o chybovou hlášku, a <code>[aria-atomic="true"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)</code>, který indikuje živou oblast. Prostě tak, aby došlo k jejich okamžitému přečtení po zobrazení:

```javascript
<SC.Container className={className} 
  role="alert" id={id} aria-atomic="true">
  <HookFormErrorMessage {...rest} />
</SC.Container>

<SC.Input
  {...rest}
  ref={mergeRefs([inputRef, ref])}
  id={name || id}
  autoFocus={focus}
  name={name}
  type={type}
  required={required}
  disabled={disabled}
  inputMode={inputMode || getInputMode(type)}
  aria-required={required}
  aria-invalid={!valid}
  autoComplete={autoComplete}
/>
```

Jdeme dál, na orientační body.

## Přidáváme orientační body, landmarks {#landmarks}

Bez [WAI-ARIA landmarks](https://www.vzhurudolu.cz/prirucka/wai-aria) se zrakově znevýhodněný uživatel nemůže pohybovat cíleně jen na určitou oblast na stránce. Musí se proklikávat místy až přes stovky elementů, než se dostane, kam potřebuje.

<figure>
<img src="https://www.vzhurudolu.cz/prirucka-content/dist/images/large/html5-role.jpg" width="1600" height="900" alt="Role v HTML dokumentu">
<figcaption markdown="1">
*Šest hlavních oblastí stránky podle specifikací HTML5 a WAI-ARIA: hlavička, navigace, vyhledávací pole, hlavní obsah, méně důležitý obsah a patička. Zdroj: [HTML5 elementy na Vzhůru dolů](https://www.vzhurudolu.cz/prirucka/html5-struktura).*
</figcaption>
</figure>

U nás byly například problematické pásy s doporučením produktů ke koupi, které na přehledu objednávky obklopují seznam věcí v košíku z obou stran a tak zaberou uživateli dost času, než se dostane na cílené informace. Pokud vás to zajímá, pásy jsou vidět na prvním obrázku v tomto článku.

Pomohlo přidání orientačního bodu `complementary` na pás s doporučeními:

```html
<div role="complementary" 
  aria-labelledby="review-upsell">
  …
</div>
```

### Potíže s obsahem vkládaným na klientovi {#obsah-klient}

Pro zajímavost: pro zlepšení rychlosti webu jsme od podzim začali načítat patičku stránky pomocí [líného načtení](https://www.vzhurudolu.cz/prirucka/lazy-loading). Bohužel to ale mělo negativní vliv na přístupnost, jelikož se v době, kdy se patička ještě nenačte, nezobrazí oblast `contentInfo` v seznamu oblastí.

<!-- AdSnippet -->

Časem jsme líné načtení zrušili, obsah patičky se vkládá klientským JavaScriptem.  Přesto se může stát, že oblast `contentInfo` uživateli zpočátku čtečka nenahlásí.

Na doporučení Romana Kabelky jsme proto do stránky přidali skrytou informaci o tom, že se některé kategorie či patička mohou načítat postupně:

```html
<div aria-label="Data v kategoriích a patička se mohou načítat postupně">
  …
</div>  
```

Možná bychom vylepšili ještě to, aby měl roli `alert` a byl zaměřitelný z klávesnice (tj. `tabindex=0`). Text upozornění by se potom zobrazil i viditelně při průchodu Tabem - viz sekce „Reveal the Skip Link Only to Keyboard“ Users v článku [„Keyboard Accessibility Tips Using HTML and CSS“](https://webdesign.tutsplus.com/articles/keyboard-accessibility-tips-using-html-and-css--cms-31966).

Hlavní úpravy jsou tímto hotové. Pojďme se dále podívat, jak jsme přístupnost testovali.

## Testování přístupnosti v Rohlíku {#testovani}

Hlavní profesionální testování, které přineslo seznam bodů ke zlepšení pro nás udělal pan Kabelka. Pro ověření, že implementované změny fungují, jsem se učila používat [VoiceOver na macOS](https://support.apple.com/cs-cz/guide/voiceover/voic010/mac) spolu s prohlížeči Safari i Chrome.

Martin Michálek ve svém článku [„Testování přístupnosti webů“](https://www.vzhurudolu.cz/prirucka/testovani-odecitace) hezky popisuje návod na použití odečítaček.

Pokud máte Mac, určitě doporučuji si projít i tutoriál, který nabízí přímo VoiceOver při prvním spuštění. Další detailně popsaný návod v angličtině je i například [na WebAIM.org](https://webaim.org/articles/voiceover/).

## Tipy pro udržitelnost přístupnosti {#udrzitelnost}

Jak zajistit, aby se na přístupnost do budoucna nepřestalo myslet? Myslím, že dobrou cestou je dělat pravidelně školení i profesionální audity.

Zároveň si určit v týmu někoho, kdo bude přístupnost systematicky vylepšovat a připomínat kolegům, aby se na ni při vývoji nezapomnělo, občas zkusí projít web nějakým nástrojem i manuálně a ujistit se, že vše funguje, jak má.

## Co se nám při práci na zlepšení přístupnosti osvědčilo a co ne? {#osvedcilo}

Díky školením a vědomí, jak je naše služba dokáže někomu ulehčit život, mám dojem, že každý z týmu na přístupnost myslí více méně automaticky.

Udržovat dobrou přístupnost ale není jednoduché, kód se stále mění a vyvíjí a tím nám místy může mnoho věcí uniknout. Je proto potřeba se k přístupnosti vracet a testovat.

Například u sebe ale vidím interní testování jako úskalí. Za prvé jsem samouk začátečník a za druhé naši aplikaci znám natolik, že nejspíš trpím „provozní slepotou“ a určitě mohu přehlédnout, že je někde problém. Proto se určitě hodí i občasný profesionální audit.

## Jaké jsou výsledky? {#vysledky}

Když jsme implementovali první várku změn, dostali jsme několik pozitivním ohlasů například na X, ale hlavně nás hřál dobrý pocit, že jsme pomohli.

Co na to říkají lidi u nás ve firmě? Ti, kteří do problematiky přístupnosti víc vidí, tyto snahy oceňují. Místy je ale náročné přesvědčit ty, kteří se přístupností tolik nezabývají. Určitě je výzva toto povědomí rozšířit a přesvědčit kolegy brát přístupnost jako samozřejmost a ne jako komplikaci, která by se měla přehlížet. To je ale výzva ve všech firmách.

<!-- AdSnippet -->