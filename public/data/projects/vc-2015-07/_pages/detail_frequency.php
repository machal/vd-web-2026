<?php

include("../_includes/init.php");

$page_name = "Frequency Xcel Toric (3 čočky) 599 Kč";
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

        <h1 class="vc-page-heading vc-detail-heading">Frequency Xcel Toric (3 čočky)</h1>

        <p class="vc-detail-categories">
          <a href="category_2nd_level.php">Měsíční</a>
          kontaktní čočky od výrobce
          <a href="category_2nd_level.php">Cooper Vision</a>.
        </p>

        <p class="vc-detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> &gt; 700&nbsp;ks.
        </p>

        <h2 class="vc-price vc-price-detail">
          <span class="vc-price-value">599&nbsp;Kč</span>
          <span class="vc-price-note">inkl. USt. zzgl. Versandkosten</span>
          <span class="vc-price-per-item">108,58&nbsp;Kč za&nbsp;kus</span>
        </h2>

        <div class="vc-detail-image">
          <div class="vc-detail-image-main">
            <img alt="Frequency Xcel Toric (3 čočky)" height="300" srcset="<?php getSrcSet('frequency'); ?>" sizes="<?php getSizesForDetail(); ?>">
          </div>
        </div>

        <form action="cart.php">
          <?php include "../_components/product/product-options_frequency.php" ?>
        </form>

        <?php include "../_components/motivator_detail.php" ?>

        <?php include "../_components/detail/detail-rating.php" ?>

        <div class="vc-detail-description">
          <h2 class="h3 vc-heading-lined">
            <span>Více o produktu</span>
          </h2>
          <div class="vc-detail-description-content">
            <p class="vc-detail-description-image">
              <img alt="Frequency Xcel Toric (3 čočky)" height="300" srcset="<?php getSrcSet('frequency'); ?>" sizes="<?php getSizesForDetailSmall(); ?>">
            </p>
            <p>Frequency Xcel Toric jsou měkké torické kontaktní čočky od společnosti Cooper Vision. Výrazně zlepšují kvalitu vidění při astigmatismu. Jsou charakteristické velmi pohodlným nošením a stabilním viděním. Čočky jsou vybaveny indikátorem RUB-LÍC, který umožňuje snadnou manipulaci a rychlou aplikaci.</p>
          </div>
        </div>

        <?php include "../_components/detail/detail-parameters.php" ?>

        <?php include "../_components/detail/detail-questions.php" ?>


      </div><!-- .vc-content -->

    </div><!-- .row -->
  </div><!-- .vc-main -->

</div><!-- .vc-container -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
