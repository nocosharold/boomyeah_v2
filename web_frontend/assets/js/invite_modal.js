// var invite = document.querySelectorAll('.modal');
// var show_modal = M.Modal.init(invite);

var drop = document.querySelectorAll('.role');
var show_dropdown = M.Dropdown.init(drop);

// var users = document.querySelectorAll('.users');
// var checkbox =  M.Dropdown.init(users, {closeOnClick:false});

var valid_email = true;
var invited_emails = [];

var invite_instance = null;
var role_instance   = null;

// var invited_emails = { emails: [], chips: []};

function initSelect(){
    var select_instance = M.FormSelect.init(document.querySelectorAll('select'));
}

function initChipsInstance(){
    var invite_instance = M.Chips.init(document.querySelector(".chips"), {
        onChipAdd: (e, email) => {
            addEmail(email.innerText.split("close")[0]);
        }
    });
}

function initRoleDropdown(){
    var role_instance = M.Dropdown.init(document.querySelectorAll('.role'));
}

function addEmail(email){
    invited_emails.push(email);
}

function addPeopleWithAccess(event){
    event.stopPropagation();

    if(invited_emails.length > 0){
        invited_emails.forEach( email => {
            const invited_user  = document.createElement("div");
            invited_user.className = "invited_user";

            const img_element  = document.createElement("img");
            img_element.setAttribute("src", "https://village88.s3.us-east-1.amazonaws.com/boomyeah_v2/jhaver.png");
            img_element.setAttribute("alt", "jhaver");
            invited_user.appendChild(img_element);

            const user_information = document.createElement("div");
            user_information.className = "invited_user_info";

            const email_text = document.createElement("h4");
            email_text.innerHTML = email;
            user_information.appendChild(email_text);
            invited_user.appendChild(user_information);

            const invited_user_role = document.createElement("select");
            invited_user_role.setAttribute("id", "invited_user_role");
            invited_user_role.className = "invited_user_role";

            const viewer_option         = document.createElement("option");
            viewer_option.value         = "Viewer";
            viewer_option.innerHTML     = "Viewer";
            invited_user_role.appendChild(viewer_option);

            const editor_option      = document.createElement("option");
            editor_option.value         = "Editor";
            editor_option.innerHTML     = "Editor";
            invited_user_role.appendChild(editor_option);

            invited_user.appendChild(invited_user_role);

            ux(".invited_users_wrapper").html().appendChild(invited_user);
            initSelect();
        });
    }

    invited_emails = [];
    initChipsInstance();
}

// function validateEmail(event){
    // const sample_users = [
    //     {
    //         "name": "Erick Caccam",
    //         "email": "ecaccam@village88.com",
    //         "img_url": "https://village88.s3.us-east-1.amazonaws.com/boomyeah_v2/mc.png"
    //     },
    //     {
    //         "name": "Jadee Ganggangan",
    //         "email": "jganggangan@village88.com",
    //         "img_url": "https://village88.s3.us-east-1.amazonaws.com/boomyeah_v2/mc.png"
    //     },
    //     {
    //         "name": "Jovic Abengona",
    //         "email": "jabengona@village88.com",
    //         "img_url": "https://village88.s3.us-east-1.amazonaws.com/boomyeah_v2/jhaver.png"
    //     },
    //     {
    //         "name": "Harold Nocos",
    //         "email": "hnocos@village88.com",
    //         "img_url": "https://village88.s3.us-east-1.amazonaws.com/boomyeah_v2/jhaver.png"
    //     },
    //     {
    //         "name": "Kei Kishimoto",
    //         "email": "kkishimito@village88.com",
    //         "img_url": "https://village88.s3.us-east-1.amazonaws.com/boomyeah_v2/kb.png"
    //     }
    // ]
    // let invite_results = [];
    // let search_input = event.target.value;

    // if(search_input){
    //     sample_users.find(user => {
    //         if((user.name.toLocaleLowerCase().includes(search_input.toLocaleLowerCase())) ||
    //         (user.email.toLocaleLowerCase().includes(search_input.toLocaleLowerCase()))){
    //             invite_results.push(user);
    //         }
    //     });
        
    //     /* No matching member message */
    //     if(!invite_results.length){
    //         valid_email = false;
    //         ux("#with_access_div").html().setAttribute("hidden", true);
    
    //         ux(".empty_search_wrapper #invite_result_msg").text(`Oops! Looks like there are no members that match “${search_input}”.`);
    //         ux(".empty_search_wrapper").html().removeAttribute("hidden");
    //     }
    //     /* Show matching members */
    //     else{
    //         let invite_dropdown = document.getElementById("add_invite");
    //         invite_dropdown.innerHTML = ""; /* remove existing element */
    //         valid_email = true;

    //         for(var user_index=0; user_index < invite_results.length; user_index++){
    //             invite_dropdown.innerHTML += `
    //                 <li class="add_invite_result">
    //                     <input class="choose_users" id="user_${user_index}" type="checkbox" />
    //                     <label for="user_${user_index}">
    //                         <img src="${invite_results[user_index].img_url}" alt="user_profile">
    //                         <div class="user_information">
    //                             <h4>${invite_results[user_index].name}</h4>
    //                             <p>${invite_results[user_index].email}</p>
    //                         </div>
    //                     </label>
    //                 </li>`;
    //         }

    //         let members_dropdown_btn = document.getElementById("add_invite_btn");
    //         M.Dropdown.init(members_dropdown_btn, {
    //             alignment: 'left',
    //             coverTrigger: false,
    //             autoTrigger: true,
    //             closeOnClick:false
    //         });

    //         if(!(M.Dropdown.getInstance(members_dropdown_btn).isOpen)){
    //             M.Dropdown.getInstance(members_dropdown_btn).open();
    //         }
    //     }
    // }
    // else{
    //     ux("#with_access_div").html().removeAttribute("hidden");
    //     ux(".empty_search_wrapper").html().setAttribute("hidden", true);
    // }

    // const email_chip_elem = document.querySelectorAll('.chips');
    // const email_address = event.target.value.replace(/\s/g, '');


    // const is_valid_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address);

    // if(is_valid_email){
    //     M.Chips.init(email_chip_elem);
    // }
    // else{
    //     if(event.keyCode === 13){
    //         event.stopPropagation();
    //         return false;
    //     }

    //     ux("#with_access_div").html().setAttribute("hidden", true);
    //     ux(".empty_search_wrapper #invite_result_msg").text(`Oops! “${email_address}” is invalid!`);
    //     ux(".empty_search_wrapper").html().removeAttribute("hidden");
    // }
// }

// function addSearchEmailResult(search_email_result){
//     const user_email = search_email_result.children[1].children[1].children[1].innerText;
//     const email_chip_elem = document.querySelectorAll('.chips');

//     if(!invited_emails.emails.includes(user_email) && valid_email){
//         invited_emails.emails.push(user_email);
//         invited_emails.chips.push({ tag: user_email });

//         const chip_instance_init = M.Chips.init(email_chip_elem, { 
//             data: invited_emails.chips,
//             onChipDelete: (e, email) => {
//                 invited_emails.emails = invited_emails.emails.filter(invited_email => invited_email != email.innerText.split("close")[0]);
//                 invited_emails.chips = invited_emails.chips.filter(invited_email => invited_email.tag != email.innerText.split("close")[0]);
//             }
//         });
//     }
// }