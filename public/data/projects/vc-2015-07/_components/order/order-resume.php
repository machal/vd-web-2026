<?php
// Rekapitulace objednávky pro nákupní proces
?>

<div class="vc-order-resume">

  <div class="vc-order-goto-second">
    <?php include "../_components/order/order-goto.php"; ?>
  </div>

  <h2 class="vc-heading-underlined">
    Rekapitulace objednávky
  </h2>

  <div class="vc-order-resume-bg">

    <table class="table">
      <tbody>
        <tr class="row-product">
          <td>
            1×
          </td>
          <td>
            Biofinity (6 čoček)<br>
            <div class="vc-font-size-smaller">
              Dioptrie: -10.50<br>
              Zakřivení: 8.60<br>
              Průměr: 14.00
            </div>
          </td>
          <td class="vc-table-recap-price">
            648&nbsp;Kč
          </td>
        </tr>
        <tr class="row-product">
          <td>
            1×
          </td>
          <td>
            Biofinity (6 čoček)<br>
            <div class="vc-font-size-smaller">
              Dioptrie: -9.50<br>
              Zakřivení: 8.60<br>
              Průměr: 10.00
            </div>
          </td>
          <td class="vc-table-recap-price">
            648&nbsp;Kč
          </td>
        </tr>
        <tr class="row-product">
          <td>
            1×
          </td>
          <td>
            AO SEPT PLUS 360 ml s pouzdrem
          </td>
          <td class="vc-table-recap-price">
            648&nbsp;Kč
          </td>
        </tr>
        <tr class="row-price">
          <td colspan="2">
            Cena za zboží:
          </td>
          <td class="vc-table-recap-price">
            1&nbsp;615&nbsp;Kč
          </td>
        </tr>
        <tr class="row-delivery">
          <td colspan="2">
            Způsob dopravy: Geis Parcel
          </td>
          <td class="vc-table-recap-price">
            <strong>zdarma</strong>
          </td>
        </tr>
        <tr class="row-payment">
          <td colspan="2">
            Způsob platby: PaySec
          </td>
          <td class="vc-table-recap-price">
            <strong>zdarma</strong>
          </td>
        </tr>
        <tr class="row-sum">
          <td colspan="2">
            <strong>Celková cena</strong>
          </td>
          <td class="vc-table-recap-price">
            <strong>1&nbsp;615&nbsp;Kč</strong>
          </td>
        </tr>
      </tbody>
    </table>

  </div><!-- .vc-order-resume-bg -->

  <div class="vc-box vc-box-for-recap">
    <p>Dostupnost: <?php echo getRandomAvailability(); ?></p>
  </div><!-- .vc-order-resume-bg -->

</div>
<!-- /.vc-order-resume -->
