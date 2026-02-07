<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-product-item">
  <a href="detail_proclear.php">
    <p class="vc-product-item-image">
      <img alt="Proclear Multifocal Toric for Astigmatism (3 čočky)" height="115" srcset="<?php getSrcSet('proclear'); ?>" sizes="<?php getSizesForCategory(); ?>">
    </p>
    <div class="vc-product-item-text">
      <h2 class="vc-product-item-heading">
        <span class="vc-product-item-heading-text">Proclear Multifocal Toric for a unusually long-ranged Astigmatism (3&nbsp;čočky)</span>
        <?php /* akce */ if ($_SESSION['cycle'][0][3]): ?>
          <span class="vc-offer-icon vc-offer-icon-sm">
            <span class="vc-matrjoska">Akce</span>
          </span>
        <?php endif; ?>
      </h2>
      <p class="vc-price vc-price-category">
        <del>4<span class="vc-number-space"></span>750&nbsp;Kč</del>
        <span class="vc-price-value">2<span class="vc-number-space"></span>648&nbsp;Kč</span>
        <span class="vc-price-per-item">1<span class="vc-number-space"></span>108,58&nbsp;Kč za&nbsp;kus</span>
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
