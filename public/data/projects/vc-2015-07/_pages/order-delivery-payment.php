<?php

include("../_includes/init.php");

$page_name = "Doprava a platba";
$page_type = "order";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-top vc-top-is-under"></div>

<div class="vc-main">
  <div class="vc-container">

    <div class="vc-row">

      <div class="vc-content">

        <h1 class="sr-only"><?php echo $page_name ?></h1>

        <!-- Kroky objednávky -->
        <?php include "../_components/order/order-steps.php"; ?>

        <form method="post" action="order-personal-details.php">

          <div class="vc-order-layout vc-row">

            <!-- Formulář pro volbu platby a dopravy -->

            <div class="vc-order-form">

              <div class="vc-section form form-horizontal">

                <h2 class="vc-heading-underlined">Zvolte platbu</h2>

                <div class="radio">
                  <label>
                    <input type="radio" name="payment" value="">
                    Hotově (při převzetí) — 30 Kč
                  </label>
                </div>

                <div class="radio">
                  <label>
                    <input type="radio" name="payment" value="">
                    Bankovní převod
                  </label>
                </div>

                <!-- Pro otevírání/zavírání používáme Bootstrap Collapse http://getbootstrap.com/javascript/#collapse -->
                <div class="radio">
                  <label data-toggle="collapse" data-target="#card-options">
                    <input type="radio" name="payment" value="">
                    Platba kartou online
                  </label>
                </div>

                <div class="vc-box vc-box-dotted vc-box-collapse collapse" id="card-options">
                  <p class="checkbox">
                    <label>
                      <input type="checkbox" name="" value="">
                      Zapamatovat platební údaje pro příští nákup.
                      <!-- Ikonka nápovědy (otevírá Bootstrap Popover) -->
                      <a
                        class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                        tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                        data-content="
                            <p>Při dalších nákupech na našem obchodu již nebudete muset pokaždé opisovat číslo z karty. Stačí být přihlášen.</p>
                            <h5>Je to bezpečné</h5>
                            <p>Data o platebních kartách nejsou uloženy u nás, ale bezpečně u celosvětového poskytovatele služeb platebních bran GP WebPay, který nejen v ČR poskytuje služby největším bankám.</p>
                          ">
                        <span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                        <span class="sr-only">Nápověda</span>
                      </a>
                    </label>
                  </p>
                  <p class="vc-order-label-indented">
                    <img src="../dist/content-img/payments/visa.svg" height="50" alt="VISA">
                    <img src="../dist/content-img/payments/maestro.svg"  height="50" alt="Maestro">
                    <img src="../dist/content-img/payments/mastercard.svg " height="50" alt="MasterCard">
                    <img src="../dist/content-img/payments/dinners.svg " height="50" alt="Dinners">
                  </p>
                </div>


                <div class="radio">
                  <label>
                    <input type="radio" name="payment" value="">
                    Paypal
                  </label>
                </div>

                <div class="radio">
                  <label>
                    <input type="radio" name="payment" value="">
                    Mobito - platba mobilem
                  </label>
                </div>

                <div class="radio">
                  <label>
                    <input type="radio" name="payment" value="">
                    mPeníze
                  </label>
                </div>

                <div class="radio">
                  <label>
                    <input type="radio" name="payment" value="">
                    PaySec
                  </label>
                </div>

              </div><!-- /.vc-section -->

              <div class="vc-section form form-horizontal">

                <h2 class="vc-heading-underlined">Zvolte dopravu</h2>

                <div class="radio">
                  <label>
                    <input type="radio" name="delivery" id="transferFamily-41" value="">
                    <img class="delivery-img-posta" src="../dist/content-img/delivery/ceska-posta.svg" height="30" alt="Česká pošta"> Obchodní balík Česká pošta
                    <a
                      class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                      tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                      data-content="Při vyřízení objednávky dostanete odkaz na online sledování polohy balíku.
                        Lhůta pro vyzvednutí na poště (pokud vás pošťák nezastihne) je 7 dní.<br>
                        <a href='text.php'>Více informací</a>
                      ">
                      <span class="vc-bubble vc-bubble-info vc-bubble-left vc-bubble-inverse" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                      <span class="sr-only">Nápověda</span>
                    </a><strong class="label label-success">zítra 22.3. u vás</strong>
                  </label>
                  <div class="ui-autocomplete-wrapper js-ui-autocomplete-wrapper">
                    <input class="form-control form-control-m" type="text" id="post_info" name="post_info" placeholder="Napište město nebo PSČ" data-post-info="">
                  </div>
                </div>

                <div class="radio">
                  <label>
                    <input type="radio" name="delivery" id="transferFamily-" value="">
                    <img class="delivery-img-geis" src="../dist/content-img/delivery/geis.svg" height="30" alt="Geis Parcel"> Geis Parcel
                    — 30 Kč
                    <a
                      class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                      tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                      data-content="Při vyřízení objednávky dostanete odkaz na online sledování polohy balíku.
                        Doručovatel GP vás bude v den doručení telefonicky kontaktovat.<br>
                        <a href='text.php'>Více informací</a>
                      ">
                      <span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                      <span class="sr-only">Nápověda</span>
                    </a>
                  </label>
                </div>

                <div class="radio">
                  <label data-toggle="collapse" data-target="#personal-pickup">
                    <input type="radio" name="delivery" id="transferFamily-" value="">
                    Osobní odběr
                  </label>
                </div><!-- /.radio -->

                <div class="vc-box vc-box-dotted vc-box-collapse collapse" id="personal-pickup">
                  <p class="radio">
                    <label>
                      <input type="radio" name="personal" value="">
                      Benešov - Pražská, ALMA Prodejna zdravotnických potřeb
                      <!-- Ikonka nápovědy (otevírá Bootstrap Popover) -->
                      <a
                        class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                        tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                        data-content="Adresa: ALMA Prodejna zdravotnických potřeb, Pražská 2189, Benešov<br>
                            Otevírací doba: Po - Pá 8.00 - 12.00, Po, Ut a CT 13.00 - 16.00 hod<br>
                            Pošleme vám SMS v momentě kdy bude objednávka připravena.<br>
                            <a href='text.php'>Více informací</a>
                          ">
                        <span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                        <span class="sr-only">Nápověda</span>
                      </a>
                    </label>
                  </p>
                  <p class="radio">
                    <label>
                      <input type="radio" name="personal" value="">
                      Beroun - Husovo nám., Lékárna Na Náměstí
                      <!-- Ikonka nápovědy (otevírá Bootstrap Popover) -->
                      <a
                        class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                        tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                        data-content="Adresa: Lékárna Na Náměstí, Husovo nám. 44/31, 266 01 Beroun-Centrum 1<br>
                            Otevírací doba: Po - Pá 8.00 - 12.00, 12.30 - 17.00, So 7.30 - 11.30 hod<br>
                            Pošleme vám SMS v momentě kdy bude objednávka připravena.<br>
                            <a href='text.php'>Více informací</a>
                          ">
                        <span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                        <span class="sr-only">Nápověda</span>
                      </a>
                    </label>
                  </p>
                  <p class="radio">
                    <label>
                      <input type="radio" name="personal" value="">
                      Frýdek-Místek – T. G. M., Lékárna Pod Orlem s.r.o.
                      <!-- Ikonka nápovědy (otevírá Bootstrap Popover) -->
                      <a
                        class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                        tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                        data-content="Adresa: Lékárna Pod Orlem s.r.o., T. G. M. 600, 738 01 Frýdek-Místek<br>
                            Otevírací doba: Po - Pá 7.30 - 17.00, So 8.00 - 12.00 hod<br>
                            Pošleme vám SMS v momentě kdy bude objednávka připravena.<br>
                            <a href='text.php'>Více informací</a>
                          ">
                        <span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                        <span class="sr-only">Nápověda</span>
                      </a>
                    </label>
                  </p>
                  <p class="radio">
                    <label>
                      <input type="radio" name="personal" value="">
                      Praha - Charkovská, Optiscont
                      <!-- Ikonka nápovědy (otevírá Bootstrap Popover) -->
                      <a
                        class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble"
                        tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom"
                        data-content="Adresa: Optiscont, Charkovská 129/29, 101 00 Praha 10<br>
                            Otevírací doba: Po - Pá 9.00 - 18.00, So 9.00 - 14.00 hod<br>
                            Pošleme vám SMS v momentě kdy bude objednávka připravena.<br>
                            <a href='text.php'>Více informací</a>
                          ">
                        <span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span>
                        <span class="sr-only">Nápověda</span>
                      </a>
                    </label>
                  </p>
                </div><!-- /.vc-box -->

              </div><!-- /.vc-section -->

            </div><!-- /.vc-order-form -->

            <!-- Rekapitulace objednávky -->

            <?php include "../_components/order/order-resume.php"; ?>

          </div><!-- /.row -->

          <!-- Odesílací a návratové tlačítko -->
          <?php include "../_components/order/order-goto.php"; ?>

        </form>

      </div>

    </div><!-- /.row -->

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
