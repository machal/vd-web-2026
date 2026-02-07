<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<?php
$overal_rating = mt_rand(0,100);

?>


<div class="vc-detail-rating">

  <h2 class="h1 vc-detail-rating-headline">
    Hodnocení: <?php echo $overal_rating ?>&nbsp;%
    <span class="vc-rating-stars"><span class="vc-rating-stars-rating vc-rating-stars-rating" style="width:<?php echo $overal_rating ?>%"></span></span>
    <small>na základě 54&nbsp;recenzí</small>
  </h2>

  <?php
    // prvni dve hodnoceni
    for ($i = 1; $i <= 2; $i++) {
        include "../_components/detail/detail-rating-item.php";
    }
  ?>

  <div class="vc-detail-rating-more-items">
    <?php
      // prvni vsechna zbyvajici
      for ($i = 1; $i <= 52; $i++) {
          include "../_components/detail/detail-rating-item.php";
      }
    ?>
  </div>

  <p class="vc-detail-rating-show-more">
    <a href="#" class="vc-btn vc-btn-default vc-btn-xs">
      Dalších 52 hodnocení
    </a>
    <span class="vc-detail-rating-note">zobrazujeme pouze hodnocení s&nbsp;komentářem</span>
  </p>

</div><!-- .vc-detail-rating -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
