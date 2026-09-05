/*--- Navbar Start ---*/
function pdNavbarInit(){
/*--- Active Navigation ---*/
const currentPage=window.location.pathname.split("/").pop().toLowerCase()||"index.html";
const navLinks=document.querySelectorAll(".pd-nav-navbar-link,.pd-nav-navbar-mobile-link");
navLinks.forEach(function(link){
const linkPage=(link.getAttribute("href")||"").split("/").pop().toLowerCase();
link.classList.remove("active");
if(linkPage===currentPage){
link.classList.add("active");
}
});
/*--- Mobile Navigation ---*/
document.querySelectorAll(".pd-nav-navbar-mobile-link").forEach(function(link){
link.addEventListener("click",function(){
document.querySelectorAll(".pd-nav-navbar-mobile-link").forEach(function(item){
item.classList.remove("active");
});
link.classList.add("active");
});
});
/*--- Navbar Cart Animation ---*/
const cart=document.querySelector(".pd-nav-navbar-cart");
if(cart){
cart.addEventListener("mouseenter",function(){
const count=document.querySelector(".pd-nav-navbar-cart-count");
if(count){
count.style.transform="scale(1.15)";
}
});
cart.addEventListener("mouseleave",function(){
const count=document.querySelector(".pd-nav-navbar-cart-count");
if(count){
count.style.transform="";
}
});
}
/*--- Cart Count Initial Sync ---*/
pdNavbarUpdateCartCount();
/*--- Navbar Sticky Scroll ---*/
const pdNavbar=document.querySelector(".pd-nav-navbar");
if(pdNavbar){
const pdNavbarScroll=function(){
if(window.scrollY>30){
pdNavbar.classList.add("pd-nav-navbar-scrolled");
}else{
pdNavbar.classList.remove("pd-nav-navbar-scrolled");
}
};
pdNavbarScroll();
window.addEventListener("scroll",pdNavbarScroll);
}
}
/*--- Navbar Cart Count ---*/
function pdNavbarUpdateCartCount(){
let pdCart=[];
try{
pdCart=JSON.parse(localStorage.getItem("pdCart"))||[];
}catch(error){
pdCart=[];
}
const pdTotal=pdCart.reduce(function(total,item){
return total+Number(item.quantity||1);
},0);
document.querySelectorAll(".pd-nav-navbar-cart-count").forEach(function(element){
element.textContent=pdTotal;
});
document.querySelectorAll(".pd-nav-navbar-mobile-cart-content strong").forEach(function(element){
element.textContent=pdTotal+" "+(pdTotal===1?"Item":"Items");
});
}
/*--- Cart Storage Sync ---*/
window.addEventListener("storage",function(event){
if(event.key==="pdCart"){
pdNavbarUpdateCartCount();
}
});
/*--- Navbar End ---*/