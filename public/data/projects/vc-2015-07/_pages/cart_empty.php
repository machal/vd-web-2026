<?php

include("../_includes/init.php");

$page_name = "Košík";
$page_type = "cart";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-top">
  <?php include "../_components/banner__inside_clear.php" ?>

  <div class="vc-container">

    <div class="vc-row">

      <div class="vc-content">

        <!-- Obsah prázdného košíku -->

        <div class="vc-cart-empty">

          <h1 class="vc-page-heading">Košík je prázdný</h1>

          <div class="vc-cart-empty-contact">
            <div class="vc-person vc-person-for-cart-empty">
              <div class="vc-matrjoska">

                <p class="vc-person-photo">
                  <span class="vc-person-img"><img src="http://satyr.io/200/paleblue?delay=3g" alt="Kateřina Miklíková"></span>
                  <!--šířka obrázku není nastavena úmyslně, je v CSS + používáme jednoduchou metodu pro lepší vzhed na displejích s vyšším rozlišením (retina apod.) -->
                  <?php /* online */ if ($_SESSION['cycle'][0][1]): ?>
                  <span class="vc-person-status vc-person-status-online"><span>je online</span>&nbsp;</span>
                  <?php /* offline */else: ?>
                  <span class="vc-person-status vc-person-status-offline"><span>je offline</span>&nbsp;</span>
                  <?php endif; ?>
                </p>

              </div>
            </div>
            <div class="vc-cart-empty-contact-body">
              <p>
                Potřebujete poradit?<br class="visible-xs"> Ozvěte se mi (Po-Pá: 8-16h):<br>
                <span class="vc-cart-empty-green">800 800 170</span> / <a class="vc-cart-empty-green" href="mailto:info@vasecocky.cz">mailto:info@vasecocky.cz</a><br>
                <span class="vc-cart-empty-contact-name">
                  Kateřina
                  <?php /* krátké jméno */ if ($_SESSION['cycle'][0][1]): ?>Nová<?php /* dlouhé jméno */else: ?>Gutenschlefrová<?php endif; ?>
                  zákaznický servis
                </span>
              </p>
            </div>
          </div>

        </div><!-- /.cart-empty -->

      </div>

    </div><!-- /.row -->

  </div><!-- .vc-container -->
</div>


<div class="vc-main">
  <div class="vc-container">
    <div class="vc-row">
      <div class="vc-content">
        <!-- Obsah prázdného košíku -->

        <div class="vc-cart-empty">

          <div class="vc-cart-empty-content  vc-clearfix">
            <h2 class="vc-cart-empty-title">Nebuďte smutní<br>
              Rádi našim zákazníkům poradíme.</h2>

            <p>Máme široký sortiment kontaktních čoček a jiného dioptrického materiálu.</p>
            <p>K prohlížení zboží využijte menu nade mnou nebo vyhledávání.<br>
              Případně kontaktujte <span class="vc-cart-empty-green">zelenou linku 800 800 170</span>.</p>
          </div>

        </div><!-- /.cart-empty -->

        <!-- Nejprodávanější produkty -->

        <div class="vc-product-items">

          <h2>Nejprodávanější kontaktní čočky a příslušenství</h2>
          <!-- <h2 class="h3 vc-heading-lined">
            <span>Nejprodávanější kontaktní čočky a příslušenství</span>
          </h2> -->

          <?php include("../_components/product/product-item_biofinity.php"); ?>
          <?php include("../_components/product/product-item_magiceye.php"); ?>
          <?php include("../_components/product/product-item_freshlook.php"); ?>
          <?php include("../_components/product/product-item_proclear.php"); ?>

        </div><!-- .vc-product-items -->

      </div>
    </div><!-- /.row -->
  </div><!-- .vc-container -->

  <?php include("../_components/testimonials.php"); ?>

</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

