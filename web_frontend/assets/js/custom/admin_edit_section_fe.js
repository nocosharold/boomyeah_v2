const initializeEditSectionEvents = (ux_target = null, callback = null) => {
    if(ux_target){
        ux_target.find(".section_page_tabs .add_page_btn").on("click", addNewTab);
        bindOpenTabLink(ux_target);

        ux_target.findAll((".tab_title")).forEach((tab_title, tab_index) => {
            ux(tab_title).on("keyup", (event) => {
                onUpdateTabTitle(event, tab_index + 1);
            });
        });
    }
    else{
        ux(".section_page_tabs .add_page_btn").onEach("click", addNewTab);
        ux(".section_page_content .tab_title").onEach("keyup", (event, tab_index) => {
            onUpdateTabTitle(event, tab_index);
        });
        bindOpenTabLink();
    }
    

    if(callback){
        callback();
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    ux("#add_page_tabs_btn").on("click", addNewSectionContent);
    initializeEditSectionEvents();
    RedactorX("#section_pages .tab_content", { focus: true });

});

function onUpdateTabTitle(event, tab_index){
    let tab_title = event.target;
    let section_page_content = ux(tab_title.closest(".section_page_content"));
    let section_page_tabs_list = section_page_content.find(".section_page_tabs");
    section_page_tabs_list.find(`.page_tab_item:nth-child(${tab_index}) a`).text(tab_title.value);
}

function bindOpenTabLink(ux_target = null){
    console.log("ux_target", ux_target)
    if(ux_target){
        /** For dynamically added sections */
        ux_target.findAll((".section_page_tabs .page_tab_item")).forEach((page_tab_link, tab_index) => {
            ux(page_tab_link).on("click", (link_event) => {
                openTabLink(link_event, tab_index + 1);
            });
        })
    } else {
        
        ux(".section_page_tabs .page_tab_item").onEach("click", (event, tab_index) =>{
            openTabLink(event, tab_index);
        });
    }
}

function openTabLink(event, tab_index){
    let tab_item = event.target;
    let section_page_content = ux(tab_item.closest(".section_page_content"));
    let section_page_tabs_list = ux(tab_item.closest(".section_page_tabs"));

    section_page_tabs_list.findAll(".page_tab_item").forEach(element => element.classList.remove("active"))
    section_page_content.findAll(".section_page_tab").forEach(element => element.classList.remove("show"))
    
    setTimeout(() => {
        section_page_tabs_list.find(`.page_tab_item:nth-child(${tab_index})`).addClass("active")
        section_page_content.find(`.section_page_tab:nth-child(${tab_index + 1})`).addClass("show")
    });
}

function addNewSectionContent(event){
    event.preventDefault();
    let section_pages = ux("#section_pages");
    let section_page_content = ux("#clone_section_page .section_page_content").clone();
    section_page_content.find(".page_tab_item").addClass("active");
    section_page_content.find(".section_page_tab").addClass("show");
    section_pages.html().append(section_page_content.html());

    /** Rebind Event Listeners */
    initializeEditSectionEvents(section_page_content);
}

function addNewTab(event){
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
    
    page_tab_clone.find(".tab_title").on("keyup", (event) => {
        onUpdateTabTitle(event, section_page_tabs_list.findAll(".page_tab_item").length);
    });
    bindOpenTabLink(section_page_content);

    setTimeout(() => {
        /** Auto click new tab */            
        page_tab_item.html().dispatchEvent(new Event("click", { 'bubbles': true }));
    });
}
