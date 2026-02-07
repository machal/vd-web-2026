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
// Pine.JS responzivni navigace - inicializace.

$('.pine').pine({
  largeDisplayStart:    '768px',
  fxSmallDisplay:       'fx-collapse'
});


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


  // Prihlaseni v hlavicce
  // ---------------------
  // Otevirani a zavirani prihlasovaci vrstvy po tapnuti ci kliknuti.

  $('.js .nav-panel-login a').click(function(){
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.js .login').toggle();
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


  // Toggler
  // -------
  // Komponenta pro otevirani a zavirani libovolneho obsahu.
  // Otevirani a zavirani prihlasovaci vrstvy po tapnuti ci kliknuti.

  $('.toggler').on('click', '.toggler-head', function(event) {
    var
     checkbox = $(this).find('input[type=checkbox]'),
     hasCheckbox = !!checkbox.length;
    $(this).next('.toggler-body').toggle();
    $(this).closest('.toggler').toggleClass('active');
    event.preventDefault();
    event.stopPropagation();
    if ( hasCheckbox ) {
      if ( checkbox.prop('checked') ) { // TODO: iOS to vyhodnocuje zle a nezatrhává
        checkbox.prop('checked', false);
      } else {
        checkbox.prop('checked', true);
      }
    }
  });


  // Detail produktu: pridavani/odebirani druheho oka
  // ------------------------------------------------
  // TODO: naoko implementace jen pro prototyp
  // Jen klonujeme DOM od prvniho oka.

  $('.js .opts-selector-add-eye').on('click', 'a:not(.active)', function(){
    $(this).text($(this).data('remove'));
    $(this).addClass('active');
    $('.opts-selector-first-eye').clone()
      .attr('class','opts-selector-second-eye').insertBefore('.opts-selector-add-eye');
    return false;
  });

  $('.js .opts-selector-add-eye').on('click', 'a.active', function(){
    $(this).text($(this).data('add'));
    $(this).removeClass('active');
    $('.opts-selector-second-eye').remove();
    return false;
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

  $('.opts-variants-opener').on('click', function(){
    // Pridame tridu .active a sipku otocime nahoru
    $(this).toggleClass('active');
    $(this).find('.caret').toggleClass('caret-up');
    // Otevreme seznam variant, ktery k odkazu nalezi
    $(this).closest('.opts-selector-items').next('.opts-variants-list').toggle();
    return false;
  });

  // Klikani na varianty v seznamu aktivuji polozku v <select>, ktera je pritomna v HTML.
  $('.opts-variants-variant').on('click', function(){
    var
    // Odkaz, ktery nalezi k variante
    $relatedAnchor =
      $(this)
      .closest('.opts-variants-list')
      .prev('.opts-selector-items')
      .find('.opts-variants-opener'),
    // Hodnota data-value=""
    $selectedValue =
      $(this).data('value');
    // Pridame tridu .active
    $(this).siblings('.opts-variants-variant').removeClass('active');
    $(this).toggleClass('active');
    // Do odkazu zkopirujeme text vybrane varianty
    $relatedAnchor.find('.opts-variants-anchor .text')
      .text( $(this).find('.text').text() );
    // Ve schovanem <selectu> vybereme spravnou variantu
    $('.opts-variants-select option').attr('selected', false);
    $relatedAnchor.find('.opts-variants-select option[value="'+$selectedValue+'"]').attr('selected', true);
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

  // Vyska seznamu
  handleMultipleDirectoryHeight();

  // Chovani seznamu
  $('.directory-multiple .directory-heading a').on('click', function(){
    // Schovame vsechny panely, volany pak otevreme
    $(this).closest('.directory-multiple').find('.directory-group').css('visibility','hidden');
    $( $(this).attr('href') ).css('visibility','visible');
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
    handleMultipleDirectoryHeight();
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
  $('.js .login').hide();
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
    $('.motivator')
      .addClass('motivator-2-rows-6-items');
  } else if ( (document.body.clientWidth >= 600) && (document.body.clientWidth < 1024) ) {
    changePositionTo( $('#motivator-after-4-products') );
    $('.motivator')
      .removeClass('motivator-2-rows-6-items');
  } else if (document.body.clientWidth >= 1024) {
    changePositionTo( $('#motivator-top') );
    $('.motivator')
      .removeClass('motivator-2-rows-6-items');
  }
}

// Vyska vicerozmerneho seznamu kategorii
// --------------------------------------

// Hledame nejvyssi zalozku a podle ni nastavujeme vysku objektu

function handleMultipleDirectoryHeight() {
  if ($('.directory-multiple').length) {
    var
      maxHeight = 0;
    $('.directory-group-content').each(function() {
      if ($(this).height() > maxHeight)
        maxHeight = $(this).height();
    });
    maxHeight = maxHeight + $('.directory-heading').height();
    $('.directory-multiple').css('height', maxHeight+'px');
  }
}
