/*--- Dashboard Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    /*--- Dashboard Elements ---*/
    const pdDshSidebar = document.getElementById("pdDshSidebar");
    const pdDshMenuToggle = document.getElementById("pdDshMenuToggle");
    const pdDshSidebarOverlay = document.getElementById("pdDshSidebarOverlay");
    const pdDshLogout = document.getElementById("pdDshLogout");
    const pdDshTopbarEmail = document.getElementById("pdDshTopbarEmail");
    const pdDshAccountEmail = document.getElementById("pdDshAccountEmail");
    const pdDshSidebarEmail = document.getElementById("pdDshSidebarEmail");
    const pdDshDashboardName = document.getElementById("pdDshDashboardName");
    const pdDshAccountPhone = document.getElementById("pdDshAccountPhone");
    /*--- Get User Data ---*/
    const pdDshUser = JSON.parse(localStorage.getItem("pdUserProfile") || "null");
    const pdDshEmail = localStorage.getItem("pdRememberedEmail") || (pdDshUser ? pdLoginEmail : "");
    const pdDshNum = localStorage.getItem("pdRegisteredPhone") || (pdDshUser ? pdDshUser.phone : "");
    const pdDshRole = localStorage.getItem("pdLoggedInRole") || (pdDshUser ? pdDshUser.role : "");
    /*--- Display Email ---*/
    if (pdDshTopbarEmail) {
        pdDshTopbarEmail.textContent = pdDshEmail || "Guest";
    }
    if (pdDshSidebarEmail) {
        pdDshSidebarEmail.textContent = pdDshEmail || "Guest";
    }
    if(pdDshAccountEmail){
        pdDshAccountEmail.textContent = pdDshEmail || "Client@gmail.com";
    }
     if(pdDshAccountPhone){
        pdDshAccountPhone.textContent = pdDshNum || "None";
    }
    /*--- Dashboard Name ---*/
    if (pdDshDashboardName) {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        if (currentPage === "admin-dashboard.html" ) {
            pdDshDashboardName.textContent = "Admin Dashboard";
        }else if (currentPage == "client-orders.html"){
            pdDshDashboardName.textContent = "My Orders";
        }else if (currentPage == "client-prescription.html"){
            pdDshDashboardName.textContent = "Upload Prescription";
        }else if (currentPage == "client-profile.html"){
            pdDshDashboardName.textContent = "My Profile";
        }
         else if (currentPage === "client-dashboard.html") {
            pdDshDashboardName.textContent = "Client Dashboard";
        } else {
            pdDshDashboardName.textContent = "Dashboard";
        }
    }
    /*--- Active Navigation ---*/
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".pd-dsh-sidebar-link[data-page]").forEach(function (link) {
        const linkPage = link.getAttribute("data-page");
        link.classList.toggle("active", linkPage === currentPage);
    });
    /*--- Sidebar Open ---*/
    function pdDshOpenSidebar() {
        if (pdDshSidebar) {
            pdDshSidebar.classList.add("pd-dsh-sidebar-open");
        }
        if (pdDshSidebarOverlay) {
            pdDshSidebarOverlay.classList.add("pd-dsh-overlay-show");
        }
        document.body.classList.add("pd-dsh-menu-active");
    }
    /*--- Sidebar Close ---*/
    function pdDshCloseSidebar() {
        if (pdDshSidebar) {
            pdDshSidebar.classList.remove("pd-dsh-sidebar-open");
        }
        if (pdDshSidebarOverlay) {
            pdDshSidebarOverlay.classList.remove("pd-dsh-overlay-show");
        }
        document.body.classList.remove("pd-dsh-menu-active");
    }
    /*--- Mobile Tablet Menu ---*/
    if (pdDshMenuToggle) {
        pdDshMenuToggle.addEventListener("click", function () {
            if (pdDshSidebar && pdDshSidebar.classList.contains("pd-dsh-sidebar-open")) {
                pdDshCloseSidebar();
            } else {
                pdDshOpenSidebar();
            }
        });
    }
    /*--- Overlay Close ---*/
    if (pdDshSidebarOverlay) {
        pdDshSidebarOverlay.addEventListener("click", function () {
            pdDshCloseSidebar();
        });
    }
    /*--- Close Menu On Navigation ---*/
    document.querySelectorAll(".pd-dsh-sidebar-link[href]").forEach(function (link) {
        link.addEventListener("click", function () {
            pdDshCloseSidebar();
        });
    });
    /*--- Escape Close ---*/
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            pdDshCloseSidebar();
        }
    });
    /*--- Logout ---*/
    if (pdDshLogout) {
        pdDshLogout.addEventListener("click", function () {
            localStorage.removeItem("pdLoggedIn");
            localStorage.removeItem("pdLoggedInRole");
            window.location.href = "login.html";
        });
    }
    /*--- Dashboard Authentication Guard ---*/
    if (!localStorage.getItem("pdLoggedIn")) {
        window.location.href = "login.html";
        return;
    }
    /*--- Role Guard ---*/
    if (pdDshRole) {
        if (currentPage === "admin-dashboard.html" && pdDshRole !== "admin") {
            window.location.href = "client-dashboard.html";
            return;
        }
        if (currentPage === "client-dashboard.html" && pdDshRole !== "client") {
            window.location.href = "admin-dashboard.html";
            return;
        }
    }
    /*--- Dashboard End ---*/
});