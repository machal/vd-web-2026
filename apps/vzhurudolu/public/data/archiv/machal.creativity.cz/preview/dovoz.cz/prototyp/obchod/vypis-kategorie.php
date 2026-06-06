<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
<head>
	<title>Minerální a stolní vody (Dovoz.cz)</title>
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

<div id="breadCrumbs">
<span><a href="#">Nápoje</a> &gt;</span>   <h1>Minerální a stolní vody</h1>
</div>

<div id="listCategories">
<p>
  Kategorie: <strong>Všechny</strong>, <a href="#">Pøírodní a minerální</a>, <a href="#">Pøírodní ochucené</a>, <a href="#">Minerální ochucené</a> <br />
  Znaèky: <strong>Všechny</strong>, <a href="#">Mattoni</a>, <a href="#">Magnesia</a>, <a href="#">Podìbradka</a>, <a href="#">Korunní</a> <br />
  Balení: <strong>Všechna</strong>, <a href="#">0,5 l</a>, <a href="#">1,5 l</a>, <a href="#">2 l</a>
</p>  
</div>
<div id="listOrder">
<p>
  Øadit podle: <strong>Abeceda</strong>, <a href="#">Prodejnost</a>, <a href="#">Cena</a>
</p>  
</div>

<h2>Zboží v kategorii</h2>

<div class="listItem">
  <a href="<?php echo _PREF; ?>obchod/detail-zbozi.php" title="Mattoni 1,5 l pøírodní"><img src="<?php echo _PREF; ?>img/zbozi/mattoni_maly.jpg" alt="Mattoni 1,5 l pøírodní" class="imgListItem" /></a>
  <div class="listItemBody">
  <h3><a href="<?php echo _PREF; ?>obchod/detail-zbozi.php">Mattoni 1,5 l pøírodní PET</a></h3>
  <p>
    Pøírodní minerální voda s vysokým obsahem hoøèíku a hydrogenuhlièitanu. <br />
	Cena za kus s DPH: 11,90 Kè <em>(Akce! bežná cena 13,50 Kè)</em><br />
	Cena za balení s DPH (6ks): <strong>71,40 Kè</strong><br />
  </p>
  </div>
</div>

<div class="listItem">
  <a href="<?php echo _PREF; ?>obchod/detail-zbozi.php" title="Aquila 1,5 l citron PET"><img src="<?php echo _PREF; ?>img/zbozi/aquilla_maly.jpg" alt="Aquila 1,5 l citron PET" class="imgListItem" /></a>
  <div class="listItemBody">
  <h3><a href="<?php echo _PREF; ?>obchod/detail-zbozi.php">Aquila 1,5 l citron PET</a></h3>
  <p>
    Pøírodní minerální voda s vysokým obsahem hoøèíku a hydrogenuhlièitanu. <br />
	Cena za kus s DPH: 11,90 Kè<br />
	Cena za balení s DPH (6ks): <strong>71,40 Kè</strong><br />
  </p>
  </div>
</div>

<div class="listItem">
  <a href="<?php echo _PREF; ?>obchod/detail-zbozi.php" title="Magnesia 1,5 l pøírodní PET"><img src="<?php echo _PREF; ?>img/zbozi/magnesia_maly.jpg" alt="Magnesia 1,5 l pøírodní PET" class="imgListItem" /></a>
  <div class="listItemBody">
  <h3><a href="<?php echo _PREF; ?>obchod/detail-zbozi.php">Magnesia 1,5 l pøírodní PET</a></h3>
  <p>
    Pøírodní minerální voda s vysokým obsahem hoøèíku a hydrogenuhlièitanu. <br />
	Cena za kus s DPH: 11,90 Kè<br />
	Cena za balení s DPH (6ks): <strong>71,40 Kè</strong><br />
  </p>
  </div>
</div>


<p class="paging">
  Stránka 1/5: <a href="<?php echo _PREF; ?>obchod/vypis-kategorie.php">Další &raquo;</a>
</p>


</div></div><!-- contentContainer -->


<div id="sideOneContainer"><div class="containerInside">

<?php
  require_once (_PREF.'inc/side-vyhledavani.inc.php');
  require_once (_PREF.'inc/side-kategorie.inc.php');  
?> 

</div></div>

<div id="sideTwoContainer"><div class="containerInside">

<?php
  require_once (_PREF.'inc/side-kosik.inc.php');
?>
  
</div></div>


</div></div><!-- bodyContainer -->


<?php
  require_once (_PREF.'inc/footer-info.inc.php');
  require_once (_PREF.'inc/footer.inc.php');  
?>


</body>

</html>
