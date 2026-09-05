/*--- Authentication Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    /*--- Login Elements ---*/
    const pdLoginForm = document.getElementById("pdLoginForm");
    const pdLoginEmail = document.getElementById("pdLoginEmail");
    const pdLoginPassword = document.getElementById("pdLoginPassword");
    const pdLoginPasswordToggle = document.getElementById("pdLoginPasswordToggle");
    const pdLoginRemember = document.getElementById("pdLoginRemember");
    const pdLoginSubmit = document.getElementById("pdLoginSubmit");
    /*--- Register Elements ---*/
    const pdRegisterForm = document.getElementById("pdRegisterForm");
    const pdRegisterName = document.getElementById("pdRegisterName");
    const pdRegisterPhone = document.getElementById("pdRegisterPhone");
    const pdRegisterEmail = document.getElementById("pdRegisterEmail");
    const pdRegisterPassword = document.getElementById("pdRegisterPassword");
    const pdRegisterConfirmPassword = document.getElementById("pdRegisterConfirmPassword");
    const pdRegisterSubmit = document.getElementById("pdRegisterSubmit");
    /*--- Login Role Selection ---*/
    document.querySelectorAll('input[name="pdLoginRole"]').forEach(function (input) {
        input.addEventListener("change", function () {
            document.querySelectorAll('input[name="pdLoginRole"]').forEach(function (item) {
                item.closest(".pd-log-login-role-option")?.classList.remove("active");
            });
            this.closest(".pd-log-login-role-option")?.classList.add("active");
        });
    });
    /*--- Register Role Selection ---*/
    document.querySelectorAll('input[name="pdRegisterRole"]').forEach(function (input) {
        input.addEventListener("change", function () {
            document.querySelectorAll('input[name="pdRegisterRole"]').forEach(function (item) {
                item.closest(".pd-log-login-role-option")?.classList.remove("active");
            });
            this.closest(".pd-log-login-role-option")?.classList.add("active");
        });
    });
    /*--- Password Toggle ---*/
    function pdAuthPasswordToggle(button, input) {
        if (!button || !input) {
            return;
        }
        button.addEventListener("click", function () {
            const icon = button.querySelector("i");
            if (input.type === "password") {
                input.type = "text";
                if (icon) {
                    icon.classList.remove("bi-eye");
                    icon.classList.add("bi-eye-slash");
                }
                button.setAttribute("aria-label", "Hide password");
            } else {
                input.type = "password";
                if (icon) {
                    icon.classList.remove("bi-eye-slash");
                    icon.classList.add("bi-eye");
                }
                button.setAttribute("aria-label", "Show password");
            }
        });
    }
    pdAuthPasswordToggle(pdLoginPasswordToggle, pdLoginPassword);
    pdAuthPasswordToggle(document.getElementById("pdRegisterPasswordToggle"), pdRegisterPassword);
    pdAuthPasswordToggle(document.getElementById("pdRegisterConfirmPasswordToggle"), pdRegisterConfirmPassword);
    /*--- Register Name Validation ---*/
    if (pdRegisterName) {
        pdRegisterName.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z ]/g, "").replace(/\s{2,}/g, " ");
        });
        pdRegisterName.addEventListener("blur", function () {
            this.value = this.value.trim();
        });
    }
    /*--- Register Phone Validation ---*/
    if (pdRegisterPhone) {
        pdRegisterPhone.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
        });
    }
    /*--- Password Validation ---*/
    function pdAuthValidatePassword() {
        if (!pdRegisterPassword) {
            return true;
        }
        const value = pdRegisterPassword.value;
        const pdPasswordValid = value.length >= 8 && /[0-9]/.test(value) && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[^A-Za-z0-9]/.test(value);
        if (!pdPasswordValid) {
            pdRegisterPassword.setCustomValidity("Password must contain at least 8 characters, one number, one uppercase letter, one lowercase letter and one special character.");
            return false;
        }
        pdRegisterPassword.setCustomValidity("");
        return true;
    }
    /*--- Confirm Password Validation ---*/
    function pdAuthValidateConfirmPassword() {
        if (!pdRegisterConfirmPassword || !pdRegisterPassword) {
            return true;
        }
        if (pdRegisterConfirmPassword.value !== pdRegisterPassword.value) {
            pdRegisterConfirmPassword.setCustomValidity("Passwords do not match.");
            return false;
        }
        pdRegisterConfirmPassword.setCustomValidity("");
        return true;
    }
    /*--- Password Input Validation ---*/
    if (pdRegisterPassword) {
        pdRegisterPassword.addEventListener("input", function () {
            pdAuthValidatePassword();
            if (pdRegisterConfirmPassword && pdRegisterConfirmPassword.value) {
                pdAuthValidateConfirmPassword();
            }
        });
    }
    /*--- Confirm Password Input Validation ---*/
    if (pdRegisterConfirmPassword) {
        pdRegisterConfirmPassword.addEventListener("input", function () {
            pdAuthValidateConfirmPassword();
        });
    }
    /*--- Register Form ---*/
    if (pdRegisterForm) {
        pdRegisterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();
            /*--- Clear Previous Validation ---*/
            if (pdRegisterPassword) {
                pdRegisterPassword.setCustomValidity("");
            }
            if (pdRegisterConfirmPassword) {
                pdRegisterConfirmPassword.setCustomValidity("");
            }
            /*--- Browser Validation ---*/
            if (!pdRegisterForm.checkValidity()) {
                pdRegisterForm.reportValidity();
                return;
            }
            /*--- Password Validation ---*/
            if (!pdAuthValidatePassword()) {
                pdRegisterPassword.reportValidity();
                return;
            }
            /*--- Confirm Password Validation ---*/
            if (!pdAuthValidateConfirmPassword()) {
                pdRegisterConfirmPassword.reportValidity();
                return;
            }
            /*--- Selected Role ---*/
            const pdRegisterRole = document.querySelector('input[name="pdRegisterRole"]:checked');
            if (!pdRegisterRole) {
                return;
            }
            /*--- Store User Details ---*/
            const pdRegisterUser = {
                name: pdRegisterName.value.trim(),
                phone: pdRegisterPhone.value.trim(),
                email: pdRegisterEmail.value.trim(),
                role: pdRegisterRole.value
            };
            localStorage.setItem("pdUserProfile", JSON.stringify(pdRegisterUser));
            localStorage.setItem("pdRegisteredName", pdRegisterUser.name);
            localStorage.setItem("pdRegisteredPhone", pdRegisterUser.phone);
            localStorage.setItem("pdRegisteredEmail", pdRegisterUser.email);
            localStorage.setItem("pdRegisteredRole", pdRegisterUser.role);
            
            /*--- Store Password For Demo Login ---*/
            localStorage.setItem("pdRegisteredPassword", pdRegisterPassword.value);
            /*--- Remember Registered Email ---*/
            localStorage.setItem("pdRememberedEmail", pdRegisterUser.email);
            /*--- Button Loading ---*/
            if (pdRegisterSubmit) {
                pdRegisterSubmit.classList.add("loading");
            }
            /*--- Redirect To Login ---*/
            setTimeout(function () {
                window.location.href = "login.html";
            }, 700);
        });
    }
    /*--- Load Remembered Email ---*/
    if (pdLoginEmail) {
        const pdRememberedEmail = localStorage.getItem("pdRememberedEmail");
        if (pdRememberedEmail) {
            pdLoginEmail.value = pdRememberedEmail;
            if (pdLoginRemember) {
                pdLoginRemember.checked = true;
            }
        }
    }
    /*--- Login Form ---*/
    if (pdLoginForm) {
        pdLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();
            /*--- Browser Validation ---*/
            if (!pdLoginForm.checkValidity()) {
                pdLoginForm.reportValidity();
                return;
            }
            /*--- Get Registered User ---*/
            const pdStoredUser = JSON.parse(localStorage.getItem("pdUserProfile") || "null");
            const pdStoredPassword = localStorage.getItem("pdRegisteredPassword");
            const pdSelectedRole = document.querySelector('input[name="pdLoginRole"]:checked');
            if (!pdSelectedRole) {
                return;
            }
            /*--- Login Credentials ---*/
            const pdEmail = pdLoginEmail.value.trim();
            /*const pdPassword = pdLoginPassword.value;*/
            const pdRole = pdSelectedRole.value;
            /*--- Verify Account
            if (!pdStoredUser || pdEmail !== pdStoredUser.email || pdPassword !== pdStoredPassword || pdRole !== pdStoredUser.role) {
                pdLoginPassword.setCustomValidity("Invalid email, password or account type.");
                pdLoginPassword.reportValidity();
                pdLoginPassword.setCustomValidity("");
                return;
            } ---*/
            /*--- Remember Me ---*/
            if (pdLoginRemember && pdLoginRemember.checked) {
                localStorage.setItem("pdRememberedEmail", pdEmail);
            } else {
                localStorage.removeItem("pdRememberedEmail");
            }
            /*--- Store Login Session ---*/
            localStorage.setItem("pdLoggedIn", "true");
            localStorage.setItem("pdLoggedInRole", pdRole);
            /*--- Button Loading ---*/
            if (pdLoginSubmit) {
                pdLoginSubmit.classList.add("loading");
            }
            /*--- Dashboard Redirect ---*/
            setTimeout(function () {
                if (pdRole === "admin") {
                    window.location.href = "admin-dashboard.html";
                } else {
                    window.location.href = "client-dashboard.html";
                }
            }, 700);
        });
    }
    /*--- Authentication End ---*/
});