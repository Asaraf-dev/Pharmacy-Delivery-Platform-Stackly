/*--- Get In Touch Form Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdConTouchForm=document.getElementById("pdConTouchForm");
const pdConName=document.getElementById("pdConName");
const pdConPhone=document.getElementById("pdConPhone");
const pdConSuccessPopup=document.getElementById("pdConSuccessPopup");
const pdConSuccessClose=document.getElementById("pdConSuccessClose");
const pdConSuccessButton=document.getElementById("pdConSuccessButton");
if(!pdConTouchForm){
return;
}
/*--- Name Validation ---*/
if(pdConName){
pdConName.addEventListener("input",function(){
this.value=this.value.replace(/[^A-Za-z ]/g,"");
});
}
/*--- Phone Validation ---*/
if(pdConPhone){
pdConPhone.addEventListener("input",function(){
this.value=this.value.replace(/[^0-9]/g,"").slice(0,10);
});
}
/*--- Form Submit ---*/
pdConTouchForm.addEventListener("submit",function(event){
event.preventDefault();
if(!pdConTouchForm.checkValidity()){
pdConTouchForm.reportValidity();
return;
}
pdConSuccessPopup.classList.add("show");
pdConTouchForm.reset();
});
/*--- Close Success Popup ---*/
function pdConCloseSuccess(){
pdConSuccessPopup.classList.remove("show");
}
if(pdConSuccessClose){
pdConSuccessClose.addEventListener("click",pdConCloseSuccess);
}
if(pdConSuccessButton){
pdConSuccessButton.addEventListener("click",pdConCloseSuccess);
}
if(pdConSuccessPopup){
pdConSuccessPopup.addEventListener("click",function(event){
if(event.target===pdConSuccessPopup){
pdConCloseSuccess();
}
});
}
});
/*--- Get In Touch Form End ---*/

/*--- FAQ Start ---*/
document.addEventListener("DOMContentLoaded",function(){
document.querySelectorAll(".pd-con-faq-question").forEach(function(pdFaqQuestion){
pdFaqQuestion.addEventListener("click",function(){
const pdFaqItem=pdFaqQuestion.closest(".pd-con-faq-item");
document.querySelectorAll(".pd-con-faq-item").forEach(function(item){
if(item!==pdFaqItem){item.classList.remove("active");}
});
pdFaqItem.classList.toggle("active");
});
});
});
/*--- FAQ End ---*/