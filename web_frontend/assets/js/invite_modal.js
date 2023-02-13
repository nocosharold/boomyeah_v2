// var invite = document.querySelectorAll('.modal');
// var show_modal = M.Modal.init(invite);

// var drop = document.querySelectorAll('.role');
// var show_dropdown = M.Dropdown.init(drop);

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
        placeholder: "Enter email address",
        secondaryPlaceholder: "Enter email address",
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

            const user_information = document.createElement("div");
            user_information.className = "invited_user_info";

            const email_text = document.createElement("p");
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
