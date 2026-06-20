<? include ("inc/header_def.inc.php"); ?>
<title>machal.creativity.cz/weblog - Martin Mich&#225;lek</title>
<? include ("inc/header.inc.php"); ?>
		 		 

               
<h4>
<script type="text/javascript">
  cesky_datum('Wednesday, October 23, 2002');
</script>
<noscript>
<div>Wednesday, October 23, 2002</div>
</noscript>
</h4>
     
          <p>
<a name="83424259"  href="2002_10_01_archiv.php#83424259"><strong class="blogtime">23:16</strong></a>
          <a href="http://www.blogger.com" title="Blogger.com">Blogger</a> je nejznámìjší systém pro vedení weblogu. Blogger je fajn. Blogger používám i já. Blogger má ale americký pùvod. Na Evropany moc nemyslí a tak tøeba jediný snesitelný formát data pro oznaèování pøíspìvkù, který si mùžete nastavit je dd/mm/yyyy, což je ponìkud suché. Naštìstí máme v Podolí velmi dobré a ochotné programátory, takže Vítek Burda napsal JavaScriptovou funkci <code>cesky_datum()</code>, která pøevede americkou ohavnost <em>Wednesday 23, 2002</em> na to, co vidíte v nadpisu dnešního pøíspìvku. Navíc je funkce jednoduše použitelná i pro jiné jazyky. Více informací v kódu stránky.</p>

<p>Praotec všech blogerù, <a href="http://www.zeldman.com" title="Zeldman.com - blog Jeffreyho Zeldmana">Jeffrey Zeldman,</a> redesignoval svùj web. Udìlal to pøesnì tak, jak se dalo oèekávat &#8211; krokem k maximální jednoduchosti,  pøístupnosti a použitelnosti. Není to krok pøekvapivý, nicménì neuniká mi trend, který má sice rozumné opodstatnìní, ale... Nebudou brzy vypadat všechny blogy (a následnì weby) jako by Zeldmanovi z oka vypadly? 
</p>

               
<h4>
<script type="text/javascript">
  cesky_datum('Monday, October 21, 2002');
</script>
<noscript>
<div>Monday, October 21, 2002</div>
</noscript>
</h4>
     
          <p>
<a name="83302694"  href="2002_10_01_archiv.php#83302694"><strong class="blogtime">18:12</strong></a>
          Dìkuji Marku Prokopovi ze <a href="http://www.sovavsiti.cz/weblog/" title="Blog Sovy v síti">Sovy v síti</a> za lichotivá slova a odkaz na mùj blog.</p>
<p>Vím, že následujícím odkazem týmu Sovy zrovna radost neudìlám, jelikož znám jeho vztah k Flashi, ale <a href="http://www.lexus.com/minorityreport/index/">minihra automobilové znaèky Lexus
</a> ukazuje zajímavé propojení prezentace ve filmu Minority Report a na webu, i když není nic extra. Mimochodem, ten film nestojí  už vùbec za nic :). </p>

               
<h4>
<script type="text/javascript">
  cesky_datum('Sunday, October 20, 2002');
</script>
<noscript>
<div>Sunday, October 20, 2002</div>
</noscript>
</h4>
     
          <p>
<a name="83264770"  href="2002_10_01_archiv.php#83264770"><strong class="blogtime">23:37</strong></a>
          <strong>Pìtkrát HTML zombie.</strong> V práci ze mì mají bžundu, když láteøím nad používáním tagu <code>&lt;font&gt;</code> v HTML. Trošku jsem se tím proflákl, pravda. Jenže HMTL zombie si užívám i v jiných pøípadech. Tohle jsou nìkteré z nich:</p>

<dl>
  <dt><code>&lt;br&gt;&lt;br&gt;</code></dt>
    <dd>Používání zalomení øádkù pro zaèátek odstavce. Odstavec vždycky zaèíná a konèí znaèkou <code>&lt;p&gt;</code> </dd>
  <dt><code>&lt;span class="header3"&gt;</code></dt>
    <dd>Nadpisy se oznaèují <code>&lt;h1&gt;</code> až <code>&lt;h6&gt;</code>. Jestli vymažeme tohoto a pøedchozího zombíka, máme první krok ke strukturovanému dokumentu za sebou.</dd>
  <dt><code>&lt;img src="img.gif"&gt;</code></dt>
    <dd>Zdánlivì všecho v poøádku, ovšem bez povinného parametru <code>alt=""</code> to nejde. I když nemá obrázek informaèní hodnotu, musí se <code>alt=""</code> uvést alespoò prázdný. Pokud tak neudìláte, negrafické prohlížeèe si s obrázkem neporadí a zobrazí shluk <code>[IMAGE]</code> paskvilù. <a href="http://www.delorie.com/web/lynxview.cgi?url=http%3A%2F%2Fwww.idnes.cz" title="iDnes.cz v simulaci negrafického prohlížeèe Lynx">Takhle tøeba vypadá jeden èeský zpravodajský portál.</a></dd>
  <dt><code>&lt;a href="javascript:.."&gt;</code></dt>
    <dd>Javascript v odkazu zpùsobí u uživatelù s vypnutým Javascriptem (je jich pomìrnì hodnì) to, že se nedozví vùbec nic. Patøí do události <code>onclick=""</code>. Ta se zpracuje jako první a pak teprve pøijde na øadu obsah <code>href=""</code>. Takže, pokud Javascript otevírá upravené okno s dokumentem, mìl by odkaz smìøovat na dokument samotný. Více o téhle problematice je k dispozici na <a href="http://www.evolt.org/article/Links_and_JavaScript_Living_Together_in_Harmony/17/20938/" title="Èlánek o spouštìní Javascriptu z odkazù na Evolt.org (anglicky)">Evolt.org</a></dd>
  <dt><code>&lt;font size="2" face="Verdana"&gt;</code></dt>
    <dd>No jo, já vím. Ale já mám rád <acronym title="CSS (Kaskádové styly) - jazyk pro popis vzhledu dokumentu">CSS</acronym> a tohle patøí do minulého století ;)</dd>
</dl>

<div class="foot bgtworeverse"><a href="archiv.php">archiv</a></div>		
 		</div>
<? include ("inc/footer.inc.php"); ?>