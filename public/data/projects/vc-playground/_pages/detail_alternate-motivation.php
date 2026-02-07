<?php

include("../_includes/init.php");

$page_name = "Biofinity 648 Kč";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head.php") ?>

<?php include "../_components/banner__inside.php" ?>

    <div class="row">

      <div class="content content-narrower">

        <h1 class="detail-heading">
          Biofinity (6 čoček)
        </h1>

        <h2 class="detail-price">
          648 Kč
        </h2>

        <p class="detail-in-stock">
          <a href="#centralni-sklad">Na skladě</a> > 2300 ks, <a href="#prodejna">prodejna Praha</a> 53 ks.
        </p>


        <p class="detail-image">
          <img src="../dist/img/product_2082-1-330.jpg"
          alt="Biofinity 648 Kč"
          class="img-responsive" />
          
<!-- Upozornění na změnu vzhledu obalu -->          
          <span class="detail-image-caption">
            Pozor, výrobce nedávno změnil vzhled obalu. 
            Tento nový se proto nemusí shodovat <a href="https://www.google.cz/search?q=Biofinity+%C4%8Do%C4%8Dky&espv=2&biw=1920&bih=1101&source=lnms&tbm=isch&sa=X&ei=Nj53VNfnMsnWPOf4gLAF&ved=0CAYQ_AUoAQ">
            s vaším.</a>
          </span>
        </p>

        <?php include "../_components/opts-selector.php" ?>

<!-- Varianta pro komunikaci vyhod: vse v jednom boxiku .detail-motivation  -->

<style>

@media only screen and (min-width: 521px) {
  .detail-add-to-cart {
    float: none;
    margin-top: 0;
    text-align: center;
  }
}  
  
</style>



        <form class="detail-add-to-cart">
          <input type="submit" class="btn btn-primary btn-lg" value="Přidat do košíku">
        </form>

        <div class="detail-motivation">
          <ul class="motivation-box">
            <li class="motivation-box-item">
              Doprava zdarma nad 1600 Kč. 
              Pod 1600 Kč: Výdejní místa 24 Kč, 
              platba předem 69 Kč, dobírka&nbsp;99&nbsp;Kč.
            </li>
            <li class="motivation-box-item">
              Můžete vyzvednout na výdejních místech
              <a href="#">Praha - Jindřišská</a>,
              <a href="#">Praha - Charkovská</a> 
              a <a href="#">61 dalších po celé&nbsp;ČR</a>.
            </li>
            <li class="motivation-box-item">
              365 dní garantujeme výměnu čoček pokud se vám změní dioptrická hodnota&nbsp;očí.
            </li>
            <li class="motivation-box-item">
              Nákupem získáte <a href="#/bonusove-zbozi.html">126 bonusových&nbsp;bodů</a>.
            </li>            
          </ul>
        </div>

        <?php include "../_components/detail-rating.php" ?>

        <div class="detail-description">
          <h2 class="h3 heading-underlined">
            Více o produktu
          </h2>        
          <p>
            Biofinity (6 čoček) jsou moderní silikon-hydrogelové kontaktní čočky, které spolu s nadprůměrnou propustností pro kyslík nabízejí současně vysoký obsah vody. Řadí se mezi nejzdravější kontaktní čočky na trhu. Jsou určeny pro denní nošení s měsíční výměnou, na doporučení lékaře můžete však čočky Biofinity nosit i kontinuálně. Některé krabičky Biofinity (6 čoček) mají již nový design obalu.
          </p>          
          <div class="table-responsive">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th>Výrobce:</th>
                  <td><a itemprop="manufacturer" href="#">Cooper Vision</a></td>
                </tr>
                <tr>
                  <th>Kategorie:</th>
                  <td>
                    <a href="#/mesicni-kontaktni-cocky.html">Měsíční čočky</a><br>
                    <a href="#/kontinualni-kontaktni-cocky.html">Kontinuální čočky</a><br>
                    <a href="#/silikon-hydrogelove-kontaktni-cocky.html">Silikon-hydrogelové</a>               
                  </td>
                </tr>
            </tbody>
            </table>
          </div>
        </div>


        <?php include "../_components/detail-pars-questions.php" ?>

      </div>

    </div><!-- .row -->

<?php include("../_components/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
