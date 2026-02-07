// Script for desktop devices only

$(function() {

  /* 
    Pro CSS pridavame tridu k body, ktera indikuje, ze JS je pritomny
  */
  $('body').removeClass('no-js').addClass('js');

	   
   /*
     Osetrime otevirani/zavirani oken ve vrstvach
   */
   if (!!$('.window').length)
     handle_windows(); 
     
});


/*
   Osetrujeme otevirani a zavirani oken ve vrstvach
   ................................................
   
   Vcetne pridavani/odebirani #hashe do adresy webu, 
   aby sla adresa aktualniho stavu predavat dal.
   * HTML/CSS:
     .window.nazev-okna_window - samotne okenko
     [href='#nazev-okna'].open_window - odkaz otevirajici okenko
   * Hlavni stylovani viz .window
*/
function handle_windows() {
  
  // Zmenime kotvy v odkazech aby nam prohlizec neskakal na schovana okna
  $('.open_window').each(function() {
    $(this).attr('href', $(this).attr('href').replace('#', '#okno-'));
  });
  
  // Otevirani okna na odkaz
  $('.open_window').click(function(event) {
    open_window($(this).attr('href').replace('#okno-','.')+'_window');
    event.stopPropagation();
  });

  // Otevirani okna po nacteni stranky pokud mame v url odpovidajici hash
  if ( (location.hash.length > 1) && (!location.hash.indexOf('#okno-')) ) {
    open_window(location.hash.replace('#okno-','.')+'_window');
  }
  
  // Zavirani okna krizkem a kliknutim na telo dokumentu 
  $('.window .close, .with_opened_window #body_container').live('click', function() {
    close_windows();
    return false;
  });
  
  // Zavirani okna na ESCape 
  $(document).keydown(function(e) {
      if ((e.keyCode == 27) && (!!$('.window').length)) {
          close_windows();
      }
  });
  
  // Funkce pro otevirani okna
  function open_window(target_window) {
    $(target_window)
      .addClass('opened')
      .css('margin-top', $(target_window).outerHeight()/2*-1);  
    $('body').addClass('with_opened_window');  
  }
  
  // Funkce pro zavirani oken
  function close_windows() {
    $('.window')
      .removeClass('opened');
    removeHash();
    $('body').removeClass('with_opened_window');    
  }  
  
  // Funkce pro odstraneni hashe z URL
  // V ne-HTML5 browserech nastavime dummy hash #body, protoze neumeji hash jendoduse odstranit
  function removeHash() { 
    if ("pushState" in history) {
      history.pushState("", document.title, window.location.pathname);
    } else {
      window.location.hash = "body";
    }  
  }  
  
  
} // handle_windows()


