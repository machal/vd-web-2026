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

<div class="home-boxes">

  <h2 class="home-boxes-heading">Kategorie podle značek</h2>

  <ul class="fgrid fgrid-small-3 fgrid-large-5">
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/acuvue.png" alt="Acuvue" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/air-optix.png" alt="Air Optix" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/bioclear.png" alt="Bioclear" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/biofinity.png" alt="Biofinity" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/purevision.png" alt="Pure Vision" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/soflens.png" alt="SofLens" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/acuvue.png" alt="Acuvue" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/air-optix.png" alt="Air Optix" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/bioclear.png" alt="Bioclear" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/biofinity.png" alt="Biofinity" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/purevision.png" alt="Pure Vision" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/soflens.png" alt="SofLens" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/acuvue.png" alt="Acuvue" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        <img src="../dist/content-img/brands/air-optix.png" alt="Air Optix" height="30">
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        Ostatní
      </a>
    </li>
  </ul>

</div><!-- /.home-boxes -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
