/*

Hlavni JS soubor pro prototyp VaseCocky.cz
==========================================

1) Pred vyskladanim DOMu
2) Po vyskladani DOMu
3) Po zmene velikosti okna
4) Pomocne funkce

*/


// 1) Pred vyskladanim DOMu
// ========================


// Navigace
// --------
// Pine.JS responzivni viceurovnova - inicializace.
// https://github.com/rwd-pine/pine

// Detekce IE

var msie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
}());


// Inicializace navigace
// Rozjedeme to jen mimo IE8 a starší, kde je Pine navigace problematická.
// TODO
// - inteligentnější detekce než podle prohlížeče (čekovat vlastnosti).
// - zvážit podmíněné načtení JS a CSS souboru

if (!(msie < 9)) {
  $('.pine').pine({
    largeDisplayStart:    '768px',
    fxSmallDisplay:       'fx-collapse'
  });
}




// 2) Po vyskladani DOMu
// =====================

$(document).ready(function() {


  // Odkazy v paticce (.foot-links)
  // ------------------------------
  // Na mobilech se zobrazi jen rozklikavatelne nadpisy,
  // na desktopu uplne vse

  hideOrShowFootLinks();
  $('.foot-links.collapsible').on('click', '.list-heading', function(){
    $(this).toggleClass('active');
    $(this).next('.list-body').toggle();
    return false;
  });


  // Fastclick
  // ---------
  // Odstraneni 300ms zpozdeni pro tapnuti na mobilnich zarizenich.
  // https://github.com/ftlabs/fastclick

  $(function() {
      FastClick.attach(document.body);
  });


  // Navigace
  // --------
  // Custom rozklikavani navigace,
  // protoze Pine.js neumi callback
  // a my potrebujeme zavirat vse otevrene
  $('.js .nav-panel-nav a').click(function(){
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.pine').toggleClass('pine-visible');
    $(this).toggleClass('active');
    return false;
  });

  // Bootstrap Popover
  // -----------------
  // http://getbootstrap.com/javascript/#popovers

  $('[data-toggle="popover"]').popover({
    html: true,
    container: 'body'
  });

  // Při klikání na popover se událost nebublá dál, abychom zabránili
  // rozklikávání .list-item a podobných
  $('a[data-toggle="popover"]').click(function(e){
    e.preventDefault();
  });


  // Prihlaseni v hlavicce
  // ---------------------
  // Otevirani a zavirani prihlasovaci vrstvy po tapnuti ci kliknuti.

  $('.js .nav-panel-login a').click(function(){
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.js .login-in-head').toggle();
    $(this).toggleClass('active');
    return false;
  });


  // Vyhledavani v hlavice
  // ---------------------
  // Otevirani a zavirani vyhledavani po tapnuti ci kliknuti.

  $('.js .nav-panel-search a').click(function(){
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.js .search-form').toggle();
    $(this).toggleClass('active');
    return false;
  });


  // Product Options: zobrazovani a schovavani druheho oka
  // -----------------------------------------------------
  // Viz detail produktu nebo kosik.

  $('.js .product-options-add-eye').on('click', 'a:not(.active)', function(event){
    event.preventDefault();
    $(this).text($(this).data('remove'));
    $(this).addClass('active');
    $(this).closest('.product-options').find('.product-options-second-eye').show()
  });

  $('.js .product-options-add-eye').on('click', 'a.active', function(event){
    event.preventDefault();
    $(this).text($(this).data('add'));
    $(this).removeClass('active');
    $(this).closest('.product-options').find('.product-options-second-eye').hide();
  });


  // Detail produktu: pridavani hodnoceni
  // ---------------------------------------
  // TODO: naoko implementace jen pro prototyp. Jen klonujeme existujici
  // hodnoceni.

  $('.detail-rating-btn a').on('click', function(){
    $('.detail-rating-btn').before($('.rating').eq(0).clone());
    $('.detail-rating-btn').before($('.rating').eq(1).clone());
    return false;
  });


  // Detail produktu: varianty produktu
  // ----------------------------------

  $('.product-variants-opener').on('click', function(){
    // Pridame tridu .active a sipku otocime nahoru
    $(this).toggleClass('active');
    $(this).find('.caret').toggleClass('caret-up');
    // Otevreme seznam variant, ktery k odkazu nalezi
    $(this).closest('.product-options-items').next('.product-variants-list').toggle();
    return false;
  });

  // Klikani na varianty v seznamu aktivuji polozku v <select>, ktera je pritomna v HTML.
  $('.product-variants-variant').on('click', function(){
    var
    // Odkaz, ktery nalezi k variante
    $relatedAnchor =
      $(this)
      .closest('.product-variants-list')
      .prev('.product-options-items')
      .find('.product-variants-opener'),
    // Hodnota data-value=""
    $selectedValue =
      $(this).data('value');
    // Pridame tridu .active
    $(this).siblings('.product-variants-variant').removeClass('active');
    $(this).toggleClass('active');
    // Do odkazu zkopirujeme text vybrane varianty
    $relatedAnchor.find('.product-variants-anchor .text')
      .text( $(this).find('.text').text() );
    // Ve schovanem <selectu> vybereme spravnou variantu
    $('.product-variants-select option').attr('selected', false);
    $relatedAnchor.find('.product-variants-select option[value="'+$selectedValue+'"]').attr('selected', true);
    return false;
  });


  // Strankovaci tlacitko
  // --------------------
  // TODO prototypova implementace jen naoko. Opet jen tupe klonujeme.

  $('.pagination-button').click(function(event) {
     $('.product-item').slice(0,24).clone().appendTo('#product-items');
     return false;
  });

  // Motivation Box: Rozsirena, "boxikova" verze
  // -------------------------------------------

  // Nastavime prvni zobrazovany obsah
  $('.motivator-js-content')
    .html($('.motivator-item:eq(0) > .motivator-item-content').html());
  $('.motivator-item:eq(0) > .motivator-item-title').addClass('active');

  // Klikanim se pak zobrazuje obsah aktivni polozky
  $('.motivator-item-title').click(function() {
    $('.motivator-js-content')
      .html( $(this).next('.motivator-item-content').html() );
    $('.motivator-item-title').removeClass('active');
    $(this).addClass('active');
    return false;
  });


  // Directory: Seznam podkategorii
  // ------------------------------

  // Chovani seznamu
  $('.directory-multiple .directory-heading a').on('click', function(){
    // Schovame vsechny panely, volany pak otevreme
    $(this).closest('.directory-multiple').find('.directory-group').hide();
    $( $(this).attr('href') ).show();
    // Aktualnimu elementu pridame .active, ostatnim vezmeme
    $(this).closest('.directory-multiple').find('.directory-heading a').removeClass('active');
    $(this).addClass('active');
    return false;
  });


  // Pozice motivatoru v DOMu (meni se podle rozliseni)
  handleMotivatorPosition();


  // Bannery v hlavicce
  // ------------------

  bannerLoadImage();

}); // document.ready




// 3) Po zmene velikosti okna
// ==========================

// TODO takhle to neni dobry pro performance, bude chtit vymyslet chytreji

$( window ).resize(function() {
    hideOrShowFootLinks();
    bannerLoadImage();
    handleMotivatorPosition();
  }
);



// 4) Pomocne funkce
// =================


// Seznamy odkazu v paticce zobrazi nebo schova
// --------------------------------------------

function hideOrShowFootLinks() {
  if (document.body.clientWidth <= 479) {
    $('.foot-links').addClass('collapsible');
    $('.foot-links .list-body').hide();
    $('.foot-links .list-title .caret').show();
  } else {
    $('.foot-links').removeClass('collapsible');
    $('.list-body').show();
    $('.foot-links .list-title .caret').hide();
  }
}

// Zavre vsechny navigacni panely
// ------------------------------

function closeNavPanels() {
  $('.js .nav-panel a').removeClass('active');
  $('.js .login-in-head').hide();
  $('.js .search-form-hidden').hide();
  $('.js .pine').removeClass('pine-visible');
}

// Do banneru nacte obrazek namisto placeholderu
// ---------------------------------------------

function bannerLoadImage() {
  if (document.body.clientWidth < 768) {
    $('.banner-image').attr('src', $('.banner-image').data('srcMobile'));
  } else {
    $('.banner-image').attr('src', $('.banner-image').data('srcDesktop'));
  }
}

// Presunovani motivacniho boxu v DOMu
// -----------------------------------

// Ma pokazde jinou pozici, podle rozliseni.
// Resime pro kategorie zbozi a jeho detail.

function handleMotivatorPosition() {

  function changePositionTo($where) {
    $('.motivator-container')
      .removeClass('motivator-container');
    $where
      .append($('.motivator'))
      .addClass('motivator-container');
  }

  if (document.body.clientWidth < 600) {
    changePositionTo( $('#motivator-after-6-products') );
    $('.motivator-6-items')
      .addClass('motivator-2-rows-6-items');
  } else if ( (document.body.clientWidth >= 600) && (document.body.clientWidth < 1024) ) {
    changePositionTo( $('#motivator-after-4-products') );
    $('.motivator-6-items')
      .removeClass('motivator-2-rows-6-items');
  } else if (document.body.clientWidth >= 1024) {
    changePositionTo( $('#motivator-top') );
    $('.motivator-6-items')
      .removeClass('motivator-2-rows-6-items');
  }
}
