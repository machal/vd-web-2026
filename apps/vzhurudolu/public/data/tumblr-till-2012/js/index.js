/*
   Centralni javascript 
   Projekt: www.vzhurudolu.cz
   Autor: Martin Michalek, michalek@shortcat.cz
*/

// -----------------------------------------------------------------------------
// jQuery
$(document).ready(function() { 

	// Spustime nahradu fontu Cufonem 
   Cufon.set('hover', 'true');  
   Cufon.replace
     ('#header #description')
     ('.post h2')
	 ('#tag_page') 	
     ('#static_text h1');

  // Make code pretty
  window.prettyPrint && prettyPrint();

}); 

// Google Analytics: manually track clicks on outbound links
// http://support.google.com/googleanalytics/bin/answer.py?hl=en&answer=55527
function GArecordOutboundLink(link, category, action) {
  _gat._getTrackerByName()._trackEvent(category, action);
  setTimeout('document.location = "' + link.href + '"', 100);
}

