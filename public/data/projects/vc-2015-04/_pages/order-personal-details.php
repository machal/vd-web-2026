<?php

include("../_includes/init.php");

$page_name = "Osobní údaje";
$page_type = "order";

?>

<?php include("../_includes/html-head.php") ?>

  <?php
    // Kvůli podmínkám v inkludu ukládáme název souboru do proměnné
    $parent_file = basename(__FILE__);
    include("../_components/head/head.php")
  ?>

  <div class="container">

    <div class="row">

      <div class="content">

        <h1 class="sr-only">
          <?php echo $page_name ?>
        </h1>

        <!-- Kroky objednávky -->
        <?php include "../_components/order/order-steps.php"; ?>

          <div class="order-layout row">


          <!-- Formulář pro volbu platby a dopravy -->

        <div class="order-form">

          <div class="section">

            <p>
              <a class="btn btn-block btn-facebook" href="#facebook">
                Vyplnit údaje Facebookem
              </a>
            </p>

            <p>
              nebo <a href="#personals-login" data-toggle="collapse">pro přihlášení použijte e-mail</a>
              z předchozí objednávky
            </p>

            <div class="collapse" id="personals-login">

              <!-- Přihlašovací komponenta -->
              <?php
                // Kvůli podmínkám v inkludu ukládáme název souboru do proměnné
                $parent_file = basename(__FILE__);
                include "../_components/head/login.php";
              ?>

            </div>

          </div><!-- /.section -->


          <form method="post" class="form-horizontal">

              <h2 class="heading-underlined">
                Osobní údaje
              </h2>

              <p>
                <small class="help-block">
                  Údaje označené * jsou povinné.
                </small>
              </p>

              <div class="form-group">
                <label for="name" class="control-label">
                  Jméno a příjmení
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control" type="text" id="name">
                </p>
              </div>

              <div class="form-group">
                <label for="email" class="control-label">
                  E-mail
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control" type="email" id="email">
                </p>
              </div>

              <div class="form-group">
                <label for="phone" class="control-label">
                  Telefon
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control form-control-m" type="tel" id="phone">
                  <!-- Ikonka nápovědy (otevírá Bootstrap Popover) -->
                  <a
                    class="btn btn-xs btn-link"
                    data-toggle="popover" role="button" data-placement="bottom"
                    data-content="
                      <h5>Proč chceme telefon?</h5>
                      <p>Telefonem vás bude kontaktovat dopravce nebo my případě nejasností nebo nečekaných změn.</p>
                    ">
                      <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                      <span class="sr-only">Nápověda</span>
                    </a>
                </p>
              </div>


              <h2 class="heading-underlined">
                Dodací adresa
              </h2>

              <div class="form-group">
                <label for="address-name" class="control-label">
                  Jméno a příjmení
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control" type="text" id="address-name">
                </p>
              </div>

              <div class="form-group">
                <label for="address-company" class="control-label">
                  Firma
                </label>
                <p class="control-input">
                  <input class="form-control" type="text" id="address-company">
                </p>
              </div>

              <div class="form-group">
                <label for="address-street" class="control-label">
                  Ulice a číslo
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control" type="text" id="address-street">
                </p>
              </div>

              <div class="form-group">
                <label for="address-city" class="control-label">
                  Město
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control" type="text" id="address-city">
                </p>
              </div>

              <div class="form-group">
                <label for="address-psc" class="control-label">
                  PSČ
                  <span class="form-mandatory">*</span>
                </label>
                <p class="control-input">
                  <input class="form-control form-control-s" type="text" id="address-psc">
                </p>
              </div>

              <div class="form-group">
                <label for="note" class="control-label">
                  Poznámka
                </label>
                <p class="control-input">
                  <textarea rows="2" id="note" class="form-control"></textarea>
                </p>
              </div>

              <div class="checkbox">
                <label  data-toggle="collapse" data-target="#personals-invoice-address">
                  <input type="checkbox" name="invoice">
                  Fakturační adresa je odlišná
                </label>
              </div>

              <!-- Fromulář pro fakturační adresu -->

              <?php include "../_components/order/order-invoice-address.php"; ?>

              <div class="checkbox">
                <label>
                  <input type="checkbox" name="newsletter">
                  Chci dostávat informace o akčních nabídkách.
                  <small class="help-block">
                    Za přihlášení dostanete
                    <a href="text.php"
                      data-toggle="popover" role="button" data-placement="bottom"
                      data-content="
                        <h5>Bonusový systém</h5>
                        <p>Za přihlášení k newsletteru nebo nákupy dostáváte bonusové body, které můžete hned <a href='text.php'>vyměnit za bonusové zboží</a>.</p>
                      ">
                      50 bonusových bodů
                    </a>.
                  </small>
                </label>
              </div>

            </form>

          </div><!-- /.order-form -->


          <!-- Rekapitulace objednávky -->

          <?php include "../_components/order/order-resume.php"; ?>


          <!-- Odesílací a návratové tlačítko -->

          <?php include "../_components/order/order-goto.php"; ?>


        </div><!-- .row -->

      </div><!-- .content -->

    </div><!-- .row -->

  </div><!-- .container -->

  <?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
