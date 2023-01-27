import data from "../json/default_dataset.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
    /* Print all documentation */
    displayDocumentations(data.documentations);

    /* Initialize Materialize Dropdown */
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
        alignment: 'left',
        coverTrigger: false
    });
});

function displayDocumentations(documentations){
    const documentation_div = document.getElementById("documentations");

    /* Print all documentation */
    documentations.forEach((document, index) => {
        documentation_div.innerHTML += `
            <div class="document_block">
                <div class="document_details">
                    <h2>${document.title}</h2>
                    ${ document.is_private ? `<button class="invite_collaborators_btn"> ${document.collaborator_count}</button>` : ''}
                </div>
                <div class="document_controls">
                    ${ document.is_private ? '<button class="access_btn"></button>' : '' }
                </div>
            </div>`;
    });
}