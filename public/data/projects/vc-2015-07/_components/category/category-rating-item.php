<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<?php

$stars_count = mt_rand(0,5); // náhodný počet hvězdiček

?>

<div class="vc-rating-item vc-rating-item-for-lists">
  <div class="vc-matrjoska">

    <blockquote class="vc-rating-text">
      „<?php /* text hodnoceni */ echo getRandomRating(2); ?>“
    </blockquote>

    <div class="vc-rating-metadata vc-rating-metadata-heureka">

      <p class="vc-rating-author">
        <?php /* jmeno zakaznika */ echo getRandomRating(1); ?>, <?php /* datum hodnoceni */ echo getRandomRating(0); ?>
      </p>

      <p class="vc-rating-stars">
        <span class="vc-rating-stars-rating vc-rating-stars-rating-<?php echo $stars_count; ?>"></span>
        <span class="sr-only">hodnocení <?php echo $stars_count; ?> z 5</span>
      </p>

    </div>
  </div>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
