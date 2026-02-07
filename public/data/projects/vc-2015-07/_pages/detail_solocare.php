<?php

include("../_includes/init.php");

$page_name = "SOLOCARE AQUA 2 x 360 ml s pouzdry 509 Kč";
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

        <h1 class="vc-page-heading">SOLOCARE AQUA 2&nbsp;×&nbsp;360&nbsp;ml</h1>

        <p class="vc-detail-categories">
          <a href="category_2nd_level.php">Roztok</a>
          na kontaktní čočky od výrobce
          <a href="category_2nd_level.php">EYESHELTER</a>.
        </p>

        <div class="vc-detail-image-main">
          <a href="#centralni-sklad">Na skladě</a> &gt; 2<span class="vc-number-space"></span>300&nbsp;ks, <a href="#prodejna">prodejna Praha</a> 2&nbsp;ks.
        </div>

        <h2 class="vc-price vc-price-detail">
          <span class="vc-price-value">509&nbsp;Kč</span>
        </h2>

        <div class="vc-detail-image">
          <div class="vc-detail-image-main">
            <img alt="SOLOCARE AQUA 2 x 360 ml 509 Kč" height="300" srcset="<?php getSrcSet('solocare'); ?>" sizes="<?php getSizesForDetail(); ?>">
          </div>
        </div>

        <form action="cart.php">
          <?php include "../_components/product/product-options_solocare.php" ?>
        </form>

        <?php include "../_components/motivator_detail.php" ?>

        <?php include "../_components/detail/detail-rating.php" ?>

        <div class="vc-detail-description">
          <h2 class="h3 vc-heading-lined">
            <span>Více o produktu</span>
          </h2>
          <div class="vc-detail-description-content">
            <p class="vc-detail-description-image">
              <img alt="SOLOCARE AQUA 2 x 360 ml 509 Kč" height="300" srcset="<?php getSrcSet('solocare'); ?>" sizes="<?php getSizesForDetailSmall(); ?>">
            </p>
            <p>Roztok SOLOCARE AQUA 2×360 ml s pouzdry je víceúčelový roztok od firmy Alcon, určený k čištění, dezinfekci, oplachování, uchovávání a zvlhčování kontaktních čoček. Uživatelé ocení zejména moderní metodu zvlhčování, díky které mohou kontaktní čočky vydržet dostatečně hydratované po celý den.</p>
          </div>
        </div>

        <?php include "../_components/detail/detail-parameters.php" ?>

        <?php include "../_components/detail/detail-questions.php" ?>

      </div>

    </div><!-- .row -->

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
