const BEFORE_ELEMENT = true;
const AFTER_ELEMENT = false;

const addElement = (parent, tag, _class = null, relative = AFTER_ELEMENT) => {
    const child = $(`<${tag}>`);
    if(_class != null) { child.attr("class", _class); }
    if(relative == AFTER_ELEMENT) { parent.append(child); }
    else if(relative == BEFORE_ELEMENT) { parent.prepend(child); }
    const selector = tag + (_class != null ? `[class="${_class}"]` : "");
    return parent.children(selector);
}

const addArea = (n, add) => {
    let element = null;
    for(let i = 0; i < n; i++) {
        element = add();
    }
    return element;
}