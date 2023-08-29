const getBlogTopMargin = () => {
    return $(document).outerHeight() - $(".top-blog-item").innerHeight(); 
}

const scrollToBlogElement = (hash) => {
    const margin = getBlogTopMargin();
    scrollToElement(hash, margin);
}

const scrollToBlogFragment = () => {
    const margin = getBlogTopMargin();
    scrollToFragment(margin);
}

const fragmentHeadings = (...parentSelectors) => {
    const _class = "heading-container";
    const headings = Array(6).fill("h").map((s, i) => {
        const heading = `${s}${i + 1}`;
        return parentSelectors.map((selector) => `${selector} ${heading}`).join(", ");
    });
    const headingContainer = $("<div>");
    headingContainer.attr("class", _class)
    $(headings).wrap(headingContainer);
    
    const headingContainers = $(`.${_class}`);
    const fragmentImageSrc = "img/tag_FILL0_wght700_GRAD200_opsz48.svg";
    const fragmentButton = addImageWithinButton(headingContainers, "heading-fragment-button", fragmentImageSrc, BEFORE_ELEMENT)
    fragmentButton.on("click", (e) => {
        const child = $(e.target);
        const grandparent = ancestor(2, child);
        const granduncle = grandparent.siblings();
        const hash = granduncle.attr("id");
        scrollToBlogElement(hash);
        window.location.hash = hash;
        createNotification();
    });
}

const traverse = (n, element, locomotion) => {
    if(n <= 0) {
        return element;
    } else {
        n--;
        return ancestor(n, locomotion(element));
    }
}

const ancestor = (n, child) => {
    return traverse(n, child, (element) => element.parent());
}