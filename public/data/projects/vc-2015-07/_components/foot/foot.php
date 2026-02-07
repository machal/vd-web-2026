<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-foot">
  <?php /* newsletter při každém druhém a třetím zobrazení */ if ($_SESSION['cycle'][0][3] == 1 || $_SESSION['cycle'][0][3] == 2 ): ?>
  <div class="vc-foot-row-newsletter">
    <div class="vc-foot-row-newsletter-bg-outer">
      <div class="vc-container">
        <div class="vc-foot-row-newsletter-bg-inner">
          <div class="vc-foot-row-newsletter-table">
            <div class="vc-foot-row-newsletter-cell vc-foot-row-newsletter-cell-claim">
              <p class="vc-foot-row-newsletter-claim">Nenechte si ujít novinky ze světa<br>usměvavých čoček!</p>
            </div>
            <div class="vc-foot-row-newsletter-cell vc-foot-row-newsletter-cell-form">
              <form action="">
                <label for="newsletter-email" class="sr-only">Email</label>
                <div class="vc-foot-row-newsletter-input-wrapper">
                  <input class="vc-foot-row-newsletter-input" type="newsletter-email" id="newsletter-email" placeholder="Vložte váš email...">
                </div>
                <button class="vc-btn vc-btn-default-light vc-btn-sm" type="submit">Chci novinky</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php endif; ?>

  <div class="vc-foot-row-main">
    <div class="vc-matrjoska">
      <div class="vc-container">

        <div class="vc-foot-customer-care">

          <div class="vc-person vc-person-for-foot">
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

              <p class="vc-person-name">
                Kateřina
                <?php /* krátké jméno */ if ($_SESSION['cycle'][0][1]): ?>Nová<?php /* dlouhé jméno */else: ?>Gutenschlefrová<?php endif; ?>
                <br>
                <small>zákaznický servis</small>
              </p>

            </div>
          </div>

          <div class="vc-foot-contacts">
            <h2>Potřebujete poradit?</h2>

            <p>Ozvěte se mi <span class="vc-nowrap">(po–pá 8–16&nbsp;h)</span></p>

            <p class="vc-foot-contacts-phone"><a href="tel:800800170">800 800 170</a></p>

            <p class="vc-foot-contacts-email"><a href="mailto:info@vasecocky.cz">info@vasecocky.cz</a></p>
          </div>

        </div>

        <div class="vc-foot-nav">

          <div class="vc-list">
            <h2 class="vc-list-title">Zákaznický servis</h2>

            <div class="vc-list-body">
              <ul>
                <li><a href="text_doprava.php">Vše o nákupu</a></li>
                <li><a href="text_doprava.php">Výdejní místa</a></li>
                <li><a href="text_doprava.php">Reklamace</a></li>
                <li><a href="text_doprava.php">Obchodní podmínky</a></li>
                <li><a href="text_doprava.php">Náš tým</a></li>
              </ul>
            </div>
          </div>

          <div class="vc-list">
            <h2 class="vc-list-title">Užitečné informace</h2>

            <div class="vc-list-body">
              <ul>
                <li><a href="text.php">Blog</a></li>
                <li><a href="text.php">Aplikace a vyšetření</a></li>
                <li><a href="text.php">Slovník pojmů</a></li>
                <li><a href="text.php">Partneři a provizní systém</a></li>
                <li><a href="text.php">Naprosto extrémně neužitečný a dlouhý odkaz co se prostě musí zalomit</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div class="vc-foot-social">
          <p class="vc-foot-facebook"><a href="https://www.facebook.com/vasecocky">jsme na Facebooku</a></p>
          <p class="vc-foot-twitter"><a href="https://twitter.com/vasecocky"><span class="vc-foot-show-A-inline">najdete nás </span>i na Twitteru</a></p>
        </div>

      </div>
    </div>
  </div>

  <div class="vc-foot-row-partners">
    <div class="vc-matrjoska">

      <div class="vc-container">

        <?php /*
        Partneri
        --------

        10 mist pro loga partneru.
        Obrazky se musi pripravovat v obdelniku 200×90px, kde loga jsou centrovane uprostred max na cca 80% sirky (160×72px).
        */ ?>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/apek.svg" alt="Asociace pro elektronickou komerci" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/heureka.svg" alt="Ověřeno zákazníky Heuréka" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/visa.svg" alt="VISA MasterCard" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/benefit.svg" alt="Benefit Plus" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/mobito.svg" alt="Mobito" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/m-penize.svg" alt="mPeníze" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/paysec.svg" alt="paysec" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/paypal.svg" alt="PayPal" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/isic.svg" alt="ISIC" width="200" height="90">
          </a>
        </p>

        <p class="vc-foot-row-partners-item">
          <a href="#">
            <img src="../dist/content-img/partners/sphere-card.svg" alt="Sphere card" width="200" height="90">
          </a>
        </p>

      </div>
    </div>
  </div>

  <div class="vc-foot-row-last">
    <div class="vc-container">
      <div class="vc-foot-nav-last">
        <a href="/">na úvodní stránku</a> <span class="vc-foot-divider-vertical"></span> <a href="#">nahoru</a>
      </div>

      <div class="vc-foot-copyright">
        ©&nbsp;2008–2015&nbsp;VašeČočky <span class="vc-foot-divider-vertical"></span> <a class="vc-nowrap" href="#">Jsme s vámi 7
        let</a>
      </div>
    </div>
  </div>

</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
