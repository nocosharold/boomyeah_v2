document.addEventListener("DOMContentLoaded", async () => {
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));

    let global_path = (view_path === "/views")? "." : "..";
    let assets_path = (view_path === "/views" )? ".." : "../..";

    /* Render global view elements */
    await include("#main_navigation" , `${global_path}/global/main_navigation.html`, `${assets_path}/assets/js/main_navigation.js`);
    await include("#invite_modal", `${global_path}/global/invite_modal.html`, `${assets_path}/assets/js/invite_modal.js`);

    const add_section_form = document.querySelector("#section_form");
    add_section_form.addEventListener("submit", submitAddSectionForm);      /* This will submit Sign Up Form */

    ux(".toggle_switch").on("click", switchText);
    ux(".edit_section_title_icon").onEach("click", editSectionTitle);
    ux(".section_title").onEach("blur", disableEditSectionTitle);
    ux(".copy_icon").onEach("click", duplicateSection);
    ux(".remove_icon").onEach("click", removeSectionBlock);
    ux(".section_block").onEach("dblclick", function(){
        location.href = "admin_edit_section.html";
    });

    document.querySelectorAll(".section_container").forEach((section_tabs_list) => {
        Sortable.create(section_tabs_list);
    });
    ux(".copy_icon").onEach("click", duplicateSection);
});

function submitAddSectionForm(event){
    event.preventDefault();

    const input_add_section = ux("#input_add_section").html();
    const cloned_section_block = ux(".section_block.hidden").clone();
    const sections = ux(".section_container").html();
    const section_title = ux(cloned_section_block.find(".section_details input")).html();

    ux(cloned_section_block.find(".edit_section_title_icon").on("click", editSectionTitle));
    ux(cloned_section_block.find(".remove_icon").on("click", removeSectionBlock));
    ux(cloned_section_block.find(".copy_icon").on("click", duplicateSection));

    if(!input_add_section.value.trim().length){
        alert("text input is empty");
    }
    else{
        cloned_section_block.html().setAttribute("class", "section_block");
        section_title.html().setAttribute("value", input_add_section.value);
        
        cloned_section_block.on("dblclick", function(){
            location.href = "/views/admin_edit_section.html";
        })

        sections.appendChild(cloned_section_block.html());
    }

    document.querySelector("#section_form").reset();
}

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

function duplicateSection(event){
    let source = event.target.closest(".section_block");
    let cloned = ux(source).clone();
    let cloned_title = ux(cloned.find(".section_title")).html();

    cloned_title.html().setAttribute("value", "Copy of " + cloned_title.html().value);
    ux(cloned.find(".edit_section_title_icon").on("click", editSectionTitle));
    ux(cloned.find(".copy_icon").on("click", duplicateSection));
    ux(cloned.find(".remove_icon").on("click", removeSectionBlock));
    
    source.insertAdjacentElement("afterend", cloned.html());
}