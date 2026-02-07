<?php

include("../_includes/init.php");

$page_name = "Test prototypu";

?>

<?php include("../_includes/html-head.php") ?>

    <style media="screen">

      .img-responsive {
        margin: 2em 0;
      }

      @media screen and (max-width: 600px) {
        .img-responsive {
            max-width: 100px;
        }
      }
    </style>

    <div class="row">

      <div class="content">

        <h1>SVG test</h1>

        <h2>a) PNG 3x, 56kB</h2>
        <p>
          <img src="../src/img/logo_vasecocky_cz.png" width="140" height="60" alt="Vaše Čočky" class="img-responsive" />
        </p>
        <p>
          Na běžném desktopu nejhezčí.
        </p>

        <h2>b) SVG s PNG detaily, 51kB</h2>
        <p>
          <img src="../src/img/logo_vasecocky_cz.svg" width="140" height="60" alt="Vaše Čočky" class="img-responsive" />
        </p>
        <p>
          Na iOS6 detaily vůbec nevidím.
        </p>

        <h2>c) SVG bez PNG detailů, 22kB</h2>
        <p>
          <img src="../src/img/logo_vasecocky_MM_60.svg" width="140" height="60" alt="Vaše Čočky" class="img-responsive" />
        </p>

    </div><!-- .row -->


    </div>

<?php include("../_includes/html-foot.php") ?>
