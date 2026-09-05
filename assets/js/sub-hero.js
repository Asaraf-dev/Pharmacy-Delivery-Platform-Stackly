/*--- Inner Hero Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdSubHero=document.querySelector(".pd-sub-hero");
const pdSubHeroCard=document.querySelector(".pd-sub-hero-card");
const pdSubHeroCapsules=document.querySelectorAll(".pd-sub-hero-capsule");
if(pdSubHero){
pdSubHero.addEventListener("mousemove",function(e){
const rect=pdSubHero.getBoundingClientRect();
const x=(e.clientX-rect.left)/rect.width-.5;
const y=(e.clientY-rect.top)/rect.height-.5;
if(pdSubHeroCard){pdSubHeroCard.style.marginLeft=(x*12)+"px";pdSubHeroCard.style.marginTop=(y*12)+"px";}
pdSubHeroCapsules.forEach(function(item,index){
const strength=index===0?18:12;
item.style.marginLeft=(x*strength)+"px";
item.style.marginTop=(y*strength)+"px";
});
});
pdSubHero.addEventListener("mouseleave",function(){
if(pdSubHeroCard){pdSubHeroCard.style.marginLeft="";pdSubHeroCard.style.marginTop="";}
pdSubHeroCapsules.forEach(function(item){item.style.marginLeft="";item.style.marginTop="";});
});
}
});
/*--- Inner Hero Section End ---*/

/*--- CTA Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdCtaSection=document.querySelector(".pd-cta-section");
if(!pdCtaSection){return;}
/*--- CTA Scroll Reveal ---*/
const pdCtaElements=pdCtaSection.querySelectorAll(".pd-cta-content,.pd-cta-visual");
const pdCtaObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add("pd-cta-visible");
pdCtaObserver.unobserve(entry.target);
}
});
},{threshold:.15});
pdCtaElements.forEach(function(element){
element.classList.add("pd-cta-reveal");
pdCtaObserver.observe(element);
});
/*--- CTA Button Interaction ---*/
const pdCtaButtons=pdCtaSection.querySelectorAll(".pd-cta-primary-btn,.pd-cta-secondary-btn");
pdCtaButtons.forEach(function(button){
button.addEventListener("mouseenter",function(){
button.classList.add("pd-cta-button-active");
});
button.addEventListener("mouseleave",function(){
button.classList.remove("pd-cta-button-active");
});
});
});
/*--- CTA Section End ---*/