const fragmentHeadings = (parent) => {
    const _class = "heading-container";
    const headings = Array(6).fill("h").map((s, i) => { return `${s}${i + 1}`; });
    const headingContainer = $("<div>");
    headingContainer.attr("class", _class)
    $(headings.join(", ")).wrap(headingContainer);

    const headingContainers = $(`.${_class}`);
    const fragmentImageSrc = "img/tag_FILL0_wght700_GRAD200_opsz48.svg";
    const fragmentButton = addImageWithinButton(headingContainers, "heading-fragment-button", fragmentImageSrc)
    fragmentButton.on("click", (e) => {
        const child = $(e.target);
        const grandparent = ancestor(2, child);
        const granduncle = grandparent.siblings();
        const hash = granduncle.attr("id");
        window.location.hash = hash;
        createNotification();
    });
}

const ancestor = (n, child) => {
    if(n <= 0) {
        return child;
    } else {
        n--;
        return ancestor(n, child.parent());
    }
}