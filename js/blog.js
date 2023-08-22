$().ready(() => {
    const baseURL = [
        window.location.protocol,
        window.location.host
    ].join("//")
    const blogURL = [baseURL, "blog"].join("/")

    const blogContainer = $(".blog-container");
    blogContainer.on("click", () => {
        window.open(blogURL, "_self");
    });
});