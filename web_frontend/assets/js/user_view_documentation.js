// import data from "../json/large_dataset.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", async () => {
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));

    let global_path = (view_path === "/views")? "." : "..";
    let assets_path = (view_path === "/views" )? ".." : "../..";

    /* Render global view elements */
    await include("#main_navigation" , `${view_path}/global/user_navigation.html`, `${assets_path}/assets/js/main_navigation.js`);

    ux(".section_block").onEach("click", function(){
        location.href = "user_view_section";
    });

    /* Print JSON data */
    // printSectionOutline(data.section_outline.sections);
}); 

function printSectionOutline(section_data){
    const documentation_div = document.getElementById("documentations");
    let section_block = "";

    /* Print all documentation */
    section_data.forEach((section, index) => {
        section_block += `
            <div class="section_block">
                <div class="section_details">
                    <input type="text" name="section_title" value="${section}" id="" class="section_title tooltipped" data-tooltip="${section}">
                </div>
                <div class="section_controls">
                    <span>${ Math.ceil(Math.random() * (20 - 1) + 1) } Tabs</span>
                </div>
            </div>`;
    });

    console.log(section_block);
}