(function(){
    let swipe_value = 0;

    const bindViewEvents = () => {
        ux(".comment_message").onEach("keydown", onCommentMessageKeypress);
        ux(".show_comments_btn").onEach("click", showTabComments);
    }

    document.addEventListener("DOMContentLoaded", async () => {
        await include("#user_view_comments" , `../views/global/user_view_section_comments.html`);

        ux(document).on("click", onElementClick);

        ux(document).on("touchstart", function (event){
            swipe_value = event.touches.item(0).clientX;
        });
        
        ux(document).on("touchmove", function (event){
            let mobile_comments_slideout = ux("#mobile_comments_slideout");

            if(swipe_value > (event.touches.item(0).clientX + 200)){
                if(mobile_comments_slideout.html().classList.contains("active")){
                    mobile_comments_slideout.removeClass("active");
                }
            } else {
                if(!mobile_comments_slideout.html().classList.contains("active")){
                    mobile_comments_slideout.addClass("active");
                }
            }
        });

        bindViewEvents();
    });

    function onElementClick(event){
        let event_target = event.target;
        let avoid_classes = ["comment_actions_toggle", "edit_btn", "remove_btn"];

        if( avoid_classes.some(avoid_class => event_target.classList.contains(avoid_class)) ){
            event.preventDefault();
            event.stopImmediatePropagation();
            toggleCommentActions(event);
            onEditComment(event);
            onDeleteComment(event);
        } else {
            closeCommentActions();
        }
    }

    function closeCommentActions(){
        ux(document).findAll(".comment_actions_toggle").forEach((element) => element.classList.remove("active"));
    }

    function onSubmitComment(post_form, is_reply = false){
        if(post_form.hasOwnProperty("preventDefault")){
            post_form.preventDefault();
            post_form.stopPropagation();
            post_form = post_form.target;
        }

        let comment_message = ux(post_form).find(".comment_message").html().value;
        let comment_container = post_form.closest(".comment_container");

        if(comment_message){
            let comment_item = ux("#comments_list_clone .comment_item").clone();
            comment_item.find(".comment_message").text(comment_message);
            
            if(is_reply){
                comment_item.find(".comments_list").html().remove();
                comment_item.find(".add_comment_form").html().remove();
            }

            let comments_list = ux(comment_container).find(".comments_list");
            comments_list.html().prepend(comment_item.html());

            post_form.reset();
            ux(post_form).find(".comment_message").html().blur();
            bindViewEvents();
        }
    }

    async function showTabComments(event){
        event.preventDefault();
        let mobile_comments_slideout = ux("#mobile_comments_slideout");
        mobile_comments_slideout.find("#user_comments_list").html().innerHtml = "";

        if(!mobile_comments_slideout.html().classList.contains("active")){
            await include("#user_comments_list" , `../views/global/user_view_section_comments.html`);
            mobile_comments_slideout.addClass("active");
            bindViewEvents();
        }

    }

    function onEditComment(event){
        let event_target = event.target;

        if(event_target.classList.contains("edit_btn")){
            closeCommentActions();
            /** TODO: Show edit comment form */
        }
    }

    function onDeleteComment(event){
        let event_target = event.target;

        if(event_target.classList.contains("remove_btn")){
            closeCommentActions();
            event_target.closest(".comment_item").remove();
        }
    }

    function toggleCommentActions(event){
        let event_target = event.target;

        if(event_target.classList.contains("comment_actions_toggle")){
            if(event_target.classList.contains("active")){
                event_target.classList.remove("active");
            } else {
                event_target.classList.add("active");
            }
        }
    }

    function onCommentMessageKeypress(event){
        event.stopImmediatePropagation();
        let comment_message = event.target;
        let post_form = comment_message.closest(".add_comment_form");

        if(event.which === KEYS.ENTER){
            event.preventDefault();
            onSubmitComment(post_form, comment_message.closest(".comments_list"));
        }
    }
})();
