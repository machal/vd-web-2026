<?php

include("../_includes/init.php");

$page_name = "Jednodenní kontaktní čočky Alcon";
$page_type = "category";

?>

<?php include("../_includes/html-head.php") ?>

<div class="page-category">

    <?php include "../_components/bar.php" ?>

    <?php include("../_components/head/head.php") ?>

    <div class="container">

      <?php include "../_components/banner__inside.php" ?>

      <h1 class="page-heading">
        Jednodenní kontaktní čočky
        Alcon
      </h1>


      <div class="row">

        <div class="category-metainfo">

          <div class="category-description">
            <p>
              Jednodenní kontaktní čočky nabízejí nejzdravější a nejpohodlnější způsob nošení kontaktních čoček. Ráno si čočku nasadíte a večer zahodíte, není potřeba žádné speciální péče (čištění, roztoky apod.).
            </p>
          </div>

          <div class="category-directory">
            <?php include("../_components/category/directory_2nd_level_combine.php"); ?>
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

    </div><!-- #product-items -->

  <?php include("../_components/pagination.php"); ?>

  <div class="testimonials">
    <?php include("../_components/row-testimonials.php"); ?>
  </div><!-- /.testimonials -->

  </div><!-- .container-full -->

  <?php include("../_components/foot/foot.php") ?>

</div><!-- /.page-category-v1 -->

<?php include("../_includes/html-foot.php") ?>
