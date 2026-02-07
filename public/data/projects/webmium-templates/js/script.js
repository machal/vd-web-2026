// Inicializace
var init = function() {
  // Ruzne verze navigace
  if (Modernizr.mq('screen and (max-width: 599px)')) {
    // … na malych screenech (599 a mene)
    // - schovame navigaci
    // - zobrazime hlavicku .wm-l-mobile-header    
    // - osetrujeme klikani na "zobrazovac navigace" .wm-l-mobile-header .btn
    $('#sw-main-navigation').hide();
    $('.wm-l-mobile-header').show();
    $('.wm-l-mobile-header .btn').click(function() {
      $('#sw-main-navigation').slideToggle(100);
      $(this).toggleClass('active');
      return false;
    });
  } else {
    // … na velkych screenech:
    //  - schovavame mobilni hlavicku .wm-l-mobile-header
    //  - zobrazime    
    $('#sw-main-navigation.nav-vertical').show();
    $('#sw-main-navigation.nav-horizontal').css('display', 'table');
    $('.wm-l-mobile-header').hide();
  }
};  

$(document).ready(init);
$(window).resize(init);  // Kvuli testovani naveseno i na resize okna TODO blbne