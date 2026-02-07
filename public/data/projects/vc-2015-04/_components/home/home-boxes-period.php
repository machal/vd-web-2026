<?php
/*

Boxíky s dobou nošení pro homepage
==================================


*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

?>

<div class="home-boxes">

  <h2 class="home-boxes-heading">Kategorie podle doby nošení</h2>

  <ul class="fgrid fgrid-small-3 fgrid-large-5">
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        Jednodenní
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        2
       týdenní</a
      ></li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        Měsíční
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        Čtvrtletní
      </a>
    </li>
    <li class="fgrid-item">
      <a class="box box-bordered" href="category_2nd_level.php">
        Kontinuální
      </a>
    </li>
  </ul>

</div><!-- /.home-boxes -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
