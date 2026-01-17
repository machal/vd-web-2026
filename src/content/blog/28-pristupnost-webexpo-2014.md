---
postID: 28
postTitle: '7 poznámek o přístupnosti z WebExpo 2014'
postUrlId: pristupnost-webexpo-2014
postDateTime: '2014-09-30 00:00:00'
excerpt: 'Radek Pavlíček s Romanem Kabelkou vedli v předvečer letošního WebExpa hodně zajímavý workshop Přístupnost pro kodéry. Za mě prima přiležitost k aktualizaci znalostí od odborníků na slovo vzatých.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: '7 poznámek o přístupnosti z WebExpo 2014'
og_description: 'Radek Pavlíček s Romanem Kabelkou vedli v předvečer letošního WebExpa hodně zajímavý workshop Přístupnost pro kodéry. Za mě prima přiležitost k aktualizaci znalostí od odborníků na slovo vzatých.'
og_type: article
---

# 7 poznámek o přístupnosti z WebExpo 2014

Radek Pavlíček s Romanem Kabelkou vedli v předvečer letošního WebExpa hodně zajímavý workshop [Přístupnost pro kodéry](http://webexpo.cz/konference2014/workshop/pristupnost-pro-kodery/). Za mě prima přiležitost k aktualizaci znalostí od odborníků na slovo vzatých.  Teď se vám pokusím předat pár informací, které ve mě utkvěly nejvíc. Protože – jak hezky Radek podotkl – právě frontendisti mohou s přístupností webů pomoci nejvíce.

<span style="text-transform:uppercase">1) WAI ARIA nekončí základními oblastmi.</span> Nejobyčejnější [oblasti stránky](http://www.zdrojak.cz/clanky/pristupnost-ria-strukturovani-dokumentu-a-pristupnost-z-klavesnice/) (`banner`, `navigation`, `main`, `search` a další) lze i pro prezentační weby rozšířit „rolemi” pro menší komponenty stránky – zaujalo například `menu/menuitem` pro vyznačení dropdown navigace, `tab/tabpanel` pro záložkovou navigaci nebo `dialog` pro modální okno. Možností jak něco na stránce označit je ale hrozně moc. Studujte na  [w3.org/TR/wai-aria/roles](http://www.w3.org/TR/wai-aria/roles). Pokud děláte aplikace, je použitelných označení ještě daleko více.

*Aktualizace:* O [WAI-ARIA](/prirucka/wai-aria) už mám článek i na Vzhůru dolů. Včetně demonstračního videa.

<span style="text-transform:uppercase">2) Více navigací na stránce.</span> Žádný problém. Mohu je pro odlišení pojmenovat návěštím (`aria-label="…"`) nebo se ještě lépe odkázat na existující nadpis (`aria-labelledby="…"`). Někteří znáte ze zdrojáků [Bootstrapu](http://getbootstrap.com/).

```
<div role="navigation" aria-labelledby="uzivatelske-funkce">
  <h3 id="uzivatelske-funkce">Uživatelské funkce</h3>
  <ul> … </ul>
</div>

<div role="navigation" aria-labelledby="prihlaseni-k-newsletteru">
  <h3 id="prihlaseni-k-newsletteru">Přihlášení k newsletteru</h3>
  <ul> … </ul>
</div>	
```

<span style="text-transform:uppercase">3) title & alt & longdesc, tři mušketýři.</span> `title=""` na přístupnost nemá zásadní vliv. Je problematický nepříliš velkou podporou odečítačů, jinak též řečeno slepeckých čteček. Dobrý pomocník hlavně pro lidi co mají myš, u slepců víceméně jen jako dodatečný popisek ve formulářových prvcích. `alt=""` je naopak důležitý velmi. Prázdný `alt=""` znamená, že se element bude ignorovat. Obrázek bez atributu `alt` je nepřístupný. (A nevalidní.) Atribut `longdesc` umožňuje delší popis u obrázku, pokud by `alt` překročil 80 znaků.

<span style="text-transform:uppercase">4) Dva režimy čtečky.</span> Nevěděl jsem, že čtečky umožňují oba módy – pasivně–sekvenční procházení pomocí nadpisové osnovy dokumentu nebo strukturované procházení pomocí WAI ARIA oblastí (`role=""`). Ten druhý způsob zrakově postižení zatím využívají méně, je ovšem velmi dobře podporovaný a výborně použitelný, takže na WAI ARIA rozhodně nezapomínejte! U aplikací je strukturovaný režim samozřejmě ještě důležitější.

<span style="text-transform:uppercase">5) U složitějších webů a aplikací nezpomínejte na klávesové zkratky.</span> Je sice blbé, že pro ně neexistuje standard, jejich přítomnost je nicméně vždy vítána. Ideální je vložit skrytý odkaz na ně hned na začátek stránky. Velké české weby se shodly na jakémsi průniku a odkazují [na tuto stránku](http://www.ippi.cz/klavesove-zkratky/neni-mapa-stranek.html). Najdete třeba v kódu Novinky.cz.

<span style="text-transform:uppercase">6) A zase – aplikace a prezentační weby jako naprosto odlišné světy.</span> I v přístupnosti. Zatímco u prezentačních webů stačí pro obstojnou přístupnost dodržet dobrou nadpisovou osnovu, nezapomínat na `alt=""` obsah a přidat WAI ARIA oblasti. Tedy něco co dobře vycvičenému kodérovi nezabere prakticky žádný čás navíc. U aplikací to tak není – dobrá přístupnost si tam vezme dost energie při výrobě. 

Teď pozor! Poslední bod vám udělá radost.

<span style="text-transform:uppercase">7) Ani `table` pro layout nemusí být prasárna.</span> Pokud ji používáte jen pro formátovací účely, z pohledu přístupnosti může být v pohodě. Stačí přidat kouzelný WAI ARIA atribut `presentation`.

	<table role="presentation">
	…
	</table>

Dozvěděli jste se něco nového? Mám radost. Využijte to hned na aktuálním projektu. Pár minut vaší kóderské práce znamená velký přínos pro znevýhodněné uživatele.

Chcete vědět více? Rád vás odkážu na [blog Radka Pavlíčka](http://poslepu.cz/) nebo jeho texty na Zdrojáku:

- [WAI ARIA 1.0 byla vydána jako doporučení W3C](http://www.zdrojak.cz/clanky/wai-aria-1-0-vydana-doporuceni-w3c/)
- [Přístupnost dynamických webových aplikací (4dílný seriál)](http://www.zdrojak.cz/serialy/pristupnost-dynamickych-webovych-aplikaci/)