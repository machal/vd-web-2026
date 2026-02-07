<?php

include("../_includes/init.php");

$page_name = "Jednodenní kontaktní čočky";
$page_type = "category";

?>

<?php include("../_includes/html-head.php") ?>

<?php include "../_components/bar.php" ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-top">
  <div class="vc-container vc-container-relative">

    <?php include "../_components/banner__inside.php" ?>

    <div class="vc-row">


      <div class="vc-category-first-col">
        <h1 class="vc-page-heading">Jednodenní kontaktní čočky</h1>
        <?php include("../_components/category/filter.php"); ?>
      </div>

      <div class="vc-category-description">

        <?php include("../_components/category/person.php") ?>

        <div class="vc-top-bubble">
          <p>Jednodenní kontaktní čočky nabízejí nejzdravější a nejpohodlnější způsob nošení kontaktních čoček. Ráno si
            čočku nasadíte a večer zahodíte, není potřeba žádné speciální péče (čištění, roztoky apod.)</p>

          <?php include("../_components/category/need_help.php") ?>

        </div>

      </div>

    </div>
    <!-- .row  -->

  </div>
</div>

<div class="vc-main">
  <div class="vc-container vc-container-full">

    <div class="vc-product-items">

      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_dailies.php"); ?>
      <?php include("../_components/product/product-item_proclear.php"); ?>
      <?php include("../_components/product/product-item_solocare.php"); ?>

      <!-- Kotva pro umisteni motivatoru na stredne velkych screenech -->
      <div id="vc-motivator-after-4-products"></div>

      <?php include("../_components/product/product-item_magiceye.php"); ?>

      <!-- Kotva pro umisteni motivatoru na stredne velkych screenech -->
      <div id="vc-motivator-after-5-products"></div>

      <?php include("../_components/product/product-item_freshlook.php"); ?>

      <!-- Umisteni motivatoru na malych screenech -->
      <div id="vc-motivator-after-6-products" class="vc-motivator-container">
        <?php include("../_components/motivator_full.php"); ?>
      </div>

      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_freshlook.php"); ?>
      <?php include("../_components/product/product-item_magiceye.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_proclear.php"); ?>
      <?php include("../_components/product/product-item_dailies.php"); ?>

      <?php include("../_components/product/product-item_biofinity.php"); ?>
      <?php include("../_components/product/product-item_freshlook.php"); ?>
      <?php include("../_components/product/product-item_magiceye.php"); ?>
      <?php include("../_components/product/product-item_frequency.php"); ?>
      <?php include("../_components/product/product-item_proclear.php"); ?>
      <?php include("../_components/product/product-item_dailies.php"); ?>

    </div>
    <!-- .vc-product-items -->

    <?php include("../_components/pagination.php"); ?>

  </div><!-- .vc-container-full -->

  <?php include("../_components/testimonials.php"); ?>

</div><!-- .vc-main -->


<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
