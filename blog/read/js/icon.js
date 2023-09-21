$().ready(() => {
    const icon = $("#icon");
    const blogContainer = $(".blog-container");
    $(window).on("resize", () => {
        if(icon.outerWidth() * 2 + blogContainer.width() > window.innerWidth) {
            icon.css("display", "none");
        }
        else if(icon.css("display", "none")) {
            icon.css("display", "inline");
        }
    });
});