function toggle( targetId ){
  if (document.getElementById){
  target = document.getElementById( targetId );
  if (target.style.display == "") {  target.style.display = "none"; }
  if (target.style.display == "none"){
    target.style.display = "block";
//    document.getElementById( imageId ).src = "../img/content/icon_close.gif";
  } else {
    target.style.display = "none";
//    document.getElementById( imageId ).src = "../img/content/icon_open.gif";  
  }
  }  
}