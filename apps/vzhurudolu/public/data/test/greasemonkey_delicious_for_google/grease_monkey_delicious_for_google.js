// ==UserScript==
// @name           Delicious Fulltext Search on Google
// @namespace      machal
// @author 		   Martin Michalek
// @description    Shows fulltext search results from Google CSE based Delicious fulltext on Google search pages
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @date           2010-11-01
// @version        0.1
// @GM_version     0.8.20080609.0
// 
// based on markcarey's userscript 'Twitter Search Results on Google' (http://userscripts.org/scripts/show/43451)
// ==/UserScript==
// 
// http://ajax.googleapis.com/ajax/services/search/web?v=1.0&cx=016844430191867607424%3Amjm842awf-g&key=ABQIAAAAsWwPwIyxPdB-sOTavGTSthT2T1zni3fuEgmYGFFq4eJ2wbr1oBTSt9Z9tEQFZipXAbbyb26D_TfLhA&q=jquery


GM_DUR = {

	// Settings
	google_search_phrase : '',
	googe_cse_id : '016844430191867607424:mjm842awf-g',
	delicious_user_name : 'machal',
	number_of_results: 3,
	
	init : function()
	{
		var href = document.location.href;
		GM_DUR.google_search_phrase = href.match(/[&?]q=([^&]*)(?:&|$)/)[1];
		// alert('Dotaz: '+GM_DUR.google_search_phrase);
		if( GM_DUR.google_search_phrase != "" )
		{
			GM_xmlhttpRequest({
				method:'GET',
				url:'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&cx='+GM_DUR.googe_cse_id+'&q="'+GM_DUR.google_search_phrase+'"',
				headers:{
					'User-Agent':'Mozilla/5.0',
					'Accept':'text/json'
				},
				onload:GM_DUR.handle
			});
		}
	},

	handle : function(response)
	{
	// alert('response.responseText: '+ response.responseText);
	var results = eval("("+response.responseText+")");
	// alert('results: '+ results);
		if( results.responseData.results.length > 0 )
		{
			// alert('Vytváříme HTML...');
	  // ---------------------------------------------------------
			// Vytvarime HTML nasich vysledku

			// ulozime id prvku, kde Google vypisuje vysledky vyhledavani
			var results_section = document.getElementById("res");
			// ulozime nas prvek, ktery tvori obal naseho vysledku vyhledavani
			var ds = document.createElement("ol");
			// nas prvek vlozime do vysledku vyhledavani
			results_section.insertBefore(ds, results_section.firstChild);

			var il, h;
			// ulozime frazi hledanou na Google
			var query = decodeURIComponent(GM_DUR.google_search_phrase).replace(/\+/g, ' ');
			// do naseho prvku vlozime <li>
			h = ds.appendChild(document.createElement("li"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "<a href='http://delicious.com/"+GM_DUR.delicious_user_name+"/search?p=" + GM_DUR.google_search_phrase +"'>Delicious/"+GM_DUR.delicious_user_name+" results for <em>"+ query +"</em></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="data:image/png;base64,AAABAAIAEBAAAAEAGABoAwAAJgAAABAQAAABACAAaAQAAI4DAAAoAAAAEAAAACAAAAABABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLT////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL////////////////////////////////////////////QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL////////////////////////////////////////////QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" alt="" height="42" width="43"></td><td style="padding-top: 3px;" valign="top">';


			for( var i=0; i < GM_DUR.number_of_results; i++ )
			{
				il = "<div class='s'>"+
				"<a href='"+results.responseData.results[i].unescapedUrl+"' class='l'>"+
					results.responseData.results[i].titleNoFormatting +"</a> "+
					' <span class="f">'+ results.responseData.results[i].content +'</span></div>';
				row.innerHTML += il;
			}
			row.innerHTML += '</td>';
		}
	},
};

GM_DUR.init();