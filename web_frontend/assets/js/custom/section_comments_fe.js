(function(){
    const current_location = window.location.pathname;
    const view_path = current_location.substring(0, current_location.lastIndexOf('/'));
    let relative_view_paths = view_path.split("views");
    const relative_view_path = relative_view_paths[0] + "views";
    let global_path = (view_path === "/views")? "." : "..";
    let swipe_value = 0;
    let is_comments_displayed = false;
    let swipe_timeout = null;

    const bindViewEvents = () => {
        ux(".comment_message").onEach("keydown", onCommentMessageKeypress);
        ux(".show_comments_btn").onEach("click", showTabComments);
        ux(".toggle_reply_form_btn").onEach("click", showReplyForm);
        ux(".toggle_replies_btn").onEach("click", showRepliesList);
        ux(".mobile_comment_btn").onEach("click", (event) => {
            onSubmitComment(event.target.closest(".mobile_add_comment_form"))
        });
    }

    document.addEventListener("DOMContentLoaded", async () => {
        await include("#user_view_comments" , `${relative_view_path}/global/user_view_section_comments.html`);

        ux("#section_pages").findAll("ul.comments_list").forEach((comments_list) => {
            if(!comments_list.classList.contains("replies_list")){
                ux(comments_list).findAll(".comment_container").forEach((comment_container) => {
                    showRepliesCount(comment_container);
                });
            }
        });

        ux(document).on("click", onElementClick);

        /** Mobile Device events */
        ux(document).on("touchstart", function (event){
            swipe_value = event.touches.item(0).clientX;
        });
        ux(document).on("touchend", function (event){
            swipe_value = 0;
            animateSwipe();
        });
        
        ux(document).on("touchmove", function (event){
            clearTimeout(swipe_timeout);
            let event_swipe_value = (event.touches.item(0).clientX);
            let mobile_comments_slideout = ux("#mobile_comments_slideout");
            let swipe_direction = (swipe_value > (event_swipe_value)) ? "left" : "right";

            if(is_comments_displayed){
                if(swipe_value > (event_swipe_value + SWIPE_OFFSET)){
                    if(mobile_comments_slideout.html().classList.contains("active")){
                        mobile_comments_slideout.removeClass("active");
                        let mobile_comment_message = mobile_comments_slideout.find(".mobile_add_comment_form .comment_message");
                        mobile_comment_message.html().value = "";
                        mobile_comment_message.html().blur();
                        
                        /** Wait for comments sidenav to completely hide */
                        setTimeout(() => {
                            is_comments_displayed = false;
                        }, 480);
                    }
                } else {
                    if(!mobile_comments_slideout.html().classList.contains("active")){
                        mobile_comments_slideout.addClass("active");
                    }
                }
            } else {
                let swipe_amount = swipe_value - event_swipe_value;
                
                /** Check swipe only on section pages */
                if(event.target.closest("#section_pages")){
                    if(Math.abs(swipe_amount) > (SWIPE_OFFSET / 2)){
                        animateSwipe(swipe_direction);
                    }
                    
                    if(Math.abs(swipe_amount) > SWIPE_OFFSET){
                        swipe_timeout = setTimeout(() => {
                            onSwipe(swipe_direction);
                        }, 148);
                    }
                }

            }

        });

        bindViewEvents();
    });
    
    async function animateSwipe(swipe_direction = ""){
        let active_section_page = ux("#section_pages .section_page_content.active");
        await active_section_page.removeClass("right");
        await active_section_page.removeClass("left");
        
        if(swipe_direction){
            active_section_page.addClass(swipe_direction);
        }
    }

    function onSwipe(swipe_direction){
        if(!is_comments_displayed){
            /** Move to prev/next section tab */
            if(swipe_direction == "right" && !ux("#prev_page_btn").html().classList.contains("hidden")){
                ux("#prev_page_btn").html().click();
            }

            if(swipe_direction == "left" && !ux("#next_page_btn").html().classList.contains("hidden")){
                ux("#next_page_btn").html().click();
            }
        }
    }
    
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

    function showRepliesList(event){
        event.stopImmediatePropagation();
        let show_replies_btn = event.target.closest(".toggle_replies_btn");
        let comment_item = event.target.closest(".comment_item");
        let replies_list  = ux(comment_item).find(".replies_list");
        
        if(!replies_list.html().classList.contains("show")){
            ux(show_replies_btn).addClass("hidden");
            replies_list.addClass("show");
        }
    }

    function showReplyForm(event){
        event.stopImmediatePropagation();
        let comment_item = event.target.closest(".comment_item");
        let reply_form = ux(comment_item).find(".add_reply_form");
        
        if(!reply_form.html()){
            reply_form = ux(comment_item.closest(".replies_list").closest(".comment_item").querySelector(".add_reply_form"));
            let label_text = "Replying to " + ux(comment_item).find(".user_name").text();
            reply_form.find("label").text(label_text);
        }
        
        if(!reply_form.html().classList.contains("show")){
            reply_form.addClass("show");
        }

        reply_form.find(".comment_message").html().focus();
    }

    function closeCommentActions(){
        ux(document).findAll(".comment_actions_toggle").forEach((element) => ux(element).removeClass("active"));
        ux("#comment_actions_container").removeClass("active");
        (ux(".active_comment_item").html()) && ux(".active_comment_item").removeClass("active_comment_item");
    }

    function onSubmitComment(post_form, is_reply = false){
        if(post_form.hasOwnProperty("type")){
            post_form.preventDefault();
            post_form.stopImmediatePropagation();
            post_form = post_form.target;
        }
        let is_mobile_comment = post_form.classList.contains("mobile_add_comment_form");
        let comment_message = ux(post_form).find(".comment_message").html().value;
        
        if(comment_message){
            let comment_container = post_form.closest(".comment_container");
            let comment_item = ux("#comments_list_clone .comment_item").clone();
            let comments_list = ux(comment_container).find(".comments_list");
            comment_item.find(".comment_message").text(comment_message);

            if(is_mobile_comment){
                comments_list = ux("#comments_list_container .comments_list");
                ux("#comments_list_container").html().scrollTop = 0;
            }
            
            comments_list.html().prepend(comment_item.html());

            if(is_reply){
                comment_item.find(".comments_list").html().remove();
                comment_item.find(".add_comment_form").html().remove();
                comment_item.find(".reply_actions .toggle_replies_btn").html().remove();
                
                showRepliesCount(comment_container);
                ux(comment_container).find(".toggle_replies_btn").html().click();
                ux(post_form).find("label").text("Write a reply");
            }

            post_form.reset();
            ux(post_form).find(".comment_message").html().blur();
            bindViewEvents();
        }
        return false;
    }

    function showRepliesCount(comment_container){
        let comments_list = ux(comment_container).find(".replies_list");

        if(comments_list.html()){
            let reply_count = comments_list.findAll(".comment_item").length;
            let replies_text = reply_count + ` ${(reply_count == 1) ? "reply" : "replies"}`;
            ux(comment_container).find(".reply_count").text(replies_text);
        }
    }

    async function showTabComments(event){
        event.preventDefault();
        let mobile_comments_slideout = ux("#mobile_comments_slideout");
        mobile_comments_slideout.find("#user_comments_list").html().innerHtml = "";

        if(!mobile_comments_slideout.html().classList.contains("active")){
            await include("#user_comments_list" , `${relative_view_path}/global/user_view_section_comments.html`);
            mobile_comments_slideout.addClass("active");
            is_comments_displayed = true;
            bindViewEvents();
        }
    }

    function onEditComment(event){
        event.stopImmediatePropagation();
        let event_target = event.target;

        if(event_target.classList.contains("edit_btn")){
            let comment_details = event_target.closest(".comment_details");
            let comment_message_value = ux(comment_details).find(".comment_message").text();

            /** Show edit comment form */
            let edit_comment_form = ux("#clone_section_page .edit_comment_form").clone();
            let edit_comment_id = "post_comment_" + new Date().getTime();
            let comment_message_field = edit_comment_form.find(".comment_message");
            let comment_message_label = edit_comment_form.find("label");
            comment_message_field.html().value = comment_message_value;
            comment_message_field.attr("id", edit_comment_id);
            comment_message_label.attr("for", edit_comment_id);

            comment_details.closest(".comment_content").before(edit_comment_form.html());
            comment_message_field.on("keydown", onEditMessageKeypress);
            comment_message_field.html().focus();

            setTimeout(() => {
                comment_message_field.html().dispatchEvent(new KeyboardEvent("keyup", {"key":"a"}));
            }, 148);
            closeCommentActions();
        }
    }

    async function onDeleteComment(event){
        let event_target = event.target;

        if(event_target.classList.contains("remove_btn")){
            let viewport_width = document.documentElement.clientWidth;
            let comment_container = null;
            
            if(event_target.closest(".replies_list")){
                comment_container = event_target.closest(".replies_list").closest(".comment_container");
            }

            if(viewport_width > MOBILE_WIDTH){
                await event_target.closest(".comment_item").remove();
            } else {
                ux(".active_comment_item").html().remove();
            }

            if(comment_container){
                showRepliesCount(comment_container);
            }

            await closeCommentActions();
        }
    }

    function toggleCommentActions(event){
        let event_target = event.target;

        if(event_target.classList.contains("comment_actions_toggle")){
            let viewport_width = document.documentElement.clientWidth;

            if(viewport_width > MOBILE_WIDTH){
                if(event_target.classList.contains("active")){
                    event_target.classList.remove("active");
                } else {
                    event_target.classList.add("active");
                }
            } else {
                event.stopImmediatePropagation();
                ux("#comment_actions_container").addClass("active");
                ux(event_target.closest(".comment_item")).addClass("active_comment_item");
            }
        }
    }

    function onEditMessageKeypress(event){
        event.stopImmediatePropagation();
        let comment_message = event.target;
        let edit_comment_form = comment_message.closest(".edit_comment_form");
        
        if(event.which === KEYS.ENTER){
            event.preventDefault();
            
            let comment_message = ux(edit_comment_form).find(".comment_message").html().value;
            let comment_content = edit_comment_form.nextElementSibling;
            ux(comment_content).find(".comment_message").text(comment_message);
            ux(comment_content).find(".posted_at").addClass("edited");
        }
        
        if(event.which === KEYS.ESCAPE || event.which === KEYS.ENTER){
            /** Close edit form */
            edit_comment_form.remove();
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
