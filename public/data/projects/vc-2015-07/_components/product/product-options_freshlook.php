<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<!--

Product Options: zobrazujeme v detailu i v košíku
=================================================

- v košíku třída .vc-product-options-cart, v detailu vc-product-options-detail, vc-box a vc-box-bordered
- v košíku se editovatelné <select> zobrazují jen pokud zmáčknu "Upravit"
- přidáváme třídu .vc-product-options-4-items podle počtu parametrů (počítáme s 1, 4, 5, 6, 7 variantami)

-->

<div class="vc-product-options vc-product-options-5-items <?php echo ($page_name == "Košík")?"vc-product-options-cart":"vc-box vc-box-bordered vc-product-options-detail" ?>">

  <h2 class="h3 vc-product-options-heading">
    Zvolte parametry
  </h2>

  <div class="vc-product-options-first-eye">

    <div class="vc-product-options-items">

      <div class="vc-product-options-item vc-product-options-quantity form-group">
        <label for="___" class="control-label">
          <?php getTrans("quantity");?>
        </label>
        <select class="form-control" name="___" id="___">
          <?php if ($page_name == "Košík"): ?><option value="0">0</option><?php endif; ?>
          <option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-power form-group <?php /* Varianta s chybou */ if ($_SESSION['cycle'][0][1] & $page_name != "Košík"): ?>has-warning<?php endif; ?>">
        <label for="___" class="control-label">
          <?php getTrans("power");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="null" selected="selected">---</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.5">+2.50</option><option value="3">+3.00</option><option value="3.5">+3.50</option><option value="4">+4.00</option><option value="4.5">+4.50</option><option value="5">+5.00</option><option value="5.5">+5.50</option><option value="6">+6.00</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-base-curve form-group">
        <label for="___" class="control-label">
          <?php getTrans("base-curve");?>
        </label>
        <p class="form-control-static">
          8.60
        </p>
      </div>

      <div class="vc-product-options-item vc-product-options-diameter form-group">
        <label for="___" class="control-label">
          <?php getTrans("diameter");?>
        </label>
        <p class="form-control-static">
          14.50
        </p>
      </div>


  <!-- Varianty:
       - Musi byt vzdy na poslednim miste.
       - Tvori je select s variantami (pokud nefici JS a fallback kvuli pristupnosti a odesilani formulare)
       nebo tlacitko na otevirani vrstvy (pokud je pritomny JS).
  -->

      <div class="vc-product-options-item vc-product-options-variants form-group">
        <label for="___" class="control-label">
          Barva
        </label>
        <select class="form-control vc-product-variants-select" name="___" id="___">
          <option value="null" <?php if ($page_name != "Košík"){ echo 'selected="selected"'; } ?>>Vyberte barvu</option>
          <option value="Amethyst">Amethyst</option><option value="Blue">Blue</option><option value="Briliant Blue">Briliant Blue</option><option value="Gemstone Green">Gemstone Green</option><option value="Gray">Gray</option><option value="Green">Green</option><option value="Honey">Honey</option><option value="Chestnut Brown">Chestnut Brown</option><option value="Pure Hazel">Pure Hazel</option><option value="True Sapphire">True Sapphire</option><option value="Turquoise">Turquoise</option>
          <option value="Gemstone Dark Green" <?php if ($page_name == "Košík"){ echo 'selected="selected"'; } ?>>Gemstone Dark Green</option>
        </select>
        <p class="form-control-static vc-product-variants-anchor">
          <span class="vc-text"><i>Vyberte barvu</i></span>
        </p>
      </div>

      <div class="vc-product-options-item vc-product-options-availability form-group">
        <label for="___" class="control-label">
          <?php getTrans("availability");?>
        </label>
        <p class="form-control-static">
          <?php echo getRandomAvailability(); ?>
        </p>
      </div>

    </div><!-- .vc-product-options-items -->

  </div><!-- .vc-product-options-first-eye -->


  <!-- Varianty: Vizualni seznam
       Zobrazujeme, pokud funguje JS.
  -->

  <div class="vc-product-variants <?php /* Varianta s chybou */ if ($_SESSION['cycle'][0][1] & $page_name != "Košík"): ?>has-warning<?php endif; ?>">
    <div class="vc-product-variants-heading control-label">Barva</div>

    <!-- velikost obrázků by měla být alespoň 262px (2×131, což je aktuálně maximální velikost * retina faktor) -->

    <ul class="vc-product-variants-list" id="variants-list">
      <li class="vc-product-variants-variant" data-value="Amethyst">
        <img src="../dist/content-img/variants/freshlook_amethyst.jpg" alt="Amethyst">
        <span class="vc-text">Amethyst</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Blue">
        <img src="../dist/content-img/variants/freshlook_blue.jpg" alt="Blue">
        <span class="vc-text">Blue</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Brown">
        <img src="../dist/content-img/variants/freshlook_brown.jpg" alt="Brown">
        <span class="vc-text">Brown</span>
      </li>
      <!-- Tridu .active ma predvybrana polozka - pouze v kosiku -->
      <li class="vc-product-variants-variant" data-value="Briliant Blue">
        <img src="../dist/content-img/variants/freshlook_brilliant_blue.jpg" alt="Briliant Blue">
        <span class="vc-text">Briliant Blue</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Gemstone Green">
        <img src="../dist/content-img/variants/freshlook_gemstone_green.jpg" alt="Gemstone Green">
        <span class="vc-text">Gemstone Green</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Gray">
        <img src="../dist/content-img/variants/freshlook_gray.jpg" alt="Gray">
        <span class="vc-text">Gray</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Green">
        <img src="../dist/content-img/variants/freshlook_green.jpg" alt="Green">
        <span class="vc-text">Green</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Honey">
        <img src="../dist/content-img/variants/freshlook_honey.jpg" alt="Honey">
        <span class="vc-text">Honey</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Pure Hazel">
        <img src="../dist/content-img/variants/freshlook_pure_hazel.jpg" alt="Pure Hazel">
        <span class="vc-text">Pure Hazel</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Sterling Gray">
        <img src="../dist/content-img/variants/freshlook_sterling_gray.jpg" alt="Sterling Gray">
        <span class="vc-text">Sterling Gray</span>
      </li>
      <li class="vc-product-variants-variant" data-value="True Sapphire">
        <img src="../dist/content-img/variants/freshlook_true_saphire.jpg" alt="True Sapphire">
        <span class="vc-text">True Sapphire</span>
      </li>
      <li class="vc-product-variants-variant" data-value="Turquoise">
        <img src="../dist/content-img/variants/freshlook_turquoise.jpg" alt="Turquoise">
        <span class="vc-text">Turquoise</span>
      </li>
    </ul><!-- .vc-product-variants -->
  </div>


  <!-- Druhé oko -->

  <div class="vc-product-options-second-eye">

    <div class="vc-product-options-items">

      <div class="vc-product-options-item vc-product-options-quantity form-group">
        <label for="___" class="control-label">
          <?php getTrans("quantity");?>
        </label>
        <select class="form-control" name="___" id="___">
          <?php if ($page_name == "Košík"): ?><option value="0">0</option><?php endif; ?>
          <option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-power form-group">
        <label for="___" class="control-label">
          <?php getTrans("power");?>

        </label>
        <select class="form-control" name="___" id="___">
          <option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="null" selected="selected">---</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.5">+2.50</option><option value="3">+3.00</option><option value="3.5">+3.50</option><option value="4">+4.00</option><option value="4.5">+4.50</option><option value="5">+5.00</option><option value="5.5">+5.50</option><option value="6">+6.00</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-base-curve form-group">
        <label for="___" class="control-label">
          <?php getTrans("base-curve");?>
        </label>
        <p class="form-control-static">
          8.60
        </p>
      </div>

      <div class="vc-product-options-item vc-product-options-diameter form-group">
        <label for="___" class="control-label">
          <?php getTrans("diameter");?>
        </label>
        <p class="form-control-static">
          14.50
        </p>
      </div>


  <!-- Varianty:
       - Musi byt vzdy na poslednim miste.
       - Tvori je select s variantami (pokud nefici JS a fallback kvuli pristupnosti a odesilani formulare)
       nebo tlacitko na otevirani vrstvy (pokud je pritomny JS).
  -->

      <div class="vc-product-options-item vc-product-options-variants form-group">
        <label for="___" class="control-label">
          Barva
        </label>
        <select class="form-control vc-product-variants-select" name="___" id="___">
          <option value="null" <?php if ($page_name != "Košík"){ echo 'selected="selected"'; } ?>>Vyberte barvu</option>
          <option value="Amethyst">Amethyst</option><option value="Blue">Blue</option><option value="Briliant Blue">Briliant Blue</option><option value="Gemstone Green">Gemstone Green</option><option value="Gray">Gray</option><option value="Green">Green</option><option value="Honey">Honey</option><option value="Chestnut Brown">Chestnut Brown</option><option value="Pure Hazel">Pure Hazel</option><option value="True Sapphire">True Sapphire</option><option value="Turquoise">Turquoise</option>
          <option value="Gemstone Dark Green" <?php if ($page_name == "Košík"){ echo 'selected="selected"'; } ?>>Gemstone Dark Green</option>
        </select>
        <p class="form-control-static vc-product-variants-anchor">
          <span class="vc-text"><i>Vyberte barvu</i></span>
        </p>
      </div>


      <div class="vc-product-options-item vc-product-options-availability form-group">
        <label for="___" class="control-label">
          <?php getTrans("availability");?>
        </label>
        <p class="form-control-static">
          <?php echo getRandomAvailability(); ?>
        </p>
      </div>

    </div><!-- .vc-product-options-items -->



  </div><!-- .vc-product-options-second-eye -->


  <!-- Přidání/odebrání druhého oka -->

  <p class="vc-product-options-add-eye">
    <a href="#"
      data-remove="- zrušit parametry pro druhé oko"
      data-add="+ vybrat parametry i pro druhé oko">+ vybrat parametry i pro druhé oko</a>
  </p>

  <?php if ($page_name != "Košík"): ?>

    <div class="vc-detail-add-to-cart">

      <?php /* Varianta s chybou */ if ($_SESSION['cycle'][0][1] & $page_name != "Košík"): ?>
        <div class="alert alert-warning" role="alert">
          <b>Zboží nemohlo být přidáno do košíku</b>
          <br>Vyberte prosím chybějící parametry.
        </div>
      <?php endif; ?>

      <button type="submit" class="vc-btn vc-btn-outlined vc-btn-lg">Přidat do košíku</button>

      <a href="#" class="vc-detail-transport">
        <ul>
          <li><b>Doprava zdarma nad 1600&nbsp;Kč</b></li>
          <li>Pod 1600&nbsp;Kč – Výdejní místa 24&nbsp;Kč</li>
          <li>Platba předem 69&nbsp;Kč, dobírka 99&nbsp;Kč</li>
        </ul>
      </a>
    </div>

  <?php endif; ?>

</div><!-- .vc-product-options -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
