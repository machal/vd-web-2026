<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Rozcestník podkategorií v kategorii první úrovně:
Zobrazujeme na stránkách Kontaktní čočky, Roztoky, Kapky atd http://www.vasecocky.cz/kontaktni-cocky.html
-->

<div class="directory directory-multiple">

  <h2 class="directory-heading">
    Čočky podle
    <a class="active" href="#kategorie-doba">doby nošení</a> <span class="directory-divider">–</span>
    <a href="#kategorie-znacky">značek</a> <span class="directory-divider">–</span>
    <a href="#kategorie-vyrobce">výrobce</a> <span class="directory-divider">–</span>
    <a href="#kategorie-typ">typu</a>:
  </h2>

  <div class="directory-group first" id="kategorie-doba">
    <h3 class="directory-group-heading">
      Čočky podle doby nošení
    </h3>
    <div class="directory-group-content">
      <ul>
        <li><a href="category_2nd_level.php" class="directory-item" >Jednodenní</a> <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >2 týdenní</a> <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Měsíční</a> <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Čtvrtletní</a> <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Kontinuální</a> </li>
      </ul>
    </div>
  </div>

  <div class="directory-group" id="kategorie-znacky">
    <h3 class="directory-group-heading">
      Čočky podle značek
    </h3>
    <div class="directory-group-content">
      <ul>
        <li><a href="category_2nd_level.php" class="directory-item" >Acuvue</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Air Optix</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Bioclear</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Biofinity</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Clear</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >ColourVUE</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Dailies</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Focus</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Frequency</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Freshlook</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Magic Eye</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Proclear</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >PureVision</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Soflens</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Ostatní</a></li>
      </ul>
    </div>
  </div>

  <div class="directory-group" id="kategorie-vyrobce">
    <h3 class="directory-group-heading">
      Čočky podle výrobce
    </h3>
    <div class="directory-group-content">
      <ul>
        <li><a href="category_2nd_level.php" class="directory-item" >Alcon</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Johnson &amp; Johnson</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Bausch &amp; Lomb</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Cooper Vision</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >MaxVUE</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Wilens</a></li>
      </ul>
    </div>
  </div>

  <div class="directory-group" id="kategorie-typ">
    <h3 class="directory-group-heading">
      Čočky podle typu
    </h3>
    <div class="directory-group-content">
      <ul>
        <li><a href="category_2nd_level.php" class="directory-item" >Barevné</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Torické</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level.php" class="directory-item" >Bifokální a multifokální</a></li>
      </ul>
    </div>
  </div>

</div><!-- /.directory -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
