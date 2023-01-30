// import data from "../json/large_dataset.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
    /* Print all documentation */
    // displayDocumentations(data.documentations);
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
                ${ document.is_private ? '<div class="document_controls"><button class="access_btn"></button></div>' : '' }
            </div>`;
    });
}