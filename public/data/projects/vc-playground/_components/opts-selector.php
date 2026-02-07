<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<div class="opts-selector opts-selector-4-items">

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
        <option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
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
        14.00
      </p>
    </div>

  </div><!-- .opts-selector-items -->

  <p class="opts-selector-availability">
    <strong>
      Dostupnost:
    </strong>
    v pondělí 1. 12. u vás
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
