function ux(selector){
    let self = (typeof selector === "string") ? document.querySelector(selector) : selector;
    
    return {
        html: () =>{
            return self;
        },
        on: (event, handler) => {
            self.addEventListener(event, handler);
        },
        onEach: (event, handler) =>{
            let elements = document.querySelectorAll(selector);
            elements.forEach((element, index, parent) => {
                element.addEventListener(event, (raw_event) => {handler(raw_event, index + 1)});
            });
        },
        addClass: (class_name)=>{
            self.classList.add(class_name);
            return ux(self);
        },
        removeClass: (class_name)=>{
            self.classList.remove(class_name);
            return ux(self);
        },
        clone: () => {
            let clone_element = self.cloneNode(true);
            return ux(clone_element);
        },
        find: (child_selector) => {
            return ux(self.querySelector(child_selector));
        },
        findAll: (child_selector) => {
            return self.querySelectorAll(child_selector);
        },
        text: (text_value) => {
            if(text_value){
                self.innerText = text_value;
            }

            return self.innerText;
        },
        attr: (attribute, attr_value = null) =>{
            if(attr_value){
                self.setAttribute(attribute, attr_value);
            }

            return self.getAttribute(attribute);
        }
    }
}