document.addEventListener("DOMContentLoaded", ()=>{
    initializeEditSectionEvents();
});

function initializeEditSectionEvents(callback = null){
    ux(".section_page_tabs .add_page_btn").onEach("click", (event, tab_index) =>{
        event.preventDefault();
        let tab_item = event.target;
        let add_page_tab = event.target.closest(".add_page_tab");
        let section_page_content = ux(tab_item.closest(".section_page_content"));
        let section_page_tabs_list = ux(tab_item.closest(".section_page_tabs"));
        let page_tab_clone = ux("#clone_section_page .section_page_tab").clone();
        let page_tab_item = ux("#clone_section_page .page_tab_item").clone();
        
        section_page_content.html().append(page_tab_clone.html());
        
        /** Insert New tab */
        section_page_tabs_list.html().append(page_tab_item.html());
        section_page_tabs_list.html().append(add_page_tab);
        
        initializeEditSectionEvents(() => {
            /** Auto click new tab */            
            page_tab_item.html().dispatchEvent(new Event("click", { 'bubbles': true }));
        });
    })
    ux(".section_page_tabs .page_tab_item").onEach("click", (event, tab_index) =>{
        let tab_item = event.target;
        let section_page_content = ux(tab_item.closest(".section_page_content"));
        let section_page_tabs_list = ux(tab_item.closest(".section_page_tabs"));

        section_page_tabs_list.findAll(".page_tab_item").forEach(element => element.classList.remove("active"))
        section_page_content.findAll(".section_page_tab").forEach(element => element.classList.remove("show"))
        
        setTimeout(() => {
            console.log("tab_index", tab_index)
            
            section_page_tabs_list.find(`.page_tab_item:nth-child(${tab_index})`).addClass("active")
            section_page_content.find(`.section_page_tab:nth-child(${tab_index + 1})`).addClass("show")
        });
    });
    

    if(callback){
        callback();
    }
}