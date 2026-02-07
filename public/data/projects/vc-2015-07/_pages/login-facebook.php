<?php

include("../_includes/init.php");

$page_name = "Propojení s Facebookem";
$page_type = "login";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-main">
  <div class="vc-container">

    <div class="vc-row">
      <div class="vc-content vc-content-narrower vc-content-centered">

        <div class="vc-loginpage">

          <h1 class="vc-page-heading">Propojení s Facebookem</h1>

          <h2>Váš účet na Facebooku</h2>

          <div class="vc-box vc-box-for-loginpage">
            <a href="#">Daniel Srb</a>, srb.dan@gmail.com
          </div>

          <div class="alert alert-warning" role="alert">
            <b>E-mail srb.dan@gmail.com se v naší databázi nenachází.</b><br>
            K dokončení propojení s Facebookem vyberte jednu z následujících možností:
          </div>

          <h2>Již jsem zde nakupoval</h2>

          <form method="post">
            <div class="vc-box vc-box-for-loginpage">

              <label for="email" class="control-label">E-mail:</label>
              <p class="control-input">
                <input class="form-control" type="text" id="email">
              </p>

              <label for="password" class="control-label">Heslo nebo číslo objednávky:</label>
              <p class="control-input">
                <input class="form-control" type="text" id="password">
              </p>

              <button type="submit" class="vc-btn vc-btn-outlined vc-btn-lg">Přihlásit</button>

              <a class="vc-loginpage-lost-link" href="#">Neznám heslo</a>
            </div>
          </form>

          <p>nebo <a href="#">Jsem nový zákazník</a></p>

        </div>

      </div>
    </div>

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>


<?php include("../_includes/html-foot.php") ?>
