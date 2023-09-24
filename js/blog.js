$().ready(() => {
    const blogURL = getBlogUrl();

    const blogContainer = $(".blog-container");
    blogContainer.on("click", () => {
        window.open(blogURL, "_self");
    });
});