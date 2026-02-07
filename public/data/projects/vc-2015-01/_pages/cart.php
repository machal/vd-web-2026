<?php

include("../_includes/init.php");

$page_name = "Košík";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container">

    <div class="row">

      <div class="content">

        <h1 class="sr-only">
          Košík
        </h1>

        <!-- Horní část košíku: kroky a odesílací tlačítka pro desktop -->
        <div class="cart-top">

          <!-- Kroky objednávky -->
          <?php include "../_components/order-steps.php"; ?>

          <!--
          Informativní nebo chybová hláška:
          .alert je součást Bootstrapu
          -->
          <p class="alert alert-info cart-alert" role="alert">
            Do košíku bylo přidáno zboží:
            <a href="detail_biofinity.php">SOLOCARE AQUA 2 x 360 ml s pouzdry</a>
          </p>

          <!-- Odesílací a návratové tlačítko -->
          <?php include "../_components/cart/cart-goto.php"; ?>

        </div><!-- /.cart-top -->

        <form class="cart-items" action="#" method="post">

          <h2 class="sr-only">
            Produkty v košíku
          </h2>

          <!-- Produkty v košíku -->
          <?php include "../_components/cart/cart-item.php"; ?>
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
      <?php include "../_components/cart/cart-goto.php"; ?>


      </div>

    </div><!-- /.row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

