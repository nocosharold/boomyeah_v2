import data from "../json/large_dataset.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
    let confirm_public = document.querySelectorAll('.modal');
    let instances = M.Modal.init(confirm_public);

    let confirm = document.querySelectorAll('.modal');
    let instance = M.Modal.init(confirm);


    const invite_form = document.querySelector("#invite_form");
    invite_form.addEventListener("submit", submitInvite);    
    

    const doc_form = document.querySelector("#doc_form");
    doc_form.addEventListener("submit", submitDocForm);      /* This will submit Sign Up Form */

    /* Print all documentation */
    displayDocumentations(data.documentations);

    /* Initialize Materialize Dropdown */
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
        alignment: 'left',
        coverTrigger: false
    });
});

function submitInvite(event){
    event.preventDefault();
}

function submitDocForm(event){
    event.preventDefault();
    const input_add_documentation = document.querySelector("#input_add_documentation");

    if(!input_add_documentation.value.trim().length){
        alert("text input empty");
    }else{

    }
}

function displayDocumentations(documentations){
    const documentation_div = document.getElementById("documentations");
    let document_block = "";

    /* Print all documentation */
    documentations.forEach((document, index) => {
        document_block += `
            <div class="document_block">
                <div class="document_details">
                    <h2>${document.title}</h2>
                    ${ document.is_private ? `<button class="invite_collaborators_btn"> ${document.collaborator_count}</button>` : ''}
                </div>
                <div class="document_controls">
                    ${ document.is_private ? '<button class="access_btn modal-trigger" href="#confirm_to_public"></button>' : '' }
                    <button class="more_action_btn dropdown-trigger" data-target="more_action_list_${ document.is_private ? 'private' : 'public' }">⁝</button>
                    <!-- Dropdown Structure -->
                    <ul id="more_action_list_${ document.is_private ? 'private' : 'public' }" class="dropdown-content">
                        <li><a href="#!" class="edit_title_icon">Edit Title</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" class="duplicate_icon">Duplicate</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" class="archive_icon">Archive</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" class="invite_icon">Invite</a></li>
                        <li class="divider" tabindex="-1"></li>
                        ${ document.is_private ? '<li><a href="#confirm_to_public" class="set_to_public_icon modal-trigger">Set to Public</a></li>' : 
                        '<li><a href="#confirm_to_private" class="set_to_private_icon modal-trigger">Set to Private</a></li>' }
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" class="remove_icon">Remove</a></li>
                    </ul>
                </div>
            </div>`;
    });

    console.log("document_block", document_block);
}