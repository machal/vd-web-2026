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
      <strong>
        <span class="in">
          <span class="nr">1.<br></span>
          <span class="txt">Košík</span>
        </span>
      </strong>
    </li>
    <li class="order-steps-item">
    <a href="#">
        <span class="in">
          <span class="nr">2.<br></span>
          <span class="txt">Vyberte si dárek</span>
        </span>
      </a>
    </li>
    <li class="order-steps-item">
      <a href="#">
        <span class="in">
          <span class="nr">3.<br></span>
          <span class="txt">Doprava a platba</span>
        </span>
      </a>
    </li>
    <li class="order-steps-item">
      <a href="#">
        <span class="in">
          <span class="nr">4.<br></span>
          <span class="txt">Osobní údaje</span>
        </span>
      </a>
    </li>
    <li class="order-steps-item">
      <a href="#">
        <span class="in">
          <span class="nr">5.<br></span>
          <span class="txt">Potvrzení objednávky</span>
        </span>
      </a>
    </li>
  </ul>

</div><!-- /.order-steps -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
