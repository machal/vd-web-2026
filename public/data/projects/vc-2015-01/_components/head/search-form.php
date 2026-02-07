<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="search-form" role="search" id="search">
  <h2 class="sr-only">Vyhledávání</h2>
  <form>
    <p class="input-group">
      <input type="text" class="form-control" placeholder="Vyhledávaný text">
      <span class="input-group-btn">
              <button class="btn btn-default" type="button">Najít</button>
          </span>
    </p>
  </form>
</div>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
