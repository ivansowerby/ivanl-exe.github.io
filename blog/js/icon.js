$().ready(() => {
    const baseURL = [
        window.location.protocol,
        window.location.host
    ].join("//")

    const icon = $("#icon");
    icon.on("click", () => {
        window.open(baseURL, "_self");
    });
});