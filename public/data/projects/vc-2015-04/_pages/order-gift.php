<?php

include("../_includes/init.php");

$page_name = "Vyberte si dárek";
$page_type = "order";

?>

<?php include("../_includes/html-head.php") ?>

  <?php include("../_components/head/head.php") ?>

  <div class="container">

    <div class="row">

      <div class="content">

        <h1 class="sr-only">
          <?php echo $page_name ?>
        </h1>

        <!-- Horní část košíku: kroky a odesílací tlačítka pro desktop -->
        <div class="cart-top">
          <!-- Kroky objednávky -->
          <?php include "../_components/order/order-steps.php"; ?>
        </div><!-- /.cart-top -->

        <form action="#" method="post">

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur excepturi dignissimos deserunt velit labore alias quam consectetur molestias sunt amet id inventore, iure, quos accusamus possimus expedita architecto autem quidem.</p>


          <!-- Odesílací a návratové tlačítko -->
          <?php include "../_components/order/order-goto.php"; ?>

      </form>


      </div>

    </div><!-- /.row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

