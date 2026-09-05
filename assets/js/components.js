/*--- Components Start ---*/
document.addEventListener("DOMContentLoaded",function(){
/*--- Navbar Component ---*/
const navbarContainer=document.getElementById("pd-navbar-component");
if(navbarContainer){
fetch("assets/components/navbar.html")
.then(response=>{
if(!response.ok){throw new Error("Navbar component could not be loaded.");}
return response.text();
})
.then(data=>{
navbarContainer.innerHTML=data;
if(typeof pdNavbarInit==="function"){
pdNavbarInit();
}
})
.catch(error=>console.error(error));
}
/*--- Footer Component ---*/
const footerContainer=document.getElementById("pd-footer-component");
if(footerContainer){
fetch("assets/components/footer.html")
.then(response=>{
if(!response.ok){throw new Error("Footer component could not be loaded.");}
return response.text();
})
.then(data=>{
footerContainer.innerHTML=data;
})
.catch(error=>console.error(error));
}
});
/*--- Components End ---*/