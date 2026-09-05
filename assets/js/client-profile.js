/*--- Client Profile Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    /*--- Get Stored User ---*/
    const pdStoredUser = JSON.parse(localStorage.getItem("pdUserProfile") || "null");
    /*--- Get Stored Values ---*/
    const pdName = localStorage.getItem("pdRegisteredName") || pdStoredUser?.name || "Client";
    const pdPhone = localStorage.getItem("pdRegisteredPhone") || pdStoredUser?.phone || "Not available";
    const pdEmail = localStorage.getItem("pdRememberedEmail") || (pdDshUser ? pdLoginEmail : "Not available");
    const pdRole = localStorage.getItem("pdRegisteredRole") || pdStoredUser?.role || "client";
    /*--- Display Name ---*/
    const pdPrfName = document.getElementById("pdPrfName");
    const pdPrfFullName = document.getElementById("pdPrfFullName");
    if (pdPrfName) {
        pdPrfName.textContent = pdName;
    }
    if (pdPrfFullName) {
        pdPrfFullName.textContent = pdName;
    }
    /*--- Display Email ---*/
    const pdPrfEmail = document.getElementById("pdPrfEmail");
    const pdPrfEmailAddress = document.getElementById("pdPrfEmailAddress");
    const pdPrfRegisteredEmail = document.getElementById("pdPrfRegisteredEmail");
    if (pdPrfEmail) {
        pdPrfEmail.textContent = pdEmail;
    }
    if (pdPrfEmailAddress) {
        pdPrfEmailAddress.textContent = pdEmail;
    }
    if (pdPrfRegisteredEmail) {
        pdPrfRegisteredEmail.textContent = pdEmail;
    }
    /*--- Display Phone ---*/
    const pdPrfPhone = document.getElementById("pdPrfPhone");
    if (pdPrfPhone) {
        pdPrfPhone.textContent = pdPhone ? "+91 " + pdPhone : "Not available";
    }
    /*--- Display Role ---*/
    const pdRoleName = pdRole.charAt(0).toUpperCase() + pdRole.slice(1);
    const pdPrfRole = document.getElementById("pdPrfRole");
    const pdPrfAccountType = document.getElementById("pdPrfAccountType");
    const pdPrfSecurityRole = document.getElementById("pdPrfSecurityRole");
    if (pdPrfRole) {
        pdPrfRole.textContent = pdRoleName + " Account";
    }
    if (pdPrfAccountType) {
        pdPrfAccountType.textContent = pdRoleName;
    }
    if (pdPrfSecurityRole) {
        pdPrfSecurityRole.textContent = pdRoleName;
    }
    /*--- Display Dashboard Email ---*/
    const pdDshTopbarEmail = document.getElementById("pdDshTopbarEmail");
    const pdDshSidebarEmail = document.getElementById("pdDshSidebarEmail");
    if (pdDshTopbarEmail) {
        pdDshTopbarEmail.textContent = pdEmail;
    }
    if (pdDshSidebarEmail) {
        pdDshSidebarEmail.textContent = pdEmail;
    }
    /*--- Login Status ---*/
    const pdPrfLoginStatus = document.getElementById("pdPrfLoginStatus");
    const pdLoggedIn = localStorage.getItem("pdLoggedIn");
    if (pdPrfLoginStatus) {
        pdPrfLoginStatus.textContent = pdLoggedIn === "true" ? "Active Session" : "Not Signed In";
    }
    /*--- Protect Client Profile ---*/
    if (localStorage.getItem("pdLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }
    /*--- Protect Client Role ---*/
    if (localStorage.getItem("pdLoggedInRole") !== "client") {
        window.location.href = "login.html";
        return;
    }
});
/*--- Client Profile End ---*/