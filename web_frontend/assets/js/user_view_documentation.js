document.addEventListener("DOMContentLoaded", async () => {
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));

    let global_path = (view_path === "/views")? "." : "..";
    let assets_path = (view_path === "/views" )? ".." : "../..";

    /* Render global view elements */
    await include("#main_navigation" , `${global_path}/global/user_navigation.html`, `${assets_path}/assets/js/main_navigation.js`);

    ux(".section_block").onEach("dblclick", function(){
        location.href = "user_view_section.html";
    });
});