/*  Hlavni JS soubor pro prototyp VaseCocky.cz  */

// 1) Pred vyskladanim DOMu
// 2) Po vyskladani DOMu
// 3) Po zmene velikosti okna
// 4) Pomocne funkce

// --- 1) Pred vyskladanim DOMu ---

// - Navigace -

// Pine.JS responzivni navigace
$('.pine').pine({
  largeDisplayStart:    '768px',
  fxSmallDisplay:       'fx-collapse'
});

// --- 2) Po vyskladani DOMu ---

$(document).ready(function() {

  // Meni zpusob zobrazeni odkazu v paticce
  hideOrShowFootLinks();
  $('.foot-links.collapsible').on('click', '.list-heading', function(){
    $(this).toggleClass('active');
    $(this).next('.list-body').toggle();
    return false;
  });


  // -- Fastclick --
  // https://github.com/ftlabs/fastclick

  $(function() {
      FastClick.attach(document.body);
  });

  // -- SVG -> PNG fallback --

  if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
    $('img[src$=svg]').attr('src', function (i, src) {
      return src.replace(/svg$/, 'png');
    });
  }

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


  // -- Prihlaseni: otevirani/zavirani --

  $('.js .nav-panel-login a').click(function(){
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.js .login').toggle();
    $(this).toggleClass('active');
    return false;
  });

  // -- Vyhledavani: otevirani/zavirani --

  $('.js .nav-panel-search a').click(function(){
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.js .search-form').toggle();
    $(this).toggleClass('active');
    return false;
  });

  // -- Harmonika: otevirani/zavirani --

  $('.js .harmonica-head').click(function(){
    $(this).next('.harmonica-body').toggle();
    $(this).toggleClass('active');
    return false;
  });

  // -- Detail produktu: pridavani/odebirani druheho oka --
  // TODO naoko implementace jen pro prototyp
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


  // -- Detail produktu: pridavani hodnoceni --
  // TODO naoko implementace jen pro prototyp

  $('.detail-rating-btn a').on('click', function(){
    $('.detail-rating-btn').before($('.rating').eq(0).clone());
    $('.detail-rating-btn').before($('.rating').eq(1).clone());
    return false;
  });

  // -- Detail produktu: varianty produktu --

  $('.opts-variants-opener').on('click', function(){
    // Pridame tridu .active a sipku otocime nahoru
    $(this).toggleClass('active');
    $(this).find('.caret').toggleClass('caret-up');
    // Otevreme seznam variant, ktery k odkazu nalezi
    $(this).closest('.opts-selector-items').next('.opts-variants-list').toggle();
    return false;
  });

  // Klikani na varianty v seznamu

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


  // -- Pomocne funkce --

  // Zavre vsechny navigacni panely
  function closeNavPanels() {
    $('.js .nav-panel a').removeClass('active');
    $('.js .login').hide();
    $('.js .search-form-hidden').hide();
    $('.js .pine').removeClass('pine-visible');
  }

}); // document.ready



// --- 2) Na zmenu velikosti okna ---

$( window ).resize(function() {
    handleFootLinks();
  }
);



// --- 3) Pomocne funkce ---


// Seznamy odkazu v paticce

function hideOrShowFootLinks() {
  if (document.body.clientWidth <= 479) {
    $('.foot-links').addClass('collapsible');
    $('.foot-links .list-body').hide();
  } else {
    $('.foot-links').removeClass('collapsible');
    $('.list-body').show();
  }
}

