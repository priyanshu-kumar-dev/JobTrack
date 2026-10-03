const applicationsTableBody =
    document.getElementById(
        "applicationsTableBody"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


// =========================
// RENDER APPLICATIONS
// =========================

function renderApplications(applications) {

    // Clear old table

    applicationsTableBody.innerHTML = "";


    // =========================
    // EMPTY STATE
    // =========================

    if (
        !applications ||
        applications.length === 0
    ) {

        emptyState.style.display = "block";

        return;

    }


    // Hide empty state

    emptyState.style.display = "none";


    // =========================
    // CREATE TABLE ROWS
    // =========================

    applications.forEach(
        (application) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(
                            application.company
                        )}
                    </strong>
                </td>


                <td>
                    ${escapeHTML(
                        application.role
                    )}
                </td>


                <td>
                    ${escapeHTML(
                        application.location
                    )}
                </td>


                <td>
                    ${formatDate(
                        application.date
                    )}
                </td>


                <td>

                    <span
                        class="status-badge ${getStatusClass(
                            application.status
                        )}"
                    >

                        ${escapeHTML(
                            application.status
                        )}

                    </span>

                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            type="button"
                            onclick="editApplication(${application.id})"
                        >
                            Edit
                        </button>


                        <button
                            class="action-btn delete-btn"
                            type="button"
                            onclick="deleteApplication(${application.id})"
                        >
                            Delete
                        </button>

                    </div>

                </td>

            `;


            applicationsTableBody.appendChild(
                row
            );

        }
    );

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================
// SHOW APPLICATION DETAILS
// =========================

function getApplicationDetails(id) {

    const application =
        getApplicationById(id);


    if (!application) {

        return null;

    }


    return {

        company:
            application.company || "",

        role:
            application.role || "",

        location:
            application.location || "",

        jobType:
            application.jobType || "",

        date:
            application.date || "",

        status:
            application.status || "",

        jobUrl:
            application.jobUrl || "",

        notes:
            application.notes || ""

    };

}