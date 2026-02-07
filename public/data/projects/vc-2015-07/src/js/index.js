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

var msie = (function () {
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
    largeDisplayStart: '768px',
    fxSmallDisplay: 'fx-collapse'
  });
}

// Webfontloader
// -------------

// potenciálně potřebné znaky
var subsetCharsAll =
    '0123456789*' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ĂăĄąÁáÂâÄäĆćČčÇçĎďĐđĘęĚěÉéËëÍíÎî' +
    'ĹĺĽľŁłŃńŇňÓóÔôÖöŐőŔŕŘřŚśŞşŠšŢţŤť' +
    'ÚúŮůŰűÜüÝýŹźŻżŽžµß' +
    '$•€(){}[]^„“”‚‘‹›«»\'" _-–— §' +
    '°`ˇ˘¨˝¬­™®©±´˙·¸….,;:!?‰~+×÷=<>@/|\\&#%'

// používané znaky (víc se jich nenačte)
var subsetChars =
    '1234567890*' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ÁáÄäĆćČčĎďĐđĚěÉéËëÍí' +
    'ĽľŁłŇňÓóÖöŐőŘřŠšŤť' +
    'ÚúŮůŰűÜüÝýŽžμß' +
    '€(){}[]„“”‚‘‹›«»\'" _-–— §' +
    '°™®©….,;:!?~±+×=<>@/|\\&#%'

// načti Roboto
WebFont.load({
  google: {
    families: ['Roboto:300,300italic,400,500'],
    text: subsetChars
  }
});

// 2) Po vyskladani DOMu
// =====================

$(document).ready(function () {


  // Fastclick
  // ---------
  // Odstraneni 300ms zpozdeni pro tapnuti na mobilnich zarizenich.
  // https://github.com/ftlabs/fastclick

  $(function () {
    FastClick.attach(document.body);
  });


  // Navigace
  // --------
  // Custom rozklikavani navigace,
  // protoze Pine.js neumi callback
  // a my potrebujeme zavirat vse otevrene
  $('.js .vc-nav-icons-nav a').click(function () {
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
  // rozklikávání .vc-list-item a podobných
  $('a[data-toggle="popover"]').click(function (e) {
    e.preventDefault();
  });


  // Prihlaseni v hlavicce
  // ---------------------
  // Otevirani a zavirani prihlasovaci vrstvy po tapnuti ci kliknuti.
  // todo: fujka je to
  $('.js .vc-nav-icons-login a, .js .vc-user-menu .close').click(function () {
    var vc_nav_icons_login = $('.js .vc-nav-icons-login a');

    if (!(vc_nav_icons_login.hasClass('active'))) {
      closeNavPanels();
    }

    $('.js .vc-dropdown-container').toggleClass('active');

    vc_nav_icons_login.toggleClass('active');
    return false;
  });


  // Zavreni menu v hlavicce po kliku kamkoli ...
  // ----------------------------------------------------------
  $(document).click(function () {

    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (windowWidth >= 768) { // jen pokud je zobrazene bublinove menu

      var vc_nav_icons_login = $('.js .vc-nav-icons-login a');

      if (!(vc_nav_icons_login.hasClass('active'))) {
        closeNavPanels();
      }

      $('.js .vc-dropdown-container').toggleClass('active', false);

      vc_nav_icons_login.toggleClass('active', false);
    }
  });

  // ... jinam nez na menu
  $('.vc-login, .vc-user-menu').click(function (e) {
    e.stopPropagation();
  });


  // Vyhledavani v hlavice
  // ---------------------
  // Otevirani a zavirani vyhledavani po tapnuti ci kliknuti.

  $('.js .vc-nav-icons-search a').click(function () {
    if (!($(this).hasClass('active'))) {
      closeNavPanels();
    }
    $('.js .vc-search-form').toggle();
    $(this).toggleClass('active');
    return false;
  });


  // Product Options: zobrazovani a schovavani druheho oka
  // -----------------------------------------------------
  // Viz detail produktu nebo kosik.

  $('.js .vc-product-options-add-eye').on('click', 'a:not(.active)', function (event) {
    event.preventDefault();
    $(this).text($(this).data('remove'));
    $(this).addClass('active');
    $(this).closest('.vc-product-options').find('.vc-product-options-second-eye').show();
  });

  $('.js .vc-product-options-add-eye').on('click', 'a.active', function (event) {
    event.preventDefault();
    $(this).text($(this).data('add'));
    $(this).removeClass('active');
    $(this).closest('.vc-product-options').find('.vc-product-options-second-eye').hide();
  });

  // Automaticke zobrazeni/skryti paramentu pro druhe oko.
  if($('.js .vc-product-options-add-eye a').length > 0) {
    var productOptionsAddEyeLink = $('.js .vc-product-options-add-eye a');

    if (productOptionsAddEyeLink.data('hidden') == false) {
      $(productOptionsAddEyeLink).text($(productOptionsAddEyeLink).data('remove'));
      $(productOptionsAddEyeLink).addClass('active');
      $(productOptionsAddEyeLink).closest('.vc-product-options').find('.vc-product-options-second-eye').show();
    }
  }


  // Detail produktu: pridavani hodnoceni
  // ---------------------------------------
  var moreRatings = $('.vc-detail-rating-more-items');

  // skryj
  moreRatings.hide();

  // odkryj
  $('.vc-detail-rating-show-more .vc-btn').on('click', function () {
    moreRatings.show();
    $(this).hide();
    return false;
  });


  // Detail produktu: varianty produktu
  // ----------------------------------

  // zjisti, jaka hodnota je selected ve skrytem selectu a nastav ji vizualnimu vyberu

  $('.vc-product-options').each(function () {
    // vybrana hodnota
    var selectedValue = $(this).find('.vc-product-variants-select').val();


    // najdi vsecny polozky vizualni varianty a kazde
    $(this).find('.vc-product-variants-variant').each(function () {

      // odeber tridu .active, pokud by ji nahodou mel
      $(this).removeClass('active');

      // a pokud se hodnota rovna hodnote selectu, nastav tridu active
      if ($(this).data('value') == selectedValue) {
        $(this).addClass('active');
      }
    });

    // nastav hodnotu i pro druhe oko, pokud hodnota neni prazdna
    if (selectedValue != 'null') {
      $(this).find('.form-control-static .vc-text').text(selectedValue);
    }

  });

  // Klikani na varianty v seznamu aktivuji polozku v <select>, ktera je pritomna v HTML.
  $('.vc-product-variants-variant').on('click', function () {
    var
    // rodic, ktery nalezi k variante
      $parent = $(this).closest('.vc-product-options'),

    // Hodnota data-value=""
      $selectedValue = $(this).data('value');

    // Pridame tridu .active
    $(this).siblings('.vc-product-variants-variant').removeClass('active');
    $(this).addClass('active');

    // text vybrane varianty do obou textovych popisu
    $parent.find('.vc-product-options-variants .vc-text').text($selectedValue);

    // Ve obou schovanych <select> vybereme spravnou variantu
    $('.vc-product-variants-select option').attr('selected', false);
    $parent.find('.vc-product-variants-select option[value="' + $selectedValue + '"]').attr('selected', true);

    return false;
  });


  // Strankovaci tlacitko
  // --------------------
  // TODO prototypova implementace jen naoko. Opet jen tupe klonujeme.

  $('.vc-pagination>a').click(function (event) {
    $('.vc-product-item').slice(0, 24).clone().appendTo('.vc-product-items');
    return false;
  });

  // Motivator: Rozsirena, "boxikova" verze
  // --------------------------------------

  // (v mobilni verzi jej docasne vypiname)

  // Nastavime prvni zobrazovany obsah
  $('.vc-motivator-js-content')
    .html($('.vc-motivator-item:eq(0) > .vc-motivator-item-content').html());
  $('.vc-motivator-item:eq(0) > .vc-motivator-item-title').addClass('active');

  // Klikanim se pak zobrazuje obsah aktivni polozky
  $('.vc-motivator-item-title').click(function () {
    $('.vc-motivator-js-content')
      .html($(this).next('.vc-motivator-item-content').html());
    $('.vc-motivator-item-title').removeClass('active');
    $(this).addClass('active');
    return false;
  });

  // Pozice motivatoru v DOMu (meni se podle rozliseni)
  handleMotivatorPosition();


  // Bannery v hlavicce
  // ------------------

  bannerLoadImage();


  // konverze seznamu na selecty
  // ---------------------------

  $('.vc-filter ul').each(function () {
    var list = $(this);
    var select = $(document.createElement('select'))
      .on('change', function () { // na zmenu otevri url
        window.location.href = this.value;
      })
      .addClass('form-control')
      .insertBefore($(this).hide()
    );

    $('>li a', this).each(function () {
      var option = $(document.createElement('option'))
        .appendTo(select)
        .val(this.href) // nastav hodnotu na url odkazu
        .html($(this).html()); // obsah odkazu dej jako obsah option

      // nastav selected, pokud ma data-selected="selected"
      if ($(this).hasClass('active')) {
        option.attr('selected', 'selected');
      }

    });

    list.hide(); // skryj seznam
  });


  // Autocomplete pri vyberu odberneho mista
  // ------------------

  var postInfo = {};

  var init = function () {
    var checked = $('#transferFamily-41').is(':checked');
    if (checked) {
      if (postInfo.id) {
        showOverview();
      } else {
        showInput();
      }
    } else {
      $('.js-ui-autocomplete-wrapper').hide();
      $('#post_info').hide();
      $('#post_span').remove();
      $('#post_info').removeAttr('required');
    }
  };
  init();

  var dataPostInfo = $('#post_info').data('post-info');
  if ($('#transferFamily-41').is(':checked') && dataPostInfo) {
    postInfo = dataPostInfo;
    showOverview();
  }
  $(':radio[id^=transferFamily-]').click(function () {
    init();
  });
  $('#post_info').autocomplete({
    source: function (request, response) {
      $.ajax({
        url: "/830.json",
        data: {
          query: request.term
        },
        success: function (data) {
          var allData = [];
          for (i in data.suggestions) {
            allData.push({
              'label': data.suggestions[i],
              'value': data.data[i]
            });
          }
          response(allData);
        }
      });
    },
    minLength: 2,
    select: function (event, ui) {
      postInfo = ui.item.value;
      showOverview();
    }
  });

  $('body').on('click', '#post_change', function (e) {
    e.preventDefault();
    showInput();
  });

  $('body').on('blur', '#post_info', function () {
    if (postInfo.id) {
      showOverview();
    }
  });

  $('body').on('focus', '#post_info', function () {
    $(this).parent().addClass('is-focused');
  });

  $('body').on('focusout', '#post_info', function () {
    $(this).parent().removeClass('is-focused');
  });

  // Zobrazeni vyhledavaciho pole
  function showInput() {
    if (postInfo.display) {
      $('#post_info').val(postInfo.display);
    }
    $('.js-ui-autocomplete-wrapper').removeClass('is-selected')
    $('.js-ui-autocomplete-wrapper').show();
    $('#post_info').show();
    $('#post_info').select();
    $('#post_span').remove();
    $('#post_info').attr('required', 'required');
  }

  // Zobrazeni vysledku
  function showOverview() {
    $('.js-ui-autocomplete-wrapper').addClass('is-selected');
    $('#post_info').val(postInfo.id).hide();
    $('#post_span').remove();
    $('#post_info').after('<div id="post_span"><span class="ui-autocomplete-pseudoinput">' + postInfo.display + '</span><a class="vc-btn vc-btn-xs vc-btn-link vc-btn-bubble" tabindex="0" data-toggle="popover" data-trigger="focus" role="button" data-placement="bottom" data-content="' + postInfo.hours + '"><span class="vc-bubble vc-bubble-info vc-bubble-left" aria-hidden="true"><span class="vc-matrjoska">i</span></span><span class="sr-only">Otevírací hodiny</span></a> <a id="post_change" href="#">Změnit</a></div>');

    // Bootstrap Popover
    // -----------------
    // http://getbootstrap.com/javascript/#popovers

    $('[data-toggle="popover"]').popover({
      html: true,
      container: 'body'
    });

    // Při klikání na popover se událost nebublá dál, abychom zabránili
    // rozklikávání .vc-list-item a podobných
    $('a[data-toggle="popover"]').click(function (e) {
      e.preventDefault();
    });

  }


  // Cookie bar
  // ----------

  $('#vc-bar-cookie').each(function () {
    var cookieBar = $(this)

    // uvodni nastaveni
    makeBottomSpaceFor(cookieBar);

    // pri zmene okna
    $(window).on('resize.cookieBar', function () {
      makeBottomSpaceFor(cookieBar);
    });

    // zaviraci cudlik
    cookieBar.find('.vc-btn').on('click', function () {
      cookieBar.remove();
      makeBottomSpaceFor(cookieBar);

      // zrus event
      $(window).off('resize.cookieBar');

      // nastav cookie, aby se to uz nezobrazovalo
      // todo:
      alert('todo: nastavuju cookie aby se to už nezobrazovalo');
    });

  });

}); // document.ready


// 3) Po zmene velikosti okna
// ==========================

// TODO takhle to neni dobry pro performance, bude chtit vymyslet chytreji

$(window).resize(function () {
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
    $('.foot-links .vc-list-body').hide();
    $('.foot-links .vc-list-title .vc-caret').show();
  } else {
    $('.foot-links').removeClass('collapsible');
    $('.vc-list-body').show();
    $('.foot-links .vc-list-title .vc-caret').hide();
  }
}

// Udela misto na spodku stranky pro element
// -----------------------------------------

function makeBottomSpaceFor(element) {
  $('body').css(
    'margin-bottom',
    // nastav margin-bottom,
    // pokud existuje prvek s vyskou,
    // jinak ho vymaz
    element.height() ? element.height() + 'px' : ''
  );
}

// Zavre vsechny navigacni panely
// ------------------------------

function closeNavPanels() {
  $('.js .vc-nav-icons a').removeClass('active');
  $('.js .vc-dropdown-container').toggleClass('active', false);
  $('.js .vc-search-form-hidden').hide();
  $('.js .pine').removeClass('pine-visible');
}

// Do banneru nacte obrazek namisto placeholderu
// ---------------------------------------------

function bannerLoadImage() {
  if (document.body.clientWidth < 768) {
    $('.vc-banner-image').attr('src', $('.vc-banner-image').data('srcMobile'));
  } else {
    $('.vc-banner-image').attr('src', $('.vc-banner-image').data('srcDesktop'));
  }
}

// Presunovani motivacniho boxu v DOMu
// -----------------------------------

// (Pro mobilni verzi docasne vypiname volani funkce.)

// Ma pokazde jinou pozici, podle rozliseni.
// Resime pro kategorie zbozi a jeho detail.

function handleMotivatorPosition() {

  function changePositionTo($where) {
    $('.vc-motivator-container')
      .removeClass('vc-motivator-container');
    $where
      .append($('.vc-motivator'))
      .addClass('vc-motivator-container');
  }

  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (width < 580) {
    changePositionTo($('#vc-motivator-after-6-products'));
  } else if ((width >= 580) && (width < 720)) {
    changePositionTo($('#vc-motivator-after-4-products'));
  } else if ((width >= 720) && (width < 960)) {
    changePositionTo($('#vc-motivator-after-5-products'));
  } else if ((width >= 960) && (width < 1600)) {
    changePositionTo($('#vc-motivator-after-4-products'));
  } else if ((width >= 1600) && (width < 1900)) {
    changePositionTo($('#vc-motivator-after-5-products'));
  } else if ((width >= 1900)) {
    changePositionTo($('#vc-motivator-after-6-products'));
  }
}
