<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="product-item">
    <p class="product-item-image">
      <a href="detail_biofinity.php">
        <img alt="Biofinity (6 čoček)" height="115"
          srcset="<?php getSrcSet('biofinity'); ?>"
          sizes="<?php getSizesForCategory(); ?>">
      </a>
    </p>
    <div class="product-item-text">
      <h2 class="product-item-heading">
        <a href="detail_biofinity.php">Biofinity (6 čoček)</a>
        <a class="offer-icon offer-icon-sm product-item-offer" href="detail_biofinity.php">
          Akce
        </a>
      </h2>
      <div class="product-item-text-info">
        <p class="product-item-price">
          <strong>648&nbsp;Kč</strong>
        </p>
        <p class="product-item-stock">
          Skladem
        </p>
      </div>
    </div>
</div><!-- .product-item -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
