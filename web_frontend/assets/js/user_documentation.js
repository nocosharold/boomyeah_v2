// import data from "../json/large_dataset.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", async () => {
    /* Print all documentation */
    // displayDocumentations(data.documentations);
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));

    let global_path = (view_path === "/views")? "." : "..";
    let assets_path = (view_path === "/views" )? ".." : "../..";

    /* Render global view elements */
    await include("#main_navigation" , `${global_path}/global/user_navigation.html`, `${assets_path}/assets/js/main_navigation.js`);

    ux(".document_block").onEach("dblclick", function(){
        location.href = "user_view_documentation.html";
    });

    document.onkeydown = checkShortcut;
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

function checkShortcut(e){
    const SHORTCUT_VALUES = {
        "default_data": {
            code: 49
        },
        "no_data": {
            code: 50
        },
        "small_data": {
            code: 51
        },
        "medium_data": {
            code: 52
        },
        "large_data": {
            code: 53
        }
    }

    let shortcut_event = window.event? event : e;
    let msg = null;

    for(let [key, value] of Object.entries(SHORTCUT_VALUES)){
        if(shortcut_event.keyCode === value.code && shortcut_event.ctrlKey){
            msg = key;
        }
    }

    console.log(msg);
}