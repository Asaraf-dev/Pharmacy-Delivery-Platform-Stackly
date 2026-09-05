/*--- Admin Medicines Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdAdminMedicinesSearch = document.getElementById("pdAdminMedicinesSearch");
    const pdAdminMedicinesCategory = document.getElementById("pdAdminMedicinesCategory");
    const pdAdminMedicinesStock = document.getElementById("pdAdminMedicinesStock");
    const pdAdminMedicinesClear = document.getElementById("pdAdminMedicinesClear");
    const pdAdminMedicinesRows = Array.from(document.querySelectorAll(".pd-adm-med-row"));
    const pdAdminMedicinesCount = document.getElementById("pdAdminMedicinesCount");
    const pdAdminMedicinesTotal = document.getElementById("pdAdminMedicinesTotal");
    const pdAdminMedicinesInStock = document.getElementById("pdAdminMedicinesInStock");
    const pdAdminMedicinesLowStock = document.getElementById("pdAdminMedicinesLowStock");
    const pdAdminMedicinesOutStock = document.getElementById("pdAdminMedicinesOutStock");
    const pdAdminMedicinesEmpty = document.getElementById("pdAdminMedicinesEmpty");
    const pdAdminMedicinesModal = document.getElementById("pdAdminMedicinesModal");
    const pdAdminMedicinesModalOverlay = document.getElementById("pdAdminMedicinesModalOverlay");
    const pdAdminMedicinesModalClose = document.getElementById("pdAdminMedicinesModalClose");
    const pdAdminMedicinesCancel = document.getElementById("pdAdminMedicinesCancel");
    const pdAdminMedicinesAdd = document.getElementById("pdAdminMedicinesAdd");
    const pdAdminMedicinesForm = document.getElementById("pdAdminMedicinesForm");
    const pdAdminMedicinesModalKicker = document.getElementById("pdAdminMedicinesModalKicker");
    const pdAdminMedicinesModalTitle = document.getElementById("pdAdminMedicinesModalTitle");
    const pdAdminMedicineName = document.getElementById("pdAdminMedicineName");
    const pdAdminMedicineCategory = document.getElementById("pdAdminMedicineCategoryForm");
    const pdAdminMedicinePrice = document.getElementById("pdAdminMedicinePrice");
    const pdAdminMedicineStock = document.getElementById("pdAdminMedicineStock");
    const pdAdminMedicinePack = document.getElementById("pdAdminMedicinePack");
    const pdAdminMedicinePrescription = document.getElementById("pdAdminMedicinePrescription");
    const pdAdminMedicinesEditId = document.getElementById("pdAdminMedicinesEditId");
    const pdAdminMedicinesTable = document.getElementById("pdAdminMedicinesTable");
    if (!pdAdminMedicinesTable) {
        return;
    }
    /*--- Update Statistics ---*/
    function pdAdminMedicinesUpdateStats() {
        let total = 0;
        let inStock = 0;
        let lowStock = 0;
        let outStock = 0;
        pdAdminMedicinesRows.forEach(function (row) {
            total++;
            if (row.dataset.stock === "in-stock") {
                inStock++;
            }
            if (row.dataset.stock === "low-stock") {
                lowStock++;
            }
            if (row.dataset.stock === "out-of-stock") {
                outStock++;
            }
        });
        if (pdAdminMedicinesTotal) {
            pdAdminMedicinesTotal.textContent = total;
        }
        if (pdAdminMedicinesInStock) {
            pdAdminMedicinesInStock.textContent = inStock;
        }
        if (pdAdminMedicinesLowStock) {
            pdAdminMedicinesLowStock.textContent = lowStock;
        }
        if (pdAdminMedicinesOutStock) {
            pdAdminMedicinesOutStock.textContent = outStock;
        }
    }
    /*--- Filter Medicines ---*/
    function pdAdminMedicinesFilter() {
        const search = (pdAdminMedicinesSearch?.value || "").trim().toLowerCase();
        const category = pdAdminMedicinesCategory?.value || "";
        const stock = pdAdminMedicinesStock?.value || "";
        let visible = 0;
        pdAdminMedicinesRows.forEach(function (row) {
            const name = (row.dataset.name || "").toLowerCase();
            const rowCategory = row.dataset.category || "";
            const rowStock = row.dataset.stock || "";
            const searchMatch = !search || name.includes(search);
            const categoryMatch = !category || rowCategory === category;
            const stockMatch = !stock || rowStock === stock;
            const show = searchMatch && categoryMatch && stockMatch;
            row.style.display = show ? "" : "none";
            if (show) {
                visible++;
            }
        });
        if (pdAdminMedicinesCount) {
            pdAdminMedicinesCount.textContent = visible + " Medicine" + (visible === 1 ? "" : "s");
        }
        if (pdAdminMedicinesEmpty) {
            pdAdminMedicinesEmpty.classList.toggle("show", visible === 0);
        }
    }
    /*--- Clear Filters ---*/
    if (pdAdminMedicinesClear) {
        pdAdminMedicinesClear.addEventListener("click", function () {
            if (pdAdminMedicinesSearch) {
                pdAdminMedicinesSearch.value = "";
            }
            if (pdAdminMedicinesCategory) {
                pdAdminMedicinesCategory.value = "";
            }
            if (pdAdminMedicinesStock) {
                pdAdminMedicinesStock.value = "";
            }
            pdAdminMedicinesFilter();
        });
    }
    /*--- Search and Filters ---*/
    [pdAdminMedicinesSearch, pdAdminMedicinesCategory, pdAdminMedicinesStock].forEach(function (element) {
        if (!element) {
            return;
        }
        element.addEventListener(element.tagName === "INPUT" ? "input" : "change", pdAdminMedicinesFilter);
    });
    /*--- Open Modal ---*/
    function pdAdminMedicinesOpenModal(editMode) {
        if (!pdAdminMedicinesModal) {
            return;
        }
        if (editMode) {
            pdAdminMedicinesModalKicker.textContent = "Edit Medicine";
            pdAdminMedicinesModalTitle.textContent = "Update Medicine";
        } else {
            pdAdminMedicinesModalKicker.textContent = "Add Medicine";
            pdAdminMedicinesModalTitle.textContent = "Add New Medicine";
        }
        pdAdminMedicinesModal.classList.add("show");
        document.body.classList.add("pd-adm-med-modal-open");
        setTimeout(function () {
            pdAdminMedicineName?.focus();
        }, 200);
    }
    /*--- Close Modal ---*/
    function pdAdminMedicinesCloseModal() {
        if (!pdAdminMedicinesModal) {
            return;
        }
        pdAdminMedicinesModal.classList.remove("show");
        document.body.classList.remove("pd-adm-med-modal-open");
    }
    /*--- Add Medicine ---*/
    if (pdAdminMedicinesAdd) {
        pdAdminMedicinesAdd.addEventListener("click", function () {
            pdAdminMedicinesForm?.reset();
            if (pdAdminMedicinesEditId) {
                pdAdminMedicinesEditId.value = "";
            }
            pdAdminMedicinesOpenModal(false);
        });
    }
    /*--- Close Buttons ---*/
    [pdAdminMedicinesModalClose, pdAdminMedicinesCancel, pdAdminMedicinesModalOverlay].forEach(function (element) {
        if (element) {
            element.addEventListener("click", pdAdminMedicinesCloseModal);
        }
    });
    /*--- Escape Modal ---*/
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            pdAdminMedicinesCloseModal();
        }
    });
    /*--- View Medicine ---*/
    document.querySelectorAll(".pd-adm-med-view").forEach(function (button) {
        button.addEventListener("click", function () {
            const row = this.closest(".pd-adm-med-row");
            if (!row) {
                return;
            }
            window.location.href = "client-dashboard.html";
        });
    });
    /*--- Edit Medicine ---*/
    document.querySelectorAll(".pd-adm-med-edit").forEach(function (button) {
        button.addEventListener("click", function () {
            const row = this.closest(".pd-adm-med-row");
            if (!row) {
                return;
            }
            if (pdAdminMedicinesEditId) {
                pdAdminMedicinesEditId.value = row.dataset.name;
            }
            pdAdminMedicineName.value = row.dataset.name || "";
            pdAdminMedicineCategory.value = row.dataset.category || "";
            pdAdminMedicinePrice.value = (row.dataset.price || "").replace(/[^\d.]/g, "");
            pdAdminMedicineStock.value = row.dataset.stockCount || "";
            pdAdminMedicinePack.value = row.querySelector(".pd-adm-med-product span")?.textContent || "";
            pdAdminMedicinePrescription.value = row.dataset.prescription || "No";
            pdAdminMedicinesOpenModal(true);
        });
    });
    /*--- Delete Medicine ---*/
    document.querySelectorAll(".pd-adm-med-delete").forEach(function (button) {
        button.addEventListener("click", function () {
            const row = this.closest(".pd-adm-med-row");
            if (!row) {
                return;
            }
            const medicineName = row.dataset.name || "this medicine";
            
            row.remove();
            const index = pdAdminMedicinesRows.indexOf(row);
            if (index > -1) {
                pdAdminMedicinesRows.splice(index, 1);
            }
            pdAdminMedicinesUpdateStats();
            pdAdminMedicinesFilter();
        });
    });
    /*--- Save Medicine ---*/
    if (pdAdminMedicinesForm) {
        pdAdminMedicinesForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!pdAdminMedicinesForm.checkValidity()) {
                pdAdminMedicinesForm.reportValidity();
                return;
            }
            const name = pdAdminMedicineName.value.trim();
            const category = pdAdminMedicineCategory.value;
            const price = pdAdminMedicinePrice.value;
            const stock = Number(pdAdminMedicineStock.value);
            const pack = pdAdminMedicinePack.value.trim();
            const prescription = pdAdminMedicinePrescription.value;
            let stockStatus = "in-stock";
            let stockText = "In Stock";
            if (stock === 0) {
                stockStatus = "out-of-stock";
                stockText = "Out of Stock";
            } else if (stock <= 20) {
                stockStatus = "low-stock";
                stockText = "Low Stock";
            }
            const oldName = pdAdminMedicinesEditId?.value || "";
            if (oldName) {
                const row = pdAdminMedicinesRows.find(function (item) {
                    return item.dataset.name === oldName;
                });
                if (row) {
                    row.dataset.name = name;
                    row.dataset.category = category;
                    row.dataset.price = "₹" + price;
                    row.dataset.stock = stockStatus;
                    row.dataset.stockCount = stock;
                    row.dataset.prescription = prescription;
                    row.dataset.updated = "05 Sep 2026";
                    const productName = row.querySelector(".pd-adm-med-product strong");
                    const productPack = row.querySelector(".pd-adm-med-product span");
                    const categoryElement = row.querySelector(".pd-adm-med-category");
                    const priceElement = row.querySelector(".pd-adm-med-price");
                    const stockElement = row.querySelector(".pd-adm-med-stock");
                    const stockSmall = row.querySelector(".pd-adm-med-stock-wrap small");
                    const prescriptionElement = row.querySelector(".pd-adm-med-prescription");
                    const dateElement = row.querySelector(".pd-adm-med-date");
                    if (productName) {
                        productName.textContent = name;
                    }
                    if (productPack) {
                        productPack.textContent = pack;
                    }
                    if (categoryElement) {
                        categoryElement.textContent = category;
                    }
                    if (priceElement) {
                        priceElement.textContent = "₹" + price;
                    }
                    if (stockElement) {
                        stockElement.textContent = stockText;
                        stockElement.className = "pd-adm-med-stock pd-adm-med-stock-" + stockStatus;
                    }
                    if (stockSmall) {
                        stockSmall.textContent = stock + " units";
                    }
                    if (prescriptionElement) {
                        prescriptionElement.textContent = prescription === "Yes" ? "Required" : "Not Required";
                        prescriptionElement.className = "pd-adm-med-prescription " + (prescription === "Yes" ? "yes" : "no");
                    }
                    if (dateElement) {
                        dateElement.textContent = "05 Sep 2026";
                    }
                }
            } else {
                const row = document.createElement("tr");
                row.className = "pd-adm-med-row";
                row.dataset.name = name;
                row.dataset.category = category;
                row.dataset.stock = stockStatus;
                row.dataset.price = "₹" + price;
                row.dataset.stockCount = stock;
                row.dataset.prescription = prescription;
                row.dataset.updated = "05 Sep 2026";
                row.innerHTML =
                    '<td><div class="pd-adm-med-product"><div class="pd-adm-med-product-image"><i class="bi bi-capsule"></i></div><div><strong>' + pdAdminMedicinesEscape(name) + '</strong><span>' + pdAdminMedicinesEscape(pack) + '</span></div></div></td>' +
                    '<td><span class="pd-adm-med-category">' + pdAdminMedicinesEscape(category) + '</span></td>' +
                    '<td><strong class="pd-adm-med-price">₹' + pdAdminMedicinesEscape(price) + '</strong></td>' +
                    '<td><div class="pd-adm-med-stock-wrap"><span class="pd-adm-med-stock pd-adm-med-stock-' + stockStatus + '">' + stockText + '</span><small>' + stock + ' units</small></div></td>' +
                    '<td><span class="pd-adm-med-prescription ' + (prescription === "Yes" ? "yes" : "no") + '">' + (prescription === "Yes" ? "Required" : "Not Required") + '</span></td>' +
                    '<td><span class="pd-adm-med-date">05 Sep 2026</span></td>' +
                    '<td><div class="pd-adm-med-actions"><button type="button" class="pd-adm-med-action pd-adm-med-view" title="View"><i class="bi bi-eye"></i></button><button type="button" class="pd-adm-med-action pd-adm-med-edit" title="Edit"><i class="bi bi-pencil"></i></button><button type="button" class="pd-adm-med-action pd-adm-med-delete" title="Delete"><i class="bi bi-trash3"></i></button></div></td>';
                pdAdminMedicinesTable.appendChild(row);
                pdAdminMedicinesRows.push(row);
                pdAdminMedicinesBindRow(row);
            }
            pdAdminMedicinesUpdateStats();
            pdAdminMedicinesFilter();
            pdAdminMedicinesCloseModal();
            pdAdminMedicinesForm.reset();
        });
    }
    /*--- Bind Dynamic Row Actions ---*/
    function pdAdminMedicinesBindRow(row) {
        const view = row.querySelector(".pd-adm-med-view");
        const edit = row.querySelector(".pd-adm-med-edit");
        const deleteButton = row.querySelector(".pd-adm-med-delete");
        if (view) {
            view.addEventListener("click", function () {
                window.location.href = "404.html";
            });
        }
        if (edit) {
            edit.addEventListener("click", function () {
                pdAdminMedicineName.value = row.dataset.name || "";
                pdAdminMedicineCategory.value = row.dataset.category || "";
                pdAdminMedicinePrice.value = (row.dataset.price || "").replace(/[^\d.]/g, "");
                pdAdminMedicineStock.value = row.dataset.stockCount || "";
                pdAdminMedicinePack.value = row.querySelector(".pd-adm-med-product span")?.textContent || "";
                pdAdminMedicinePrescription.value = row.dataset.prescription || "No";
                pdAdminMedicinesEditId.value = row.dataset.name || "";
                pdAdminMedicinesOpenModal(true);
            });
        }
        if (deleteButton) {
            deleteButton.addEventListener("click", function () {
                if (!confirm("Are you sure you want to delete " + (row.dataset.name || "this medicine") + "?")) {
                    return;
                }
                const index = pdAdminMedicinesRows.indexOf(row);
                row.remove();
                if (index > -1) {
                    pdAdminMedicinesRows.splice(index, 1);
                }
                pdAdminMedicinesUpdateStats();
                pdAdminMedicinesFilter();
            });
        }
    }
    /*--- Escape HTML ---*/
    function pdAdminMedicinesEscape(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character];
        });
    }
    /*--- Initial Setup ---*/
    pdAdminMedicinesRows.forEach(pdAdminMedicinesBindRow);
    pdAdminMedicinesUpdateStats();
    pdAdminMedicinesFilter();
});
/*--- Admin Medicines End ---*/