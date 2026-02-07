<?php
// Rekapitulace objednávky pro nákupní proces
?>

<div class="order-resume">

  <div class="order-resume-bg">

    <h2 class="heading-underlined">
      Rekapitulace objednávky
    </h2>

    <table class="table">
      <tbody>
        <tr>
          <td>
            1×
          </td>
          <td>
            Biofinity (6 čoček)<br>
            <div class="font-size-smaller">
              Dioptrie: -10.50<br>
              Zakřivení: 8.60<br>
              Průměr: 14.00
            </div>
          </td>
          <td class="table-recap-price">
            648&nbsp;Kč
          </td>
        </tr>
        <tr>
          <td>
            1×
          </td>
          <td>
            Biofinity (6 čoček)<br>
            <div class="font-size-smaller">
              Dioptrie: -9.50<br>
              Zakřivení: 8.60<br>
              Průměr: 10.00
            </div>
          </td>
          <td class="table-recap-price">
            648&nbsp;Kč
          </td>
        </tr>
        <tr>
          <td>
            1×
          </td>
          <td>
            AO SEPT PLUS 360 ml s pouzdrem
          </td>
          <td class="table-recap-price">
            648&nbsp;Kč
          </td>
        </tr>
        <tr>
          <td colspan="2">
            Cena za zboží:
          </td>
          <td class="table-recap-price">
            1&nbsp;615&nbsp;Kč
          </td>
        </tr>
        <tr>
          <td colspan="2">
            Způsob dopravy: Geis Parcel
          </td>
          <td class="table-recap-price">
            0&nbsp;Kč
          </td>
        </tr>
        <tr>
          <td colspan="2">
            Způsob platby: PaySec
          </td>
          <td class="table-recap-price">
            0&nbsp;Kč
          </td>
        </tr>
        <tr>
          <td colspan="2">
            Celková cena
          </td>
          <td class="table-recap-price">
            <strong>1&nbsp;615&nbsp;Kč</strong>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            Dostupnost:
            <?php echo getRandomAvailability(); ?>
          </td>
        </tr>
      </tbody>
    </table>

  </div><!-- .order-resume-bg -->

  <div class="order-goto-second">
    <?php include "../_components/order/order-goto.php"; ?>
  </div>

</div>
<!-- /.order-resume -->
