<?php

include("../_includes/init.php");

$page_name = "Proclear Multifocal Toric (3 čočky) 1 259 Kč";
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

        <h1 class="vc-page-heading">
          Proclear Multifocal Toric (3 čočky)
        </h1>

        <p class="vc-detail-categories">
          <a href="category_2nd_level.php">Měsíční</a>
          kontaktní čočky
          výrobce
          <a href="category_2nd_level.php">Cooper Vision</a>.
        </p>

        <p class="vc-detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> &gt; 300&nbsp;ks.
        </p>

        <h2 class="vc-price vc-price-detail">
          <span class="vc-price-value">4<span class="vc-number-space"></span>259&nbsp;Kč</span>
          <span class="vc-price-note">inkl. USt. zzgl. Versandkosten</span>
          <span class="vc-price-per-item">2<span class="vc-number-space"></span>108,58&nbsp;Kč za&nbsp;kus</span>
        </h2>

        <div class="vc-detail-image">
          <div class="vc-detail-image-main">
            <img alt="Proclear Multifocal Toric (3 čočky)" height="300" srcset="<?php getSrcSet('proclear'); ?>" sizes="<?php getSizesForDetail(); ?>">
            <span class="vc-offer-icon">
              <span class="vc-matrjoska"><span class="vc-offer-icon-text-smaller">Dnes<br>doprava<br>zdarma<br>!!!</span></span>
            </span>
          </div>
        </div>

        <form action="cart.php">
          <?php include "../_components/product/product-options_proclear.php" ?>
        </form>

        <?php include "../_components/motivator_detail.php" ?>

        <?php include "../_components/detail/detail-rating.php" ?>

        <div class="vc-detail-description">
          <h2 class="h3 vc-heading-lined">
            <span>Více o produktu</span>
          </h2>
          <div class="vc-detail-description-content">
            <p class="vc-detail-description-image">
              <img alt="Biofinity 648 Kč" height="300" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForDetailSmall(); ?>">
            </p>
            <p>Proclear Multifocal Toric jsou víceohniskové kontaktní čočky, které umožňují bezproblémové vidění na dálku, na střední vzdálenost i na blízko. Určené pro každodenní nošení s výměnou po jednom měsíci. Díky stálému zvlhčení jsou Proclear Multifocal čočky, které Vám pomáhají celý den.</p>
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
