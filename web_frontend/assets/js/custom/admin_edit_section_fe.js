document.addEventListener("DOMContentLoaded", ()=>{
    ux("#add_page_tabs_btn").on("click", addNewSectionContent);
    initializeEditSectionEvents();
    RedactorX("#section_pages .tab_content", { focus: true });
});

function initializeEditSectionEvents(ux_target = null, callback = null){
    if(ux_target){
        ux_target.find(".section_page_tabs .add_page_btn").on("click", addNewTab);
        ux_target.find(".section_page_tabs .remove_tab_btn").on("click", removeSectionTab);
        bindOpenTabLink(ux_target);

        ux_target.findAll((".tab_title")).forEach((tab_title, tab_index) => {
            ux(tab_title).on("keyup", (event) => {
                onUpdateTabTitle(event, tab_index + 1);
            });
        });
    }
    else{
        ux(".section_page_tabs .add_page_btn").onEach("click", addNewTab);
        ux(".section_page_tabs .remove_tab_btn").onEach("click", removeSectionTab);
        ux(".section_page_content .tab_title").onEach("keyup", (event, tab_index) => {
            onUpdateTabTitle(event, tab_index);
        });
        bindOpenTabLink();
    }

    if(callback){
        callback();
    }
}

function onUpdateTabTitle(event, tab_index){
    let tab_title = event.target;
    let section_page_content = ux(tab_title.closest(".section_page_content"));
    let section_page_tabs_list = section_page_content.find(".section_page_tabs");
    section_page_tabs_list.find(`.page_tab_item:nth-child(${tab_index}) a`).text(tab_title.value);
}

function bindOpenTabLink(ux_target = null){
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
        section_page_tabs_list.find(`.page_tab_item:nth-child(${tab_index})`).addClass("active");
        section_page_content.find(`.section_page_tab:nth-child(${tab_index + 1})`).addClass("show")
            .find(".tab_title").html().select();
    });
}

function addNewSectionContent(event){
    event.preventDefault();
    let tab_id = `tab_${ new Date().getTime()}`;
    let section_pages = ux("#section_pages");
    let section_page_content = ux("#clone_section_page .section_page_content").clone();
    let section_page_tab = section_page_content.find(".section_page_tab");
    section_page_content.find(".page_tab_item").addClass("active");
    section_page_tab.addClass("show");
    section_pages.html().append(section_page_content.html());
    section_page_tab.html().id = tab_id;
    section_page_content.find(".section_page_tab .tab_title").html().select();
    section_page_content.find(".section_page_tabs .page_tab_item").html()
        .setAttribute("data-tab_id", tab_id);

    /** Rebind Event Listeners */
    initializeEditSectionEvents(section_page_content);

    RedactorX(`#${tab_id} .tab_content`, { focus: true });
}

function addNewTab(event){
    event.preventDefault();
    let tab_item = event.target;
    let add_page_tab = event.target.closest(".add_page_tab");
    let section_page_content = ux(tab_item.closest(".section_page_content"));
    let section_page_tabs_list = ux(tab_item.closest(".section_page_tabs"));
    let page_tab_clone = ux("#clone_section_page .section_page_tab").clone();
    let page_tab_item = ux("#clone_section_page .page_tab_item").clone();
    let tab_id = `tab_${ new Date().getTime()}`;
    page_tab_clone.html().id = tab_id;
    section_page_content.html().append(page_tab_clone.html());
    
    /** Insert New tab */
    section_page_tabs_list.html().append(page_tab_item.html());
    section_page_tabs_list.html().append(add_page_tab);
    page_tab_item.find(".remove_tab_btn").on("click", removeSectionTab);
    
    page_tab_clone.find(".tab_title").on("keyup", (event) => {
        onUpdateTabTitle(event, section_page_tabs_list.findAll(".page_tab_item").length);
    });
    page_tab_item.html().setAttribute("data-tab_id", tab_id);
    
    bindOpenTabLink(section_page_content);
    
    setTimeout(() => {
        RedactorX(`#${tab_id} .tab_content`, { focus: true });
        
        /** Auto click new tab */            
        page_tab_item.html().click();
    });
}

function removeSectionTab(event){
    event.stopPropagation();

    let remove_tab_btn = event.target;
    let tab_item = remove_tab_btn.closest(".page_tab_item");
    let section_page_content = remove_tab_btn.closest(".section_page_content");
    let section_page_tabs = remove_tab_btn.closest(".section_page_tabs");
    let tab_id = tab_item.getAttribute("data-tab_id");
    
    ux(`#${tab_id}`).html().remove();
    tab_item.remove();
    
    setTimeout(() => {
        if(ux(section_page_tabs).findAll(".page_tab_item").length === 0){
            section_page_content.remove();
        }else{
            ux(section_page_tabs).findAll(".page_tab_item")[0].click();
        }
    });
}