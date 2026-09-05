/*--- Loader Start ---*/
const pdLdrLoader=document.getElementById("pdLdrLoader");
const pdLdrMessage=document.getElementById("pdLdrMessage");
let pdLdrMessageInterval=null;
let pdLdrHideTimeout=null;
let pdLdrMessageIndex=0;
/*--- Loader Messages Start ---*/
const pdLdrMessages=["Preparing your healthcare...","Checking pharmacy availability...","Getting your medicines ready...","Securing your delivery...","Almost ready for you..."];
/*--- Loader Messages End ---*/
/*--- Show Loader Start ---*/
function pdShowLoader(){
if(!pdLdrLoader){return;}
clearTimeout(pdLdrHideTimeout);
clearInterval(pdLdrMessageInterval);
pdLdrLoader.style.display="flex";
pdLdrLoader.classList.remove("pd-ldr-hidden","pd-ldr-exit");
pdLdrMessageIndex=0;
if(pdLdrMessage){
pdLdrMessage.textContent=pdLdrMessages[0];
pdLdrMessage.style.opacity="1";
pdLdrMessage.style.transform="translateY(0)";
}
pdLdrMessageInterval=setInterval(function(){
pdLdrMessageIndex++;
if(pdLdrMessageIndex>=pdLdrMessages.length){pdLdrMessageIndex=0;}
if(pdLdrMessage){
pdLdrMessage.style.opacity="0";
pdLdrMessage.style.transform="translateY(5px)";
setTimeout(function(){
if(pdLdrMessage){
pdLdrMessage.textContent=pdLdrMessages[pdLdrMessageIndex];
pdLdrMessage.style.opacity="1";
pdLdrMessage.style.transform="translateY(0)";
}
},250);
}
},1500);
}
/*--- Show Loader End ---*/
/*--- Hide Loader Start ---*/
function pdHideLoader(){
if(!pdLdrLoader){return;}
clearTimeout(pdLdrHideTimeout);
pdLdrHideTimeout=setTimeout(function(){
clearInterval(pdLdrMessageInterval);
pdLdrLoader.classList.add("pd-ldr-exit");
setTimeout(function(){
if(pdLdrLoader){
pdLdrLoader.classList.add("pd-ldr-hidden");
pdLdrLoader.style.display="none";
}
},700);
},500);
}
/*--- Hide Loader End ---*/
/*--- Mouse Glow Start ---*/
document.addEventListener("mousemove",function(pdLdrEvent){
if(!pdLdrLoader||pdLdrLoader.classList.contains("pd-ldr-hidden")){return;}
pdLdrLoader.style.setProperty("--pd-ldr-x",pdLdrEvent.clientX+"px");
pdLdrLoader.style.setProperty("--pd-ldr-y",pdLdrEvent.clientY+"px");
});
/*--- Mouse Glow End ---*/
/*--- Initial Page Load Start ---*/
document.addEventListener("DOMContentLoaded",function(){
pdShowLoader();
});
/*--- Initial Page Load End ---*/
/*--- Window Loaded Start ---*/
window.addEventListener("load",function(){
pdHideLoader();
});
/*--- Window Loaded End ---*/
/*--- Browser Back Forward Start ---*/
window.addEventListener("pageshow",function(pdLdrEvent){
if(pdLdrEvent.persisted){
if(pdLdrLoader){
pdLdrLoader.style.display="flex";
}
pdShowLoader();
pdHideLoader();
}
});
/*--- Browser Back Forward End ---*/
/*--- Loader End ---*/