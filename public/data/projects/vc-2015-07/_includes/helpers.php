<?php

// Vypisuje srcset varianty obrázků
// --------------------------------

// Varianty co máme a jejich šířka:
// - small (200px)
// - medium (400px)
// - large (600px)

function getSrcSet($filename) {
  echo "../dist/content-img/products/small/product_".$filename.".jpg?2 180w,
    ../dist/content-img/products/medium/product_".$filename.".jpg?2 400w,
    ../dist/content-img/products/large/product_".$filename.".jpg?2 600w";
}

// Funkce pro získání obsahu parametru sizes="" do <img>
// -----------------------------------------------------

// Viz responzivní obrázky: http://www.vzhurudolu.cz/prirucka/srcset-sizes
// šířka layoutu = celou šířka bez 2 * okrajový padding = calc(100vw - 2*15px)

// ### Detail produktu
// - do 767px: šířka layoutu --> calc(100vw - 2*15px)
// - nad 768px: 28% z šířky layoutu --> (min-width: 768px) calc(0.28 * calc(100vw - 2*15px))

function getSizesForDetail() {
  echo "(min-width: 768px) calc(0.28 * calc(100vw - 2*15px)), calc(100vw - 2*15px)";
}

function getSizesForDetailSmall() {
  echo "(min-width: 360px) 180px, 100vw";
}

function getSizesForDetailSmallSub() {
  // 3 vedle sebe 33% - 2*padding obrázku - 2*mezera k okraji stránky
  echo "(min-width: 560px) 125px, (min-width: 480px) calc(33.3vw - 2*12px - 2*30px), calc(33.3vw - 2*5px - 2*15px)";
}

// ### Kategorie
// - calc( (100vw - 4*15px) / 2 * 0.6 ) // 2 na řádku
// - (min-width: 481px) calc( (100vw - 5*15px) / 3 * 0.6 ) // 3 na řádku
// - (min-width: 1201px) calc( (1200px - 4*15px) / 4 * 0.6 ) // 4 na řádku
// - (min-width: 1601px) calc( (100vw - 2*10%) - 6*15px) / 6 * 0.6 ) // 6 na řádku

function getSizesForCategory() { echo "100vw"; }

// ### Košík

function getSizesForCart() {
  echo "(min-width: 320px) calc( (100vw - 2*15px) / 3 ),
    (min-width: 500px) calc( (100vw - 2*15px) / 4 ),
    (min-width: 768px) calc( (100vw - 2*10%) * 0.12 ),
    75px";
}

// ### Náhodná dostupnost
// Pro otestování tabulek s parametry čoček s různými délkami textu

function getRandomAvailability() {
  $availabilites = Array(
    '<strong class="label label-success vc-product-options-label">zítra&nbsp;22.&nbsp;12.&nbsp;u&nbsp;vás</strong>',
    '<strong class="label label-success vc-product-options-label">1&nbsp;až&nbsp;9&nbsp;dnů</strong>',
    '<strong class="label label-success vc-product-options-label">1&nbsp;až&nbsp;14&nbsp;dnů</strong>',
    '<strong class="label label-success vc-product-options-label">zítra&nbsp;22.&nbsp;12.&nbsp;u&nbsp;vás</strong> a <strong class="label label-success vc-product-options-label">5 ks 31. 12. 2014</strong>'
  );

  //return $availabilites[3];
  return $availabilites[array_rand($availabilites)];
}


// ### Náhodné hodnocení
// Pro otestování hodnocení

function getRandomRating($item) {
  $ratings = array(
    array('před měsícem', 'Mirda', 'Dlouhodobá spokojenost'),
    array('před 11 dny', 'Pan Jaroslav', 'kvalitní čočky pro citlivé oči vysoký obsah vody. spokojenost doporučuji k dennímu nošení. Slabiny: náročnější manipulace'),
    array('před hodinou', 'Jana', 'Jsem nositelkou pouze čoček, z tohoto důvodu jsem vybírala značku a typ, který mi bude opravdu vyhovovat. Několik produktu jsem vyzkoušela, ale nejvíce mi sedl tento a používám ho již několik let a jsem nadmíru spokojená. Aplikace je velmi jednoduchá, jsou příjemné i po celodenním nošení, moje oči nejsou unavené, nepálí.Čočky jsou měkké, neřežou a nezpůsobují pálení jako jiné produkty se kterými mám zkušenosti. Občas v nich i přespím. Jeho velkou výhodou je cenová dostupnost. kdy cena opravdu odpovídá kvalitě. Tento produkt bych určitě doporučila všem.'),
    array('před rokem', 'Kateřina', 'Čočky používám dlouhodobě a jsem spokojena. V jednom období jsem často otevřela vaničku a čočka byla poškozena (vlnkovité zakončení okraje), jednou dokonce čočka chyběla. Nicméně jsem tehdy informovala prodejnu o opakovaném problému a za nějakou dobu tento problém ustal. Nadále jsem byla opět spokojena. HP'),
    array('před 2 měsíci', 'Saskia', 'Dobrá kvalita za rozumnou cenu. --. Slabiny: -- '),
    array('před 3 roky', 'Monika', 'patří mezi propustnější čočky po celém dni nošení je vyhodím a další den si vezmu nové v oku je vůbec necítím. Kontaktní čočky mi byly doporučeny optometristkou. Aplikaci předcházelo vyšetření očí a zkoušení několika čoček. Po vyzkoušení acuvue moist, jsem měla pocit, že mi v oku nic nepřekáží, optometristka kontrolovala jak sedí. Z počátku bylo nandavání obtížnější, jelikož se mi pod čočkou udělala malá bublinka a při vyhánění se mi čočka srolovala, takže nandavání bylo zdlouhavé, ale člověk se to rychle naučí. Jednodenní kontaktní čočky patří spíše mezi ty dražší, ale já je nenosím denně. Nosím je, když se chystám sportovat a to bývá tak 3x až 4x do týdně, takže mi vydrží krabička tak na 9 týdnu. Tyto kontaktní čočky bych doporučila všem, co dělají nějaký sport, ale ne denně, a vidí špatně na dálku jako já. Dále bych to doporučila lidem, kteří se rádi baví a o víkendech vyráží z přáteli někam do klubů a říkají si, že by jim brýle překážely.'),
    array('před 4 roky', 'Ověřený zákazník', 'pohodlné. ok. Slabiny: měkké, obtížnější aplikace'),
    array('před 4 roky', 'Ověřený zákazník', 'nedráždí oči, téměř o nich nevíte. nenosím čočky každý den, tak jsem objednal jednodenní a jsem spokojen. Slabiny: po celodenním nošení se k večeru snižuje konfort nošení'),
    array('před 4 roky', 'Ověřený zákazník', 'jsou nejlepší. Jsem s ním spokejena,neměla bych '),
    array('před 4 roky', 'Ověřený zákazník', 'Slabé, v oku neznatelné, vyhovující jednodenní - ráno nasadit, večer vyhodit :-) Odpadá starost s čištěním a dezinfekcí. Lehce se nasazují.. Po 20 letech nošení brýlí, kdy jsem čočky musela přestat nosit z důvodu nesnášenlivosti v oku, jsem objevila tyto jednodenní a jsem jimi naprosto nadšená.. Slabiny: Horší rozlišit rub a líc :-('),
    array('před 4 roky', 'Ověřený zákazník', 'Cenová dostupnost. Spokojenost, ale mylsím, že kvalita není 100%. Ne vždy přilnou dobře k oku. Jsou křehké a trochu náchylné na trhání.. Slabiny: Ne vždy přilnou k oku, křehké.'),
    array('před 4 roky', 'Ověřený zákazník', 'S produktem mam jiz zkusenosti z podlesnich let a jsem plne spokojen.'),
    array('před 4 roky', 'Ověřený zákazník', 'nejlepší jednorázové čočky, které jsem kdy měla. Snadné nasazování a vyndávání, žádné vysušené oči..'),
    array('před 4 roky', 'Ověřený zákazník', 'Žádné problémy s výrobkem. Výrobek hodnotím kladně. Slabiny: Obtížnější nasazování - jako bývá u jednodenní čoček'),
    array('před 4 roky', 'Ověřený zákazník', 'S tímto produktem mám dlouholeté zkušenosti a jsem jsem s ním naprosto spokojená. Produkt se mi velice dobře používá, snadná aplikace. Produkt bych doporučila ostatním.')
  );

  //return $ratings[4];
  return $ratings[array_rand($ratings)][$item];
}


// ### Primitivní překlady
// Pro otestování jazykových variant

function getTrans($string) {
    global $lang;

    $dictionary = array(
        "en"  =>  array(
            "quantity" => "Boxes",
            "power" => "Power",
            "base-curve" => "Base curve",
            "add" => "Add",
            "cylinder" => "Cylinder",
            "axis" => "Axis",
            "diameter" => "Diameter",
            "availability" => "Availability",
        ),

        "cs"  =>  array(
            "quantity" => "Počet balení",
            "power" => "Dioptrie",
            "base-curve" => "Zakřivení",
            "add" => "Adice",
            "cylinder" => "Cylindr",
            "axis" => "Osa",
            "diameter" => "Průměr",
            "availability" => "Dostupnost",
        ),

        "de"  =>  array(
            "quantity" => "Menge",
            "power" => "Dioptrien",
            "base-curve" => "Basiskurve",
            "add" => "Addition",
            "cylinder" => "Zylinder",
            "axis" => "Achse",
            "diameter" => "Durchmesser",
            "availability" => "Lieferzeit",
        ),

        "longest"  =>  array(
            "quantity" => "Förpackningar",
            "power" => "Curbură de bază",
            "base-curve" => "Courbure de base",
            "add" => "Lägg till",
            "cylinder" => "Zylinder",
            "axis" => "Achse",
            "diameter" => "Diametro (DIA)",
            "availability" => "Date d'expédition approximative",
        )
    );

    echo $dictionary[$lang][$string];
};


?>
