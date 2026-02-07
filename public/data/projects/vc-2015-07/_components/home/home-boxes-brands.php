<?php
/*

Boxíky se značkami pro homepage
===============================

14 značek + 1 odkaz na ostatní.
TODO:
- V prototypu je sice 15 míst, ale opakujeme tu jen 5 značek.
- Loga firem je potřeba sehnat v SVG.

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

?>

<div class="vc-home-boxes">

  <h2 class="vc-home-boxes-heading">Kategorie podle značek</h2>

  <ul class="fgrid fgrid-small-3 fgrid-large-5">
    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/acuvue.svg" alt="Acuvue" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/freshlook.svg" alt="Freshlook" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/air-optix-simple.svg" alt="Air Optix" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/proclear.svg" alt="Proclear" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/purevision.svg" alt="PureVision" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/soflens.svg" alt="Soflens" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/dailies.svg" alt="Dailies" height="26">
      </a>
    </li>

    <!--nemam-->
    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/colourvue.svg" alt="ColourVUE" height="26">
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/biofinity.svg" alt="Biofinity" height="26">
      </a>
    </li>

    <!--textově -->
    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        Bioclear
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        Clear
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        Focus
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        Frequency
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        Magic Eye
      </a>
    </li>

    <li class="fgrid-item">
      <a class="vc-box vc-box-bordered vc-box-block" href="category_2nd_level.php">
        Ostatní
      </a>
    </li>
  </ul>

</div><!-- /.vc-home-boxes -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
