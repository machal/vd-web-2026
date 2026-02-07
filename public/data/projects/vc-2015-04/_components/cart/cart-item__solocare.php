<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Produkt v košíku:
-->

  <div class="cart-item">

    <div class="cart-item-name-image">

      <h2 class="cart-item-name">
        <a href="detail_solocare.php">
          SOLOCARE AQUA 2 x 360 ml s pouzdry
        </a>
      </h2>

      <p class="cart-item-image">
        <a href="detail_solocare.php">
          <img alt="SOLOCARE AQUA 2 x 360 ml" height="90"
            srcset="<?php getSrcSet('solocare'); ?>"
            sizes="<?php getSizesForCart(); ?>">
        </a>
      </p>

    </div><!-- /.cart-item-name-image -->

    <div class="cart-item-params">
        <?php include "../_components/product/product-options_solocare.php" ?>
    </div>

    <p class="cart-item-remove">
      <a href="javascript:alert('Opravdu smazat položku z košíku?')" class="btn btn-default btn-xs">
        Odstranit
      </a>
    </p>

    <h3 class="cart-item-price">
      509 Kč
    </h3>

  </div><!-- .cart-item -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
