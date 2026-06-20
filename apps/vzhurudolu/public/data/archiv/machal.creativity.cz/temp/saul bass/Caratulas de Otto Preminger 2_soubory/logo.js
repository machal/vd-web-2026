var FRAMES = (parent.frames.length) ? true : false;
var IE4    = (document.all)         ? true : false;
var NS4    = (document.layers)      ? true : false;

function miarroba_getWindowWidth()
{
	if (NS4) 
	{
		return window.innerWidth;
	}
	else
	{
		return document.body.clientWidth;
	}
}
function miarroba_getWindowHeight()
{
	if (NS4) 
	{
		return window.innerHeight;
	}
	else
	{
		return document.body.clientHeight;
	}
}
var windowWidth  = 0;
var windowHeight = 0;
windowWidth  = miarroba_getWindowWidth();
windowHeight = miarroba_getWindowHeight();

if ( windowHeight > 300 && windowWidth > 400)
{
	document.writeln('<br><center><div id="logo_miarroba" style="height:40px; visibility:visible;" align="center">');
	document.writeln('<a href="http://miarroba.com/home.php" target="_new"><img hspace="2" class="" vspace="2" width="122" height="39" src="http://pics.miarroba.com/logo_miarroba_espacio.gif" border="0"></a>\n');
	document.writeln('<iframe src="http://espacio.miarroba.com/popup.php" frameborder="no" border="0" MARGINWIDTH="0" MARGINHEIGHT="0" SCROLLING="no" width="0" height="0"></iframe>\n');
	document.writeln('</div>\n</center>\n');
}