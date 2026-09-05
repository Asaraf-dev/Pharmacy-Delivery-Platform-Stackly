/*--- Medicine Product Cards Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    /*--- Medicine Data ---*/
    const pdMedProducts = [
        { id: 1, name: "Paracetamol 500mg Tablets", category: "Pain Relief", brand: "HealCare", price: 45, oldPrice: 55, rating: 4.8, stock: true, badge: "Popular", image: "assets/images/medicine-paracetamol.webp" },
        { id: 2, name: "Vitamin D3 1000 IU Capsules", category: "Vitamins", brand: "NutriHealth", price: 120, oldPrice: 145, rating: 4.9, stock: true, badge: "Best Seller", image: "assets/images/medicine-vitamin.webp" },
        { id: 3, name: "Cough Relief Syrup", category: "Cold & Cough", brand: "CarePlus", price: 95, oldPrice: 115, rating: 4.7, stock: true, badge: "Popular", image: "assets/images/medicine-cough.webp" },
        { id: 4, name: "Antacid Digestive Tablets", category: "Digestive Care", brand: "WellLife", price: 75, oldPrice: 90, rating: 4.6, stock: true, badge: "", image: "assets/images/antacid.webp" },
        { id: 5, name: "Complete First Aid Kit", category: "First Aid", brand: "SafeAid", price: 399, oldPrice: 449, rating: 4.9, stock: true, badge: "Featured", image: "assets/images/medicine-first-aid.webp" },
        { id: 6, name: "Ibuprofen 400mg Tablets", category: "Pain Relief", brand: "MedCare", price: 85, oldPrice: 99, rating: 4.7, stock: true, badge: "", image: "assets/images/ibuprofen.webp" },
        { id: 7, name: "Multivitamin Daily Capsules", category: "Vitamins", brand: "VitaLife", price: 249, oldPrice: 299, rating: 4.8, stock: true, badge: "Best Seller", image: "assets/images/multivitamin.webp" },
        { id: 8, name: "Cold & Flu Relief Tablets", category: "Cold & Cough", brand: "CarePlus", price: 110, oldPrice: 129, rating: 4.5, stock: false, badge: "", image: "assets/images/cold-flu.webp" },
        { id: 9, name: "ORS Electrolyte Powder", category: "Digestive Care", brand: "HydraCare", price: 35, oldPrice: 40, rating: 4.8, stock: true, badge: "", image: "assets/images/ors.webp" },
        { id: 10, name: "Antiseptic First Aid Solution", category: "First Aid", brand: "SafeAid", price: 85, oldPrice: 99, rating: 4.7, stock: true, badge: "", image: "assets/images/antiseptic.webp" },
        { id: 11, name: "Calcium + Vitamin D Tablets", category: "Vitamins", brand: "NutriHealth", price: 180, oldPrice: 220, rating: 4.8, stock: true, badge: "", image: "assets/images/calcium.webp" },
        { id: 12, name: "Muscle Pain Relief Gel", category: "Pain Relief", brand: "HealCare", price: 135, oldPrice: 160, rating: 4.6, stock: true, badge: "", image: "assets/images/pain-gel.webp" }
    ];
    /*--- DOM Elements ---*/
    const pdMedGrid = document.getElementById("pdMedProductsGrid");
    const pdMedSearch = document.getElementById("pdMedSearchInput");
    const pdMedSearchClear = document.getElementById("pdMedSearchClear");
    const pdMedSort = document.getElementById("pdMedSortSelect");
    const pdMedResultCount = document.getElementById("pdMedResultCount");
    const pdMedNoResults = document.getElementById("pdMedNoResults");
    const pdMedNoResultsReset = document.getElementById("pdMedNoResultsReset");
    const pdMedFilterToggle = document.getElementById("pdMedFilterToggle");
    const pdMedFilterSidebar = document.getElementById("pdMedFilterSidebar");
    const pdMedFilterClose = document.getElementById("pdMedFilterClose");
    const pdMedClearFilters = document.getElementById("pdMedClearFilters");
    const pdMedFilterCount = document.getElementById("pdMedFilterCount");
    const pdMedStockOnly = document.getElementById("pdMedStockOnly");
    const pdMedMinPrice = document.getElementById("pdMedMinPrice");
    const pdMedMaxPrice = document.getElementById("pdMedMaxPrice");
    const pdMedMinPriceValue = document.getElementById("pdMedMinPriceValue");
    const pdMedMaxPriceValue = document.getElementById("pdMedMaxPriceValue");
    if (!pdMedGrid) { return; }
    /*--- Get Cart ---*/
    function pdGetCart() {
        try {
            return JSON.parse(localStorage.getItem("pdCart")) || [];
        } catch (error) {
            return [];
        }
    }
    /*--- Save Cart ---*/
    function pdSaveCart(cart) {
        localStorage.setItem("pdCart", JSON.stringify(cart));
    }
    /*--- Product HTML ---*/
    function pdCreateProductCard(product) {
        const pdStockClass = product.stock ? "in-stock" : "out-stock";
        const pdStockText = product.stock ? "In Stock" : "Out of Stock";
        const pdBadge = product.badge ? `<span class="pd-med-product-badge">${product.badge}</span>` : "";
        return `<div class="col-xl-4 col-md-6 pd-med-product-card">
<div class="pd-med-product-inner">
<div class="pd-med-product-image-wrap">
${pdBadge}
<button type="button" class="pd-med-product-wishlist" aria-label="Add ${product.name} to wishlist"><i class="bi bi-heart"></i></button>
<img class="pd-med-product-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/medicine-placeholder.webp'">
</div>
<div class="pd-med-product-content">
<span class="pd-med-product-category">${product.category}</span>
<h3 class="pd-med-product-name">${product.name}</h3>
<div class="pd-med-product-meta">
<span>${product.brand}</span>
<span>•</span>
<span class="pd-med-product-rating"><i class="bi bi-star-fill"></i>${product.rating}</span>
</div>
<div class="pd-med-product-price-row">
<div class="pd-med-product-price"><strong>₹${product.price}</strong><del>₹${product.oldPrice}</del></div>
<button type="button" class="pd-med-featured-cart ${!product.stock ? "disabled" : ""}" data-product-id="${product.id}" ${!product.stock ? "disabled" : ""}><i class="bi bi-bag-plus"></i><span>${product.stock ? "Add" : "Unavailable"}</span></button>
</div>
<div class="pd-med-stock ${pdStockClass}"><i class="bi bi-circle-fill"></i><span>${pdStockText}</span></div>
</div>
</div>
</div>`;
    }
    /*--- Render Products ---*/
    function pdRenderProducts(products) {
        pdMedGrid.innerHTML = "";
        pdMedNoResults.classList.remove("show");
        pdMedResultCount.textContent = products.length;
        if (!products.length) {
            pdMedNoResults.classList.add("show");
            return;
        }
        products.forEach(function (product) {
            pdMedGrid.insertAdjacentHTML("beforeend", pdCreateProductCard(product));
        });
    }
    /*--- Get Selected Categories ---*/
    function pdGetCategories() {
        return Array.from(document.querySelectorAll(".pd-med-category:checked")).map(function (item) { return item.value; });
    }
    /*--- Apply Filters ---*/
    function pdApplyFilters() {
        const pdSearchValue = (pdMedSearch?.value || "").trim().toLowerCase();
        const pdCategories = pdGetCategories();
        const pdMin = Number(pdMedMinPrice?.value || 0);
        const pdMax = Number(pdMedMaxPrice?.value || 1000);
        const pdStock = pdMedStockOnly?.checked || false;
        let pdFiltered = pdMedProducts.filter(function (product) {
            const pdSearchMatch = !pdSearchValue || product.name.toLowerCase().includes(pdSearchValue) || product.brand.toLowerCase().includes(pdSearchValue) || product.category.toLowerCase().includes(pdSearchValue);
            const pdCategoryMatch = !pdCategories.length || pdCategories.includes(product.category);
            const pdPriceMatch = product.price >= pdMin && product.price <= pdMax;
            const pdStockMatch = !pdStock || product.stock;
            return pdSearchMatch && pdCategoryMatch && pdPriceMatch && pdStockMatch;
        });
        /*--- Sort Products ---*/
        const pdSortValue = pdMedSort?.value || "default";
        if (pdSortValue === "low") { pdFiltered.sort(function (a, b) { return a.price - b.price; }); }
        if (pdSortValue === "high") { pdFiltered.sort(function (a, b) { return b.price - a.price; }); }
        if (pdSortValue === "name") { pdFiltered.sort(function (a, b) { return a.name.localeCompare(b.name); }); }
        if (pdSortValue === "rating") { pdFiltered.sort(function (a, b) { return b.rating - a.rating; }); }
        pdRenderProducts(pdFiltered);
        pdUpdateFilterCount();
        if (pdMedSearchClear) { pdMedSearchClear.classList.toggle("show", pdSearchValue.length > 0); }
    }
    /*--- Filter Count ---*/
    function pdUpdateFilterCount() {
        let pdCount = document.querySelectorAll(".pd-med-category:checked").length;
        if (pdMedStockOnly?.checked) { pdCount++; }
        if (Number(pdMedMinPrice?.value) !== 0) { pdCount++; }
        if (Number(pdMedMaxPrice?.value) !== 1000) { pdCount++; }
        if (pdMedFilterCount) {
            pdMedFilterCount.textContent = pdCount;
            pdMedFilterCount.classList.toggle("show", pdCount > 0);
        }
    }
    /*--- Cart Count Update ---*/
    function pdUpdateCartCount() {
        const pdCart = pdGetCart();
        const pdTotal = pdCart.reduce(function (total, item) {
            return total + Number(item.quantity || 1);
        }, 0);
        document.querySelectorAll(".pd-nav-navbar-cart-count").forEach(function (element) {
            element.textContent = pdTotal;
        });
        document.querySelectorAll(".pd-nav-navbar-mobile-cart-content strong").forEach(function (element) {
            element.textContent = pdTotal + " " + (pdTotal === 1 ? "Item" : "Items");
        });
    }
    /*--- Add To Cart ---*/
    function pdAddToCart(productId, button) {
        const pdProduct = pdMedProducts.find(function (product) { return product.id === Number(productId); });
        if (!pdProduct || !pdProduct.stock) { return; }
        let pdCart = pdGetCart();
        const pdExisting = pdCart.find(function (item) { return Number(item.id) === pdProduct.id; });
        if (pdExisting) {
            pdExisting.quantity = Number(pdExisting.quantity || 1) + 1;
        } else {
            pdCart.push({ id: pdProduct.id, name: pdProduct.name, category: pdProduct.category, brand: pdProduct.brand, price: pdProduct.price, oldPrice: pdProduct.oldPrice, image: pdProduct.image, quantity: 1 });
        }
        pdSaveCart(pdCart);
        pdUpdateCartCount();
        if (button) {
            button.classList.add("added");
            button.innerHTML = '<i class="bi bi-check2"></i><span>Added</span>';
            setTimeout(function () {
                button.classList.remove("added");
                button.innerHTML = '<i class="bi bi-bag-plus"></i><span>Add</span>';
            }, 900);
        }
    }
    /*--- Product Button Events ---*/
    pdMedGrid.addEventListener("click", function (event) {
        const pdCartButton = event.target.closest(".pd-med-featured-cart");
        if (pdCartButton && !pdCartButton.disabled) {
            pdAddToCart(pdCartButton.dataset.productId, pdCartButton);
        }
        const pdWishlistButton = event.target.closest(".pd-med-product-wishlist");
        if (pdWishlistButton) {
            pdWishlistButton.classList.toggle("active");
            const pdIcon = pdWishlistButton.querySelector("i");
            if (pdIcon) { pdIcon.className = pdWishlistButton.classList.contains("active") ? "bi bi-heart-fill" : "bi bi-heart"; }
        }
    });
    /*--- Search ---*/
    if (pdMedSearch) {
        pdMedSearch.addEventListener("input", pdApplyFilters);
    }
    if (pdMedSearchClear) {
        pdMedSearchClear.addEventListener("click", function () {
            pdMedSearch.value = "";
            pdApplyFilters();
            pdMedSearch.focus();
        });
    }
    /*--- Sorting ---*/
    if (pdMedSort) {
        pdMedSort.addEventListener("change", pdApplyFilters);
    }

    /*--- Category Filters ---*/
    document.querySelectorAll(".pd-med-category").forEach(function (input) {
        input.addEventListener("change", pdApplyFilters);
    });
    /*--- Price Filters ---*/
    if (pdMedMinPrice) {
        pdMedMinPrice.addEventListener("input", function () {
            let pdMin = Number(pdMedMinPrice.value);
            let pdMax = Number(pdMedMaxPrice.value);
            if (pdMin > pdMax) { pdMedMaxPrice.value = pdMin; }
            pdMedMinPriceValue.textContent = pdMedMinPrice.value;
            pdMedMaxPriceValue.textContent = pdMedMaxPrice.value;
            pdApplyFilters();
        });
    }
    if (pdMedMaxPrice) {
        pdMedMaxPrice.addEventListener("input", function () {
            let pdMin = Number(pdMedMinPrice.value);
            let pdMax = Number(pdMedMaxPrice.value);
            if (pdMax < pdMin) { pdMedMinPrice.value = pdMax; }
            pdMedMinPriceValue.textContent = pdMedMinPrice.value;
            pdMedMaxPriceValue.textContent = pdMedMaxPrice.value;
            pdApplyFilters();
        });
    }
    /*--- Stock Filter ---*/
    if (pdMedStockOnly) {
        pdMedStockOnly.addEventListener("change", pdApplyFilters);
    }
    /*--- Clear Filters ---*/
    function pdResetMedicineFilters() {
        if (pdMedSearch) { pdMedSearch.value = ""; }
        document.querySelectorAll(".pd-med-category").forEach(function (input) { input.checked = false; });
        if (pdMedStockOnly) { pdMedStockOnly.checked = false; }
        if (pdMedMinPrice) { pdMedMinPrice.value = 0; }
        if (pdMedMaxPrice) { pdMedMaxPrice.value = 1000; }
        if (pdMedMinPriceValue) { pdMedMinPriceValue.textContent = "0"; }
        if (pdMedMaxPriceValue) { pdMedMaxPriceValue.textContent = "1000"; }
        if (pdMedSort) { pdMedSort.value = "default"; }
        pdApplyFilters();
    }
    if (pdMedClearFilters) {
        pdMedClearFilters.addEventListener("click", pdResetMedicineFilters);
    }
    if (pdMedNoResultsReset) {
        pdMedNoResultsReset.addEventListener("click", pdResetMedicineFilters);
    }
    /*--- Mobile Filter ---*/
    if (pdMedFilterToggle) {
        pdMedFilterToggle.addEventListener("click", function () {
            pdMedFilterSidebar.classList.add("show");
            document.body.classList.add("pd-med-filter-open");
        });
    }
    if (pdMedFilterClose) {
        pdMedFilterClose.addEventListener("click", function () {
            pdMedFilterSidebar.classList.remove("show");
            document.body.classList.remove("pd-med-filter-open");
        });
    }
    /*--- Cart Count Initial Sync ---*/
    pdUpdateCartCount();
    /*--- Initial Render ---*/
    pdApplyFilters();
    /*--- Storage Sync ---*/
    window.addEventListener("storage", function (event) {
        if (event.key === "pdCart") { pdUpdateCartCount(); }
    });
});
/*--- Medicine Product Cards End ---*/

/*--- Why Order Medicines From Us Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdMedWhyCards=document.querySelectorAll(".pd-med-why-card");
pdMedWhyCards.forEach(function(card){
card.addEventListener("click",function(){
pdMedWhyCards.forEach(function(item){
item.classList.remove("pd-med-why-card-active");
});
card.classList.add("pd-med-why-card-active");
});
});
/*--- Why Section Visual Interaction ---*/
const pdMedWhyVisual=document.querySelector(".pd-med-why-visual");
const pdMedWhyFloats=document.querySelectorAll(".pd-med-why-float");
if(pdMedWhyVisual){
pdMedWhyVisual.addEventListener("mousemove",function(event){
const rect=pdMedWhyVisual.getBoundingClientRect();
const x=(event.clientX-rect.left)/rect.width-.5;
const y=(event.clientY-rect.top)/rect.height-.5;
pdMedWhyFloats.forEach(function(item,index){
const strength=index===0?8:6;
item.style.transform="translate("+x*strength+"px,"+y*strength+"px)";
});
});
pdMedWhyVisual.addEventListener("mouseleave",function(){
pdMedWhyFloats.forEach(function(item){
item.style.transform="";
});
});
}
});
/*--- Why Order Medicines From Us Section End ---*/

/*--- Fast Delivery Strip Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const pdDeliveryStrip=document.querySelector(".pd-med-delivery-strip");
const pdDeliveryPoints=document.querySelectorAll(".pd-med-delivery-strip-point");
if(!pdDeliveryStrip){
return;
}
pdDeliveryPoints.forEach(function(point){
point.addEventListener("mouseenter",function(){
pdDeliveryPoints.forEach(function(item){item.classList.remove("active");});
point.classList.add("active");
});
point.addEventListener("mouseleave",function(){
point.classList.remove("active");
});
});
});
/*--- Fast Delivery Strip End ---*/