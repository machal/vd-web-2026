<?php

include("../_includes/init.php");

$page_name = "Všechny varianty";
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

        <h1 class="vc-page-heading" style="margin-bottom:-40px;">
          Všechny varianty parametrů
        </h1>

        <style> .vc-detail-add-to-cart{ display: none;} </style>

        <h2 style="margin-bottom:-40px;">(1položkový) Solocare</h2>
        <?php include "../_components/product/product-options_solocare.php" ?>

        <h2 style="margin-bottom:-40px;">(4položkový) Biofinity</h2>
        <?php include "../_components/product/product-options_biofinity.php" ?>

        <h2 style="margin-bottom:-40px;">(5položkový) FreshLook ColorBlends</h2>
        <?php include "../_components/product/product-options_freshlook.php" ?>

        <h2 style="margin-bottom:-40px;">(6položkový) Frequency Xcel Toric</h2>
        <?php include "../_components/product/product-options_frequency.php" ?>

        <h2 style="margin-bottom:-40px;">(7položkový) Proclear Multifocal Toric</h2>
        <?php include "../_components/product/product-options_proclear.php" ?>

      </div>

    </div><!-- .row -->

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
