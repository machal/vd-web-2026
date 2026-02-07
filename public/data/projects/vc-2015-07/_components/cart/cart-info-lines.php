<?php

// Informativní a motivační hlášky pod košíkem: celková dostupnosti atd.

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-cart-info-lines vc-list vc-list-bordered vc-list-complex-items">

  <!-- Dostupnost zboží -->
  <div class="vc-cart-availability vc-list-item">
    <div class="vc-list-item-heading">
      <h2 class="sr-only">Dostupnost zboží</h2>
      <p>Dostupnost <strong class="label label-success">v pondělí 19. 1. u vás.</strong></p>
    </div>
  </div>

  <!-- Do poštovného zdarma zbývá
  TODO: Zobrazujme jen pokud je ta částka přiměřeně nízká. -->
  <div class="vc-cart-remains vc-list-item">
    <div class="vc-list-item-heading">
      <h2 class="sr-only">
        Poštovné zdarma
      </h2>
      <p>Do <strong class="label label-warning">poštovného zdarma</strong> zbývá <strong>622&nbsp;Kč</strong>.</p>
    </div>
  </div>

</div><!-- /.vc-cart-info-lines -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
