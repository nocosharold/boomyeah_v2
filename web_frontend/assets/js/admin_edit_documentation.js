document.addEventListener("DOMContentLoaded", async () => {
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));

    let global_path = (view_path === "/views")? "." : "..";
    let assets_path = (view_path === "/views" )? ".." : "../..";

    /* Render global view elements */
    await include("#main_navigation" , `${global_path}/global/main_navigation.html`, `${assets_path}/assets/js/main_navigation.js`);
    await include("#invite_modal", `${global_path}/global/invite_modal.html`, `${assets_path}/assets/js/invite_modal.js`);

    const add_section_form = document.querySelector("#section_form");
    add_section_form.addEventListener("submit", submitAddSectionForm);

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
    initializeMaterializeTooltip();
    appearEmptySection();
});

function submitAddSectionForm(event){
    event.preventDefault();

    const input_add_section = ux("#input_add_section").html();
    const cloned_section_block = ux(".section_block.hidden").clone();
    const sections = ux(".section_container").html();
    const section_title = ux(cloned_section_block.find(".section_details input")).html();
    const input_field = ux(input_add_section.closest(".input-field"));

    ux(cloned_section_block.find(".edit_section_title_icon").on("click", editSectionTitle));
    ux(cloned_section_block.find(".remove_icon").on("click", removeSectionBlock));
    ux(cloned_section_block.find(".copy_icon").on("click", duplicateSection));
    ux(cloned_section_block.find(".section_title").on("blur", disableEditSectionTitle));

    if(!input_add_section.value.trim().length){
        input_field.addClass("input_error");
    }
    else{
        input_field.removeClass("input_error");
        ux(cloned_section_block.html()).attr("class", "section_block");
        ux(section_title.html()).attr("value", input_add_section.value);
        ux(section_title.html()).attr("data-tooltip", input_add_section.value);
        if(section_title.html().value.length < 8){
            ux(section_title.html()).attr("data-tooltip", "");
            ux(section_title.html()).attr("class", "section_title");
            ux(section_title.html()).attr("readonly", "");
        }
        
        cloned_section_block.on("dblclick", function(){
            location.href = "/views/admin_edit_section.html";
        })

        sections.appendChild(cloned_section_block.html());
    }

    appearEmptySection();
    document.querySelector("#section_form").reset();
    ux(ux(".group_add_section label").html()).addClass("active");
    initializeMaterializeTooltip();
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
    appearEmptySection();
}

function disableEditSectionTitle(event){
    let section_title = event.target;

    if(section_title.value.trim().length > 8){
        ux(section_title).attr("data-tooltip", section_title.value);
        ux(section_title).attr("class", "section_title tooltipped");
        ux(section_title).attr("readonly", "");
        initializeMaterializeTooltip();
    }else{
        ux(section_title).attr("class", "section_title");
        section_title.html().removeAttribute("data-tooltip", "");
    }

    ux(section_title).attr("readonly", "");
}

function duplicateSection(event){
    let source = event.target.closest(".section_block");
    let cloned = ux(source).clone();
    let cloned_title = ux(cloned.find(".section_title")).html();

    ux(cloned_title.html()).attr("value", "Copy of " + cloned_title.html().value);
    ux(cloned.find(".edit_section_title_icon").on("click", editSectionTitle));
    ux(cloned.find(".copy_icon").on("click", duplicateSection));
    ux(cloned.find(".remove_icon").on("click", removeSectionBlock));
    
    source.insertAdjacentElement("afterend", cloned.html());
}

function initializeMaterializeTooltip(){
    const elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {
        position: "top"
    });
}

function appearEmptySection(){
    let section_count = ux(".section_container").html().children.length;

    if(section_count <= 1){
        ux(".no_sections").removeClass("hidden");
    }else{
        ux(".no_sections").addClass("hidden");
    }
}