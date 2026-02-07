<?php

include("../_includes/init.php");

$page_name = "Úvod";
$page_type = "home";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container">

    <?php include "../_components/banner.php" ?>

    <div class="row">

      <div class="content">

        <div class="row">

          <!-- Rychlá objednávka -->

          <?php include("../_components/home/home-fastorder.php"); ?>

          <!-- Novinky -->

          <?php include("../_components/home/home-news.php"); ?>

        </div><!-- /.row -->


        <!-- Nejprodávanější nebo top personalizované produkty -->

        <div id="product-items" class="clearfix">

          <h2>Doporučujeme</h2>

          <?php include("../_components/product/product-item_biofinity.php"); ?>
          <?php include("../_components/product/product-item_magiceye.php"); ?>
          <?php include("../_components/product/product-item_freshlook.php"); ?>
          <?php include("../_components/product/product-item_proclear.php"); ?>

        </div><!-- #product-items -->


        <!-- Kategorie podle značek -->

        <?php include("../_components/home/home-boxes-brands.php"); ?>


        <!-- Kategorie podle doby nošení -->

        <?php include("../_components/home/home-boxes-period.php"); ?>


        <!-- Motivátor -->

        <?php include("../_components/motivator_full.php"); ?>


        <div class="testimonials">
          <?php include("../_components/row-testimonials.php"); ?>
        </div><!-- /.testimonials -->

      </div>

    </div><!-- .row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

