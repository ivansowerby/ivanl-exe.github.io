const addElement = (parent, tag, _class = null) => {
    const child = $(`<${tag}>`);
    if(_class != null) { child.attr("class", _class); }
    parent.append(child);
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