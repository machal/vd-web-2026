


// Pro nemobilni zarizeni toho nacitame trochu vice
Modernizr.load({

  test: Modernizr.mq('screen and (min-width: 481px)'),

  yep : [
		'http://www.vzhurudolu.cz/2012/assets/js/jquery.js',
		'http://www.vzhurudolu.cz/2012/assets/fancybox/jquery.fancybox.pack.js',
		'http://www.vzhurudolu.cz/2012/assets/fancybox/jquery.fancybox.css',
		'http://www.vzhurudolu.cz/2012/assets/google-code-prettify/prettify.js',
		'http://www.vzhurudolu.cz/2012/assets/google-code-prettify/prettify.css'		
	],
	
  complete : function () {
	
		 if (Modernizr.mq('screen and (min-width: 481px)')) {

				// Fancybox
				$('.fancybox').click(function() {
					$.fancybox.open($(this).attr('href'),
						{
						  aspectRatio:  	true,
							autoSize: 			true,
					    title: 					null,
					    padding:        0
						});
						return false;
				});
			
			  // Prettify
			  window.prettyPrint && prettyPrint();		
			  
			  // Na vsechn zarizenich javascriptem schovavame Disqus
			  $('#disqus_thread').hide();
			  
			  $(document).ready(function() {
			   $('#disqus_opener').click(function() {
			     $('#disqus_thread').slideToggle();
			     return false;
			   });
			  });
			  
		
			}	
			
   }	

});