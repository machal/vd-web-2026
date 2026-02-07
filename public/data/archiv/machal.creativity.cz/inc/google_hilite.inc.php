<?php

/*

2 December, 2002

This is Google Hilite 0.3

by Dean Allen
http://textism.com 

When applied to a page arrived at via Google, this function will 
highlight the terms in the Google search wherever they appear. 
This is done through a CSS class.

How to use:

1. Save this file as 'google_hilite.php' somewhere on your server.

2. Add a style to your CSS:

	.hilite { background-color: #FF9; }
	
(By all means change the colour, but the class must be called .hilite)

3. Place this at the top of your pages or template:

	<?php 
	$dr = $_SERVER[DOCUMENT_ROOT];
	include_once($dr.'/PATH/TO/google_hilite.php');
	ob_start("google_hilite"); 
	?>

Place the following wherever you'd like to welcome the google visitor:

	<? google_welcome(); ?>

*/

?>

<?php


	function google_hilite($text) {
	 $ref = urldecode($_SERVER[HTTP_REFERER]);

		# let's see if the referrer is google
	  if (preg_match('/^http:\/\/w?w?w?\.?google.*/i',$ref)) {

		# if so, tweezer out the search query
	   $query = preg_replace('/^.*q=([^&]+)&?.*$/i','$1',$ref);

		# scrub away nasty quote marks
	   $query = preg_replace('/\'|"/','',$query);

		# chop the search terms into an array
	   $query_array = preg_split ("/[\s,\+\.]+/",$query);
	 
		# loop through the search terms
	   foreach($query_array as $b){

	    if (!preg_match('/<.+>/',$text)) {

		# If there are no tags in the text, we'll just do a simple search and replace
	     $text = preg_replace('/(\b'.$b.'\b)/i','<span class="hilite">$1</span>',$text);  

	    } else {

		# If there are tags, we need to stay outside them
	     $text = preg_replace('/(?<=>)([^<]+)?(\b'.$b.'\b)/i','$1<span class="hilite">$2</span>',$text);

	    }
	   }
	  }
	  
	  return $text;
	 }



# Call this function to inform the Google visitor of your intentions to highlight.

	function google_welcome() {
	 $ref = urldecode($_SERVER[HTTP_REFERER]);
	 if (preg_match('/^http:\/\/w?w?w?\.?google.*/i',$ref)) {
	  $query = preg_replace('/^.*q=([^&]+)&?.*$/i','$1',$ref);
	 if (!empty($query)) { 
	  echo '<p><small>',
	  
	  # Change this if you like:
	  '[Vaše hledaná fráze z Google je barevnì vyznaèena].',
	  
	  '</small></p>'; 
	 }
	}
	}


?>
