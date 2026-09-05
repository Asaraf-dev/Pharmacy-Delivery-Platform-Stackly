/*--- Client Orders Search and Filter ---*/
document.addEventListener("DOMContentLoaded",function(){
const searchInput=document.getElementById("pdOrderSearch");
const statusFilter=document.getElementById("pdOrderStatusFilter");
const orderList=document.getElementById("pdOrderList");
const orderCards=orderList?Array.from(orderList.querySelectorAll(".pd-ord-card")):[];
const orderCount=document.getElementById("pdOrderCount");
const emptyState=document.getElementById("pdOrderEmpty");
const resetButton=document.getElementById("pdOrderReset");
function filterOrders(){
const search=(searchInput?.value||"").trim().toLowerCase();
const status=statusFilter?.value||"all";
let visibleCount=0;
orderCards.forEach(function(card){
const cardStatus=card.dataset.status||"";
const cardSearch=card.dataset.search||"";
const matchesSearch=!search||cardSearch.toLowerCase().includes(search);
const matchesStatus=status==="all"||cardStatus===status;
const show=matchesSearch&&matchesStatus;
card.style.display=show?"grid":"none";
if(show)visibleCount++;
});
if(orderCount)orderCount.textContent=visibleCount;
if(emptyState)emptyState.classList.toggle("show",visibleCount===0);
if(orderList)orderList.style.display=visibleCount===0?"none":"flex";
}
searchInput?.addEventListener("input",filterOrders);
statusFilter?.addEventListener("change",filterOrders);
resetButton?.addEventListener("click",function(){
if(searchInput)searchInput.value="";
if(statusFilter)statusFilter.value="all";
filterOrders();
});
filterOrders();
});