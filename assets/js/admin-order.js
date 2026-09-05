/*--- Admin Orders Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdAdmOrdersSearch=document.getElementById("pdAdmOrdersSearch");
const pdAdmOrdersStatus=document.getElementById("pdAdmOrdersStatus");
const pdAdmOrdersDate=document.getElementById("pdAdmOrdersDate");
const pdAdmOrdersTableBody=document.getElementById("pdAdmOrdersTableBody");
const pdAdmOrdersNoResults=document.getElementById("pdAdmOrdersNoResults");
const pdAdmOrdersShowing=document.getElementById("pdAdmOrdersShowing");
const pdAdmOrdersModal=document.getElementById("pdAdmOrdersModal");
const pdAdmOrdersModalOverlay=document.getElementById("pdAdmOrdersModalOverlay");
const pdAdmOrdersModalClose=document.getElementById("pdAdmOrdersModalClose");
const pdAdmOrdersModalCancel=document.getElementById("pdAdmOrdersModalCancel");
const pdAdmOrdersModalTitle=document.getElementById("pdAdmOrdersModalTitle");
const pdAdmOrdersModalStatus=document.getElementById("pdAdmOrdersModalStatus");
const pdAdmOrdersModalCustomer=document.getElementById("pdAdmOrdersModalCustomer");
const pdAdmOrdersModalEmail=document.getElementById("pdAdmOrdersModalEmail");
const pdAdmOrdersModalDate=document.getElementById("pdAdmOrdersModalDate");
const pdAdmOrdersModalPayment=document.getElementById("pdAdmOrdersModalPayment");
const pdAdmOrdersModalTotal=document.getElementById("pdAdmOrdersModalTotal");
if(!pdAdmOrdersTableBody){
return;
}
/*--- Get Order Rows ---*/
const pdAdmOrdersRows=Array.from(pdAdmOrdersTableBody.querySelectorAll("tr"));
/*--- Open Modal ---*/
function pdAdmOrdersOpenModal(row){
if(!row){
return;
}
const orderId=row.querySelector(".pd-adm-orders-id")?.textContent.trim()||"Order";
const customer=row.querySelector(".pd-adm-orders-customer strong")?.textContent.trim()||"Customer";
const email=row.querySelector(".pd-adm-orders-customer span")?.textContent.trim()||"";
const items=row.querySelector("td:nth-child(3) strong")?.textContent.trim()||"";
const total=row.querySelector(".pd-adm-orders-total")?.textContent.trim()||"₹0";
const payment=row.querySelector(".pd-adm-orders-payment")?.textContent.trim()||"";
const status=row.querySelector(".pd-adm-orders-status")?.textContent.trim()||"";
const date=row.querySelector("td:nth-child(7) strong")?.textContent.trim()||"";
if(pdAdmOrdersModalTitle){
pdAdmOrdersModalTitle.textContent=orderId;
}
if(pdAdmOrdersModalStatus){
pdAdmOrdersModalStatus.textContent=status;
pdAdmOrdersModalStatus.className="pd-adm-orders-modal-status "+(row.dataset.status||"");
}
if(pdAdmOrdersModalCustomer){
pdAdmOrdersModalCustomer.textContent=customer;
}
if(pdAdmOrdersModalEmail){
pdAdmOrdersModalEmail.textContent=email;
}
if(pdAdmOrdersModalDate){
pdAdmOrdersModalDate.textContent=date;
}
if(pdAdmOrdersModalPayment){
pdAdmOrdersModalPayment.textContent=payment;
}
if(pdAdmOrdersModalTotal){
pdAdmOrdersModalTotal.textContent=total;
}
const detailProducts=document.querySelector(".pd-adm-orders-detail-products");
if(detailProducts){
const existingProducts=detailProducts.querySelectorAll(".pd-adm-orders-detail-product");
if(existingProducts.length&&items){
const firstProduct=existingProducts[0];
const productName=firstProduct.querySelector("strong");
if(productName&&items){
productName.textContent=items.replace(/^\d+\s*Items?\s*/i,"");
}
}
}
if(pdAdmOrdersModal){
pdAdmOrdersModal.classList.add("show");
document.body.classList.add("pd-adm-orders-modal-open");
}
}
/*--- Close Modal ---*/
function pdAdmOrdersCloseModal(){
if(pdAdmOrdersModal){
pdAdmOrdersModal.classList.remove("show");
}
document.body.classList.remove("pd-adm-orders-modal-open");
}
/*--- View Order ---*/
document.querySelectorAll(".pd-adm-orders-view").forEach(function(button){
button.addEventListener("click",function(){
const row=this.closest("tr");
pdAdmOrdersOpenModal(row);
});
});
/*--- Modal Close Buttons ---*/
if(pdAdmOrdersModalClose){
pdAdmOrdersModalClose.addEventListener("click",pdAdmOrdersCloseModal);
}
if(pdAdmOrdersModalCancel){
pdAdmOrdersModalCancel.addEventListener("click",pdAdmOrdersCloseModal);
}
if(pdAdmOrdersModalOverlay){
pdAdmOrdersModalOverlay.addEventListener("click",pdAdmOrdersCloseModal);
}
document.addEventListener("keydown",function(event){
if(event.key==="Escape"){
pdAdmOrdersCloseModal();
}
});
/*--- Filter Orders ---*/
function pdAdmOrdersFilter(){
const searchValue=(pdAdmOrdersSearch?.value||"").trim().toLowerCase();
const statusValue=pdAdmOrdersStatus?.value||"all";
const dateValue=pdAdmOrdersDate?.value||"all";
let visibleCount=0;
pdAdmOrdersRows.forEach(function(row){
const searchText=(row.dataset.search||"").toLowerCase();
const rowStatus=(row.dataset.status||"").toLowerCase();
const searchMatch=!searchValue||searchText.includes(searchValue);
const statusMatch=statusValue==="all"||rowStatus===statusValue;
let dateMatch=true;
if(dateValue!=="all"){
const dateText=row.querySelector("td:nth-child(7) strong")?.textContent.trim()||"";
const rowDate=new Date(dateText);
const today=new Date();
today.setHours(0,0,0,0);
if(dateValue==="today"){
dateMatch=rowDate.toDateString()===today.toDateString();
}
if(dateValue==="week"){
const startOfWeek=new Date(today);
const day=today.getDay();
const difference=day===0?6:day-1;
startOfWeek.setDate(today.getDate()-difference);
dateMatch=rowDate>=startOfWeek&&rowDate<=today;
}
if(dateValue==="month"){
dateMatch=rowDate.getMonth()===today.getMonth()&&rowDate.getFullYear()===today.getFullYear();
}
}
const visible=searchMatch&&statusMatch&&dateMatch;
row.style.display=visible?"":"none";
if(visible){
visibleCount++;
}
});
if(pdAdmOrdersShowing){
pdAdmOrdersShowing.textContent=visibleCount;
}
if(pdAdmOrdersNoResults){
pdAdmOrdersNoResults.classList.toggle("show",visibleCount===0);
}
}
/*--- Search Filter ---*/
if(pdAdmOrdersSearch){
pdAdmOrdersSearch.addEventListener("input",pdAdmOrdersFilter);
}
/*--- Status Filter ---*/
if(pdAdmOrdersStatus){
pdAdmOrdersStatus.addEventListener("change",pdAdmOrdersFilter);
}
/*--- Date Filter ---*/
if(pdAdmOrdersDate){
pdAdmOrdersDate.addEventListener("change",pdAdmOrdersFilter);
}
/*--- Pagination Buttons ---*/
document.querySelectorAll(".pd-adm-orders-pagination button").forEach(function(button){
button.addEventListener("click",function(){
if(this.disabled||this.classList.contains("active")){
return;
}
document.querySelectorAll(".pd-adm-orders-pagination button").forEach(function(item){
item.classList.remove("active");
});
if(this.querySelector(".bi-chevron-left")||this.querySelector(".bi-chevron-right")){
return;
}
this.classList.add("active");
});
});
/*--- Initial Filter ---*/
pdAdmOrdersFilter();
});
/*--- Admin Orders End ---*/