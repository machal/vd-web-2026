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

$random = rand(0,1);

?>

<div class="home-fastorder">

  <div class="box">

    <h2>
      Vracíte se?
    </h2>

<?php

// Varianta pro nepřihlášeného:

if ($random == 0):

?>


    <p class="home-fastorder-text">
    Přihlaste se a zopakujte předchozí objednávku
    ve dvou jednoduchých krocích.
    </p>

    <p class="home-fastorder-button">
      <a href="#" class="btn btn-primary">Přihlásit se</a>
    </p>


<?php

// Varianta pro přihlášeného:

else:

?>

    <p class="home-fastorder-text">
    Zopakujte předchozí objednávku
    ve dvou jednoduchých krocích.
    </p>

    <p class="home-fastorder-button">
      <a href="#" class="btn btn-primary">Zopakovat objednávku</a>
    </p>


<?php

endif;

?>


  </div><!-- /.box -->

</div><!-- /.home-fastorder -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
