/*--- Client Prescription Search ---*/
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("pdPrsSearch");
    const filterSelect = document.getElementById("pdPrsFilter");
    const prescriptionCards = document.querySelectorAll(".pd-prs-card");
    function filterPrescriptions() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const filterValue = filterSelect.value;
        prescriptionCards.forEach(function (card) {
            const text = card.textContent.toLowerCase();
            const status = card.getAttribute("data-status");
            const searchMatch = text.includes(searchValue);
            const filterMatch = filterValue === "all" || status === filterValue;
            card.classList.toggle("pd-prs-hidden", !(searchMatch && filterMatch));
        });
    }
    if (searchInput) {
        searchInput.addEventListener("input", filterPrescriptions);
    }
    if (filterSelect) {
        filterSelect.addEventListener("change", filterPrescriptions);
    }
});
/*--- Prescription View Buttons ---*/
document.querySelectorAll(".pd-prs-view-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = this.closest(".pd-prs-card");
        const prescription = card.querySelector(".pd-prs-card-title h3");
        if (prescription) {
            window.location.href = "404.html";
        }
    });
});

document.querySelectorAll(".pd-prs-more-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = this.closest(".pd-prs-card");
        const prescription = card.querySelector(".pd-prs-card-title h3");
        if (prescription) {
            window.location.href = "404.html";
        }
    });
});