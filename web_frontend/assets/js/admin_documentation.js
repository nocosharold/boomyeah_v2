// import docs_data from './default_dataset.json' assert {type: 'json'};

document.addEventListener("DOMContentLoaded", () => {
    const doc_form = document.querySelector("#doc_form");
    doc_form.addEventListener("submit", submitDocForm);      /* This will submit Sign Up Form */

    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
        alignment: 'left',
        coverTrigger: false
    });
});

function submitDocForm(event){
    event.preventDefault();
    const input_add_documentation = document.querySelector("#input_add_documentation");

    if(!input_add_documentation.value.trim().length){
        alert("text input empty");
    }else{

    }
}