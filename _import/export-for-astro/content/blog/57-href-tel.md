---
postID: 57
postTitle: 'Kompletní průvodce odkazy na telefonní čísla'
postUrlId: href-tel
postDateTime: '2016-04-10 00:00:00'
excerpt: 'Pojďme odstranit nejasnosti kolem telefonních odkazů v článku přeloženém z CSS-Tricks.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - html
  - rwd
no_ads: false
og_title: 'Kompletní průvodce odkazy na telefonní čísla'
og_description: 'Pojďme odstranit nejasnosti kolem telefonních odkazů v článku přeloženém z CSS-Tricks.'
og_type: 
---

# Kompletní průvodce odkazy na telefonní čísla

*Článek Geoffa Grahama, který původně vyšel [na blogu CSS-Tricks](https://css-tricks.com/the-current-state-of-telephone-links/).* 

Telefonní odkazy vám rovnou vytočí uvedené číslo, pokud jste na zařízení, které tuto funkci podporuje. Nejedná se o žádnou novinku, jsou tu s námi už pěkně dlouho. Jejich implementace je však opředena řadou nejasností a zmatků. 

Telefonování není jen výsadou mobilních telefonů, protože i na běžných počítačích existuje řada aplikací umožňující uživatelům uskutečnit telefonní hovor. Nemáme tedy důvod odkazy na telefonní čísla nepoužívat. Pojďme si o nich povědět něco více.

## Základní způsoby použití

Takto v HTML zapíšete telefonní odkaz:

```html
<a href="tel:777123456">777 123 456</a>
```

Definice funguje podobně jako běžný odkaz, takže text lze libovolně změnit:

```html
<a href="tel:777123456">Zavolejte nám!</a>
```

Zápis `tel:` se někdy nesprávně považuje za vlastnost odkazů. Jedná se ale o protokol, stejně jako jsou protokolem `http:` nebo `mailto:`. Specifikace HTML tento protokol nijak nezmiňuje. HTML5 však přineslo podporu pro práci s nestandardními protokoly, díky čemuž `tel:` můžete používat.

Možná se ptáte proč zrovna `tel:` považovat za výchozí pro zápis telefonních odkazů, když žádná specifikace neexistuje? `tel:` byl jako standard navržen [v roce 2000](http://www.ietf.org/rfc/rfc2806.txt). V roce 2007 jej použili tvůrci [operačního systému iOS](https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/PhoneLinks/PhoneLinks.html), čímž se mu dostalo podpory mezi prvními smartphony. Byla zde i řada dalších pokusů o definici telefonního protokolu, které zmíníme ještě dále v článku. Hlavní slovo zde ale bude mít `tel:`, protože je v současnosti nejrozšířenější.

## Podpora mezi prohlížeči

Kvůli chybějící dokumentaci ale mezi prohlížeči existují rozdíly. A to jak v podpoře telefonních odkazů, tak i v chování. Neznamená to, že by prohlížeč neuspěl při rozpoznávání odkazu. Tag `<a>` bude všude považován za odkaz. Rozdílné chování je až v akcích, které se vykonají, když na odkaz klikneme. Např. některé prohlížeče přímo spustí jinou aplikaci pro volání. Jiné se vás třeba zeptají, co mají provést. Některé prohlížeče neudělají vůbec nic, protože si nedokáží se zápisem `tel:` poradit.  

Všechny prohlížeče v tabulce považují `<a href="tel:…">` za odkaz. Zde je přehled jejich chování po aktivaci odkazu:

<table>
  <tr>
    <th width="33%">Prohlížeč</th>
    <th width="67%">Co se stane po kliknutí</th>
  </tr>
  <tr>
    <td>Android</td>
    <td>Spustí se aplikace pro volání</td>
  </tr>
  <tr>
    <td>BlackBerry 9900</td>
    <td>Vytočí se odkazované telefonní číslo</td>
  </tr>
  <tr>
    <td>Chrome</td>
    <td>Zobrazí se upozornění potvrzující použití jiné aplikace</td>
  </tr>
  <tr>
    <td>Edge</td>
    <td>Zobrazí se upozornění potvrzující použití jiné aplikace</td>
  </tr>
  <tr>
    <td>Internet Explorer 11</td>
    <td>Zobrazí se upozornění potvrzující použití jiné aplikace</td>
  </tr>
  <tr>
    <td>Internet Explorer 11 Mobile</td>
    <td>Vytočí se odkazované telefonní číslo</td>
  </tr>
  <tr>
    <td>iOS</td>
    <td>Zobrazí se možnosti volání, psaní zpráv, zkopírování nebo přidání telefonního čísla mezi kontakty v aplikaci Kontakty.</td>
  </tr>
  <tr>
    <td>Opera (OSX)</td>
    <td>Zobrazí se upozornění potvrzující použití jiné aplikace</td>
  </tr>
  <tr>
    <td>Opera (Windows)</td>
    <td>Zobrazí se chybové hlášení, že se nepodařilo rozeznat uvedený protokol.</td>
  </tr>
  <tr>
    <td>Safari</td>
    <td>Spustí se FaceTime</td>
  </tr>
</table>


## Stylování telefonních odkazů

Stylování telefonních odkazů je stejné jako stylování jakýkoliv jiných odkazů:

```css
a {
  text-decoration: none;
  color: orange;
}
```

Pojďme však styly aplikovat pouze na telefonní odkazy. Docílit toho můžeme pomocí [CSS3 selektoru](/prirucka/css3-selektory), který zjišťuje přítomnost textu `tel:` v odkazu:

```css
a[href^="tel:"] {
  text-decoration: none;
  color: orange;
}
```

Na webu Tuts+ je ukázán [pěkný trik](http://webdesign.tutsplus.com/articles/quick-tip-make-telephone-numbers-do-something--webdesign-9271), kterým pomocí `:before` pseudo selektoru přídáme unicode symbol telefonu před samotný odkaz:

```css
a[href^="tel:"]:before {
  content: "\260e";
  margin-right: 0.5em;
}
```

## Alternativy k zápisu telefonních odkazů

Jak jsme zmínili, tel: není jediný způsob komunikace s telefonem prostřednictvím odkazů. Zde je seznam několika méně známých zápisů, které je možné použít:.

* Řada prohlížečů se snaží automaticky rozpoznat telefonní čísla v HTML a označit je jako telefonní odkazy za vás. Tento přistup je běžný v operačním systému iOS.
* `callto:`  
Funguje obdobně jako `tel:` s tím rozdílem, že slouží k zahájení hovorů prostřednictvím Skype.
* `sms:`    
Místo zahájení telefonního hovoru přejdeme automaticky do aplikace pro psaní SMS zpráv. Podpora tohoto zápisu je mnohem menší než tomu je u odkazů s `tel:`. Nicméně běžné prohlížeče na telefonech s operačním systémem Android nebo iOS tomuto zápisu rozumí. 
* `fax:`  
Dnes již historický zápis, který zde uvádíme spíše pro přehled. Odkazy tohoto typu mají sloužit k interakci s faxem.

## Osvědčené tipy a triky

Je celkem vtipné hovořit o osvědčených postupech u něčeho, kde neexistuje žádná specifikace. Jediné, pro co existuje [zmínka ve specifikaci](https://www.w3.org/TR/mwabp/#bp-interaction-uri-schemes), je formát zápisu takovýchto odkazů v HTML. Nicméně pokud pracujeme na webu s telefonními odkazy, je třeba pamatovat na několik věcí.

### Berte vždy v potaz kontext

Pomocí telefonních odkazů můžete vytvořit zajímavé výzvy k akci. Obzvláště na mobilních telefonech pomáhají telefonní odkazy odbourat bariéry mezi obsahem a samotným telefonním hovorem. Na druhou stranu, na desktopových počítačích mohou být takové odkazy překážkou. Nelze na nich obvykle uskutečnit telefonní hovor, protože pro takovou akci nemívají aplikaci.

Možným řešením může být vytvoření speciální třídy pro nastylování telefonních odkazů. Takovou třídu pak můžeme použít podle toho, jaké informace nám předává samotný prohlížeč. [Modernizr](https://modernizr.com/) v kombinaci s media queries v tomto případě může být velice užitečným nástrojem. Mějte však na paměti, že i tyto nástroje neurčí vždy podporu telefonních odkazů na sto procent.

### Používejte telefonní čísla v mezinárodním formátu

Telefonní čísla v mezinárodním formátu nejsou nutnou podmínkou pro fungování telefonních odkazů. Je ale dobré takovýto formát uvádět, zvláště v situacích, kdy na webu počítáte s návštěvností z cizích zemí. Mezinárodní formát telefonního čísla může začínat znakem +, ale není to striktně vyžadováno.

```html
<a href="tel:+420777123456">
  777 123 456
</a>
```

### Optimalizace pro vyhledávače

![Přidání telefonu k lokálnímu byznysu na Google pomocí mikroformátu](http://www.vzhurudolu.cz/assets/img/content/dest/original/href-tel-seo.jpg)

Google doporučuje použít [strukturovaný formát dat](https://developers.google.com/structured-data/local-businesses/#adding_structured_data_markup_to_your_site), díky kterému uděláte telefonní odkazy lépe rozpoznatelné pro vyhledavače. Vyhledavač je pak dokáže lépe zobrazit na stránce s výsledky vyhledávání. Uživatel uvidí tlačítko, jehož stisknutím vytočí uvedené číslo. Dudley Storey [ve svém článku](http://thenewcode.com/536/Adding-Phone-Numbers-To-Web-Pages-With-HTML5-and-Microdata) připravil pěknou ukázku:

```html
<div itemscope 
  itemtype="http://schema.org/LocalBusiness">
  <h1 itemprop="name">Beach Bunny Swimwear</h1>
  Phone: 
    <span itemprop="telephone">
      <a href="tel:+18506484200">
         850-648-4200
      </a>
    </span>
</div>
```

Může se ale stát, že nebudete chtít, aby vyhledávač zařazoval podobné odkazy do svého indexu. V takovém případě stačí jednoduše říct, že si to nepřejete, přidáním atributu `rel="nofollow"`. Toto může být dobrý nápad například v situaci, kde váš odkaz nebyl navržen jako výzva k akci. Vyhledávače budou takovýto odkaz ignorovat. Zápis může vypadat třeba takto:

```html
<a href="tel:+420777123456" 
  rel="nofollow">
  777 123 456
</a>
```

### Vypněte automatickou detekci na iOS zařízeních

Pokud plánujete telefonní odkazy používat, měli byste také zvážit vypnutí autodetekce telefonních čísel na iOS zařízeních. Při zapnuté autodetekci totiž často dochází k přepsání stylů u takto nalezených telefonních čísel. Vypnutí autodetekce zajistíte přidáním následujícího meta tagu kamkoliv do hlavičky vaší stránky:

```html
<meta name="format-detection" 
  content="telephone=no">
```  

*Se svolením autora volně přeložil [Martin Pešout](http://www.martinpesout.cz/), editor: [Martin Michálek](http://www.vzhurudolu.cz/martin).*

<p class="video">
Video: <a href="https://www.youtube.com/watch?v=rbFq9-9o7Fw">Telefonní odkazy v HTML</a> ~ Jak na to a jak to vylepšit o serverovou detekci?
</p>