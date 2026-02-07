<?php

// Informativní a motivační hlášky pod košíkem: celková dostupnosti, dárek atd.

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="cart-info-lines">

  <!-- Dostupnost zboží -->
  <div class="cart-availability cart-info-line">
    <h2 class="sr-only">Dostupnost zboží</h2>
    <p>
      Dostupnost <strong>v pondělí 19. 1.</strong> u vás.
    </p>
  </div>

  <!-- Do poštovného zdarma zbývá
  TODO: Zobrazujme jen pokud je ta částka přiměřeně nízká. -->
  <div class="cart-remains cart-info-line">
    <h2 class="sr-only">
      Poštovné zdarma
    </h2>
    <p>
      Do poštovného zdarma zbývá
      <strong>622&nbsp;Kč</strong>.
    </p>
  </div>

  <!-- Vyberte si dárek zdarma -->
  <div class="cart-bonus cart-info-line">
    <h2 class="sr-only">
      Chcete dárek?
    </h2>
    <p>
      Máte <strong>98 bonusových bodů</strong>.
      <a href="category.php">
        Vyberte si dárek&nbsp;zdarma.
      </a>
    </p>
  </div>

</div><!-- /.cart-info-lines -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
