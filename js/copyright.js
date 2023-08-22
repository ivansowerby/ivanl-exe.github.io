$().ready(() => {
    const year = new Date().getFullYear();
    const copyright = $("<a>");
    copyright.attr("id", "copyright");
    copyright.text(`© ${year}`);
    $("body").append(copyright);
});