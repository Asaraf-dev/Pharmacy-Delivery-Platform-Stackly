/*--- About Pharmacy Delivery Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdAboutSection=document.querySelector(".pd-abt-about-section");
if(!pdAboutSection){return;}
const pdAboutElements=pdAboutSection.querySelectorAll(".pd-abt-about-content,.pd-abt-about-visual");
const pdAboutObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add("pd-abt-about-visible");
pdAboutObserver.unobserve(entry.target);
}
});
},{threshold:.15});
pdAboutElements.forEach(function(element){
element.classList.add("pd-abt-about-reveal");
pdAboutObserver.observe(element);
});
});
/*--- About Pharmacy Delivery Section End ---*/

/*--- Our Mission Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdMissionSection=document.querySelector(".pd-abt-mission-section");
if(!pdMissionSection){return;}
const pdMissionElements=pdMissionSection.querySelectorAll(".pd-abt-mission-content,.pd-abt-mission-visual");
const pdMissionObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add("pd-abt-mission-visible");
pdMissionObserver.unobserve(entry.target);
}
});
},{threshold:.15});
pdMissionElements.forEach(function(element){
element.classList.add("pd-abt-mission-reveal");
pdMissionObserver.observe(element);
});
});
/*--- Our Mission Section End ---*/

/*--- Our Vision Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdVisionSection=document.querySelector(".pd-abt-vision-section");
if(!pdVisionSection){return;}
const pdVisionItems=pdVisionSection.querySelectorAll(".pd-abt-vision-content,.pd-abt-vision-visual,.pd-abt-vision-card");
const pdVisionObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add("pd-abt-vision-visible");
pdVisionObserver.unobserve(entry.target);
}
});
},{threshold:.12});
pdVisionItems.forEach(function(item,index){
item.classList.add("pd-abt-vision-reveal");
item.style.transitionDelay=(index*.08)+"s";
pdVisionObserver.observe(item);
});
});
/*--- Our Vision Section End ---*/

/*--- Why Choose Us Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdWhySection=document.querySelector(".pd-abt-why-section");
if(!pdWhySection){return;}
const pdWhyItems=pdWhySection.querySelectorAll(".pd-abt-why-image-wrap,.pd-abt-why-trust-card,.pd-abt-why-delivery-card,.pd-abt-why-content,.pd-abt-why-item");
const pdWhyObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add("pd-abt-why-visible");
pdWhyObserver.unobserve(entry.target);
}
});
},{threshold:.12});
pdWhyItems.forEach(function(item,index){
item.classList.add("pd-abt-why-reveal");
item.style.transitionDelay=(index*.08)+"s";
pdWhyObserver.observe(item);
});
});
/*--- Why Choose Us Section End ---*/