<?php

include("../_includes/init.php");

$page_name = "Úvod";
$page_type = "home";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<?php include "../_components/banner.php" ?>

<div class="vc-main">
  <div class="vc-container">

    <div class="vc-row">

      <!-- Rychlá objednávka -->
      <?php include("../_components/home/home-fastorder.php"); ?>

      <!-- Novinky -->
      <?php include("../_components/home/home-news.php"); ?>

    </div><!-- /.row -->

    <div class="vc-row">

      <div class="vc-content">

        <!-- Nejprodávanější nebo top personalizované produkty -->
        <div class="vc-product-items vc-product-items-home">

          <h2>Doporučujeme</h2>
          <?php include("../_components/product/product-item_biofinity.php"); ?>
          <?php include("../_components/product/product-item_solocare.php"); ?>
          <?php include("../_components/product/product-item_proclear.php"); ?>
          <?php include("../_components/product/product-item_freshlook.php"); ?>
          <?php include("../_components/product/product-item_magiceye.php"); ?>
          <?php include("../_components/product/product-item_frequency.php"); ?>

        </div><!-- .vc-product-items -->

        <!-- Kategorie podle doby nošení -->
        <?php include("../_components/home/home-boxes-period.php"); ?>

        <!-- Kategorie podle značek -->
        <?php include("../_components/home/home-boxes-brands.php"); ?>

        <?php /* motivátor při každém druhém načtení */ if ($_SESSION['cycle'][0][4] == 0): ?>
          <!-- Motivátor -->
          <?php include("../_components/motivator_full.php"); ?>
        <?php endif; ?>
      </div>

    </div><!-- .row -->

  </div><!-- .vc-container -->

  <?php include("../_components/testimonials.php"); ?>

</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include "../_components/bar-cookie.php" ?>

<?php include("../_includes/html-foot.php") ?>

