<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>



<div class="opts-selector opts-selector-5-items">

  <h2 class="h3 opts-selector-heading">
    Zvolte parametry
  </h2>

  <div class="opts-selector-first-eye">

    <div class="opts-selector-items">

      <div class="opts-selector-item opts-selector-count form-group">
        <label for="___">
          Počet&nbsp;balení
        </label>
        <select class="form-control" name="___" id="___">
          <option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
        </select>
      </div>

      <div class="opts-selector-item form-group">
        <label for="___">
          Dioptrie
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.5">+2.50</option><option value="3">+3.00</option><option value="3.5">+3.50</option><option value="4">+4.00</option><option value="4.5">+4.50</option><option value="5">+5.00</option><option value="5.5">+5.50</option><option value="6">+6.00</option>
        </select>
      </div>

      <div class="opts-selector-item form-group">
        <label for="___">
          Zakřivení
        </label>
        <p class="form-control-static">
          8.60
        </p>
      </div>

      <div class="opts-selector-item form-group">
        <label for="___">
          Průměr
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

      <div class="opts-selector-item form-group">
        <label for="___">
          Barva
        </label>
        <div class="opts-variants-opener">
          <select class="form-control opts-variants-select" name="___" id="___">
            <option value="null">---</option>
            <option value="Amethyst">Amethyst</option>
            <option value="Blue">Blue</option><option value="Briliant Blue">Briliant Blue</option><option value="Gemstone Green">Gemstone Green</option><option value="Gray">Gray</option><option value="Green">Green</option><option value="Honey">Honey</option><option value="Chestnut Brown">Chestnut Brown</option><option value="Pure Hazel">Pure Hazel</option><option value="Sterling Grey">Sterling Grey</option><option value="True Sapphire">True Sapphire</option><option value="Turquoise">Turquoise</option>
          </select>
          <p class="form-control-static opts-variants-anchor">
            <a href="#variants-list"  class="text">
              Briliant Blue
            </a>
            <span class="caret"></span>
          </p>
        </div>

      </div>


    </div><!-- .opts-selector-items -->

  <!-- Varianty: Vizualni seznam
       Zobrazujeme, pokud funguje JS.
  -->

    <ul class="opts-variants-list" id="variants-list">
      <li class="opts-variants-variant" data-value="Amethyst">
        <img src="../dist/content-img/variants/freshlook_amethyst.jpg" alt="Amethyst">
        <span class="text">Amethyst</span>
      </li>
      <li class="opts-variants-variant" data-value="Blue">
        <img src="../dist/content-img/variants/freshlook_blue.jpg" alt="Blue">
        <span class="text">Blue</span>
      </li>
  <!-- Tridu .active ma predvybrana polozka - zrejme nejprodavanejsi?
  -->
      <li class="opts-variants-variant active" data-value="Briliant Blue">
        <img src="../dist/content-img/variants/freshlook_gray.jpg" alt="Gray">
        <span class="text">Briliant Blue</span>
      </li>
      <li class="opts-variants-variant" data-value="Gemstone Green">
        <img src="../dist/content-img/variants/freshlook_turquoise.jpg" alt="Gemstone Green">
        <span class="text">Gemstone Green</span>
      </li>
      <li class="opts-variants-variant" data-value="Gray">
        <img src="../dist/content-img/variants/freshlook_gray.jpg" alt="Gray">
        <span class="text">Gray</span>
      </li>
      <li class="opts-variants-variant" data-value="Blue">
        <img src="../dist/content-img/variants/freshlook_blue.jpg" alt="Blue">
        <span class="text">Blue</span>
      </li>
      <li class="opts-variants-variant" data-value="Briliant Blue">
        <img src="../dist/content-img/variants/freshlook_gray.jpg" alt="Gray">
        <span class="text">Briliant Blue</span>
      </li>
      <li class="opts-variants-variant" data-value="Gemstone Green">
        <img src="../dist/content-img/variants/freshlook_turquoise.jpg" alt="Gemstone Green">
        <span class="text">Gemstone Dark Green</span>
      </li>
      <li class="opts-variants-variant" data-value="Gray">
        <img src="../dist/content-img/variants/freshlook_gray.jpg" alt="Gray">
        <span class="text">Gray</span>
      </li>
      <li class="opts-variants-variant" data-value="Amethyst">
        <img src="../dist/content-img/variants/freshlook_amethyst.jpg" alt="Amethyst">
        <span class="text">Amethyst</span>
      </li>
    </ul><!-- .opts-variants -->

    <p class="opts-selector-availability">
      <strong>
        Dostupnost:
      </strong>
      1 až 9 dnů
    </p>

  </div><!-- .opts-selector-first-eye -->

  <p class="opts-selector-add-eye">
    <a href="#"
      data-remove="- zrušit parametry pro druhé oko"
      data-add="+ vybrat parametry i pro druhé oko">+ vybrat parametry i pro druhé oko</a>
  </p>

</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
