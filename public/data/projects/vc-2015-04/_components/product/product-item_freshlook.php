<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="product-item">
    <p class="product-item-image">
      <a href="detail_freshlook.php">
        <img alt="FreshLook ColorBlends (2 čočky) - dioptrické" height="115"
          srcset="<?php getSrcSet('freshlook'); ?>"
          sizes="<?php getSizesForCategory(); ?>">
      </a>
    </p>
    <div class="product-item-text">
      <h2 class="product-item-heading">
        <a href="detail_freshlook.php">FreshLook ColorBlends (2 čočky) - dioptrické</a>
      </h2>
      <div class="product-item-text-info">
        <p class="product-item-price">
          <strong>499&nbsp;Kč</strong>
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
