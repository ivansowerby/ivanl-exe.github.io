$(window).ready(() => {
    const githubUserURL = "https://github.com/ivansowerby";

    const githubContainer =  $(".github-container");
    githubContainer.on("click", () => {
        window.open(githubUserURL, "_target");
    });
});