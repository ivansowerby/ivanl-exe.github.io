$(window).ready(() => {
    const year = new Date().getFullYear();
    const copyright = $("<a>");
    copyright.attr("id", "copyright");
    copyright.text(`© ${year}`);
    $("body").append(copyright);
    
    const copyrightURL = "https://www.mozilla.org/en-US/MPL/2.0"
    copyright.on("click", () => {
        window.open(copyrightURL, "_blank");
    });
});