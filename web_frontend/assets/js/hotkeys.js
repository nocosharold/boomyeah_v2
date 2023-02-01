document.addEventListener("DOMContentLoaded", () => {
    document.onkeydown = checkShortcut;
});

function checkShortcut(e){
    const current_path = window.location.pathname;
    const user_type = current_path.includes("admin") ? "admin" : "user";
    const SHORTCUT_VALUES = {
        "keyCode_49_url": `/views/${user_type}_documentation`,
        "keyCode_50_url": `/views/no_data/${user_type}_documentation`,
        "keyCode_51_url": `/views/small_data/${user_type}_documentation`,
        "keyCode_52_url": `/views/medium_data/${user_type}_documentation`,
        "keyCode_53_url": `/views/large_data/${user_type}_documentation`
    }

    let shortcut_event = window.event? event : e;

    if(shortcut_event.ctrlKey){
        let get_redirect_url = SHORTCUT_VALUES[`keyCode_${shortcut_event.keyCode}_url`];

        if(get_redirect_url){
            window.location.replace(`${document.location.origin}${get_redirect_url}`);
        }
    }
}