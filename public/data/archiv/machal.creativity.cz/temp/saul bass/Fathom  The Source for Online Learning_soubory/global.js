
<!-- 

function jumpto(x){

if (document.form1.jumpmenu.value != "null") {
        document.location.href = x
        }
}





<!--
function blindMe(theURL,winName,features) {
  attn = window.open(theURL,winName,features);
}

function doNothing() {

}

function blindMe1(theURL,param,winName,features) {
  theURL=theURL+"?itemId="+param;
  attn = window.open(theURL,winName,features);
}

function goExplore (arg_exploreField)
{
//        alert(arg_exploreField.options[arg_exploreField.selectedIndex].value)
        var exploreValue = arg_exploreField.options[arg_exploreField.selectedIndex].value
//        if (arg_exploreValue != ""){
                top.display.location.href = "/explorer/explorer.jhtml?topic_id=" + arg_exploreField.options[arg_exploreField.selectedIndex].value
//        }
        return false
}

<!-- FOR VERISIGN ---------->
function popUp(url){
sealWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=500,height=450');
self.name = "mainWin";
}
//-->

<!--
function popWindow(theURL,winName,features) {
attn = window.open(theURL,winName,features);
}


function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_displayStatusMsg(msgStr) { //v1.0
  status=msgStr;
  document.MM_returnValue = true;
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

                                                                function popWindow(theURL,winName,features) {
                                attn = window.open(theURL,winName,features);
                                }
                                // -->

                                function blindMe1(theURL,param,winName,features) {
                                theURL=theURL+"?itemId="+param;
                                attn = window.open(theURL,winName,features);
                                }

<!-------- SCRIPT TO OPEN URL IN PARENT WINDOW -------->


                function goTo(popThrough) {
                if (!window.opener){
                self.open(popThrough)
                } else if (window.opener.closed){
                window.open(popThrough);
                window.close();
                } else {
                window.opener.location.href = popThrough;
                window.close();
                }
                }

var loadFunc = null;
function onLoad() {
  if (loadFunc != null) {
    init();
  }
}
// -->