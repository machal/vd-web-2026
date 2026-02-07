<?php

// Výběr dárků

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-cart-gifts">

  <!-- Vyberte si dárek zdarma -->
  <div class="vc-cart-gifts-offer">
    <h2 class="sr-only">
      Chcete dárek?
    </h2>
    <span class="badge">98 <span class="sr-only">bonusových bodů</span></span>
    <p>Máte <strong>98 bonusových bodů</strong>.<br>
    <a class="collapsed" href="#vc-cart-gifts" data-toggle="collapse" aria-expanded="false" aria-controls="vc-cart-gifts">
      Vyberte si dárek&nbsp;zdarma<span class="vc-caret"></span></a>
    </p>
  </div>

  <div class="collapse" id="vc-cart-gifts">
    <div class="vc-product-items">

      <div class="vc-product-item">
        <a href="detail_biofinity.php">
          <p class="vc-product-item-image">
            <img alt="Biofinity (6 čoček)" height="115" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForCategory(); ?>">
          </p>
          <div class="vc-product-item-text">
            <h2 class="vc-product-item-heading">
              <span class="vc-product-item-heading-text">Proclear Multifocal Toric for Astigmatism (3&nbsp;čočky)</span>
            </h2>
          </div>
        </a>
        <div class="vc-product-item-check">
          <button class="vc-btn vc-btn-default vc-btn-xs" type="button">Vybrat</button>
        </div>
      </div>

      <div class="vc-product-item">
        <a href="detail_biofinity.php">
          <p class="vc-product-item-image">
            <img alt="Biofinity (6 čoček)" height="115" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForCategory(); ?>">
          </p>
          <div class="vc-product-item-text">
            <h2 class="vc-product-item-heading">
              <span class="vc-product-item-heading-text">Biofinity (6&nbsp;čoček)</span>
            </h2>
          </div>
        </a>
        <div class="vc-product-item-check">
          <button class="vc-btn vc-btn-default vc-btn-xs" type="button">Vybrat</button>
        </div>
      </div>

      <div class="vc-product-item">
        <a href="detail_biofinity.php">
          <p class="vc-product-item-image">
            <img alt="Biofinity (6 čoček)" height="115" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForCategory(); ?>">
          </p>
          <div class="vc-product-item-text">
            <h2 class="vc-product-item-heading">
              <span class="vc-product-item-heading-text">DAILIES AquaComfort Plus (30&nbsp;čoček)</span>
            </h2>
          </div>
        </a>
        <div class="vc-product-item-check">
          <button class="vc-btn vc-btn-default vc-btn-xs" type="button">Vybrat</button>
        </div>
      </div>

      <div class="vc-product-item">
        <a href="detail_biofinity.php">
          <p class="vc-product-item-image">
            <img alt="Biofinity (6 čoček)" height="115" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForCategory(); ?>">
          </p>
          <div class="vc-product-item-text">
            <h2 class="vc-product-item-heading">
              <span class="vc-product-item-heading-text">FreshLook ColorBlends (2&nbsp;čočky) – dioptrické</span>
            </h2>
          </div>
        </a>
        <div class="vc-product-item-check">
          <button class="vc-btn vc-btn-default vc-btn-xs" type="button">Vybrat</button>
        </div>
      </div>

    </div><!-- .vc-product-items -->
    <div class="text-center">
      <button class="vc-btn vc-btn-default vc-btn-xs" type="button">Další dárky</button>
    </div>
  </div>

</div><!-- /.vc-cart-gifts -->




<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
