if ("undefined" == typeof console) var console = { log : function(what) {} }

// * Add initialize() handler
document.observe("dom:loaded", function() { try {Admin.initialize()} catch(e) { alert('Error when initializing application! \n' + e); } });


Admin = {
  
  initialize: function(options) {
    
    this.options = options
    
    this.addFlashMessageHandlers()
    if (typeof highlight_element_id != 'undefined') { this.highlightChangedItem(highlight_element_id) }

    this.Program.initialize();
    this.Photogallery.initialize();

    Event.observe(document, 'keyup', function(event){ Admin.handleKeyboardEvents(event) })
    
    // console.log(this); // # Debug
  },
  
  not_implemented : function(message) {
    if (typeof message == 'undefined' || message == '') message = "Dosud neimplementováno"
    alert(message)
    return false;
  },
  
  addFlashMessageHandlers : function() {
    
    var m = $$('#flash_messages .message')
    
    if (typeof m == 'undefined') return null
    
    m.each( function(node) {
      node.hide()
      new Effect.BlindDown(node, {delay:0.25, duration:0.5})
      new Effect.BlindUp(node, {delay:5, duration:0.5})
    } )
    
  },
  
  flash: function(message) {
    alert(message)
  },
  
  errorMessage: function(message) {
    alert(message)
  },
  
  highlightChangedItem: function(element_id) {
    var e = $(element_id)
    if (e) { new Effect.Highlight(e, {delay:0.5}) }
  },
  
  closeOverlayer: function() {
    var o = $('overlayer')
    if (o) { o.hide() }
  },

  handleKeyboardEvents: function(event) {
    switch(event.keyCode) {
      case Event.KEY_ESC:
        Admin.closeOverlayer()
        break
    }
  },


  // == Program ==
  Program : {

    initialize : function() {
      if (!$('program_tree_container')) return false; // Exit immediately if not on a Program page
      this.Tree.initialize()
    },

    Tree : {

      // Class: Item
      Item : Class.create({

        initialize : function(element_id) {
          this.element_id = element_id
          this.element = $(element_id)
          this.root = this.element.classNames().include('cycle')
          // Budeme skryvat pouze podskupiny tzv. "cyklu"
          if (this.root) this.content_element = this.element.select('ul').first()
          this.toggle_handle = this.element.select('span.toggle_handle').first()
          this.expanded = true
          this.__add_observers()
          this.collapse(true)
        },

        toggle : function() {
          ( this.expanded ) ? this.collapse() : this.expand()
        },
        expand : function() {
          if (this.content_element) {
            new Effect.SlideDown(this.content_element, {duration : 0.2})
            this.element.addClassName('opened')
            this.expanded = true
          }
        },
        collapse : function(collapse_hard) {
          if (this.content_element) {
            (collapse_hard) ? this.content_element.hide() : new Effect.SlideUp(this.content_element, {duration : 0.1})
            this.element.removeClassName('opened')
            this.expanded = false
          }
        },

        __add_observers : function() {
          var zis = this
          this.element.observe('mouseover', function(event) {zis.__handle_mouseover(event)} ).
                       observe('mouseout',  function(event) {zis.__handle_mouseout(event)} ).
                       observe('click',     function(event) {zis.__handle_mouseclick(event)} )
          if (this.toggle_handle) this.toggle_handle.observe( 'click', function(event) { zis.toggle(); Event.stop(event) } )
        },
        __handle_mouseover : function(event) {
          this.element.addClassName('hover')
        },
        __handle_mouseout  : function(event) {
          this.element.removeClassName('hover')
        },
        __handle_mouseclick: function(event) {
          // console.log(Event.element(event).tagName.toLowerCase())
          if (    event.findElement('li').classNames().include('cycle') 
               && Event.element(event).className != 'drag_handle' 
               && Event.element(event).tagName.toLowerCase() != 'a') 
          { 
            this.toggle()
          }
        }

      }),   // end Item class

      selector : '#program_tree_container ul li',
      collection : null, // Collection of <li> nodes, see initialize()

      initialize : function() {
        this.collection = $$(this.selector)
        this.collection.each( function(n) { new Admin.Program.Tree.Item(n) } )
      }
       
    } // end Tree

  }, // end Program


  Photogallery : {
    
    selected : 0,
    
    initialize : function() {
      // if (!$('fotografie-vyber-items')) return false; // Exit immediately if not on a Photogallery page
      $$('.fotografie-vyber-item-in').invoke('observe', 'click', function(event) { Admin.Photogallery.toggle_item(event.findElement('div'), event); } )
      $$('.fotografie-vyber-item input').each( function(n) { if (n.checked) Admin.Photogallery.selected += 1 } )
      if ( $('submit_use_selected') ) $('submit_use_selected').value = 'Použít vybrané ('+Admin.Photogallery.selected+')'
    },
    
    toggle_item : function(item, event) {
      $(item).toggleClassName('selected');
      checkbox = $(item).select('input[type="checkbox"]').first()
      // console.log(checkbox)
      // console.log( event.element() )
      // console.log( event.element() != checkbox )
      if ( event.element() != checkbox ) { checkbox.checked = (checkbox.checked) ? false : true }
      console.log(Admin.Photogallery)
      if (checkbox.checked) { Admin.Photogallery.selected++ } else { Admin.Photogallery.selected-- }
      if ( $('submit_use_selected') ) $('submit_use_selected').value = 'Použít vybrané ('+Admin.Photogallery.selected+')'
    }
    
    
  }, // end Photogallery


  Articles : {

    open_youtube_test_link : function(key) {
      // console.log(key)
      if ('undefined' == typeof key || key.blank()) {
        alert('Prázdný klíč YouTube')
        return false
      }
      return !window.open("http://www.youtube.com/watch?v=" + key)
    }

  } // end Articles
  
} // end Application