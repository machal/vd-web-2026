<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!-- Kroky objednávky -->

<div class="order-steps">

  <h2 class="sr-only">Kroky objednávky</h2>

  <ul>
    <li class="order-steps-item">
      <?php echo ($page_name == 'Košík')?'<strong>':'<a href="cart.php">'; ?>
        <span class="in">
          <span class="nr">1.<br></span>
          <span class="txt">Košík</span>
        </span>
      <?php echo ($page_name == 'Košík')?'</strong>':'</a>'; ?>
    </li>
    <li class="order-steps-item">
      <?php echo ($page_name == 'Vyberte si dárek')?'<strong>':'<a href="order-gift.php">'; ?>
        <span class="in">
          <span class="nr">2.<br></span>
          <span class="txt">Vyberte si dárek</span>
        </span>
      <?php echo ($page_name == 'Vyberte si dárek')?'</strong>':'</a>'; ?>
    </li>
    <li class="order-steps-item">
      <?php echo ($page_name == 'Doprava a platba')?'<strong>':'<a href="order-delivery-payment.php">'; ?>
        <span class="in">
          <span class="nr">3.<br></span>
          <span class="txt">Doprava a platba</span>
        </span>
      <?php echo ($page_name == 'Doprava a platba')?'</strong>':'</a>'; ?>
    </li>
    <li class="order-steps-item">
      <?php echo ($page_name == 'Osobní údaje')?'<strong>':'<a href="order-personal-details.php">'; ?>
        <span class="in">
          <span class="nr">4.<br></span>
          <span class="txt">Osobní údaje</span>
        </span>
      <?php echo ($page_name == 'Osobní údaje')?'</strong>':'</a>'; ?>
    </li>
    <li class="order-steps-item">
      <?php echo ($page_name == 'Potvrzení objednávky')?'<strong>':'<a href="order-confirmation.php">'; ?>
        <span class="in">
          <span class="nr">5.<br></span>
          <span class="txt">Potvrzení objednávky</span>
        </span>
      <?php echo ($page_name == 'Potvrzení objednávky')?'</strong>':'</a>'; ?>
    </li>
  </ul>

</div><!-- /.order-steps -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
