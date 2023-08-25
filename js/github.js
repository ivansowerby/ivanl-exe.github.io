$().ready(() => {
    const githubUserURL = "https://github.com/ivanl-exe";

    const githubContainer =  $(".github-container");
    githubContainer.on("click", () => {
        window.open(githubUserURL, "_target");
    });
});