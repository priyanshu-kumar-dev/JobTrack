// =====================================================
// MAIN ELEMENTS
// =====================================================

const addApplicationBtn =
    document.getElementById("addApplicationBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const applicationModal =
    document.getElementById("applicationModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const applicationForm =
    document.getElementById("applicationForm");


// =====================================================
// SEARCH / FILTER / SORT
// =====================================================

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const sortSelect =
    document.getElementById("sortSelect");


// =====================================================
// SIDEBAR ELEMENTS
// =====================================================

const logoBtn =
    document.getElementById("logoBtn");

const dashboardBtn =
    document.getElementById("dashboardBtn");

const applicationsBtn =
    document.getElementById("applicationsBtn");

const sidebarAddBtn =
    document.getElementById("sidebarAddBtn");

const settingsBtn =
    document.getElementById("settingsBtn");

const applicationsSection =
    document.getElementById("applicationsSection");

const viewAllBtn =
    document.getElementById("viewAllBtn");


// =====================================================
// SETTINGS ELEMENTS
// =====================================================

const settingsModal =
    document.getElementById("settingsModal");

const closeSettings =
    document.getElementById("closeSettings");

const themeToggle =
    document.getElementById("themeToggle");

const clearApplications =
    document.getElementById("clearApplications");


// =====================================================
// EDIT STATE
// =====================================================

let editingId = null;


// =====================================================
// APPLICATION MODAL
// =====================================================

function openModal() {

    applicationModal.classList.add("active");

}


function closeApplicationModal() {

    applicationModal.classList.remove("active");

    applicationForm.reset();

    editingId = null;


    const modalTitle =
        applicationModal.querySelector(
            ".modal-header h2"
        );

    const saveButton =
        applicationModal.querySelector(
            ".save-btn"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Add Application";

    }


    if (saveButton) {

        saveButton.textContent =
            "Save Application";

    }

}


// =====================================================
// SETTINGS MODAL
// =====================================================

function openSettings() {

    if (!settingsModal) {
        return;
    }

    settingsModal.classList.add("active");

}


function closeSettingsModal() {

    if (!settingsModal) {
        return;
    }

    settingsModal.classList.remove("active");

}


// =====================================================
// ACTIVE SIDEBAR
// =====================================================

function setActiveNav(button) {

    document
        .querySelectorAll(".nav-item")
        .forEach((item) => {

            item.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }

}


// =====================================================
// PREPARE ADD APPLICATION
// =====================================================

function prepareAddApplication() {

    editingId = null;

    applicationForm.reset();


    const modalTitle =
        applicationModal.querySelector(
            ".modal-header h2"
        );

    const saveButton =
        applicationModal.querySelector(
            ".save-btn"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Add Application";

    }


    if (saveButton) {

        saveButton.textContent =
            "Save Application";

    }


    openModal();

}


// =====================================================
// TOP ADD BUTTON
// =====================================================

if (addApplicationBtn) {

    addApplicationBtn.addEventListener(
        "click",
        prepareAddApplication
    );

}


// =====================================================
// EMPTY STATE ADD BUTTON
// =====================================================

if (emptyAddBtn) {

    emptyAddBtn.addEventListener(
        "click",
        prepareAddApplication
    );

}


// =====================================================
// SIDEBAR ADD BUTTON
// =====================================================

if (sidebarAddBtn) {

    sidebarAddBtn.addEventListener(
        "click",
        () => {

            setActiveNav(
                sidebarAddBtn
            );

            prepareAddApplication();

        }
    );

}


// =====================================================
// CLOSE APPLICATION MODAL
// =====================================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeApplicationModal
    );

}


if (cancelModal) {

    cancelModal.addEventListener(
        "click",
        closeApplicationModal
    );

}


// =====================================================
// CLOSE APPLICATION MODAL OUTSIDE
// =====================================================

if (applicationModal) {

    applicationModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                applicationModal
            ) {

                closeApplicationModal();

            }

        }
    );

}


// =====================================================
// FORM SUBMIT
// =====================================================

if (applicationForm) {

    applicationForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // ================================
            // GET FORM VALUES
            // ================================

            const company =
                document
                    .getElementById("company")
                    .value
                    .trim();


            const role =
                document
                    .getElementById("role")
                    .value
                    .trim();


            const location =
                document
                    .getElementById("location")
                    .value
                    .trim();


            const jobType =
                document
                    .getElementById("jobType")
                    .value;


            const date =
                document
                    .getElementById("applicationDate")
                    .value;


            const status =
                document
                    .getElementById("status")
                    .value;


            const jobUrl =
                document
                    .getElementById("jobUrl")
                    .value
                    .trim();


            const notes =
                document
                    .getElementById("notes")
                    .value
                    .trim();


            // ================================
            // GET APPLICATIONS
            // ================================

            const applications =
                getApplications();


            // ================================
            // EDIT APPLICATION
            // ================================

            if (editingId !== null) {

                const applicationIndex =
                    applications.findIndex(
                        (application) =>
                            Number(application.id) ===
                            Number(editingId)
                    );


                if (applicationIndex !== -1) {

                    applications[
                        applicationIndex
                    ] = {

                        id: editingId,

                        company,

                        role,

                        location,

                        jobType,

                        date,

                        status,

                        jobUrl,

                        notes

                    };

                }

            }


            // ================================
            // ADD APPLICATION
            // ================================

            else {

                const application = {

                    id: Date.now(),

                    company,

                    role,

                    location,

                    jobType,

                    date,

                    status,

                    jobUrl,

                    notes

                };


                applications.push(
                    application
                );

            }


            // ================================
            // SAVE
            // ================================

            saveApplications(
                applications
            );


            // ================================
            // UPDATE UI
            // ================================

            applyFilters();

            updateStatistics();


            // ================================
            // CLOSE MODAL
            // ================================

            closeApplicationModal();

        }
    );

}


// =====================================================
// EDIT APPLICATION
// =====================================================

function editApplication(id) {

    const applications =
        getApplications();


    const application =
        applications.find(
            (item) =>
                Number(item.id) ===
                Number(id)
        );


    if (!application) {

        return;

    }


    editingId =
        application.id;


    // ================================
    // FILL FORM
    // ================================

    document.getElementById(
        "company"
    ).value =
        application.company || "";


    document.getElementById(
        "role"
    ).value =
        application.role || "";


    document.getElementById(
        "location"
    ).value =
        application.location || "";


    document.getElementById(
        "jobType"
    ).value =
        application.jobType || "";


    document.getElementById(
        "applicationDate"
    ).value =
        application.date || "";


    document.getElementById(
        "status"
    ).value =
        application.status || "Applied";


    document.getElementById(
        "jobUrl"
    ).value =
        application.jobUrl || "";


    document.getElementById(
        "notes"
    ).value =
        application.notes || "";


    // ================================
    // CHANGE MODAL TITLE
    // ================================

    const modalTitle =
        applicationModal.querySelector(
            ".modal-header h2"
        );

    const saveButton =
        applicationModal.querySelector(
            ".save-btn"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Edit Application";

    }


    if (saveButton) {

        saveButton.textContent =
            "Update Application";

    }


    openModal();

}


// =====================================================
// DELETE APPLICATION
// =====================================================

function deleteApplication(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this application?"
        );


    if (!confirmed) {

        return;

    }


    const applications =
        getApplications();


    const updatedApplications =
        applications.filter(
            (application) =>
                Number(application.id) !==
                Number(id)
        );


    saveApplications(
        updatedApplications
    );


    applyFilters();

    updateStatistics();

}


// =====================================================
// SEARCH + FILTER + SORT
// =====================================================

function applyFilters() {

    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const selectedSort =
        sortSelect
            ? sortSelect.value
            : "newest";


    const applications =
        getApplications();


    // ==========================================
    // FILTER
    // ==========================================

    let filteredApplications =
        applications.filter(
            (application) => {

                const company =
                    String(
                        application.company || ""
                    ).toLowerCase();


                const role =
                    String(
                        application.role || ""
                    ).toLowerCase();


                const matchesSearch =
                    company.includes(
                        searchText
                    ) ||
                    role.includes(
                        searchText
                    );


                const matchesStatus =
                    selectedStatus === "all" ||
                    application.status ===
                        selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    // ==========================================
    // SORT
    // ==========================================

    if (
        selectedSort ===
        "newest"
    ) {

        filteredApplications.sort(
            (a, b) =>
                new Date(b.date || 0) -
                new Date(a.date || 0)
        );

    }


    else if (
        selectedSort ===
        "oldest"
    ) {

        filteredApplications.sort(
            (a, b) =>
                new Date(a.date || 0) -
                new Date(b.date || 0)
        );

    }


    else if (
        selectedSort ===
        "companyAZ"
    ) {

        filteredApplications.sort(
            (a, b) =>
                String(
                    a.company || ""
                ).localeCompare(
                    String(
                        b.company || ""
                    )
                )
        );

    }


    else if (
        selectedSort ===
        "companyZA"
    ) {

        filteredApplications.sort(
            (a, b) =>
                String(
                    b.company || ""
                ).localeCompare(
                    String(
                        a.company || ""
                    )
                )
        );

    }


    // ==========================================
    // RENDER
    // ==========================================

    renderApplications(
        filteredApplications
    );

}


// =====================================================
// SEARCH EVENT
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


// =====================================================
// STATUS FILTER EVENT
// =====================================================

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        applyFilters
    );

}


// =====================================================
// SORT EVENT
// =====================================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        applyFilters
    );

}


// =====================================================
// LOGO → DASHBOARD
// =====================================================

if (logoBtn) {

    logoBtn.addEventListener(
        "click",
        () => {

            setActiveNav(
                dashboardBtn
            );


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// =====================================================
// DASHBOARD BUTTON
// =====================================================

if (dashboardBtn) {

    dashboardBtn.addEventListener(
        "click",
        () => {

            setActiveNav(
                dashboardBtn
            );


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// =====================================================
// APPLICATIONS BUTTON
// =====================================================

if (applicationsBtn) {

    applicationsBtn.addEventListener(
        "click",
        () => {

            setActiveNav(
                applicationsBtn
            );


            if (applicationsSection) {

                applicationsSection.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }
    );

}


// =====================================================
// SETTINGS BUTTON
// =====================================================

if (settingsBtn) {

    settingsBtn.addEventListener(
        "click",
        () => {

            setActiveNav(
                settingsBtn
            );

            openSettings();

        }
    );

}


// =====================================================
// CLOSE SETTINGS
// =====================================================

if (closeSettings) {

    closeSettings.addEventListener(
        "click",
        closeSettingsModal
    );

}


// =====================================================
// CLOSE SETTINGS OUTSIDE
// =====================================================

if (settingsModal) {

    settingsModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                settingsModal
            ) {

                closeSettingsModal();

            }

        }
    );

}


// =====================================================
// VIEW ALL
// =====================================================

if (viewAllBtn) {

    viewAllBtn.addEventListener(
        "click",
        () => {

            if (searchInput) {

                searchInput.value = "";

            }


            if (statusFilter) {

                statusFilter.value =
                    "all";

            }


            if (sortSelect) {

                sortSelect.value =
                    "newest";

            }


            applyFilters();


            if (applicationsSection) {

                applicationsSection.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }


            setActiveNav(
                applicationsBtn
            );

        }
    );

}


// =====================================================
// DASHBOARD STATISTICS
// =====================================================

function updateStatistics() {

    const applications =
        getApplications();


    const total =
        applications.length;


    const applied =
        applications.filter(
            (application) =>
                application.status ===
                "Applied"
        ).length;


    const interviews =
        applications.filter(
            (application) =>
                application.status ===
                "Interview"
        ).length;


    const selected =
        applications.filter(
            (application) =>
                application.status ===
                "Selected"
        ).length;


    const rejected =
        applications.filter(
            (application) =>
                application.status ===
                "Rejected"
        ).length;


    const totalElement =
        document.getElementById(
            "totalApplications"
        );


    const appliedElement =
        document.getElementById(
            "appliedApplications"
        );


    const interviewElement =
        document.getElementById(
            "interviewApplications"
        );


    const selectedElement =
        document.getElementById(
            "selectedApplications"
        );


    const rejectedElement =
        document.getElementById(
            "rejectedApplications"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (appliedElement) {

        appliedElement.textContent =
            applied;

    }


    if (interviewElement) {

        interviewElement.textContent =
            interviews;

    }


    if (selectedElement) {

        selectedElement.textContent =
            selected;

    }


    if (rejectedElement) {

        rejectedElement.textContent =
            rejected;

    }

}


// =====================================================
// DARK MODE
// =====================================================

function enableDarkMode() {

    document.body.classList.add(
        "dark-mode"
    );


    localStorage.setItem(
        "jobTrackTheme",
        "dark"
    );


    if (themeToggle) {

        themeToggle.textContent =
            "Light Mode";

    }

}


function disableDarkMode() {

    document.body.classList.remove(
        "dark-mode"
    );


    localStorage.setItem(
        "jobTrackTheme",
        "light"
    );


    if (themeToggle) {

        themeToggle.textContent =
            "Dark Mode";

    }

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "jobTrackTheme"
        );


    if (savedTheme === "dark") {

        enableDarkMode();

    }

    else {

        disableDarkMode();

    }

}


// =====================================================
// THEME TOGGLE
// =====================================================

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            if (isDark) {

                disableDarkMode();

            }

            else {

                enableDarkMode();

            }

        }
    );

}


// =====================================================
// CLEAR ALL APPLICATIONS
// =====================================================

if (clearApplications) {

    clearApplications.addEventListener(
        "click",
        () => {

            const applications =
                getApplications();


            if (
                applications.length === 0
            ) {

                alert(
                    "There are no applications to delete."
                );

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to delete ALL applications?"
                );


            if (!confirmed) {

                return;

            }


            saveApplications([]);


            applyFilters();

            updateStatistics();


            alert(
                "All applications have been deleted."
            );

        }
    );

}


// =====================================================
// ESC KEY
// =====================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {

            return;

        }


        if (
            applicationModal &&
            applicationModal.classList.contains(
                "active"
            )
        ) {

            closeApplicationModal();

        }


        if (
            settingsModal &&
            settingsModal.classList.contains(
                "active"
            )
        ) {

            closeSettingsModal();

        }

    }
);


// =====================================================
// PAGE LOAD
// =====================================================

loadTheme();

applyFilters();

updateStatistics();