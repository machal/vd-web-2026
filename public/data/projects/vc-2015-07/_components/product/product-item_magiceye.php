<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-product-item">
  <a href="detail_proclear.php">
    <p class="vc-product-item-image">
      <img alt="Magic Eye (2 čočky) - dioptrické" height="115" srcset="<?php getSrcSet('magiceye'); ?>" sizes="<?php getSizesForCategory(); ?>">
    </p>
    <div class="vc-product-item-text">
      <h2 class="vc-product-item-heading">
        <span class="vc-product-item-heading-text">Magic Eye (2&nbsp;čočky) – dioptrické</span>
        <?php /* akce */ if ($_SESSION['cycle'][0][2]): ?>
          <span class="vc-offer-icon vc-offer-icon-sm">
            <span class="vc-matrjoska"><span class="vc-offer-icon-text-smaller">2+1<br>zdarma</span></span>
          </span>
        <?php endif; ?>
      </h2>
      <p class="vc-price vc-price-category">
        <span class="vc-price-value">499&nbsp;Kč</span>
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
