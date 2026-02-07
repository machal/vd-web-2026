<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-product-item">
  <a href="detail_biofinity.php">
    <p class="vc-product-item-image">
      <img alt="Biofinity (6 čoček)" height="115" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForCategory(); ?>">
      <!--
      <span class="vc-bubble vc-bubble-lg vc-bubble-detail" aria-hidden="true">
        <span class="vc-matrjoska">Již jste zakoupili</span>
      </span>
      -->
    </p>
    <div class="vc-product-item-text">
      <h2 class="vc-product-item-heading">
        <span class="vc-product-item-heading-text">Biofinity (6&nbsp;čoček)</span>
        <?php /* akce */ if ($_SESSION['cycle'][0][1]): ?>
          <span class="vc-offer-icon vc-offer-icon-sm">
            <span class="vc-matrjoska">Akce</span>
          </span>
        <?php endif; ?>
      </h2>
      <p class="vc-price vc-price-category">
        <del>750&nbsp;Kč</del>
        <span class="vc-price-value">648&nbsp;Kč</span>
        <span class="vc-price-per-item">108,58&nbsp;Kč za&nbsp;kus</span>
      </p>
      <p class="vc-product-item-stock">Skladem</p>
    </div>
  </a>
</div>
<!-- .vc-product-item -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
