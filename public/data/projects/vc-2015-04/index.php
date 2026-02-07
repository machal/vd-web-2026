<?php

include("_includes/init.php");

$page_name = "VašeČočky prototyp";

?>

<?php include("_includes/html-head.php") ?>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">

  <div class="container">

      <div class="content">

        <h1 class="page-header">VašeČočky prototyp</h1>

        <div class="panel panel-default">
          <!-- Default panel contents -->
          <div class="panel-heading">Stránky</div>
          <!-- List group -->
          <div class="panel-body">
            <ul class="list-group">
              <li class="list-group-item">
                Kategorie
                <a href="_pages/category.php">1. úrovně (čočky)</a>,
                <a href="_pages/category_2nd_level.php">2. úrovně (jednodenní čočky)</a>,
                <a href="_pages/category_2nd_level_combine.php">2. úrovně a kombinace (jednodenní čočky Alcon)</a>,
                <a href="_pages/category_select.php">Varianta se &lt;select&gt;</a>
              </li>
              <li class="list-group-item">
                  Produkt:
                  <a href="_pages/detail_biofinity.php">Biofinity</a>,
                  <a href="_pages/detail_frequency.php">Frequency</a>,
                  <a href="_pages/detail_freshlook.php">Freshlook</a>,
                  <a href="_pages/detail_proclear.php">Proclear</a>,
                  <a href="_pages/detail_solocare.php">Roztok Solocare</a>
              </li>
              <li class="list-group-item">
                <a href="_pages/cart.php">Košík</a>,
                <a href="_pages/cart_all.php">Košík se všemi produkty</a>,
                <a href="_pages/order-delivery-payment.php">Platba a doprava</a>,
                <a href="_pages/order-personal-details.php">Osobní údaje</a>
              </li>
              <li class="list-group-item">
                <a href="_pages/home.php">
                  Homepage
                </a>
              </li>
              <li class="list-group-item">
                <a href="_pages/text.php">
                  Textová stránka
                </a>
              </li>
              <li class="list-group-item">
                <a href="style-guide/">
                  Style Guide
                </a>
              </li>
            </ul>
          </div>
        </div>


      </div>

  </div><!-- .container -->

<?php include("_includes/html-foot.php") ?>

