/*--- Footer Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const footerYear=document.getElementById("pd-foot-footer-year");
if(footerYear){footerYear.textContent=new Date().getFullYear();}
const footerSocialLinks=document.querySelectorAll(".pd-foot-footer-social a");
footerSocialLinks.forEach(function(link){
link.addEventListener("mouseenter",function(){
link.style.transform="translateY(-4px) rotate(5deg)";
});
link.addEventListener("mouseleave",function(){
link.style.transform="";
});
});
const footerSupport=document.querySelector(".pd-foot-footer-support-card");
if(footerSupport){
footerSupport.addEventListener("mouseenter",function(){
const icon=footerSupport.querySelector(".pd-foot-footer-support-icon i");
if(icon){icon.style.transform="scale(1.15)";}
});
footerSupport.addEventListener("mouseleave",function(){
const icon=footerSupport.querySelector(".pd-foot-footer-support-icon i");
if(icon){icon.style.transform="";}
});
}
});
/*--- Footer End ---*/