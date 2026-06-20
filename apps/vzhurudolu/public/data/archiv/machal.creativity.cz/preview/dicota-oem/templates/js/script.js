function toggle( targetId, imageId ){
  if (document.getElementById){
  target = document.getElementById( targetId );
  if (target.style.display == "") {  target.style.display = "none"; }
  if (target.style.display == "none"){
    target.style.display = "block";
    document.getElementById( imageId ).src = "img/folder_minus.gif";  
  } else {
    target.style.display = "none";
    document.getElementById( imageId ).src = "img/folder_plus.gif";
  }
  }  
}


function go()
{
//  box = document.forms[0].navigation;
//  destination = box.options[box.selectedIndex].value;
//  if (destination) location.href = destination;

// window.location=document.naviform.navigation.options[document.naviform.navigation.selectedIndex].value;
}

