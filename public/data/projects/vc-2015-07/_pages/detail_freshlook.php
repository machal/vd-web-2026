<?php

include("../_includes/init.php");

$page_name = "FreshLook ColorBlends 499 Kč";
$page_type = "detail";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-top">
  <div class="vc-container vc-container-relative">
    <?php include "../_components/banner__inside.php" ?>
  </div>
</div>

<div class="vc-main">
  <div class="vc-container vc-container-relative">

    <div class="vc-row">

      <div class="vc-content vc-content-narrower">

        <h1 class="vc-page-heading">FreshLook ColorBlends (2 čočky) - dioptrické</h1>

        <p class="vc-detail-categories">
          <a href="category_2nd_level.php">Měsíční</a>
          kontaktní čočky od výrobce
          <a href="category_2nd_level.php">Alcon</a>.
        </p>

        <p class="vc-detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> &gt; 300&nbsp;ks.
        </p>

        <h2 class="vc-price vc-price-detail">
          <span class="vc-price-value">499&nbsp;Kč</span>
          <span class="vc-price-note">inkl. USt. zzgl. Versandkosten</span>
          <span class="vc-price-per-item">108,58&nbsp;Kč za&nbsp;kus</span>
        </h2>

        <div class="vc-detail-image">
          <div class="vc-detail-image-main">
            <img alt="FreshLook ColorBlends (2 čočky) - dioptrické" height="300" srcset="<?php getSrcSet('freshlook'); ?>" sizes="<?php getSizesForDetail(); ?>">
            <span class="vc-offer-icon">
              <span class="vc-matrjoska"><span class="vc-offer-icon-text-small">Sleva</span><br>100%</span>
            </span>
          </div>
        </div>

        <form action="cart.php">
          <?php include "../_components/product/product-options_freshlook.php" ?>
        </form>

        <?php include "../_components/motivator_detail.php" ?>

        <?php include "../_components/detail/detail-rating.php" ?>

        <div class="vc-detail-description">
          <h2 class="h3 vc-heading-lined">
            <span>Více o produktu</span>
          </h2>
          <div class="vc-detail-description-content">
            <p class="vc-detail-description-image">
              <img alt="FreshLook ColorBlends (2 čočky) - dioptrické" height="300" srcset="<?php getSrcSet('freshlook'); ?>" sizes="<?php getSizesForDetailSmall(); ?>">
            </p>
            <p>FreshLook ColorBlends (2 čočky) – dioptrické jsou barevné kontaktní čočky od společnosti Ciba Vision. Patří k nejoblíbenějším barevným kontaktním čočkám na trhu. K přednostem FreshLook ColorBlends patří pohodlné nošení a perfektní výsledný efekt, který klade důraz na přirozenou proměnu.</p>
          </div>
        </div>

        <?php include "../_components/detail/detail-parameters.php" ?>

        <?php include "../_components/detail/detail-questions.php" ?>

      </div><!-- .vc-content -->

    </div><!-- .row -->

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
