const STORAGE_KEY = "jobApplications";


// =====================================================
// GET APPLICATIONS
// =====================================================

function getApplications() {

    try {

        const applications =
            localStorage.getItem(
                STORAGE_KEY
            );


        // No data found

        if (!applications) {

            return [];

        }


        const parsedApplications =
            JSON.parse(
                applications
            );


        // Ensure data is an array

        if (!Array.isArray(parsedApplications)) {

            return [];

        }


        return parsedApplications;

    }

    catch (error) {

        console.error(
            "Error reading applications:",
            error
        );

        return [];

    }

}


// =====================================================
// SAVE APPLICATIONS
// =====================================================

function saveApplications(applications) {

    try {

        // Ensure applications is an array

        if (!Array.isArray(applications)) {

            console.error(
                "Applications must be an array."
            );

            return false;

        }


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                applications
            )
        );


        return true;

    }

    catch (error) {

        console.error(
            "Error saving applications:",
            error
        );

        return false;

    }

}


// =====================================================
// CLEAR ALL APPLICATIONS
// =====================================================

function clearAllApplications() {

    try {

        localStorage.removeItem(
            STORAGE_KEY
        );

        return true;

    }

    catch (error) {

        console.error(
            "Error clearing applications:",
            error
        );

        return false;

    }

}


// =====================================================
// GET APPLICATION BY ID
// =====================================================

function getApplicationById(id) {

    const applications =
        getApplications();


    return applications.find(
        (application) =>
            Number(application.id) ===
            Number(id)
    );

}


// =====================================================
// CHECK IF APPLICATIONS EXIST
// =====================================================

function hasApplications() {

    const applications =
        getApplications();


    return applications.length > 0;

}