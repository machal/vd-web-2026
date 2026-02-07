<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Cart GoTo: Tlačítka pro pokračování v nákupu nebo návrat do obchodu
-->

<div class="cart-goto">
  <p class="cart-goto-back">
    <a href="category.php" class="btn cart-goto-btn">
      Zpět do obchodu
    </a>
  </p>
  <p class="cart-goto-next">
    <input type="submit" class="btn btn-primary cart-goto-btn" name="" value="Pokračovat v objednávce">
  </p>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
