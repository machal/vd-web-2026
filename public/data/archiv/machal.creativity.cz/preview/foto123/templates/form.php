<?php echo("<?xml version=\"1.0\" encoding=\"windows-1250\"?>"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="cs" lang="cs">
<head><title>Foto123</title>

<meta http-equiv="Content-Type" content="text/html; charset=windows-1250" />
<meta http-equiv="content-language" content="cs" />
<meta http-equiv="pics-label" content='(pics-1.1 "http://www.icra.org/ratingsv02.html" comment "ICRAonline v2.0" l gen true for "http://machal.creativity.cz"  r (nz 1 vz 1 lz 1 oz 1 cz 1) "http://www.rsac.org/ratingsv01.html" l gen true for "http://machal.creativity.cz"  r (n 0 s 0 v 0 l 0))' />

<meta name="author" content="" />
<meta name="keywords" content="" />
<meta name="copyright" content="" />
<meta name="MSSmartTagsPreventParsing" content="TRUE" />
<meta name="robots" content="index,follow" />

<link rel="Start" title="Úvodní stránka" href="/" />
<link rel="Author" title="Kontakt na autora" href="mailto:info@foto123.cz" />

<style type="text/css">
  @import "css/common.css";
  @import "css/screen.css";
</style>	

</head>

<body>


<div id="header">

<p id="head">
<strong><a href="/"><img src="img/header/logo.gif" alt="Foto123.cz" width="140" height="50" /></a></strong>
</p>

<ul id="menu">
	 <li><a href="registrace">Registrace</a></li><!-- 
--><li><a href="blog/zaznamy">Záznamy v blogu</a></li><!-- 
--><li><a href="blog/sablony">Šablony blogu</a></li><!-- 
--><li><a href="galerie">Galerie</a></li><!-- 
--><li class="last"><a href="odhlaseni">Odhlášení</a></li>	
</ul>

</div>

<div id="contentcontainer">

<div id="content">

<h1>Registrace</h1>

<p class="error"><em>Váš formulář obsahuje chyby...</em></p>


		<div id="formregister">
			<form method="post" action="./">
				<fieldset>
					<legend>Povinné položky</legend>

					<table>					
					  <col class="col50">
					  <col class="col50">								

					<tr id="formular-uzivatelske-jmeno">
					  <td>
						<label for="s_usr_username">Uživatelské jméno</label>
						</td>
						<td>
						<input type="text" name="s_usr_username" id="s_usr_username" title="Vyplňte své Uľivatelské jméno pro přihláąení k Blog123" class="m" /> 
						<a href="#napoveda-uzivatelske-jmeno" onclick="return !help('uzivatelske-jmeno')"><span class="button orange paddinglight fontweightstrong">?</span></a>
						</td>
					</tr>

					<tr id="formular-heslo">
					  <td>
						<label for="usr_password">Heslo</label>
						</td>
						<td>
						<input type="password" name="usr_password" id="usr_password" title="Vyplňte své Heslo pro přihláąení k Blog123" class="m" /> 
						<a href="#napoveda-heslo" onclick="return !help('heslo')"><span class="button orange paddinglight fontweightstrong">?</span></a>
						</td>
					</tr>

					<tr id="formular-potvrzeni-hesla">
					  <td>
						<label for="usr_passwordconfirm">Potvrzení hesla</label>
						</td>
						<td>
						<input type="password" name="usr_passwordconfirm" id="usr_passwordconfirm" title="Zopakujte Heslo pro kontrolu správnosti" class="m" /> 
						<a href="#napoveda-potvrzeni-hesla" onclick="return !help('potvrzeni-hesla')"><span class="button orange paddinglight fontweightstrong">?</span></a>
						</td>
					</tr>

					<tr id="formular-prezdivka">
					  <td>
						<label for="s_usr_nick">Přezdívka (Jméno)</label>
						</td>
						<td>
						<input type="text" name="s_usr_nick" id="s_usr_nick" title="Vyplňte svojí přezdívku, nebo jméno" class="m" /> 
						<a href="#napoveda-prezdivka" onclick="return !help('prezdivka')"><span class="button orange paddinglight fontweightstrong">?</span></a>
						</td>
					</tr>

					<tr id="formular-email" class="error">
					  <td>
						<label for="s_usr_email">Email</label>
						</td>
						<td>
						<input type="text" name="s_usr_email" id="s_usr_email" title="Vyplňte svůj Email" class="xm" /> 
						<a href="#napoveda-email" onclick="return !help('email')"><span class="button orange paddinglight fontweightstrong">?</span></a>
						<p><em>Chyba, bejby!</em></p>
						</td>
					</tr>
					
          </table>

					<script type="text/javascript" src="../js/confirmpublicemail/"></script>
				</fieldset>

				<fieldset>
					<legend>Nepovinné poloľky</legend>

					<table>
					  <col class="col50">
					  <col class="col50">						

					<tr id="formular-email-ke-zverejneni">
						<td>					
						<label for="s_usr_emailpublic">Email ke zveřejnění</label>
						</td>						
						<td>						
						<input type="text" name="s_usr_emailpublic" id="s_usr_emailpublic" title="Vyplňte svůj Email pro zveřejnění" class="xm" /> 
						<a href="#napoveda-email-ke-zverejneni" onclick="return !help('email-ke-zverejneni')"><span class="button orange paddinglight fontweightstrong">?</span></a>
						</td>						
					</tr>

					<tr id="formular-novinky-serveru">
						<td colspan="2">
						<input type="checkbox" name="s_usr_newsletter" id="s_usr_newsletter" title="Zaąkrtněte políčko, pokud si přejete emailem pravidelně dostávat informace pro uľivatele serveru Blog123" checked="checked" value="1" />
						<label for="s_usr_newsletter">ANO, přeji si dostávat emailem novinky serveru Blog123</label>
						<a href="#napoveda-novinky-serveru" onclick="return !help('novinky-serveru')"><span class="button orange paddinglight fontweightstrong">?</span></a>
 					  </td>
					</tr>

					</table>
				</fieldset>

				<div class="formrow">
					<input type="submit" name="registrace" title="Stiskněte tlačítko pro odeslání údajů k registraci" value="Registrace" class="button orange" />
				</div>
			</form>
		</div>



</div>


<div id="rightsidecontainer">
<div id="rightside">

<div class="box">
  <h2>Přihlásit se</h2>
  <form>
	  <div class="content">
		<label>
		  Uživatelské jméno
		  <input type="text" class="text" />  
		</label>
		<label>
		  Heslo
		  <input type="text" class="text" />  
		</label>		
		<div class="alignright">
		  <input type="submit" value="Přihlásit" class="button orange margintop10px" />
		</div>
		</div>
	</form>
</div>

<div class="box">
  <h2>Poslední zaregistrovaní</h2>
	  <div class="content">
		<dl>
		  <dt><a href="#blog">Název blogu</a></dt>
		  <dd>Vytvořil <a href="#uzivatel">Karel</a> 23. 12. 2003</dd>			
		  <dt><a href="#blog">Název blogu dlouhý</a></dt>
		  <dd>Vytvořil <a href="#uzivatel">Karel</a> 23. 12. 2003</dd>						
		</dl>
		<div class="alignright">
		  <a href="#seznamblogu" class="button"><button class="orange">Seznam blogů</button></a>
		</div>	
		</div>		
</div>

</div>
</div>

<div class="clearboth fontsize1px"></div>
</div>

<div id="footer">
  <p>Foto123 &mdash; Copyright 2002 &mdash; <a href="mailto:info@foto123.cz">info@foto123.cz</a></p>
</div>

</body>
</html>


