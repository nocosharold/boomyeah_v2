document.addEventListener("DOMContentLoaded", () => {
    const doc_form = document.querySelector("#doc_form");
    doc_form.addEventListener("submit", submitDocForm);      /* This will submit Sign Up Form */
});

function submitDocForm(event){
    event.preventDefault();
}