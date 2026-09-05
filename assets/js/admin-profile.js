/*--- Admin Profile Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdAdmProfileUser = JSON.parse(localStorage.getItem("pdUserProfile") || "null");
    const pdAdmProfileName = localStorage.getItem("pdRegisteredName") || pdAdmProfileUser?.name || "Admin";
    const pdAdmProfilePhone = localStorage.getItem("pdRegisteredPhone") || pdAdmProfileUser?.phone || "Not available";
    const pdAdmProfileEmail = localStorage.getItem("pdRememberedEmail") || (pdDshUser ? pdLoginEmail : "Not available");
    const pdAdmProfileRole = localStorage.getItem("pdRegisteredRole") || pdAdmProfileUser?.role || "admin";
    const pdAdmProfilePassword = localStorage.getItem("pdRegisteredPassword") || "";
    /*--- Profile Elements ---*/
    const pdAdmProfileNameElements = [
        document.getElementById("pdAdmProfileName"),
        document.getElementById("pdAdmProfileFullName")
    ];
    const pdAdmProfileEmailElements = [
        document.getElementById("pdAdmProfileEmail"),
        document.getElementById("pdAdmProfileDetailEmail"),
        document.getElementById("pdAdmProfileSecurityEmail"),
        document.getElementById("pdDshSidebarEmail"),
        document.getElementById("pdDshTopbarEmail")
    ];
    const pdAdmProfilePhoneElement = document.getElementById("pdAdmProfilePhone");
    const pdAdmProfileRoleElements = [
        document.getElementById("pdAdmProfileRole"),
        document.getElementById("pdAdmProfileDetailRole"),
        document.getElementById("pdAdmProfileSecurityRole")
    ];
    const pdAdmProfileRoleBadge = document.getElementById("pdAdmProfileRoleBadge");
    /*--- Display Name ---*/
    pdAdmProfileNameElements.forEach(function (element) {
        if (element) {
            element.textContent = pdAdmProfileName;
        }
    });
    /*--- Display Email ---*/
    pdAdmProfileEmailElements.forEach(function (element) {
        if (element) {
            element.textContent = pdAdmProfileEmail;
        }
    });
    /*--- Display Phone ---*/
    if (pdAdmProfilePhoneElement) {
        pdAdmProfilePhoneElement.textContent = pdAdmProfilePhone;
    }
    /*--- Display Role ---*/
    const pdAdmProfileRoleText = pdAdmProfileRole === "admin" ? "Administrator" : "Client";
    pdAdmProfileRoleElements.forEach(function (element) {
        if (element) {
            element.textContent = pdAdmProfileRoleText;
        }
    });
    if (pdAdmProfileRoleBadge) {
        pdAdmProfileRoleBadge.textContent = pdAdmProfileRoleText;
    }
    /*--- Display Password ---*/
    const pdAdmProfilePasswordElement = document.getElementById("pdAdmProfilePassword");
    const pdAdmProfilePasswordToggle = document.getElementById("pdAdmProfilePasswordToggle");
    if (pdAdmProfilePasswordElement) {
        pdAdmProfilePasswordElement.textContent = pdAdmProfilePassword ? "••••••••" : "Not available";
    }
    /*--- Password Toggle ---*/
    if (pdAdmProfilePasswordToggle && pdAdmProfilePasswordElement && pdAdmProfilePassword) {
        pdAdmProfilePasswordToggle.addEventListener("click", function () {
            const pdAdmProfilePasswordIcon = this.querySelector("i");
            if (pdAdmProfilePasswordElement.dataset.visible === "true") {
                pdAdmProfilePasswordElement.textContent = "••••••••";
                pdAdmProfilePasswordElement.dataset.visible = "false";
                this.setAttribute("aria-label", "Show password");
                if (pdAdmProfilePasswordIcon) {
                    pdAdmProfilePasswordIcon.classList.remove("bi-eye-slash");
                    pdAdmProfilePasswordIcon.classList.add("bi-eye");
                }
            } else {
                pdAdmProfilePasswordElement.textContent = pdAdmProfilePassword;
                pdAdmProfilePasswordElement.dataset.visible = "true";
                this.setAttribute("aria-label", "Hide password");
                if (pdAdmProfilePasswordIcon) {
                    pdAdmProfilePasswordIcon.classList.remove("bi-eye");
                    pdAdmProfilePasswordIcon.classList.add("bi-eye-slash");
                }
            }
        });
    }
    /*--- Logout ---*/
    const pdDshLogout = document.getElementById("pdDshLogout");
    if (pdDshLogout) {
        pdDshLogout.addEventListener("click", function () {
            localStorage.removeItem("pdLoggedIn");
            localStorage.removeItem("pdLoggedInRole");
            window.location.href = "login.html";
        });
    }
});
/*--- Admin Profile End ---*/