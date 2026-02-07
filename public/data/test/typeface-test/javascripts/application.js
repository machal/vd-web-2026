if ("undefined" == typeof console) var console = { log : function(what) {} }

// * Add initialize() handler
document.observe("dom:loaded", function() { try {Application.initialize()} catch(e) { alert('Error when initializing application! \n' + e); } });


Application = {
  
  initialize: function(options) {
    
    this.options = options
    this.window = document.viewport.getDimensions()

    this.add_width_class_name_to_body()
    
    Event.observe(document, 'keyup', function(event){ Application.handleKeyboardEvents(event) })
    
    // console.log(this); // # Debug
  },
  
  // Pouzivame v Ajax callbacks
  loading : function() {
    $('body').addClassName('loading')
  },
  loaded : function() {
    $('body').removeClassName('loading')
  },
  
  redirect_to : function(url) {
    document.location.href=url; return false;
  },

  truncate_inner_html : function(selector) {
    var size = 30
    var elements = $$(selector)
    if (elements) {
      elements.each( function(node) { node.update( node.innerHTML.truncate(size) ) } )
    } 
  },

  add_width_class_name_to_body : function() {
    class_name = ( Application.Utils.window_width >= 1024 ) ? 'viewport-lower-than-1024' : 'viewport-greater-than-1024'
    $('body').addClassName(class_name)
  },

  handleKeyboardEvents: function(event) {
    // console.log(event)
    switch(event.keyCode) {
      case Event.KEY_ESC:
        try { Application.Calendar.hide(); return false; } catch(e) {  } // Fail silently
        break
    }
  },

  Sifr : {

      // Inicializace Sifru
      // Viz soubor javascripts/sifr-config.js
      initialize : function() { sifr_initialize() }

  }, // end Sifr


  Program : {

    truncate_event_titles : function() {
      var size = 28
      $$('.event_link').each( function(node) { node.update( node.innerHTML.truncate(size) ) } )
    },

    truncate_filter_titles : function() {
      var size = 28
      $$('#filter-choices li span.title').each( function(node) { node.update( node.innerHTML.truncate(size) ) } )
    },

    // Posun s DIVem obsahujicim seznam akci tak, aby vybrana akce byla nahore ve viditelnem poli
    scroll_to_event : function(element_id) {
      // console.log($(element_id).offsetTop)
      var element   = $(element_id)
      var container = $('event-list-clipper')
      try {
        if ( element && container && element.offsetTop > container.getHeight() ) {
          container.scrollTop = ( $(element_id).offsetTop - 40 )
        }
      }
      catch(e) {}
    }

  }, // end Program


  Calendar : {
  	show : function() {
  	  $('body').addClassName('has-calendar')
  	  $('body').addClassName('calendar')
  	  $('calendar-shadow').show()
  	},
  	hide : function() {
  	  $('body').removeClassName('has-calendar')
  	  $('calendar').remove()
  	  $('calendar-shadow').remove()
  	},
    loading : function() {
      $('calendar-link').addClassName('loading')
    },
    loaded : function() {
      $('calendar-link').removeClassName('loading')
      load_unit_png_fix()
    },
    big_loading : function() {
      $('calendar-big-link').addClassName('loading')
    },
    big_loaded : function() {
      $('calendar-big-link').removeClassName('loading')
      load_unit_png_fix()
    }
  	/* 
    truncate_event_titles : function() {
      var size = 40
      $$('#calendar .event-description strong').each( function(node) { node.update( node.innerHTML.truncate(size) ) } )
    }
    */
  }, // end Calendar

  ArtistCategories : {
    loading : function() {
      Application.loading();
      $("artists-list").addClassName("loading")
    },
    loaded : function() {
      Application.loaded();
      $("artists-list").removeClassName("loading")
    }
  },

  Artists : {
    loading : function() {
      Application.loading();
      $("artist").addClassName("loading");
    },
    loaded : function() {
      Application.loaded();
      $("artist").removeClassName("loading");
    }
  },

  Utils : {

    isIE6 : function() { return navigator.appVersion.include('MSIE 6') },

    window_width : function() { return document.viewport.getWidth() }
 
  },
  
  GoogleAnalytics : {
     
     pageView : function(url) {
       if (pageTracker) {
         pageTracker._trackPageview(url);
         pageTracker._trackPageview('/ajax'+url);
         // console.log('GA tracking '+url);
       }  
     }
  }

} // end Application
