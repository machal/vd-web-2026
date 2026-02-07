<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-nav">
  <div class="vc-matrjoska">
    <div class="vc-container">

      <div class="pine pine-horizontal" role="navigation" id="nav">
        <h2 class="sr-only">Navigace webu</h2>
        <ul class="pine-level-1">
          <li class="vc-nav-lenses">
            <a href="category.php" class="needsclick">Kontaktní čočky</a>
            <ul class="pine-level-2">
              <li class="vc-nav-lenses-period">
                <a href="#">Podle doby nošení</a>
                <?php include "nav-lenses-period.php" ?>
              </li>
              <li class="vc-nav-lenses-types">
                <a href="#">Podle typu</a>
                <?php include "nav-lenses-types.php" ?>
              </li>
              <li class="vc-nav-lenses-brands">
                <a href="#">Podle značky</a>
                <?php include "nav-lenses-brands.php" ?>
              </li>
            </ul>
          </li>
          <li><a href="category.php">Roztoky</a>
          </li>
          <li><a href="category.php">Oční kapky</a>
          </li>
          <li class="vc-nav-accessories">
            <a href="category.php" class="needsclick">Příslušenství</a>
            <ul class="pine-level-2">
              <li><a href="category_2nd_level.php">Pouzdra</a>
              </li>
              <li><a href="category_2nd_level.php">Kosmetika</a>
              </li>
            </ul>
          </li>
          <li><a href="category.php">Bonusové zboží</a>
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
