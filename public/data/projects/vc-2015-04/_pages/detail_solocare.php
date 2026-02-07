<?php

include("../_includes/init.php");

$page_name = "SOLOCARE AQUA 2 x 360 ml s pouzdry 509 Kč";
$page_type = "detail";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container container-relative">

    <?php include "../_components/banner__inside.php" ?>

    <div class="row">

      <div class="content content-narrower">

        <h1 class="page-heading">
          SOLOCARE AQUA 2 x 360 ml
        </h1>

        <h2 class="detail-price">
          509 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> &gt; 2300 ks, <a href="#prodejna">prodejna Praha</a> 2 ks.
        </p>


        <p class="detail-image">
          <img alt="SOLOCARE AQUA 2 x 360 ml 509 Kč" height="300"
            srcset="<?php getSrcSet('solocare'); ?>"
            sizes="<?php getSizesForDetail(); ?>">
        </p>

        <?php include "../_components/product/product-options_solocare.php" ?>

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
              Roztok SOLOCARE AQUA 2×360 ml s pouzdry je víceúčelový roztok od firmy Alcon, určený k čištění, dezinfekci, oplachování, uchovávání a zvlhčování kontaktních čoček. Uživatelé ocení zejména moderní metodu zvlhčování, díky které mohou kontaktní čočky vydržet dostatečně hydratované po celý den.
            </p>
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr><th>Expirace:&nbsp;</th><td>2016</td></tr>
                  <tr><th>Hmotnost:&nbsp;</th><td>944 g</td></tr>
                  <tr><th>Celkový objem:&nbsp;</th><td>720 ml</td></tr>
                  <tr><th>Objem pouzdra:&nbsp;</th><td>10 ml</td></tr>
                  <tr><th>Pouzder v balení:&nbsp;</th><td>2</td></tr>
                  <tr><th>Výrobce:</th><td><a itemprop="manufacturer" href="category.php">EYESHELTER</a></td></tr>
                  <tr><th>Kategorie:</th><td><a href="category.php">Roztoky</a><br>
                  <a href="category.php">Výhodné balíčky roztoků</a></td></tr>
                </tbody>
                </table>
            </div>
          </div>
        </div>

        <?php include "../_components/detail/detail-pars-questions.php" ?>

      </div>

    </div><!-- .row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
