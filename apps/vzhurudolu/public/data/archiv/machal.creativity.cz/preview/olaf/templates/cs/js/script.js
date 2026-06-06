function toggle( targetId ){
  if (document.getElementById){
  target = document.getElementById( targetId );
  if (target.style.display == "") {  target.style.display = "none"; }
  if (target.style.display == "none"){
  target.style.display = "block";
  } else {
  target.style.display = "none";
  }
  }  
//  alert(this.src);
}

function prePrint()
{
if (window.print) window.print();
else alert('Váš prohlížeè nepodporuje možnost tisku tímto zpùsobem. Zkuste stránku vytisknout pøímo z rozhraní prohlížeèe.');
}

function showText(image) {
  if (image == "") {
    document.getElementById('undermenu').style.background='#ebebeb'
  }
  else {
    document.getElementById('undermenu').style.background='#ebebeb url('+image+') no-repeat'
  }
}


function preLoad() {
var aPreLoad = new Array();
aPreLoad[1] = new Image();	aPreLoad[1].src = 'img/menu/nakupuj-online_text.gif';
aPreLoad[2] = new Image();	aPreLoad[2].src = 'img/menu/zjisti-kdo-jsme_text.gif';
aPreLoad[3] = new Image();	aPreLoad[3].src = 'img/menu/bav-se_text.gif';
aPreLoad[4] = new Image();	aPreLoad[4].src = 'img/menu/bud-v-obraze_text.gif';
aPreLoad[5] = new Image();	aPreLoad[5].src = 'img/menu/najdi-prodejnu_text.gif';
aPreLoad[6] = new Image();	aPreLoad[6].src = 'img/menu/kontaktuj-nas_text.gif';
}

window.onload = preLoad;

