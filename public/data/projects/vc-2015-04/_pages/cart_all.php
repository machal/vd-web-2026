<?php

include("../_includes/init.php");

$page_name = "Košík";
$page_type = "cart";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container">

    <div class="row">

      <div class="content">

        <h1 class="sr-only">
          Košík
        </h1>

        <!-- Kroky objednávky -->
        <?php include "../_components/order/order-steps.php"; ?>

        <form class="cart-items" action="order-delivery-payment.php" method="post">

          <h2 class="sr-only">
            Produkty v košíku
          </h2>

          <!-- Produkty v košíku -->
          <?php include "../_components/cart/cart-item__solocare.php"; ?>
          <?php include "../_components/cart/cart-item__biofinity.php"; ?>
          <?php include "../_components/cart/cart-item__freshlook.php"; ?>
          <?php include "../_components/cart/cart-item__frequency.php"; ?>
          <?php include "../_components/cart/cart-item__proclear.php"; ?>

          <!-- Celková cena -->
          <div class="cart-total-price">
            <h2>
              Celková cena:
              <strong>1&nbsp;978&nbsp;Kč</strong>
            </h2>
          </div>

          <!-- Pod produkty: slevy a info texty -->
          <div class="row">


            <!-- Formuláře se slevami -->
            <?php include "../_components/cart/cart-discounts.php"; ?>

            <!-- Informativní a motivační hlášky pod košíkem: celková dostupnosti, dárek atd. -->
            <?php include "../_components/cart/cart-info-lines.php"; ?>


          </div><!-- /.row -->

      </form>

      <!-- Odesílací a návratové tlačítko -->
      <div class="row">
        <?php include "../_components/order/order-goto.php"; ?>
      </div><!-- /.row -->

      </div>

    </div><!-- /.row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

