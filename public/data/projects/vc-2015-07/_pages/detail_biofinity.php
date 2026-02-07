<?php

include("../_includes/init.php");

$page_name = "Biofinity 648 Kč";
$page_type = "detail";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-top">
  <div class="vc-container vc-container-relative">
    <?php include "../_components/banner__inside.php" ?>
  </div>
</div>

<div class="vc-main">
  <div class="vc-container vc-container-relative">

    <div class="vc-row">

      <div class="vc-content vc-content-narrower">

        <h1 class="vc-page-heading">Biofinity (6 čoček)</h1>

        <p class="vc-detail-categories">
          <a href="category_2nd_level.php">Měsíční</a>,
          <a href="category_2nd_level.php">kontiuální</a>
          kontaktní čočky
          od výrobce
          <a href="category_2nd_level.php">Cooper Vision</a>.
        </p>

        <p class="vc-detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> &gt; 2<span class="vc-number-space"></span>300&nbsp;ks, <a href="#prodejna">prodejna Praha</a> 53&nbsp;ks.
        </p>

        <h2 class="vc-price vc-price-detail">
          <del>750&nbsp;Kč</del>
          <span class="vc-price-value">648&nbsp;Kč</span>
          <span class="vc-price-note">inkl. USt. zzgl. Versandkosten</span>
          <span class="vc-price-per-item">108,58&nbsp;Kč za&nbsp;kus</span>
        </h2>

        <div class="vc-detail-image">
            <span class="vc-bubble vc-bubble-bottom vc-bubble-lg vc-bubble-detail" aria-hidden="true">
              <span class="vc-matrjoska">Již jste zakoupili</span>
            </span>

          <div class="vc-detail-image-main">
            <span class="vc-offer-icon"><span class="vc-matrjoska"><span class="vc-offer-icon-text-small">Akce</span><br>&minus;20%</span></span>
            <img alt="Biofinity 648 Kč" height="300" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForDetail(); ?>">
          </div>

          <!-- Upozornění na změnu vzhledu obalu -->
          <div class="vc-detail-image-older">
                <span class="vc-detail-image-older-heading">
                  Produkt Biofinity (6 čoček) se prodával také
                  <?php if ($_SESSION['cycle'][1][3] > 1): ?>
                    v&nbsp;těchto&nbsp;obalech:
                  <?php else: ?>
                  v&nbsp;tomto&nbsp;obalu:
                  <?php endif; ?>

                </span>

            <?php
                  for ($i = 1; $i <= $_SESSION['cycle'][1][3]; $i++) {
                    echo '<a href="/dist/content-img/products/large/product_biofinity.jpg">';
            echo '<img class="vc-detail-image-older-img" alt="Biofinity 648 Kč" height="100" srcset="';
                    getSrcSet('biofinity');
                    echo '" sizes="';
                    getSizesForDetailSmallSub();
                    echo '">';
            echo '</a>';
            }
            ?>
          </div>

        </div>

        <form action="cart.php">
          <?php include "../_components/product/product-options_biofinity.php" ?>
        </form>

        <!-- V mobilní verzei motivátor dočasně pryč -->
        <div class="vc-detail-motivator"> <?php include "../_components/motivator_detail.php" ?> </div>

        <?php include "../_components/detail/detail-rating.php" ?>

        <div class="vc-detail-description">
          <h2 class="h3 vc-heading-lined">
            <span>Více o produktu</span>
          </h2>
          <div class="vc-detail-description-content">
            <p class="vc-detail-description-image">
              <img alt="Biofinity 648 Kč" height="300" srcset="<?php getSrcSet('biofinity'); ?>" sizes="<?php getSizesForDetailSmall(); ?>">
            </p>
            <p>
              Biofinity (6 čoček) jsou moderní silikon-hydrogelové kontaktní čočky, které spolu s nadprůměrnou propustností pro kyslík nabízejí současně vysoký obsah vody. Řadí se mezi nejzdravější kontaktní čočky na trhu. Jsou určeny pro denní nošení s měsíční výměnou, na doporučení lékaře můžete však čočky Biofinity nosit i kontinuálně. Některé krabičky Biofinity (6 čoček) mají již nový design obalu.
            </p>
          </div>
        </div>

        <?php include "../_components/detail/detail-parameters.php" ?>

        <?php include "../_components/detail/detail-questions.php" ?>

      </div><!-- .vc-content  -->

    </div><!-- .vc-row  -->

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
