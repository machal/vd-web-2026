<?php

include("../_includes/init.php");

$page_name = "FreshLook ColorBlends 499 Kč";
$page_type = "detail";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container container-relative">

    <?php include "../_components/banner__inside.php" ?>


<div class="row">

  <div class="content content-narrower">

        <h1 class="page-heading">
          FreshLook ColorBlends (2 čočky) - dioptrické
        </h1>

        <h2 class="detail-price">
          499 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> > 300 ks.
        </p>

        <p class="detail-image">
          <img alt="FreshLook ColorBlends (2 čočky) - dioptrické" height="300"
            srcset="<?php getSrcSet('freshlook'); ?>"
            sizes="<?php getSizesForDetail(); ?>">
        </p>

        <?php include "../_components/product/product-options_freshlook.php" ?>

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
              FreshLook ColorBlends (2 čočky) – dioptrické jsou barevné kontaktní čočky od společnosti Ciba Vision. Patří k nejoblíbenějším barevným kontaktním čočkám na trhu. K přednostem FreshLook ColorBlends patří pohodlné nošení a perfektní výsledný efekt, který klade důraz na přirozenou proměnu.
            </p>
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Výrobce:</th>
                    <td><a itemprop="manufacturer" href="#">Alcon</a></td>
                  </tr>
                  <tr>
                    <th>Kategorie:</th>
                    <td>
                      <a href="category.php">Měsíční čočky</a><br>
                      <a href="category.php">Barevné čočky</a>
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
