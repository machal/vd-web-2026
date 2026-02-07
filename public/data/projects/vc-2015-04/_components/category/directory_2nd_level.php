<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Rozcestník podkategorií v kategorii druhé úrovně:
Zobrazujeme na stránkách kde je více položek a hodí se upřesnit filtrováním, např. http://www.vasecocky.cz/2-tydenni-kontaktni-cocky.html
Po kliknutí na položku se vytvoří kombinovaná stránka, např. http://www.vasecocky.cz/jednodenni-kontaktni-cocky,johnson-and-johnson.html
-->

<div class="directory">

  <div class="directory-group">

    <h2 class="directory-group-heading">
      Výrobci:
    </h2>

    <div class="directory-group-content">

      <ul>
        <li><span class="directory-item">Všichni</span>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Alcon</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Johnson &amp; Johnson</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Bausch &amp; Lomb</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Cooper</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Vision</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">ClearLab</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Sauflon</a>  <span class="directory-divider">–</span></li>
        <li><a href="category_2nd_level_combine.php" class="directory-item">Wilens</a></li>
      </ul>

    </div>

  </div>

</div><!-- /.directory -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
