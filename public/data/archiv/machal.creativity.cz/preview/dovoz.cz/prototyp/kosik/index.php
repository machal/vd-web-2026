<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
<head>
	<title>Dovoz.cz : Košík</title>
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
  <h1>Košík</h1>
  
  <table class="cart">
  <tr>
    <th>Název zboží</th>
    <th>Cena za kus</th>
    <th>Poèet kusù</th>
    <th>Celková cena</th>
    <th>Odstranit</th>	
  </tr>
  <tr>
    <td>Mattoni 1,5 l pøírodní PET (6ks)</td>
    <td class="alignRight">71,40</td>
    <td class="alignRight"><input type="text" value="2" class="xs alignRight" /></td>
    <td class="alignRight">142,80</td>
    <td><a href="">Odstranit</a></td>	
  </tr> 
  <tr>
    <td>Aquila 1,5 l citron PET (6ks)</td>
    <td class="alignRight">85,90</td>
    <td class="alignRight"><input type="text" value="1" class="xs alignRight" /></td>
    <td class="alignRight">85,90</td>
    <td><a href="">Odstranit</a></td>	
  </tr> 
  <tr>
    <td><br /><strong>Celkem</strong></td>
    <td class="alignRight"></td>
    <td class="alignRight"><a href="#">Pøepoèítat</a> <br /> <strong>3 ks</strong> </td>
    <td class="alignRight"><br /><strong>228,70</strong></td>
    <td></td>	
  </tr>      
  </table>
  
  <p class="alignRight">
    <input type="submit" value="Pokraèovat k pokladnì &gt;" />
  </p>
  
<h2> Další možnosti</h2>
  <p>
    <a href="#">Uložit si tyto položky</a> pro pozdìjší nákupy <br />
    <a href="#">Vysypat košík</a> &mdash; zrušit všechny položky <br />
    <a href="#">Pøidat další položky</a> pøechodem na úvodní stránku obchodu <br />	
  </p>

</div></div>


<div id="sideOneContainer"><div class="containerInside">

<?php
  require_once (_PREF.'inc/side-vyhledavani.inc.php');
  require_once (_PREF.'inc/side-kategorie.inc.php');  
?> 

</div></div>

<div id="sideTwoContainer"><div class="containerInside">

<?php
  require_once (_PREF.'inc/side-prihlaseni.inc.php');
?>
  
</div></div>


</div></div><!-- bodyContainer -->


<?php
  require_once (_PREF.'inc/footer-info.inc.php');
  require_once (_PREF.'inc/footer.inc.php');  
?>


</body>

</html>
