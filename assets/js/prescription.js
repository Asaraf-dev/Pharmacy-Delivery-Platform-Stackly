/*--- Upload Prescription Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdPreUploadFile = document.getElementById("pdPreUploadFile");
    const pdPreUploadDropzone = document.getElementById("pdPreUploadDropzone");
    const pdPreUploadFileBox = document.getElementById("pdPreUploadFileBox");
    const pdPreUploadFileName = document.getElementById("pdPreUploadFileName");
    const pdPreUploadFileSize = document.getElementById("pdPreUploadFileSize");
    const pdPreUploadRemove = document.getElementById("pdPreUploadRemove");
    const pdPreUploadNotes = document.getElementById("pdPreUploadNotes");
    const pdPreUploadDelivery = document.getElementById("pdPreUploadDelivery");
    const pdPreUploadSubmit = document.getElementById("pdPreUploadSubmit");
    const pdPreUploadSuccess = document.getElementById("pdPreUploadSuccess");
    const pdPreUploadSuccessClose = document.getElementById("pdPreUploadSuccessClose");

    if (!pdPreUploadFile || !pdPreUploadDropzone) {
        return;
    }

    /*--- Clear Prescription Form ---*/
    function pdPreUploadClearForm() {
        if (pdPreUploadFile) {
            pdPreUploadFile.value = "";
        }
        if (pdPreUploadNotes) {
            pdPreUploadNotes.value = "";
        }
        if (pdPreUploadDelivery) {
            pdPreUploadDelivery.value = "";
        }
        if (pdPreUploadFileName) {
            pdPreUploadFileName.textContent = "Prescription.pdf";
        }
        if (pdPreUploadFileSize) {
            pdPreUploadFileSize.textContent = "0 KB";
        }
        if (pdPreUploadFileBox) {
            pdPreUploadFileBox.classList.remove("show");
        }
        if (pdPreUploadDropzone) {
            pdPreUploadDropzone.classList.remove("pd-pre-upload-has-file", "dragover");
        }
    }

    /*--- File Selection ---*/
    function pdPreUploadHandleFile(file) {
        if (!file) {
            return;
        }

        const pdPreUploadAllowed = ["image/jpeg", "image/png", "application/pdf"];
        const pdPreUploadMaxSize = 10 * 1024 * 1024;

        if (!pdPreUploadAllowed.includes(file.type)) {
            alert("Please upload a JPG, PNG or PDF prescription.");
            pdPreUploadFile.value = "";
            return;
        }

        if (file.size > pdPreUploadMaxSize) {
            alert("Please upload a file smaller than 10MB.");
            pdPreUploadFile.value = "";
            return;
        }

        pdPreUploadFileName.textContent = file.name;
        pdPreUploadFileSize.textContent = pdPreUploadFormatSize(file.size);
        pdPreUploadFileBox.classList.add("show");
        pdPreUploadDropzone.classList.add("pd-pre-upload-has-file");
    }

    /*--- File Size ---*/
    function pdPreUploadFormatSize(size) {
        if (size < 1024) {
            return size + " Bytes";
        }

        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(1) + " KB";
        }

        return (size / (1024 * 1024)).toFixed(1) + " MB";
    }

    /*--- Browse Upload ---*/
    pdPreUploadFile.addEventListener("change", function () {
        pdPreUploadHandleFile(this.files[0]);
    });

    /*--- Drag Over ---*/
    ["dragenter", "dragover"].forEach(function (eventName) {
        pdPreUploadDropzone.addEventListener(eventName, function (event) {
            event.preventDefault();
            event.stopPropagation();
            pdPreUploadDropzone.classList.add("dragover");
        });
    });

    /*--- Drag Leave ---*/
    ["dragleave", "drop"].forEach(function (eventName) {
        pdPreUploadDropzone.addEventListener(eventName, function (event) {
            event.preventDefault();
            event.stopPropagation();
            pdPreUploadDropzone.classList.remove("dragover");
        });
    });

    /*--- Drop Upload ---*/
    pdPreUploadDropzone.addEventListener("drop", function (event) {
        const pdPreUploadFiles = event.dataTransfer.files;

        if (pdPreUploadFiles.length) {
            try {
                pdPreUploadFile.files = pdPreUploadFiles;
            } catch (error) {
                return;
            }

            pdPreUploadHandleFile(pdPreUploadFiles[0]);
        }
    });

    /*--- Remove File ---*/
    if (pdPreUploadRemove) {
        pdPreUploadRemove.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            pdPreUploadClearForm();
        });
    }

    /*--- Submit Prescription ---*/
    if (pdPreUploadSubmit) {
        pdPreUploadSubmit.addEventListener("click", function () {
            if (!pdPreUploadFile.files.length) {
                alert("Please upload your prescription first.");
                return;
            }

            pdPreUploadSubmit.classList.add("loading");

            setTimeout(function () {
                pdPreUploadSubmit.classList.remove("loading");

                /*--- Show Success Message ---*/
                if (pdPreUploadSuccess) {
                    pdPreUploadSuccess.classList.add("show");
                }

                /*--- Clear All Fields After Successful Submission ---*/
                pdPreUploadClearForm();
            }, 1200);
        });
    }

    /*--- Close Success Message ---*/
    if (pdPreUploadSuccessClose) {
        pdPreUploadSuccessClose.addEventListener("click", function () {
            pdPreUploadSuccess.classList.remove("show");
        });
    }
});
/*--- Upload Prescription End ---*/

/*--- How Prescription Ordering Works Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const pdPreHowCards = document.querySelectorAll(".pd-pre-how-card");
    if (!pdPreHowCards.length) {
        return;
    }
    const pdPreHowObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                pdPreHowCards.forEach(function (card) {
                    card.classList.remove("pd-pre-how-card-active");
                });
                entry.target.classList.add("pd-pre-how-card-active");
            }
        });
    }, { threshold: .55 });
    pdPreHowCards.forEach(function (card) {
        pdPreHowObserver.observe(card);
    });
});
/*--- How Prescription Ordering Works End ---*/
