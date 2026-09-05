/*--- Quick Search / Medicine Finder Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdIndSearchInput = document.getElementById("pdIndMedicineSearch");
    const pdIndSearchButton = document.getElementById("pdIndSearchButton");
    const pdIndSearchClear = document.getElementById("pdIndSearchClear");
    const pdIndSearchResults = document.getElementById("pdIndSearchResults");
    const pdIndSearchChips = document.querySelectorAll(".pd-ind-search-chip");
    const pdIndPopularButtons = document.querySelectorAll(".pd-ind-search-popular button");
    const pdIndMedicineData = [
        { name: "Paracetamol", type: "Pain Relief", icon: "bi-capsule" },
        { name: "Vitamin D", type: "Vitamins & Supplements", icon: "bi-capsule-pill" },
        { name: "Cough Syrup", type: "Cold & Flu Care", icon: "bi-droplet-half" },
        { name: "First Aid", type: "Healthcare Essentials", icon: "bi-bandaid" },
        { name: "Pain Relief", type: "Pain Management", icon: "bi-heart-pulse" },
        { name: "Diabetes Care", type: "Diabetes & Wellness", icon: "bi-droplet" }
    ];
    /*--- Search Function ---*/
    function pdIndSearchMedicine(value) {
        const pdIndSearchValue = value.trim().toLowerCase();
        if (!pdIndSearchValue) {
            pdIndSearchResults.classList.remove("show");
            pdIndSearchResults.innerHTML = "";
            return;
        }
        const pdIndMatches = pdIndMedicineData.filter(function (item) {
            return item.name.toLowerCase().includes(pdIndSearchValue) || item.type.toLowerCase().includes(pdIndSearchValue);
        });
        if (pdIndMatches.length) {
            pdIndSearchResults.innerHTML = pdIndMatches.map(function (item) {
                return '<div class="pd-ind-search-result" data-value="' + item.name + '"><div class="pd-ind-search-result-info"><span class="pd-ind-search-result-icon"><i class="bi ' + item.icon + '"></i></span><span><strong>' + item.name + '</strong><small>' + item.type + '</small></span></div><i class="bi bi-arrow-up-right"></i></div>';
            }).join("");
            pdIndSearchResults.classList.add("show");
            document.querySelectorAll(".pd-ind-search-result").forEach(function (result) {
                result.addEventListener("click", function () {
                    pdIndSearchInput.value = result.getAttribute("data-value");
                    pdIndSearchResults.classList.remove("show");
                    pdIndSearchClear.classList.add("show");
                });
            });
        } else {
            pdIndSearchResults.innerHTML = '<div class="pd-ind-search-result"><div class="pd-ind-search-result-info"><span class="pd-ind-search-result-icon"><i class="bi bi-search"></i></span><span><strong>No medicine found</strong><small>Try another medicine or upload your prescription.</small></span></div></div>';
            pdIndSearchResults.classList.add("show");
        }
    }
    /*--- Input Search ---*/
    if (pdIndSearchInput) {
        pdIndSearchInput.addEventListener("input", function () {
            pdIndSearchClear.classList.toggle("show", pdIndSearchInput.value.length > 0);
            pdIndSearchMedicine(pdIndSearchInput.value);
        });
        pdIndSearchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                pdIndSearchMedicine(pdIndSearchInput.value);
            }
        });
    }
    /*--- Search Button ---*/
    if (pdIndSearchButton) {
        pdIndSearchButton.addEventListener("click", function () {
            pdIndSearchMedicine(pdIndSearchInput.value);
            if (pdIndSearchInput.value.trim()) {
                window.location.href = "medicines.html?search=" + encodeURIComponent(pdIndSearchInput.value.trim());
            }
        });
    }
    /*--- Clear Search ---*/
    if (pdIndSearchClear) {
        pdIndSearchClear.addEventListener("click", function () {
            pdIndSearchInput.value = "";
            pdIndSearchResults.classList.remove("show");
            pdIndSearchResults.innerHTML = "";
            pdIndSearchClear.classList.remove("show");
            pdIndSearchInput.focus();
        });
    }
    /*--- Quick Search Chips ---*/
    pdIndSearchChips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            const pdIndSearchValue = chip.getAttribute("data-search");
            pdIndSearchInput.value = pdIndSearchValue;
            pdIndSearchClear.classList.add("show");
            pdIndSearchMedicine(pdIndSearchValue);
            pdIndSearchInput.focus();
        });
    });
    /*--- Popular Searches ---*/
    pdIndPopularButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const pdIndSearchValue = button.getAttribute("data-search");
            pdIndSearchInput.value = pdIndSearchValue;
            pdIndSearchClear.classList.add("show");
            pdIndSearchMedicine(pdIndSearchValue);
            pdIndSearchInput.focus();
        });
    });
    /*--- Close Results Outside ---*/
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".pd-ind-search-box")) {
            pdIndSearchResults.classList.remove("show");
        }
    });
});
/*--- Quick Search / Medicine Finder End ---*/

/*--- About Us Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdIndAboutVisual = document.querySelector(".pd-ind-about-visual-card");
    const pdIndAboutFloating = document.querySelectorAll(".pd-ind-about-floating");
    if (pdIndAboutVisual) {
        pdIndAboutVisual.addEventListener("mousemove", function (event) {
            const pdIndAboutRect = pdIndAboutVisual.getBoundingClientRect();
            const pdIndAboutX = (event.clientX - pdIndAboutRect.left) / pdIndAboutRect.width - .5;
            const pdIndAboutY = (event.clientY - pdIndAboutRect.top) / pdIndAboutRect.height - .5;
            pdIndAboutFloating.forEach(function (item, index) {
                const pdIndAboutStrength = index === 0 ? 10 : 7;
                item.style.transform = "translate(" + pdIndAboutX * pdIndAboutStrength + "px," + pdIndAboutY * pdIndAboutStrength + "px)";
            });
        });
        pdIndAboutVisual.addEventListener("mouseleave", function () {
            pdIndAboutFloating.forEach(function (item) { item.style.transform = ""; });
        });
    }
});
/*--- About Us Section End ---*/

/*--- Featured Medicines Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
/*--- Wishlist Interaction ---*/
document.querySelectorAll(".pd-ind-featured-wishlist").forEach(function(button){
button.addEventListener("click",function(){
button.classList.toggle("active");
const icon=button.querySelector("i");
if(!icon){return;}
if(button.classList.contains("active")){
icon.classList.remove("bi-heart");
icon.classList.add("bi-heart-fill");
}else{
icon.classList.remove("bi-heart-fill");
icon.classList.add("bi-heart");
}
});
});
/*--- Cart Storage ---*/
function pdGetCart(){
try{
const pdCart=JSON.parse(localStorage.getItem("pdCart"));
return Array.isArray(pdCart)?pdCart:[];
}catch(error){
return [];
}
}
/*--- Save Cart ---*/
function pdSaveCart(pdCart){
localStorage.setItem("pdCart",JSON.stringify(pdCart));
}
/*--- Update Navbar Cart Count ---*/
function pdUpdateCartCount(){
const pdCart=pdGetCart();
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
/*--- Add To Cart ---*/
document.querySelectorAll(".pd-ind-featured-cart").forEach(function(button){
button.addEventListener("click",function(){
const pdCard=button.closest(".pd-ind-featured-card");
if(!pdCard){return;}
const pdName=pdCard.querySelector(".pd-ind-featured-name")?.textContent.trim()||"Medicine";
const pdCategory=pdCard.querySelector(".pd-ind-featured-category")?.textContent.trim()||"Healthcare";
const pdImage=pdCard.querySelector("img")?.getAttribute("src")||"";
const pdPriceElement=pdCard.querySelector(".pd-ind-featured-price strong");
const pdOldPriceElement=pdCard.querySelector(".pd-ind-featured-price del");
const pdPrice=Number((pdPriceElement?.textContent||"0").replace(/[^\d.]/g,""))||0;
const pdOldPrice=Number((pdOldPriceElement?.textContent||"0").replace(/[^\d.]/g,""))||pdPrice;
const pdId=pdName.toLowerCase().replace(/[^a-z0-9]+/g,"-");
let pdCart=pdGetCart();
const pdExisting=pdCart.find(function(item){
return String(item.id)===String(pdId);
});
if(pdExisting){
pdExisting.quantity=Number(pdExisting.quantity||1)+1;
}else{
pdCart.push({
id:pdId,
name:pdName,
category:pdCategory,
brand:"Pharmacy Delivery",
price:pdPrice,
oldPrice:pdOldPrice,
image:pdImage,
quantity:1
});
}
pdSaveCart(pdCart);
pdUpdateCartCount();
/*--- Add Button Animation ---*/
const originalContent=button.innerHTML;
button.innerHTML='<i class="bi bi-check2"></i><span>Added</span>';
button.classList.add("pd-ind-featured-cart-added");
setTimeout(function(){
button.innerHTML=originalContent;
button.classList.remove("pd-ind-featured-cart-added");
},1500);
});
});
/*--- Quick View Interaction ---*/
document.querySelectorAll(".pd-ind-featured-quick button").forEach(function(button){
button.addEventListener("click",function(){
const card=button.closest(".pd-ind-featured-card");
if(card){
card.classList.add("pd-ind-featured-viewing");
setTimeout(function(){
card.classList.remove("pd-ind-featured-viewing");
},700);
}
});
});
/*--- Featured Card Mouse Movement ---*/
document.querySelectorAll(".pd-ind-featured-card").forEach(function(card){
card.addEventListener("mousemove",function(event){
const rect=card.getBoundingClientRect();
const x=(event.clientX-rect.left)/rect.width-.5;
const y=(event.clientY-rect.top)/rect.height-.5;
card.style.transform="translateY(-7px) rotateX("+(-y*2)+"deg) rotateY("+(x*2)+"deg)";
});
card.addEventListener("mouseleave",function(){
card.style.transform="";
});
});
/*--- Load Existing Cart Count ---*/
pdUpdateCartCount();
/*--- Cart Changes From Other Pages ---*/
window.addEventListener("storage",function(event){
if(event.key==="pdCart"){
pdUpdateCartCount();
}
});
});
/*--- Featured Medicines Section End ---*/

/*--- How It Works Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdHowSteps = document.querySelectorAll(".pd-ind-how-step");
    if (pdHowSteps.length) {
        const pdHowObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("pd-ind-how-visible");
                    pdHowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: .2 });
        pdHowSteps.forEach(function (step) {
            pdHowObserver.observe(step);
        });
    }
});
/*--- How It Works Section End ---*/

/*--- Fast Delivery Experience Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdFastSection = document.querySelector(".pd-ind-fast");
    if (!pdFastSection) {
        return;
    }
    const pdFastItems = pdFastSection.querySelectorAll(".pd-ind-fast-highlight,.pd-ind-fast-status,.pd-ind-fast-float");
    const pdFastObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("pd-ind-fast-visible");
                pdFastObserver.unobserve(entry.target);
            }
        });
    }, { threshold: .15 });
    pdFastItems.forEach(function (item) {
        pdFastObserver.observe(item);
    });
});
/*--- Fast Delivery Experience Section End ---*/

/*--- Customer Reviews Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdReviewCards = document.querySelectorAll(".pd-ind-reviews-card");
    const pdReviewFeatured = document.querySelector(".pd-ind-reviews-featured-quote p");
    const pdReviewFeaturedName = document.querySelector(".pd-ind-reviews-user strong");
    const pdReviewFeaturedAvatar = document.querySelector(".pd-ind-reviews-avatar");
    const pdReviewFeaturedBottom = document.querySelector(".pd-ind-reviews-featured-bottom");
    const pdReviewData = [
        {
            name: "Sneha K.",
            initials: "SK",
            review: "“Very easy to order and the delivery was much faster than I expected. The entire process was smooth from start to finish.”",
            date: "Recent Review",
            message: "Loved the experience"
        },
        {
            name: "Manoj K.",
            initials: "MK",
            review: "“The prescription upload process is simple and the service feels very professional. I would definitely use it again.”",
            date: "Recent Review",
            message: "Highly Recommended"
        },
        {
            name: "Nisha P.",
            initials: "NP",
            review: "“I love how convenient it is to get my regular medicines without visiting a pharmacy. It saves so much time.”",
            date: "Recent Review",
            message: "Very Convenient"
        },
        {
            name: "Vijay K.",
            initials: "VK",
            review: "“Everything from selecting medicines to receiving the order was straightforward. Great experience overall.”",
            date: "Recent Review",
            message: "Great Service"
        }
    ];
    pdReviewCards.forEach(function (card, index) {
        card.addEventListener("click", function () {
            pdReviewCards.forEach(function (item) { item.classList.remove("pd-ind-reviews-card-active"); });
            card.classList.add("pd-ind-reviews-card-active");
            if (pdReviewFeatured) {
                pdReviewFeatured.style.opacity = "0";
                pdReviewFeatured.style.transform = "translateY(8px)";
                setTimeout(function () {
                    pdReviewFeatured.textContent = pdReviewData[index].review;
                    pdReviewFeatured.style.opacity = "1";
                    pdReviewFeatured.style.transform = "translateY(0)";
                }, 180);
            }
            if (pdReviewFeaturedName) {
                pdReviewFeaturedName.textContent = pdReviewData[index].name;
            }
            if (pdReviewFeaturedAvatar) {
                pdReviewFeaturedAvatar.textContent = pdReviewData[index].initials;
            }
            if (pdReviewFeaturedBottom) {
                pdReviewFeaturedBottom.innerHTML = '<span><i class="bi bi-calendar3"></i> ' + pdReviewData[index].date + '</span><span><i class="bi bi-heart-fill"></i> ' + pdReviewData[index].message + '</span>';
            }
        });
    });
});
/*--- Customer Reviews Section End ---*/

/*--- Final CTA Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdFinalCtaPrimary = document.querySelector(".pd-ind-final-cta-primary");
    const pdFinalCtaSecondary = document.querySelector(".pd-ind-final-cta-secondary");
    const pdFinalCtaBox = document.querySelector(".pd-ind-final-cta-box");
    const pdFinalCtaCapsules = document.querySelectorAll(".pd-ind-final-cta-capsule");
    if (pdFinalCtaPrimary) {
        pdFinalCtaPrimary.addEventListener("mouseenter", function () {
            if (pdFinalCtaBox) { pdFinalCtaBox.style.transform = "rotate(0deg) scale(1.03)"; }
        });
        pdFinalCtaPrimary.addEventListener("mouseleave", function () {
            if (pdFinalCtaBox) { pdFinalCtaBox.style.transform = ""; }
        });
    }
    if (pdFinalCtaSecondary) {
        pdFinalCtaSecondary.addEventListener("mouseenter", function () {
            pdFinalCtaCapsules.forEach(function (item) { item.style.animationPlayState = "paused"; });
        });
        pdFinalCtaSecondary.addEventListener("mouseleave", function () {
            pdFinalCtaCapsules.forEach(function (item) { item.style.animationPlayState = "running"; });
        });
    }
});
/*--- Final CTA Section End ---*/