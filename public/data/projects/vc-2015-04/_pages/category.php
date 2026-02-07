<?php

include("../_includes/init.php");

$page_name = "Kontaktní čočky";
$page_type = "category";

?>

<?php include("../_includes/html-head.php") ?>

<div class="page-category">

    <?php include "../_components/bar.php" ?>

    <?php include("../_components/head/head.php") ?>

    <div class="container">

      <?php include "../_components/banner__inside.php" ?>

      <h1 class="page-heading">
        Kontaktní čočky
      </h1>

      <div class="row">

        <div class="category-metainfo">

          <div class="category-description">
            <p>
              Kontaktní čočky vynalezl pan Otto Wichterle. První měkké kontaktní čočky byly vyrobeny již v roce 1961. Kontaktní čočka je průhledná a umísťuje se přímo na rohovku oka.
            </p>
          </div>

          <div class="category-directory">
            <?php include("../_components/category/directory.php"); ?>
          </div>

        </div>

        <!-- Kotva pro umisteni motivatoru na velkych screenech -->
        <div class="category-motivator-top" id="motivator-top"></div>

      </div><!-- .row  -->

    </div><!-- .container -->


  <div class="container container-full container-right-glued">

    <div id="product-items" class="product-items-6-on-row product-items-3-on-row">

      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_freshlook.php"); ?>
      <?php include("../_components/product/product-item_proclear.php"); ?>

      <!-- Kotva pro umisteni motivatoru na stredne velkych screenech -->
      <div id="motivator-after-4-products"></div>

      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_dailies.php"); ?>

      <!-- Umisteni motivatoru na malych screenech -->
      <div id="motivator-after-6-products" class="motivator-container">
        <?php include("../_components/motivator_full.php"); ?>
      </div>

      <?php include("../_components/product/product-item_proclear.php"); ?>
      <?php include("../_components/product/product-item_magiceye.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_freshlook.php"); ?>
      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_dailies.php"); ?>
      <?php include("../_components/product/product-item_proclear.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_freshlook.php"); ?>
      <?php include("../_components/product/product-item_proclear.php"); ?>
      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_freshlook.php"); ?>
      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_magiceye.php"); ?>

    </div><!-- #product-items -->

  <?php include("../_components/pagination.php"); ?>

  <div class="testimonials">
    <?php include("../_components/row-testimonials.php"); ?>
  </div><!-- /.testimonials -->

  </div><!-- .container-full -->

  <?php include("../_components/foot/foot.php") ?>

</div><!-- /.page-category-v1 -->

<?php include("../_includes/html-foot.php") ?>
