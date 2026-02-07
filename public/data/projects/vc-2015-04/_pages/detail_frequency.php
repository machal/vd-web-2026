<?php

include("../_includes/init.php");

$page_name = "Frequency Xcel Toric (3 čočky) 599 Kč";
$page_type = "detail";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container container-relative">

    <?php include "../_components/banner__inside.php" ?>


<div class="row">

  <div class="content content-narrower">

  <style>
    /* TODO do .less */
    .page-heading {
      margin-bottom: 9px;
    }
    .detail-price {
      margin-bottom: 7px;
    }
  </style>

        <h1 class="page-heading">
          Frequency Xcel Toric (3 čočky)
        </h1>

        <p class="detail-categories">
          <a href="category_2nd_level.php">Měsíční</a>
          kontaktní čočky
          značky
          <a href="category_2nd_level.php">Cooper Vision</a>.
        </p>

        <h2 class="detail-price">
          599 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> > 700 ks.
        </p>

        <p class="detail-image">
          <img alt="Frequency Xcel Toric (3 čočky)" height="300"
            srcset="<?php getSrcSet('frequency'); ?>"
            sizes="<?php getSizesForDetail(); ?>">
        </p>

        <?php include "../_components/product/product-options_frequency.php" ?>

        <form action="cart.php" class="detail-add-to-cart">
          <input type="submit" class="btn btn-primary btn-lg" value="Přidat do košíku">
        </form>

        <p class="detail-transport box box-info">
          <b>Doprava zdarma nad 1600 Kč</b><br>
          Pod 1600 Kč - Výdejní místa 24 Kč<br>
          Platba předem 69 Kč, dobírka 99 Kč
        </p>

        <div class="detail-motivator">
          <?php include "../_components/motivator_detail.php" ?>
        </div>

        <?php include "../_components/detail/detail-rating.php" ?>

        <div class="detail-description">
          <h2 class="h3 heading-underlined">
            Více o produktu
          </h2>
          <div class="detail-description-content">
            <p>
              Frequency Xcel Toric jsou měkké torické kontaktní čočky od společnosti Cooper Vision. Výrazně zlepšují kvalitu vidění při astigmatismu. Jsou charakteristické velmi pohodlným nošením a stabilním viděním. Čočky jsou vybaveny indikátorem RUB-LÍC, který umožňuje snadnou manipulaci a rychlou aplikaci.
            </p>
        </div>

        <?php include "../_components/detail/detail-pars-questions.php" ?>


  </div><!-- .content -->

</div><!-- .row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
