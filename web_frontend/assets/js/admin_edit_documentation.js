document.addEventListener("DOMContentLoaded", () => {
    ux(".toggle_switch").on("click", switchText)
    ux(".edit_section_title_icon").onEach("click", editSectionTitle);
    ux(".section_title").onEach("blur", disableEditSectionTitle);
    ux(".remove_icon").onEach("click", removeSectionBlock);
});

function switchText(event){
    let toggle_switch = event.target;
    let switch_btn = ux(".switch_btn .toggle_text").html();

    toggle_switch.checked ? switch_btn.innerText = "Private" : switch_btn.innerText = "Public";
}

function editSectionTitle(event){
    const edit_btn = event.target;
    const section_blk = ux(edit_btn.closest(".section_block"));
    const section_title = ux(section_blk.find(".section_title")).html();
    const end = section_title.html().value.length;

    section_title.html().removeAttribute("readonly");
    section_title.html().setSelectionRange(end, end);
    section_title.html().focus();
}

function removeSectionBlock(event){
    let remove_icon = event.target;
    let section_blk = ux(remove_icon.closest(".section_block")).html();
    
    section_blk.remove();
}

function disableEditSectionTitle(event){
    let section_title = event.target;
    
    section_title.removeAttribute("contenteditable");
    section_title.setAttribute("readonly", "");
}