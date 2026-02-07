<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<?php /* testimonialy při každém 3. a 4. zobrazení */ if ($_SESSION['cycle'][0][3] == 2 || $_SESSION['cycle'][0][3] == 3): ?>
  <div class="vc-testimonials">
    <div class="vc-container">
      <div class="vc-testimonials-row">

        <div class="vc-testimonials-column vc-testimonials-column-info">
          <h3 class="vc-testimonials-heading">U nás je nákup opravdu prověřen.</h3>
          <p class="vc-testimonials-desc">Z 6&nbsp;789 recenzí máme 99&nbsp;%&nbsp;kladných.</p>
          <p class="vc-testimonials-link"><a href="http://obchody.heureka.cz/vasecocky-cz/recenze/"><span>Prohlédnout hodnocení na Heureka.cz</span></a></p>
        </div>

        <?php for ($i = 1; $i <= 3; $i++) { ?>
          <div class="vc-testimonials-column vc-testimonials-column-content">
            <?php include "../_components/category/category-rating-item.php"; ?>
          </div>
        <?php } ?>

      </div><!-- /.vc-testimonials-content -->
    </div>
  </div><!-- /.vc-testimonials -->
<?php endif; ?>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
