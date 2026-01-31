---
postID: 16
postTitle: 'VzhůruDolů.cz + Nette + Perch = ♥'
postUrlId: perch-nette
postDateTime: '2014-05-12 00:00:00'
excerpt: 'O redakčním systému Perch, na kterém VzhůruDolů běží, jsem už tady psal. V nedávno aktualizované verzi backendu jsme přidali ještě jednu ingredienci, Nette. Vzniklá polévka může být zajímavá pro každého kdo s Nette pracuje na menších prezentačních webech'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'VzhůruDolů.cz + Nette + Perch = ♥'
og_description: 'O redakčním systému Perch, na kterém VzhůruDolů běží, jsem už tady psal. V nedávno aktualizované verzi backendu jsme přidali ještě jednu ingredienci, Nette. Vzniklá polévka může být zajímavá pro každého kdo s Nette pracuje na menších prezentačních webech'
og_type: article
---

# VzhůruDolů.cz + Nette + Perch = ♥

O redakčním systému [Perch](http://grabaperch.com/), na kterém VzhůruDolů běží, jsem už [tady](http://www.vzhurudolu.cz/blog/nove-vzhuru-dolu-technikalie) [psal](http://kratce.vzhurudolu.cz/post/11986202247/perch-redakcni-system-pro-neprizpusobive-designery). V nedávno aktualizované verzi backendu jsme přidali ještě jednu ingredienci, Nette. Vzniklá polévka může být zajímavá pro každého kdo s Nette pracuje na menších prezentačních webech a hledá vhodný redakční systém.

Pokusím se vám to vysvětlit jak jen to v silách frontendisty může být.

## Perch CMS

Perch je skvělý v definování jednodušších datových struktur, jejich vzájemném provazování a hlavně — ve snadnosti jejich správy přes automaticky generovaný redakční systém.

Zkusme příklad. Někde si nadefinujete datovou strukturu (říká se *Model*, že jo?) *Kurzy*, k ní pak *Termíny kurzů*. *Termíny kurzů* jsou navázané na *Kurzy* a dále obsahují datum konání, organizátora, text, nějaká zatržítka…

![Stránka Termínu kurzů v CMS Perch](/assets/img/content/dest/vdperchkurzy-.jpg) 

Tahle pěkná stránka redakčního systému vám k *Termínům kurzů* vznikne sama od sebe. Nastavíte si jen jak se má zobrazovat seznam *Termínů*, jak řadit nebo kdo je může editovat. Fajn, ne?

Teď ale přijdou problémy. Místo kde se deklaruje datová struktura Termíny kurzů jsou… šablony. Prostě si vytvoříte HTML stránku a do ní vložíte ošklivé Perch tagy: 

	<h1>
	  <perch:content id="course" label="Kurz" type="dataselect"
	  page="/2013/pages/kurzy.php" region="Kurzy" required="true" />
	</h1>
	
	<p>
	  <perch:content id="date" type="date" label="Datum" title="true" />
	</p>

Když šablonu zobrazíte v prohlížeči, vygeneruje se administrační stránka pro *Termíny kurzů*. 

Problém je v tom, že v šabloně deklaruje datovou strukturu modelu a zároveň do ní píšete HTML pro zobrazování stránky v prohlížeči. Pro úplně jednoduché weby je to docela fajn cesta, ale pro cokoliv složitějšího nepoužitelné. Začnou chybět vychytávky moderních šablonovacích systémů.

## A tady přichází Nette

Pořádný PHP framework doplní co Perch až příliš zjednodušuje (šablony) a co neřeší (routování URL, zobrazování chybových stavů, logování chyb…). A když už tam Nette máme, můžete třeba snadněji rozesílat emaily.

Technikálie propojení mezi Perchem a Nette jsou tak jednoduché, že jim rozumí i frontendista. V presenteru ze zavolá funkce [`perch_content_custom()`](http://docs.grabaperch.com/docs/content/perch-content-custom/), která vrací asociativní pole. To se předá do šablony:

	<h1>
	  {$item['name']}
	</h1>
	<p>
	  {$date['date']|date:'j. n. Y'}
	</p>

Hotovo! Myslím, že pro menší weby může být Perch a Nette zajímavá kombinace. Co myslíte vy? 

Na závěr ještě poděkuju [Danovi Duranovi](http://about.me/daniel.duran), který mi pomohl s implementací a taky s tímhle návodem.