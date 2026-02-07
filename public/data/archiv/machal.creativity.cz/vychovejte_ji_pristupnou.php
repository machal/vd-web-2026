<?php include"inc/header_def.inc.php" ?>
<title>machal.creativity.cz/info - Martin Mich&#225;lek</title>
<?php include"inc/header.inc.php" ?>
     
<h4>stálı obsah</h4>

<h5>Vychovejte ji pøístupnou, a si všichni uijou <br />
<em>Pár tipù pro pøístupnost webu</em></h5>

<p>Poslední úprava: 4. 12. 2002.</p>

<p>Vaše stránky neuívají jen holky a kluci z posledních verzí <abbr title="Internet Explorer">IE</abbr>. Na vaše stránky mají pøístup i fyzicky hendikepovaní, lidé s poruchami vidìní a další. ádnı webdeveloper není nucen k tomu, aby trávil noci nad optimalizací kódu pro rùzná speciální zaøízení. Mùe je trávit mnohem pøíjemnìji. Pokud má ovšem na pamìti nìkolik jednoduchıch zásad, mùe lidem ušetøit spoustu trápení, mít klidnejší spánek a tøeba i získat vıhody v podobì lepšího umístìní ve vyhledávaèích.</p>

<p>Tento text není nièím jinım, ne aplikací zásadních pravidel z práce <a href="http://diveintomark.org">Marka Pilgrima</a> <a href="http://diveintoaccessibility.org">Dive Into Accessibility</a> do praxe na tomto mém webu. Odkazy <small>[DIA]</small> nevedou na verzi pro diabetiky, nıbr na konkrétní èást Pilgrimova díla.</p>

<p>Kdy jsem psal kód pro machal.creativity.cz, vìøil jsem tomu, e pro všeobecnou pøístupnost jsem udìlal maximum, protoe:</p>

<ul>
  <li><strong>XHTML+CSS</strong> &mdash; oddìluju obsah od designu, take na všech monıch zaøízenıch se zobrazí obsah jako èisté HTML.</li>
  <li><strong>Neotevírám odkazy do nového okna</strong> &mdash; neprudím uivatele, jim prohlíeè tuto akci aktivnì hlásí &mdash; nematu uivatele, kteøí akci nepostøehnou (napøíklad proto, e nevidí lištu aplikací) a neaktivním tlaèítkem Zpìt v prohlíeèi jsou hnáni k sebevraednım myšlenkám. <small><a href="http://diveintoaccessibility.org/day_16_not_opening_new_windows.html" title="Dive Into Accessibility">[DIA]</a></small></li>
  <li><strong>Kadá ze stránek má unikátní a smyslupnı titulek</strong> &mdash; je jasné, e pokud mají všechny stránky jednoho webu v <code>&lt;title&gt;</code> stejnı název a pokud náš milı uivatel pøepíná mezi okny / listuje v historii pomocí seznamu titulkù, bude z nìj nakrlkı uivatel. Navíc: vyhledávaèe tohle ocení na potìšující úrovni. <small><a href="http://diveintoaccessibility.org/day_8_constructing_meaningful_page_titles.html" title="Dive Into Accessibility">[DIA]</a></small></li>
  <li><strong>A u snad nemluvì, e</strong> kadı obrázek má alternativní popisek (<code>alt=""</code>) <small><a href="http://diveintoaccessibility.org/day_23_providing_text_equivalents_for_images.html" title="Dive Into Accessibility">[DIA]</a></small> &mdash; kadı odkaz, kterı nemá dostateènì popisnı text, obsahuje atribut <code>title=""</code> <small><a href="http://diveintoaccessibility.org/day_14_adding_titles_to_links.html" title="Dive Into Accessibility">[DIA]</a></small> &mdash; neodlišuju odkazy jen barvou, jeliko ne všichni musí mít barvy nastaveny jako já <small><a href="http://diveintoaccessibility.org/day_12_using_color_safely.html" title="Dive Into Accessibility">[DIA]</a></small> &mdash; nepouívám <code>href="javascript:.."</code>, protoe spousta lidí javascript prostì nemá. <small><a href="http://diveintoaccessibility.org/day_13_using_real_links.html" title="Dive Into Accessibility">[DIA]</a></small></li>
</ul>

<p>Jene to nestaèí. Furt jsem mìl za zády jisté procento potenciálnì naštvanıch uivatelù. A to proto, e jsem:</p>

<ul>
  <li><strong>Mìl v kódu stránky navigaci pøed obsahem</strong> &mdash; dovedu si pøedstavit rolování pøes navigaci na kadé stránce. Pìkná pruda, váení. V éøe CSS se dá navigace v kódu nacpat i za obsah, i kdy je nadesignovaná pøed obsahem. Navíc: vyhledávaèùm se to bude líbit taky. <small><a href="http://diveintoaccessibility.org/day_10_presenting_your_main_content_first.html" title="Dive Into Accessibility">[DIA]</a></small></li>
  <li><strong>Pouíval velikost písma v pixelech</strong> &mdash; a chudáci: moje špatnì vidoucí babièka, poloslepı já a kolega prùmìrnı uivatel IE po 16 hodinách u podprùmìrného monitoru prostì písmo o velikosti 11 pixelù nevidíme. Pøestoe nejrozšíøenìjší browser velikost písma zadanou v px mìnit neumoòuje, Mark Pilgrim má øešení i na tohle. <small><a href="http://diveintoaccessibility.org/day_26_using_relative_font_sizes.html" title="Dive Into Accessibility">[DIA]</a></small></li>
  <li><strong>Nenabízel monost prohledávání webu</strong> &mdash; pokud web obsahuje více ne jen pár stránek (co se u blogu stane pomìrnì rychle), je vyhledávání pohodlím prostì pro kadého. <small><a href="http://diveintoaccessibility.org/day_29_making_everything_searchable.html" title="Dive Into Accessibility">[DIA]</a></small></li>
</ul>

<p>Tìch zásad je pochopitelnì víc, pro tento úèel postaèí vıše uvedené. Je málo pravdìpodobné, e na machal.creativity.cz bude chodit vìtší mnoství zrakovì èi fyzicky postienıch. Je dokonce pravdìpodobné, e ètením Pilgrimova materiálu jsem strávil více èasu ne je souèet èasù, kterı stráví slepci na tomto webu. Ovšem tenhle web je pro holky i kluky, a to pro všechny. Kdy na tyto a další zásady budeme myslet pøíštì, tøeba bude na webu ménì schodù.</p>

<ul>
  <li><a href="http://diveintoaccessibility.org">Diveintoaccessibility.org</a> &mdash; vıbornı zdroj k tìmto a dalším zásadám, vèetnì odkazù na další zajímavé zdroje (anglicky)</li>
  <li><a href="http://www.blindfriendly.cz/doc/bfw.html">Blindfriendly.cz</a> &mdash; dokumentace zásad pøístupnosti</li>
  <li><a href="http://www.pixy.cz/dogmaw41/cs/">Dogma W4</a> &mdash; ponìkud obsáhlejší a spíše rozumnı ne dogmatickı seznam zásad nejen o pøístupnosti</li>
</ul>


<p>
<script type="text/javascript">
<!--
	var first = 'ma';
	var second = 'il';
	var third = 'to:';
	var address = '&#109;&#97;&#99;&#104;&#97;&#108;';
	var domain = '&#99;&#114;&#101;&#97;&#116;&#105;&#118;&#105;&#116;&#121;&#46;&#99;&#122;';
	document.write('<p><a href="');
	document.write(first+second+third);
	document.write(address);
	document.write('&#64;');
	document.write(domain);
	document.write('" title="Napište e-mail autorovi" accesskey="9">');
	document.write(address);
	document.write('&shy;&#64;&shy;');
	document.write(domain);	
	document.write('<\/a><\/p>');
// -->
</script>
</p>

<div class="foot bgtworeverse"><a href="#top">nahoru</a></div>		

</div>

<?php include"inc/footer.inc.php" ?>
