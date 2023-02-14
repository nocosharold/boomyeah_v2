let sidenav_elems = document.querySelectorAll('.sidenav');
let sidenav_instances = M.Sidenav.init(sidenav_elems);
let select = document.querySelectorAll('select');
let dropdown = M.FormSelect.init(select);

ux("#search_documentation_field").on("keydown", onSearchDocumentation);
ux("#search_section_field").on("keydown", onSearchSection);

let search_timeout = null;
function onSearchDocumentation(event){
    clearTimeout(search_timeout);

    search_timeout = setTimeout(() => {
        let search_field = event.target;
        let search_value = search_field.value.toLowerCase();
        let matched_elements = [];
        
        if(search_value.trim().length){
            ux("#documentations").findAll(".document_block .document_details h2").forEach((search_element) => {
                let matching_value = search_element.innerText.toLowerCase();
                let document_block = search_element.closest(".document_block");
                ux(document_block).addClass("hidden");

                if(matching_value.indexOf(search_value) > -1){
                    matched_elements.push(document_block);
                }
            });

            if(matched_elements.length){
                matched_elements.forEach((matched_element) => ux(matched_element).removeClass("hidden"));
                return;
            }
        }

        ux("#documentations").findAll(".document_block").forEach((document_block) => {
            ux(document_block).removeClass("hidden");
        });
    }, 480);
}

function onSearchSection(event){
    clearTimeout(search_timeout);

    search_timeout = setTimeout(() => {
        let search_field = event.target;
        let search_value = search_field.value.toLowerCase();
        let matched_elements = [];
        
        if(search_value.trim().length){
            ux("#section_container").findAll(".section_block .section_details .section_title").forEach((search_element) => {
                let matching_value = search_element.value.toLowerCase();
                let section_block = search_element.closest(".section_block");
                ux(section_block).addClass("hidden");

                if(matching_value.indexOf(search_value) > -1){
                    matched_elements.push(section_block);
                }
            });

            if(matched_elements.length){
                matched_elements.forEach((matched_element) => ux(matched_element).removeClass("hidden"));
                return;
            }
        }

        ux("#section_container").findAll(".section_block").forEach((section_block) => {
            ux(section_block).removeClass("hidden");
        });
    }, 480);
}