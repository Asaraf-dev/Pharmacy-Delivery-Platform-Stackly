/*--- Cart Page Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    /*--- Cart Storage ---*/
    function pdCartGet() {
        try {
            return JSON.parse(localStorage.getItem("pdCart")) || [];
        } catch (error) {
            return [];
        }
    }
    function pdCartSave(cart) {
        localStorage.setItem("pdCart", JSON.stringify(cart));
    }
    /*--- Cart Count ---*/
    function pdCartUpdateNavbar() {
        const cart = pdCartGet();
        const total = cart.reduce(function (sum, item) {
            return sum + Number(item.quantity || 1);
        }, 0);
        document.querySelectorAll(".pd-nav-navbar-cart-count").forEach(function (element) {
            element.textContent = total;
        });
        document.querySelectorAll(".pd-nav-navbar-mobile-cart-content strong").forEach(function (element) {
            element.textContent = total + " " + (total === 1 ? "Item" : "Items");
        });
        const heroCount = document.getElementById("pdCartHeroCount");
        if (heroCount) {
            heroCount.textContent = total;
        }
        const summaryCount = document.getElementById("pdCartSummaryCount");
        if (summaryCount) {
            summaryCount.textContent = total;
        }
    }
    /*--- Currency Formatter ---*/
    function pdCartFormatPrice(value) {
        return "₹" + Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    /*--- Product Price ---*/
    function pdCartGetPrice(item) {
        if (typeof item.price === "number") {
            return item.price;
        }
        const price = String(item.price || "0").replace(/[^\d.]/g, "");
        return Number(price) || 0;
    }
    /*--- Render Cart ---*/
    function pdCartRender() {
        const cart = pdCartGet();
        const container = document.getElementById("pdCartItems");
        const empty = document.getElementById("pdCartEmpty");
        const clearButton = document.getElementById("pdCartClearBtn");
        if (!container || !empty) {
            return;
        }
        container.innerHTML = "";
        if (cart.length === 0) {
            empty.classList.add("show");
            if (clearButton) {
                clearButton.style.display = "none";
            }
            pdCartUpdateSummary([]);
            pdCartUpdateNavbar();
            return;
        }
        empty.classList.remove("show");
        if (clearButton) {
            clearButton.style.display = "flex";
        }
        cart.forEach(function (item, index) {
            const quantity = Math.max(1, Number(item.quantity) || 1);
            const price = pdCartGetPrice(item);
            const oldPrice = item.oldPrice ? pdCartGetPrice({ price: item.oldPrice }) : 0;
            const total = price * quantity;
            const itemElement = document.createElement("div");
            itemElement.className = "pd-cart-item";
            itemElement.dataset.index = index;
            itemElement.innerHTML = '<div class="pd-cart-item-image"><img src="' + (item.image || "assets/images/medicine-placeholder.webp") + '" alt="' + (item.name || "Medicine") + '"></div><div class="pd-cart-item-info"><span class="pd-cart-item-category">' + (item.category || "Healthcare") + '</span><h3 class="pd-cart-item-name">' + (item.name || "Medicine") + '</h3><span class="pd-cart-item-brand">' + (item.brand || "Pharmacy Delivery") + '</span><div class="pd-cart-item-price"><strong class="pd-cart-item-current-price">' + pdCartFormatPrice(price) + '</strong>' + (oldPrice > price ? '<span class="pd-cart-item-old-price">' + pdCartFormatPrice(oldPrice) + '</span>' : "") + '</div></div><div class="pd-cart-item-actions"><div class="pd-cart-quantity"><button type="button" class="pd-cart-quantity-btn pd-cart-quantity-minus" aria-label="Decrease quantity"><i class="bi bi-dash"></i></button><span class="pd-cart-quantity-value">' + quantity + '</span><button type="button" class="pd-cart-quantity-btn pd-cart-quantity-plus" aria-label="Increase quantity"><i class="bi bi-plus"></i></button></div><strong class="pd-cart-item-total">' + pdCartFormatPrice(total) + '</strong><button type="button" class="pd-cart-remove" aria-label="Remove ' + (item.name || "medicine") + '"><i class="bi bi-trash3"></i></button></div>';
            container.appendChild(itemElement);
        });
        pdCartUpdateSummary(cart);
        pdCartUpdateNavbar();
    }
    /*--- Update Summary ---*/
    function pdCartUpdateSummary(cart) {
        let subtotal = 0;
        let itemCount = 0;
        cart.forEach(function (item) {
            const quantity = Math.max(1, Number(item.quantity) || 1);
            const price = pdCartGetPrice(item);
            subtotal += price * quantity;
            itemCount += quantity;
        });
        const delivery = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
        const discount = 0;
        const total = subtotal + delivery - discount;
        const subtotalElement = document.getElementById("pdCartSubtotal");
        const deliveryElement = document.getElementById("pdCartDelivery");
        const discountElement = document.getElementById("pdCartDiscount");
        const totalElement = document.getElementById("pdCartTotal");
        const countElement = document.getElementById("pdCartSummaryCount");
        if (subtotalElement) {
            subtotalElement.textContent = pdCartFormatPrice(subtotal);
        }
        if (deliveryElement) {
            deliveryElement.textContent = delivery === 0 && subtotal > 0 ? "FREE" : pdCartFormatPrice(delivery);
        }
        if (discountElement) {
            discountElement.textContent = "- " + pdCartFormatPrice(discount);
        }
        if (totalElement) {
            totalElement.textContent = pdCartFormatPrice(total);
        }
        if (countElement) {
            countElement.textContent = itemCount;
        }
    }
    /*--- Quantity Controls ---*/
    document.addEventListener("click", function (event) {
        const plusButton = event.target.closest(".pd-cart-quantity-plus");
        const minusButton = event.target.closest(".pd-cart-quantity-minus");
        const removeButton = event.target.closest(".pd-cart-remove");
        if (!plusButton && !minusButton && !removeButton) {
            return;
        }
        const itemElement = event.target.closest(".pd-cart-item");
        if (!itemElement) {
            return;
        }
        const index = Number(itemElement.dataset.index);
        const cart = pdCartGet();
        if (!cart[index]) {
            return;
        }
        if (plusButton) {
            cart[index].quantity = Number(cart[index].quantity || 1) + 1;
            pdCartSave(cart);
            pdCartRender();
        }
        if (minusButton) {
            cart[index].quantity = Math.max(1, Number(cart[index].quantity || 1) - 1);
            pdCartSave(cart);
            pdCartRender();
        }
        if (removeButton) {
            cart.splice(index, 1);
            pdCartSave(cart);
            pdCartRender();
        }
    });
    /*--- Clear Cart ---*/
    const clearButton = document.getElementById("pdCartClearBtn");
    if (clearButton) {
        clearButton.addEventListener("click", function () {
            const cart = pdCartGet();
            if (cart.length === 0) {
                return;
            }
            if (confirm("Are you sure you want to clear your cart?")) {
                localStorage.removeItem("pdCart");
                pdCartRender();
            }
        });
    }
    /*--- Checkout ---*/
    const checkoutButton = document.getElementById("pdCartCheckoutBtn");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            const cart = pdCartGet();
            if (cart.length === 0) {
                alert("Your cart is empty. Please add a medicine before checkout.");
                return;
            }
            window.location.href = "404.html";
        });
    }
    /*--- Cart Storage Synchronization ---*/
    window.addEventListener("storage", function (event) {
        if (event.key === "pdCart") {
            pdCartRender();
        }
    });
    /*--- Initial Render ---*/
    pdCartRender();
    /*--- Cart Page End ---*/
});