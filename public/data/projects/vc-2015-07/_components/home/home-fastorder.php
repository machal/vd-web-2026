<?php
/*

Rychlá objednávka na homepage
=============================

2 varianty - přihlášený a nepřihlášený uživatel.
V prototypu se náhodně střídají.

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

?>

<div class="vc-home-fastorder">
  <div class="vc-box vc-box-bordered">

    <h2 class="vc-home-box-heading"> Vracíte se? Rychlá objednávka</h2>

    <img class="vc-home-fastorder-image" src="../dist/img/icons/returning-animated.gif" width="94" height="112" alt="">

    <?php /* Varianta pro nepřihlášeného */ if ($_SESSION['cycle'][0][1]): ?>

      <p class="vc-home-fastorder-text">
        Přihlaste se a zopakujte předchozí objednávku ve dvou jednoduchých krocích.
      </p>

      <p class="vc-home-fastorder-button">
        <a href="#" class="vc-btn vc-btn-primary">Přihlásit se</a>
      </p>

    <?php /* Varianta pro přihlášeného */ else: ?>

      <p class="vc-home-fastorder-text">
        Zopakujte předchozí objednávku ve dvou jednoduchých krocích.
      </p>

      <p class="vc-home-fastorder-button">
        <a href="#" class="vc-btn vc-btn-primary">Zopakovat objednávku</a>
      </p>

    <?php endif; ?>

  </div>
</div><!-- /.vc-home-fastorder -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
