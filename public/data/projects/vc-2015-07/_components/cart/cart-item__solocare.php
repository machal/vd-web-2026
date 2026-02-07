<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Produkt v košíku:
-->

  <div class="vc-cart-item">

    <div class="vc-cart-item-name-image">

      <h2 class="vc-cart-item-name">
        <a href="detail_solocare.php">
          SOLOCARE AQUA 2 x 360 ml s pouzdry
        </a>
      </h2>

      <p class="vc-cart-item-image">
        <a href="detail_solocare.php">
          <img alt="SOLOCARE AQUA 2 x 360 ml" height="90"
            srcset="<?php getSrcSet('solocare'); ?>"
            sizes="<?php getSizesForCart(); ?>">
        </a>
      </p>

    </div><!-- /.vc-cart-item-name-image -->

    <div class="vc-cart-item-params">
        <?php include "../_components/product/product-options_solocare.php" ?>
    </div>

    <p class="vc-cart-item-remove">
      <button onclick="javascript:alert('Opravdu smazat položku z košíku?')" class="close" type="button">
        <span aria-hidden="true">✕</span>
        <span class="sr-only">Odstranit</span>
      </button>
    </p>

    <h3 class="vc-cart-item-price">
      509 Kč
    </h3>

  </div><!-- .vc-cart-item -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
