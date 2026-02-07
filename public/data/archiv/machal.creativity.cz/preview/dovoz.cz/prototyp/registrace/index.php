<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
<head>
	<title>Dovoz.cz : Registrace</title>
<?php
  if (!defined('_PREF')) define('_PREF', '../');
  require_once (_PREF.'inc/header.inc.php');
?>
</head>

<body>
<?php
  require_once (_PREF.'inc/header-menu.inc.php');
?>

<div id="bodyContainer"><div id="bodyContainerInside">


<div id="contentContainer"><div class="containerInside">
  <h1>Registrace</h1>
  
<h2>Osobní údaje</h2>

  <table class="form">

  <tr>
    <th><label>Jméno a pøíjmení<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="xl" name="jmeno" value=""></td>
  </tr>  

  <tr>
    <th><label>E-mail<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="mail" value=""></td>
  </tr> 
  
  <tr>
    <th><label>Telefon<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="jmeno" value=""></td>
  </tr>    
  
</table>
  
<h2>Doruèovací adresa</h2>  

<table class="form">  
  
  <tr>
    <th><label>Ulice a èíslo<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="adresa_u" value=""></td>
  </tr>  
  
  <tr>
    <th><label>Obec<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="adresa_m" value=""></td>
  </tr>  

  <tr>
    <th><label>PSÈ<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="s" name="adresa_p" value=""></td>
  </tr>  
  
</table>


<h2>Fakturaèní údaje (chcete-li fakturu)</h2>

<table class="form">

  <tr>
    <th><label>Firma:</label></th>
    <td><input type="text" class="xl" name="jmeno" value=""></td>
  </tr>  
  
  <tr>
    <th><label>Ulice a èíslo:</label></th>
    <td><input type="text" class="l" name="adresa_u" value=""></td>
  </tr>  
  
  <tr>
    <th><label>Obec:</label></th>
    <td><input type="text" class="l" name="adresa_m" value=""></td>
  </tr>  

  <tr>
    <th><label>PSÈ:</label></th>
    <td><input type="text" class="s" name="adresa_p" value=""></td>
  </tr> 
  
  <tr>
    <th><label>IÈO:</label></th>
    <td><input type="text" class="m" name="adresa_p" value=""></td>
  </tr> 
  
  <tr>
    <th><label>DIÈ:</label></th>
    <td><input type="text" class="m" name="adresa_p" value=""></td>
  </tr>   
  

</table>  

<h2>Pøihlašovací údaje</h2>

<table class="form">

  <tr>
    <th><label>Uživatelské jméno<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="xl" name="jmeno" value=""></td>
  </tr>  

  <tr>
    <th><label>Heslo<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="mail" value=""></td>
  </tr> 
  
  <tr>
    <th><label>Heslo znovu<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="jmeno" value=""></td>
  </tr>    
  
</table>

<p class="alignCenter">
  <input type="submit" value="Odeslat" />
</p>

  </form>
  

   




</div></div>


<div id="sideOneContainer"><div class="containerInside">


</div></div>

<div id="sideTwoContainer"><div class="containerInside">

  
</div></div>


</div></div><!-- bodyContainer -->


<?php
  require_once (_PREF.'inc/footer-info.inc.php');
  require_once (_PREF.'inc/footer.inc.php');  
?>


</body>

</html>
