<?php

include("../_includes/init.php");

$page_name = "Biofinity 648 Kč";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container container-relative">

    <?php include "../_components/banner__inside.php" ?>

    <div class="row">

      <div class="content content-narrower">

        <h1 class="page-heading">
          Biofinity (6 čoček)
        </h1>

        <h2 class="detail-price">
          648 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> > 2300 ks, <a href="#prodejna">prodejna Praha</a> 53 ks.
        </p>


        <p class="detail-image">
          <img src="../dist/img/product_2082-1-330.jpg"
          alt="Biofinity 648 Kč" />
<!-- Upozornění na změnu vzhledu obalu -->
          <span class="detail-image-caption">
            Pozor, výrobce nedávno změnil vzhled obalu.
            Tento nový se proto nemusí shodovat <a href="https://www.google.cz/search?q=Biofinity+%C4%8Do%C4%8Dky&espv=2&biw=1920&bih=1101&source=lnms&tbm=isch&sa=X&ei=Nj53VNfnMsnWPOf4gLAF&ved=0CAYQ_AUoAQ">
            s vaším.</a>
          </span>
          <a class="offer-icon" href="detail.php">
            Akce
          </a>
        </p>

        <?php include "../_components/detail/opts-selector.php" ?>

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
            Biofinity (6 čoček) jsou moderní silikon-hydrogelové kontaktní čočky, které spolu s nadprůměrnou propustností pro kyslík nabízejí současně vysoký obsah vody. Řadí se mezi nejzdravější kontaktní čočky na trhu. Jsou určeny pro denní nošení s měsíční výměnou, na doporučení lékaře můžete však čočky Biofinity nosit i kontinuálně. Některé krabičky Biofinity (6 čoček) mají již nový design obalu.
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
                    <a href="category.php">Kontinuální čočky</a><br>
                    <a href="category.php">Silikon-hydrogelové</a>
                  </td>
                </tr>
            </tbody>
            </table>
          </div>
        </div>


        <?php include "../_components/detail/detail-pars-questions.php" ?>

      </div>

    </div><!-- .row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
