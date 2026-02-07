<?php

include("../_includes/init.php");

$page_name = "Zapomenuté heslo";
$page_type = "login";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-main">
  <div class="vc-container">

    <div class="vc-row">

      <div class="vc-content vc-content-narrower vc-content-centered">

        <div class="vc-loginpage">

          <h1 class="vc-page-heading">Neznám heslo</h1>

          <p>
            Kvůli vaší bezpečnosti uchováváme všechna hesla v zakódované podobě. Proto vám vaše zapomenuté heslo nemůžeme
            sdělit. Můžeme vám ale vytvořit nové a ještě před jeho zakódováním vám ho zaslat na e-mail. Heslo si můžete
            kdykoliv změnit po opětovném přihlášení do klientské sekce.
          </p>

          <div class="alert alert-warning" role="alert"><b>Prosím vyplňte e-mail</b></div>

          <form method="post">
            <div class="vc-box vc-box-for-loginpage">
              <label for="email" class="control-label">E-mail:</label>

              <p class="control-input">
                <input class="form-control" type="text" id="email">
              </p>
              <button type="submit" class="vc-btn vc-btn-outlined vc-btn-lg">Vytvořit nové heslo</button>
            </div>
          </form>

        </div>

      </div>

    </div>

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
