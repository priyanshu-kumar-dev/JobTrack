// =========================
// FORMAT DATE
// =========================

function formatDate(date) {

    if (!date) {

        return "-";

    }


    const dateObject =
        new Date(date);


    // Invalid date check

    if (Number.isNaN(dateObject.getTime())) {

        return "-";

    }


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// =========================
// GET STATUS CLASS
// =========================

function getStatusClass(status) {

    switch (status) {

        case "Applied":

            return "status-applied";


        case "Interview":

            return "status-interview";


        case "Selected":

            return "status-selected";


        case "Rejected":

            return "status-rejected";


        case "Offer":

            return "status-offer";


        case "Withdrawn":

            return "status-withdrawn";


        default:

            return "status-default";

    }

}


// =========================
// CAPITALIZE TEXT
// =========================

function capitalizeText(text) {

    if (!text) {

        return "";

    }


    return text
        .charAt(0)
        .toUpperCase() +
        text.slice(1);

}


// =========================
// CHECK VALID URL
// =========================

function isValidURL(url) {

    if (!url) {

        return false;

    }


    try {

        new URL(url);

        return true;

    }

    catch (error) {

        return false;

    }

}


// =========================
// GENERATE APPLICATION ID
// =========================

function generateApplicationId() {

    return Date.now() +
        Math.floor(
            Math.random() * 1000
        );

}