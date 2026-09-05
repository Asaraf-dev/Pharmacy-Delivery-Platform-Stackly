/*--- 404 Start ---*/
function pd404GoBack(){
if(document.referrer&&document.referrer!==window.location.href){
window.history.back();
}else{
window.location.href="index.html";
}
}
/*--- 404 Page Interaction Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pd404BackButton=document.querySelector(".pd-404-back-btn");
if(pd404BackButton){
if(!document.referrer){
pd404BackButton.querySelector("span").textContent="Go Home";
}
}
});
/*--- 404 Page Interaction End ---*/
/*--- 404 End ---*/