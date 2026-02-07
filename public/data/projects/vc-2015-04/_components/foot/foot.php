<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<style>
  /* Zmeny oproti stavajicimu stavu 
  TODO do CSS
  */
  .foot {
    margin-right: 0;
    margin-left: 0;
  }
</style>

<div class="foot">

  <div class="container">

    <div class="foot-row">

      <div class="foot-person">
        <p class="foot-person-photo">
          <img src="../dist/img/katerinamiklikova.jpg" width="80" height="80" alt="Kateřina Miklíková">
        </p>
        <div class="foot-person-text">
          <h2>
            <span class="foot-person-name-full">Kateřina</span>
            <span class="foot-person-name-short">K.</span>
            Miklíková
          </h2>
          zákaznický servis
          <br>
          <a href="tel:800800170">800 800 170</a>
          <br>
          <a href="mailto:info@vasecocky.cz">info@vasecocky.cz</a>
        </div>
      </div>

      <div class="foot-links">

      <div class="foot-links-first list">
        <div class="list-heading">
          <h2 class="list-title">
            Zákaznický servis&nbsp;<span class="caret"></span>
          </h2>
        </div>
        <div class="list-body">
          <ul>
            <li><a href="text_doprava.php">Vše o nákupu</a>
            </li>
            <li><a href="text_doprava.php">Výdejní místa</a>
            </li>
            <li><a href="text_doprava.php">Reklamace</a>
            </li>
            <li><a href="text_doprava.php">Obchodní podmínky</a>
            </li>
            <li><a href="text_doprava.php">Náš tým</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="foot-links-second list">
        <div class="list-heading">
          <h2 class="list-title">
            Užitečné informace&nbsp;<span class="caret"></span>
          </h2>
        </div>
        <div class="list-body">
          <ul>
            <li><a href="text.php">Blog</a>
            </li>
            <li><a href="text.php">Aplikace a vyšetření</a>
            </li>
            <li><a href="text.php">Slovník pojmů</a>
            </li>
            <li><a href="text.php">Partneři a provizní systém</a>
            </li>
          </ul>
        </div>
      </div>

      </div>

      <div class="foot-quality">
        <div class="foot-quality-in">
          <p class="foot-quality-logo">
            <a href="#/hodnoceni-zakazniku.html">
              <img src="../dist/img/heureka_overeno.png" alt="Heureka ověřeno zákazníky" width="200" height="200">
            </a>
          </p>
          <p class="foot-quality-text">
            Díky spokojenosti našich zákazníků jsme získali zlaté logo Ověřeno zákazníky. <br>
            <a href="#/hodnoceni-zakazniku.html">Další hodnocení.</a>
          </p>
        </div>
      </div>

    </div>


  <?php
  /*
  Partneri
  --------

  10 mist pro loga partneru.
  Obrazky se musi pripravovat ve ctverci 400x400px, kde loga jsou centrovane uprostred max na cca 80% sirky.
  */
  ?>

    <div class="foot-row foot-row-second">

      <div class="foot-partners">
        <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/paypal.svg" alt="Paypal" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/logo_placeholder_2.svg" alt="MasterCard" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/visa.svg" alt="VISA" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/logo_placeholder_1.svg" alt="Partner" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/mastercard.svg" alt="VISA" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/logo_placeholder_2.svg" alt="Partner" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/logo_placeholder_3.svg" alt="Partner" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/logo_placeholder_1.svg" alt="Partner" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/paypal.svg" alt="VISA" width="150" height="150">
        </a>
      </p>
      <p class="foot-partners-item">
        <a href="#">
          <img src="../dist/content-img/payments/logo_placeholder_3.svg" alt="Partner" width="150" height="150">
        </a>
      </p>
      </div>

      <div class="foot-social">
        <p class="foot-social-buttons">
          <a href="https://www.facebook.com/vasecocky" class="btn btn-default foot-social-button">
            <img src="../dist/img/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com/vasecocky" class="btn btn-default foot-social-button">
            <img src="../dist/img/icons/twitter.svg" alt="Twitter" />
          </a>
        </p>
      </div>

    </div>

    <p class="foot-copyright">
      ©&nbsp;2008–2014&nbsp;VašeČočky
    </p>

  </div><!-- .container -->

</div>
<!-- .foot -->




<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
