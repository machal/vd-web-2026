<?php

include("../_includes/init.php");

$page_name = "Košík";
$page_type = "cart";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="vc-top vc-top-is-under"></div>

  <div class="vc-main">
    <div class="vc-container">

      <div class="vc-row">

        <div class="vc-content">

          <h1 class="sr-only">Košík</h1>

          <!-- Kroky objednávky -->
          <?php include "../_components/order/order-steps.php"; ?>

          <form class="vc-cart-items" action="order-delivery-payment.php" method="post">

            <h2 class="sr-only">Produkty v košíku</h2>

            <!-- Produkty v košíku -->
            <?php include "../_components/cart/cart-item__solocare.php"; ?>
            <?php include "../_components/cart/cart-item__frequency.php"; ?>

            <!-- Celková cena -->
            <div class="vc-cart-total-price">
              <h2>
                Celková cena:
                <strong>1&nbsp;978&nbsp;Kč</strong>
              </h2>
            </div>

            <!-- Odesílací a návratové tlačítko -->
            <?php include "../_components/order/order-goto.php"; ?>

            <!-- Pod produkty: slevy a info texty -->
            <div class="vc-row">

              <!-- Formuláře se slevami -->
              <?php include "../_components/cart/cart-discounts.php"; ?>

              <!-- Informativní a motivační hlášky pod košíkem: celková dostupnosti, dárek atd. -->
              <?php include "../_components/cart/cart-info-lines.php"; ?>

            </div><!-- /.row -->

            <!-- Výběr dárků -->
            <?php include "../_components/cart/cart-gifts.php"; ?>

          </form>

        </div>

      </div><!-- /.row -->

    </div><!-- .vc-container -->
  </div><!-- .vc-main -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

