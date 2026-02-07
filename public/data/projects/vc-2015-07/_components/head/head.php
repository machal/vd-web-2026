<?php

/*

Hlavička webu
=============

Máme různé verze podle toho, na které stránce jsme.
V objednávkovém procesu ($page_type == "order")
nezobrazujeme navigaci a vyhledávání.

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

?>

<div class="vc-head">

  <div class="vc-container vc-head-top-row">
    <!-- Logo -->
    <?php include "logo.php" ?>

    <!-- Navigační panel s ikonami na hlavní navigaci, přihlášení nebo košík -->
    <?php include "nav-icons.php"; ?>

    <!-- Okno pro přihlášení uživatele -->
    <?php /* uživatel je přihlášen */ if ($_SESSION['cycle'][0][3] == 1): ?>

    <?php
        // Kvůli podmínkám v inkludu ukládáme název souboru do proměnné
        include "user-menu.php";
      ?>
    <?php /* uživatel není přihlášen */ else: ?>

    <h2 class="sr-only">Přihlášení</h2>

    <?php
        // Kvůli podmínkám v inkludu ukládáme název souboru do proměnné
        $parent_file = basename(__FILE__);
        include "login.php";
      ?>

    <?php endif; ?>
  </div>


  <?php if ($page_type != "order"): ?>

    <!-- Hlavní navigace -->
    <?php include "nav.php"; ?>

    <div class="vc-container">

      <!-- Osmistovka -->
      <?php include "contacts.php" ?>

      <!-- Vyhledávací pole -->
      <?php include "search-form.php" ?>

    </div>

  <?php endif; ?>

</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
