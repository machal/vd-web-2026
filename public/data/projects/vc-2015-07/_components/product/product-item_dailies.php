<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-product-item">
  <a href="detail_proclear.php">
    <p class="vc-product-item-image">
      <img alt="DAILIES AquaComfort Plus (30 čoček)" height="115" srcset="<?php getSrcSet('dailies'); ?>" sizes="<?php getSizesForCategory(); ?>">
    </p>
    <div class="vc-product-item-text">
      <h2 class="vc-product-item-heading">
        <span class="vc-product-item-heading-text">DAILIES AquaComfort Plus (30&nbsp;čoček)</span>
        <?php /* akce */ if ($_SESSION['cycle'][0][2]): ?>
          <span class="vc-offer-icon vc-offer-icon-sm">
            <span class="vc-matrjoska"><span class="vc-offer-icon-text-small">Sleva</span><br>100%</span>
          </span>
        <?php endif; ?>
      </h2>
      <p class="vc-price vc-price-category">
        <span class="vc-price-value">429&nbsp;Kč</span>
        <span class="vc-price-per-item">108,58&nbsp;Kč za&nbsp;kus</span>
      </p>
      <?php /* skladem */ if (mt_rand(0,3)): ?>
        <p class="vc-product-item-stock">Skladem</p>
      <?php endif; ?>
    </div>
  </a>
</div>
<!-- .vc-product-item -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
