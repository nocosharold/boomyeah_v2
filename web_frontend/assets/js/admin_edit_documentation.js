document.addEventListener("DOMContentLoaded", async () => {
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));

    let global_path = (view_path === "/views")? "." : "..";
    let assets_path = (view_path === "/views" )? ".." : "../..";

    /* Render global view elements */
    await include("#main_navigation" , `${global_path}/global/main_navigation.html`, `${assets_path}/assets/js/main_navigation.js`);
    await include("#invite_modal", `${global_path}/global/invite_modal.html`, `${assets_path}/assets/js/invite_modal.js`);

    ux(".toggle_switch").on("click", switchText);
    ux(".edit_section_title_icon").onEach("click", editSectionTitle);
    ux(".section_title").onEach("blur", disableEditSectionTitle);
    ux(".remove_icon").onEach("click", removeSectionBlock);
    ux(".section_block").onEach("dblclick", function(){
        location.href = "admin_edit_section.html";
    });
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
    
    section_title.setAttribute("readonly", "");
}