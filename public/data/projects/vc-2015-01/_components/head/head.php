<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

  <div class="head">

    <div class="container">

      <?php include "logo.php" ?>

      <?php include "nav-panel__search-hidden.php" ?>

      <?php include "login.php" ?>

    </div>

    <?php include "nav.php" ?>

    <div class="container">

      <?php include "search-form.php" ?>

    </div>

  </div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
