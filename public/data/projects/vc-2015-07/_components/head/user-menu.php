<?php
/*

User menu
=========

Používá se v hlavičce (klik na ikonu hlavy)

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

// random hodnoty pro prototyp
$random_points = mt_rand(0,1); // má body?

// odkomentuj pokud chces stale stejne HTML
//$random_points = 1;

?>

<?php /* V objednávkovém procesu nezobrazujeme */ if ($page_type != "order"): ?>

  <div class="vc-dropdown-container vc-user-menu form vc-box">
    <div class="vc-user-credentials">

      <p class="vc-user-name">
        Anastazie
        <?php /* když nemá body */ if (! $random_points): ?>
        <br>
        <?php endif; ?>
        Snědladítětikrálíková
      </p>
      <?php /* nezobrazuj když nemá body */ if ($random_points): ?>
        <p class="vc-user-points">6500 bodů</p>
      <?php endif; ?>

    </div>

    <!-- todo -->
    <div class="vc-messages">
      <h3>3 zprávy</h3>

      <ul>
        <li>
          A kdo bude platit za objednavku?
          <a href="#">Uhradte ji prosim</a>.
        </li>
        <li>
          Za posledni nakup, mate +500
          bonusovych bodu. <a href="#">Co za ne?</a>
        </li>
        <li>
          Za posledni nakup, mate +150
          bonusovych bodu. <a href="#">Co za ne?</a>
        </li>
      </ul>
    </div>

    <p class="vc-dropdown-container-buttons">
      <a class="vc-btn vc-btn-xs vc-btn-default" href="#">Objednávky</a>
      <a class="vc-btn vc-btn-xs vc-btn-default" href="#">Nastavení</a>
      <a class="vc-btn vc-btn-xs vc-btn-default" href="#">Odhlásit</a>
    </p>

    <button class="close" type="button">
      <span aria-hidden="true">✕</span>
      <span class="sr-only">Close</span>
    </button>

  </div>

<?php endif; ?>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
