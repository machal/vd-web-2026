<?php

include("../_includes/init.php");

$page_name = "Proclear Multifocal Toric (3 čočky) 1 259 Kč";
$page_type = "detail";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container container-relative">

    <?php include "../_components/banner__inside.php" ?>


<div class="row">

  <div class="content content-narrower">

        <h1 class="page-heading">
          Proclear Multifocal Toric (3 čočky)
        </h1>

        <h2 class="detail-price">
          1 259 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> > 300 ks.
        </p>

        <p class="detail-image">
          <img alt="Proclear Multifocal Toric (3 čočky)" height="300"
            srcset="<?php getSrcSet('proclear'); ?>"
            sizes="<?php getSizesForDetail(); ?>">
        </p>

        <?php include "../_components/product/product-options_proclear.php" ?>

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
              Proclear Multifocal Toric jsou víceohniskové kontaktní čočky, které umožňují bezproblémové vidění na dálku, na střední vzdálenost i na blízko. Určené pro každodenní nošení s výměnou po jednom měsíci. Díky stálému zvlhčení jsou Proclear Multifocal čočky, které Vám pomáhají celý den.
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
                      <a href="category.php">Torické čočky</a><br>
                      <a href="category.php">Bifokální a multifokální</a>
                    </td>
                  </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>

        <?php include "../_components/detail/detail-pars-questions.php" ?>


  </div><!-- .content -->

</div><!-- .row -->


  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
