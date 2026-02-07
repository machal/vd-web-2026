<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-product-item">
  <a href="detail_solocare.php">
    <p class="vc-product-item-image">
      <img alt="SOLOCARE AQUA 2 × 360 ml)" height="115" srcset="<?php getSrcSet('solocare'); ?>" sizes="<?php getSizesForCategory(); ?>">
    </p>
    <div class="vc-product-item-text">
      <h2 class="vc-product-item-heading">
        <span class="vc-product-item-heading-text">SOLOCARE AQUA 2&nbsp;×&nbsp;360&nbsp;ml</span>
        <?php /* akce */ if ($_SESSION['cycle'][0][3]): ?>
          <span class="vc-offer-icon vc-offer-icon-sm">
            <span class="vc-matrjoska">Akce</span>
          </span>
        <?php endif; ?>
      </h2>
      <p class="vc-price vc-price-category">
        <span class="vc-price-value">509&nbsp;Kč</span>
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
