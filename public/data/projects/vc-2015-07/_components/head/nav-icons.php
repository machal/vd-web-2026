<?php

// Panel s ikonkami v hlavičce webu
// ================================

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}


// random hodnoty pro prototyp
$random_badge_cart = mt_rand(1,20); // pocet polozek v kosiku
$random_badge_messages = mt_rand(1,15); // pocet zprav
$random_amount1 = mt_rand(0,20); // tisice korun v sume castek v kosiku
$random_amount2 = mt_rand(100,999); // koruny v sume castek v kosiku

// odkomentuj pokud chces stale stejne HTML
//$random_badge_cart = 20;
//$random_badge_messages = 10;
//$random_amount1 = 1;
//$random_amount2 = 585;

?>

<?php /* Ikony v objednávkovém procesu nezobrazujeme */ if ($page_type != "order"): ?>

  <div class="vc-nav-icons" role="navigation">
    <h2 class="sr-only">Navigační panel</h2>

      <ul>

        <li class="vc-nav-icons-item vc-nav-icons-nav">
          <a href="#nav" class="vc-nav-icons-link">
            <span class="sr-only">otevřít menu</span>
          </a>
        </li>

        <?php /* Varianta pro nepřihlášeného: */ if ($_SESSION['cycle'][0][3] != 1): ?>

          <li class="vc-nav-icons-item vc-nav-icons-login">
            <a href="#vc-login" class="vc-nav-icons-link <?php /* je chyba? pak načti menu rozbalené */ if ($_SESSION['cycle'][0][3] > 1): ?>active<?php endif; ?>">
              <span class="sr-only">přihlásit</span>
            </a>
          </li>

        <?php /* Varianta pro přihlášeného se zprávami: */ else: ?>

          <li class="vc-nav-icons-item vc-nav-icons-login vc-nav-icons-login-logged">
            <a href="#vc-login" class="vc-nav-icons-link">
              <span class="sr-only">jste přihlášen</span>

              <?php /* má zprávy? */ if ($_SESSION['cycle'][0][2] != 0): // prototyp: každé druhé zobrazení přihlášeného má zprávy ?>
                <span class="badge">
                  <span class="sr-only">máte</span>
                  <?php echo $random_badge_messages ?>
                  <span class="sr-only">nepřečtených zpráv</span>
                </span>
              <?php endif; ?>

            </a>
          </li>

        <?php endif; ?>

        <?php /* Varianta prázdný košík: */ if ($_SESSION['cycle'][0][1] == 0): ?>

          <li class="vc-nav-icons-item vc-nav-icons-cart">
            <a href="cart.php" class="vc-nav-icons-link">
              <span class="sr-only">košík je prázdný</span>
            </a>
          </li>

        <?php /* Varianta plný košík: */ else: ?>

          <li class="vc-nav-icons-item vc-nav-icons-cart-full">
            <a href="cart.php" class="vc-nav-icons-link">
              <span class="sr-only">v košíku máte</span>
              <span class="badge"><?php echo $random_badge_cart ?> <span class="sr-only">položky</span></span>
              <span class="vc-badge-price">
                <span class="vc-matrjoska">
                  <span class="sr-only">v ceně </span>
                   <?php if ($random_amount1 != 0): echo $random_amount1; endif; ?><span class="vc-number-space"></span><?php echo $random_amount2 ?>&nbsp;Kč
                </span>
              </span>
            </a>
          </li>

        <?php endif; ?>

    </ul>
  </div>
<?php endif; ?>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
