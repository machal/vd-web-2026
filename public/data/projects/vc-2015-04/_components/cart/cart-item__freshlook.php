<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Produkt v košíku:
-->

  <div class="cart-item">

    <h2 class="cart-item-name">
      <a href="detail_freshlook.php">
        FreshLook ColorBlends (2 čočky) - dioptrické
      </a>
    </h2>

    <p class="cart-item-image">
      <a href="detail_freshlook.php">
          <img alt="FreshLook ColorBlends (2 čočky) - dioptrické" height="90"
            srcset="<?php getSrcSet('freshlook'); ?>"
            sizes="<?php getSizesForCart(); ?>">
      </a>
    </p>

    <div class="cart-item-params">
        <?php include "../_components/product/product-options_freshlook.php" ?>
    </div>

    <p class="cart-item-remove">
      <a href="javascript:alert('Opravdu smazat položku z košíku?')" class="btn btn-default btn-xs">
        Odstranit
      </a>
    </p>

    <h3 class="cart-item-price">
      499 Kč
    </h3>

  </div><!-- .cart-item -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
