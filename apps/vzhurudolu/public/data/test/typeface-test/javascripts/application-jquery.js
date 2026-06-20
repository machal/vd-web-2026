// Prague Spring jQuery script

// Zamezeni konfliktum s jinymi knihovnami
jQuery.noConflict()


function mark_external_links() {
  // Oznacime externi odkazy
  jQuery('a').not('.link-out').not('.jquery_do_not_mess_with_me').filter(function() {
  return this.hostname && this.hostname !== location.hostname;
  }).addClass("link-out").append("<span></span>");
}

function is_clickable(clicked_element) {
 // Klinuti na celou plochu prvku obsahujiciho jeden odkaz
 jQuery(clicked_element).click(function(event) {
   location.href=jQuery(this).find("a").attr("href");				  
 }); 
}

function is_hoverable(hovered_element) {
 // Po najeti mysi prida tridu .hover
 jQuery(hovered_element).hover(function() {
   jQuery(this).addClass("hover");
 },function(){
   jQuery(this).removeClass("hover");
 }); 
}


function initializePhotogallery() {
  // Fotogalerie s dlazdicemi fotek a FancyBoxem - otevirani velkych fotek 
  jQuery(".photo-gallery a, .programme-stars-photo-gallery a").hover(
    function() { 
      jQuery(this).parent().find(".photo-title span").text(jQuery(this).attr("title"));
    },
    function() { 
      jQuery(this).parent().find(".photo-title span").text("");
    }  
 );
  // FancyBox - otevirani velkych fotek
  jQuery(".photo-gallery a").fancybox({ 
    'hideOnContentClick': true, 
    'overlayShow': true,
    'overlayOpacity': 0.8
  });
}

function initializeAjaxSearchBox() {
  // Inicaializujeme Ajaxove vysledky vyhledavani po jejich otevreni
  is_hoverable(".search-result-item, #ajax-search-box-close");
  is_clickable(".search-result-item");
}


jQuery(document).ready(function() {

  // Oznacime externi odkazy
  mark_external_links();
  
  // Po najeti mysi pridame tridu .hover
  is_hoverable(".multimedia, #calendar .day, .print-this-item, .pseudo-button");
  
  
  // ===== Vyhledavani =====
  
  // Ulozime text ve vyhledavacim policku
  var original_value = jQuery("#site-search-input").attr("value");
    
  // pri zamereni uzivatele na vyhledavaci policko odstranime text a pridame tridu focus, ktera pole zvyraznuje
  jQuery('#site-search-input').focus(function() {
    jQuery(this).attr("value","");
    jQuery("#site-search").addClass("focus");
  // pri zamereni uzivatele kdekoliv jinam vratime text a odstranime tridu focus
  }).blur(function () {
    if ( jQuery('#ajax-search-box').length == 0 ) {        // pokud neexistuje boxik s vyhledavaci vrstvou
      jQuery(this).attr("value", original_value);
      jQuery("#site-search").removeClass("focus");
    }
  // pri zmacknuti Escape  totez
  }).keyup(function(event) {
    if (event.keyCode == 27) {
      jQuery(this).attr("value", original_value);
      jQuery("#site-search").removeClass("focus");
    }
  });
    
  
  // ===== Clanky: Prehravac multimedii =====
    
  // otevirani prehravace
  if (jQuery('.multimedia.opened').length == 0) { // Pokud uz nema byt otevreny
    jQuery('.multimedia .player').hide();			
  }				
  jQuery(".multimedia h3").click(function() {
	  jQuery(this).parent().toggleClass('opened').find('.player').toggle(300);
	  return false;
  });
  
 
  // ===== Uvodni stranka =====
  
  
  // === Hightlight - slideshow s hlavnimi hvezdami
  
  if (jQuery('#highlights').length) { // pokud v HTML existuji #highlights
  
    // jquery.cycle prirazuje .activeSlide vzdy k <a>, ale to my predefinujeme 
    // vlastni funkci, aby hledal .highlight-item-inside
    jQuery.fn.cycle.updateActivePagerLink = function(pager, currSlide) {
        jQuery(pager).find('.highlight-item-inside').removeClass('activeSlide').filter('.highlight-item-inside:eq('+currSlide+')').addClass('activeSlide');
    };
  
    // Slideshow na fotkach
    jQuery('#highlights-images').cycle({ 
        fx:     'fade',                                             // efekt pro prechod 
        timeout: 8000,                                              // delka zobrazovani jednoho obrazku
        speed:   400,                                               // rychlost prechodu, rovnez vsak doba po kterou nelze mouseoverem prejit na jiny prvek navigace
        pause:   true,                                              // na mouseover se zastavi
        pauseOnPagerHover: true,                                    // na mouseover strankovace se taky zastavi
        pager:   '#highlights',                                     // selektor pro blok navigace
        pagerEvent: 'mouseover',                                    // udalost pro aktivaci polozky navigace
        pagerAnchorBuilder: function(idx, slide) {                  // vraci selektor pro polozku navigace
            return '#highlights .highlight-item:eq(' + idx + ')';   
        }
    });
    
    // Kliknuti na polozku slideshow
    jQuery('.highlight-item h2 a').click(function() {
      location.href=jQuery(this).attr("href");                                  
    });     
  
  } 

  
  // === Partneri na uvodni strance - verze s "mekkym" mouseoverem ===
  
  if (jQuery('#partners').length) {  // pokud v HTML existuji #partners
  
    // zkopirujeme box s partnery (#partners) do noveho (#partners-coloured), abychom mezi nimi mohli morfovat
    jQuery(".page-home #partners").clone().attr("id", "partners-coloured").insertAfter(".page-home #partners");
    
    // zmenime zdroje obrazku v #partners-coloured
    jQuery(".page-home #partners-coloured #partner-ministerstvo-kultury img").attr("src", "/images/partners/homepage-ministerstvo-kultury_on.gif");
    jQuery(".page-home #partners-coloured #partner-ceska-sporitelna img").attr("src", "/images/partners/homepage-ceska-sporitelna_on.gif?2");
    jQuery(".page-home #partners-coloured #partner-rwe img").attr("src", "/images/partners/homepage-rwe_on.gif?3");
    jQuery(".page-home #partners-coloured #partner-praha img").attr("src", "/images/partners/homepage-praha_on.gif");
      
    // na mouseover vyfadujeme #partners, tudiz se objevi #partners-coloured
    jQuery(".page-home #partners").hover(function() { 
        jQuery(this).addClass("hover").fadeTo("slow", 0);
      }, 
      function () {
        jQuery(this).removeClass("hover").fadeTo("fast", 1);
    });
  
    // na click presmerujeme na stranku Partneri
    jQuery(".page-home #partners").click(function() { 
        location.href="/partneri";
    });
  
  }  
  
  
  // === Novinky na uvodni strance - kliknuti na celou plochu novinky === */
  jQuery("#articles-for-homepage .article-item").click(function() {  
      location.href=jQuery(this).find("strong a").attr("href");
  });
  
    
  
  // ===== Program pro tisk =====    
  
  var items_to_print_count = 0;
  // var items_to_print = parseInt(jQuery(".print-count").text());
  
  // Kliknuti na ikonku tisku oznaci polozku programu tridou "will-print"
  jQuery(".print-this-item input[type=checkbox]").click(function() {
    
    jQuery(this).parent().parent().parent().toggleClass("will-print");
    
    if (jQuery(this).is(":checked")) {                                      
      items_to_print_count++;  
      jQuery(".print-count").text(items_to_print_count);     
    } else {                                                                          
      items_to_print_count--;
      jQuery(".print-count").text(items_to_print_count);   
    }
        
    
  });  
  
  // Zobrazime tlacitka pro tisk akci, protoze bez JS nemaji smysl
  jQuery(".print_schedule .top-buttons, .print_schedule .bottom-buttons").css("display","block");
  
  // Kliknuti na "Vytisknout pouze vybrane" nastavi tridu, ktere osetruje, ze se tisknou pouze vybrane
  jQuery(".print-selected").click(function() {
      jQuery("body").addClass("print-only-selected");
      window.print();
  });  
  
  // Kliknuti na "Vytisknout vsechny" vytiskne vsechny
  jQuery(".print-all").click(function() {
      jQuery("body").removeClass("print-only-selected");
      window.print();
  });    
  
  // === Prepinani jazyka ===  
  
  // Presuneme aktualni jazyk na prvni misto seznamu a pridame mu tridu "first"
  jQuery("#switch-locale span.active").clone().insertBefore("#switch-locale span:first").addClass("first");
  jQuery("#switch-locale span.active:not(.first)").remove();
  
  // Kvuli zakulacenym rohum v CSS najdeme take posledni prvek
  jQuery("#switch-locale span:last").addClass("last");    
  
  // Na kliknuti na aktualni jazyk zobrazime seznam jazyku
  jQuery("#current-locale, #switch-locale").click(function() {
    jQuery("#switch-locale").toggle();
  });
  
  
  // === Pratele: otevirani seznamu vyhod Zakladajiciho kruhu na klik ===
  
  jQuery(".friends .more-than-basic, .friends .plus-image").css("cursor","pointer");
  jQuery(".friends .basic-benefits").hide();
  jQuery(".friends .more-than-basic, .friends .plus-image").click(function() {
    jQuery(this).parent().find(".basic-benefits").toggle("fast");                                       
  });
  
  
       
  // Inicializace prvku, ktere potrebujeme nacitat i AJAXem
  initializePhotogallery();  
  initializeAjaxSearchBox();


}); // jQuery(document).ready(function()
