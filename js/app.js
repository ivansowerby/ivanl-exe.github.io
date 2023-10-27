$(window).ready(() => {
    const appURL = getAppUrl();

    const appContainer = $(".app-container");
    appContainer.on("click", () => {
        window.open(appURL, "_self");
    });
});