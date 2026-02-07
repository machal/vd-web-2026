<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-search-form" role="search" id="search">
  <h2 class="sr-only">Vyhledávání</h2>
  <form>
    <p class="input-group">
      <input type="text" class="form-control vc-search-form-input" placeholder="Hledaný text">
      <span class="input-group-btn">
        <button class="vc-btn vc-btn-search" type="button">Hledat</button>
      </span>
    </p>
  </form>
</div>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
