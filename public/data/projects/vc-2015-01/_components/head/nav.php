<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<style>
  /* TODO do CSS*/
  @media only screen and (min-width: 768px) {

    .nav {
      margin-bottom: 11px;
      background: #c8c8c8;
    }

    .pine {
      margin-bottom: 0;
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
    }

    .pine-level-1>li>a, .pine-level-1>li>strong {
      border-bottom: 0;
    }

  }

</style>

<div class="nav">

  <div class="container">

    <div class="pine pine-horizontal" role="navigation" id="nav">
      <h2 class="sr-only">Navigace webu</h2>
      <ul class="pine-level-1">
        <li><a href="category.php" class="needsclick">Kontaktní čočky</a>
          <ul class="pine-level-2">
            <li>
              <a href="#">Podle typu</a>
              <?php include "nav-lenses-types.php" ?>
            </li>
            <li>
              <a href="#">Podle značky</a>
              <?php include "nav-lenses-brands.php" ?>
            </li>
          </ul>
        </li>
        <li><a href="category.php">Roztoky</a>
        </li>
        <li><a href="category.php">Oční kapky</a>
        </li>
        <li><a href="category.php" class="needsclick">Příslušenství</a>
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

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
