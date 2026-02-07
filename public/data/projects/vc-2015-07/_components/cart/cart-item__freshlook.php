<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Produkt v košíku:
-->

  <div class="vc-cart-item">

    <h2 class="vc-cart-item-name">
      <a href="detail_freshlook.php">
        FreshLook ColorBlends (2 čočky) - dioptrické
      </a>
    </h2>
    <div class="vc-cart-item-edit">
      <a href="#vc-product-options-items-2" class="vc-btn vc-btn-default vc-btn-xs">Upravit</a>
    </div>

    <p class="vc-cart-item-image">
      <a href="detail_freshlook.php">
          <img alt="FreshLook ColorBlends (2 čočky) - dioptrické" height="90"
            srcset="<?php getSrcSet('freshlook'); ?>"
            sizes="<?php getSizesForCart(); ?>">
      </a>
    </p>

    <div class="vc-cart-item-params">
        <?php include "../_components/product/product-options_freshlook.php" ?>
    </div>

    <p class="vc-cart-item-remove">
      <button onclick="javascript:alert('Opravdu smazat položku z košíku?')" class="close" type="button">
        <span aria-hidden="true">✕</span>
        <span class="sr-only">Odstranit</span>
      </button>
    </p>

    <h3 class="vc-cart-item-price">
      499 Kč
    </h3>

  </div><!-- .vc-cart-item -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
