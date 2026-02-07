<?php

include("../_includes/init.php");

$page_name = "Potvrzení objednávky";
$page_type = "order";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-top vc-top-is-under"></div>

<div class="vc-main">
  <div class="vc-container">

    <div class="vc-row">

      <div class="vc-content">

        <h1 class="sr-only">
          <?php echo $page_name ?>
        </h1>

        <form action="#" method="post">

          <div class="vc-confirmation">

            <div class="vc-person vc-person-for-confirmation">
              <div class="vc-matrjoska">

                <p class="vc-person-photo">
                  <span class="vc-person-img"><img src="http://satyr.io/400/paleblue?delay=3g" alt="Kateřina Miklíková"></span>
                  <!--šířka obrázku není nastavena úmyslně, je v CSS + používáme jednoduchou metodu pro lepší vzhed na displejích s vyšším rozlišením (retina apod.) -->
                  <?php /* online */ if ($_SESSION['cycle'][0][1]): ?>
                  <span class="vc-person-status vc-person-status-online"><span>je online</span>&nbsp;</span>
                  <?php /* offline */else: ?>
                  <span class="vc-person-status vc-person-status-offline"><span>je offline</span>&nbsp;</span>
                  <?php endif; ?>
                </p>

                <p class="vc-person-name">
                  Kateřina
                  <?php /* krátké jméno */ if ($_SESSION['cycle'][0][1]): ?>Nová<?php /* dlouhé jméno */else: ?>Gutenschlefrová<?php endif; ?>
                  <br>
                  <small>zákaznický servis</small>
                </p>

              </div>
            </div>

            <div class="vc-confirmation-box">
              <h2 class="vc-confirmation-box-title">Děkuji za&nbsp;vaši objednávku!</h2>

              <p class="vc-confirmation-box-text">Má číslo <strong>4566736</strong>. Za&nbsp;tuto objednávku od&nbsp;nás máte <strong>230&nbsp;bonusových bodů</strong> navíc.</p>

              <table class="vc-confirmation-box-info">
                <caption>Platební údaje pro bankovní převod</caption>
                <tbody>
                <tr>
                  <th>Číslo účtu:</th>
                  <td>1923439/0300</td>
                </tr>
                <tr>
                  <th>Variabilní symbol:</th>
                  <td>4566736</td>
                </tr>
                <tr>
                  <th>Částka:</th>
                  <td>950 Kč</td>
                </tr>
                </tbody>
              </table>

              <p class="vc-confirmation-box-text">Objednávku předávám do skladu, kde se ji budou <strong>ihned</strong> věnovat.</p>

            </div>

          </div>

        </form>

      </div>

    </div><!-- /.row -->

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>

