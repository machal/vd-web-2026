<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!-- Kroky objednávky -->

<div class="vc-order-steps">

  <h2 class="sr-only">Kroky objednávky</h2>

  <ul>
    <li class="vc-order-steps-item">
      <?php echo ($page_name == 'Košík')?'<strong>':'<a href="cart.php">'; ?>
        <span class="vc-order-steps-item-nr">1.<br></span>
        <span class="vc-order-steps-item-txt">Nákupní<br> košík</span>
      <?php echo ($page_name == 'Košík')?'</strong>':'</a>'; ?>
    </li>
    <li class="vc-order-steps-item">
      <?php echo ($page_name == 'Vyberte si dárek')?'<strong>':'<a href="order-gift.php">'; ?>
        <span class="vc-order-steps-item-nr">2.<br></span>
        <span class="vc-order-steps-item-txt">Vyberte si<br> dárek</span>
      <?php echo ($page_name == 'Vyberte si dárek')?'</strong>':'</a>'; ?>
    </li>
    <li class="vc-order-steps-item">
      <?php echo ($page_name == 'Doprava a platba')?'<strong>':'<a href="order-delivery-payment.php">'; ?>
        <span class="vc-order-steps-item-nr">3.<br></span>
        <span class="vc-order-steps-item-txt">Doprava a<br> platba</span>
      <?php echo ($page_name == 'Doprava a platba')?'</strong>':'</a>'; ?>
    </li>
    <li class="vc-order-steps-item">
      <?php echo ($page_name == 'Osobní údaje')?'<strong>':'<span href="order-personal-details.php">'; ?>
        <span class="vc-order-steps-item-nr">4.<br></span>
        <span class="vc-order-steps-item-txt">Osobní<br> údaje</span>
      <?php echo ($page_name == 'Osobní údaje')?'</strong>':'</span>'; ?>
    </li>
    <li class="vc-order-steps-item">
      <?php echo ($page_name == 'Potvrzení objednávky')?'<strong>':'<a href="order-confirmation.php">'; ?>
        <span class="vc-order-steps-item-nr">5.<br></span>
        <span class="vc-order-steps-item-txt">Potvrzení<br> objednávky</span>
      <?php echo ($page_name == 'Potvrzení objednávky')?'</strong>':'</a>'; ?>
    </li>
  </ul>

</div><!-- /.vc-order-steps -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
