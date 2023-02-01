(function(){
    const bindViewEvents = () => {
        ux(".comment_message").onEach("keydown", onCommentMessageKeypress);
    }

    document.addEventListener("DOMContentLoaded", () => {
        bindViewEvents();
    })

    function onSubmitComment(post_form, is_reply = false){
        if(post_form.hasOwnProperty("preventDefault")){
            post_form.preventDefault();
            post_form.stopPropagation();
            post_form = post_form.target;
        }

        let comment_message = ux(post_form).find(".comment_message").html().value;
        let comment_container = post_form.closest(".comment_container");
        console.log("comment_message", comment_message);

        if(comment_message){
            let comment_item = ux("#comments_list_clone .comment_item").clone();
            console.log("onsubmit", comment_item.html(), is_reply);
            comment_item.find(".comment_message").text(comment_message);
            
            if(is_reply){
                comment_item.find(".comments_list").html().remove();
                comment_item.find(".add_comment_form").html().remove();
            }

            let comments_list = ux(comment_container).find(".comments_list");
            comments_list.html().append(comment_item.html());

            post_form.reset();
            ux(post_form).find(".comment_message").html().blur();
            bindViewEvents();
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
