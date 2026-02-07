<?php

include("../_includes/init.php");

$page_name = "Frequency Xcel Toric (3 čočky) 599 Kč";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container container-relative">

    <?php include "../_components/banner__inside.php" ?>


<div class="row">

  <div class="content content-narrower">

        <h1 class="page-heading">
          Frequency Xcel Toric (3 čočky)
        </h1>

        <h2 class="detail-price">
          599 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> > 700 ks.
        </p>

        <p class="detail-image">
          <img src="../dist/img/product_2118-1-330.jpg"
          alt="Frequency Xcel Toric (3 čočky)"
          width="330"
          height="263" />
        </p>

        <?php include "../_components/detail/opts-selector_frequency.php" ?>

        <form action="cart.php" class="detail-add-to-cart">
          <input type="submit" class="btn btn-primary btn-lg" value="Přidat do košíku">
        </form>

        <p class="detail-transport">
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
          <p>
            Frequency Xcel Toric jsou měkké torické kontaktní čočky od společnosti Cooper Vision. Výrazně zlepšují kvalitu vidění při astigmatismu. Jsou charakteristické velmi pohodlným nošením a stabilním viděním. Čočky jsou vybaveny indikátorem RUB-LÍC, který umožňuje snadnou manipulaci a rychlou aplikaci.
          </p>
          <div class="table-responsive">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th>Výrobce:</th>
                  <td><a itemprop="manufacturer" href="#">Cooper Vision</a></td>
                </tr>
                <tr>
                  <th>Kategorie:</th>
                  <td>
                    <a href="category.php">Měsíční čočky</a><br>
                    <a href="category.php">Torické čočky</a>
                  </td>
                </tr>
            </tbody>
            </table>
          </div>
        </div>

        <?php include "../_components/detail/detail-pars-questions.php" ?>


  </div><!-- .content -->

</div><!-- .row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
