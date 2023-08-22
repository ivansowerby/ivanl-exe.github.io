$().ready(() => {
    const query = new URLSearchParams(window.location.search);
    if(query.has("hash")) {
        const hash = query.get("hash");
        getBlog(
            hash,
            (blog) => {
                if(blog.hasOwnProperty("title")) {
                    const title = blog.title;
                    $("title").text(title);
                }
            }
        ).then((blog) => {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(blog);

            const blogContainer = $(".blog-container");
            const blogItem = addElement(blogContainer, "div", "blog-item");
            blogItem.html(html);
            fragmentHeadings(blogItem);
        });
    }
});

async function getBlog(hash, parse) {
    const library = new Library("../json/library/index.json");
    return await library.load().then(() => {
        for(const blog of library.books) {
            if(!blog.hasOwnProperty("hash") || blog.hash != hash) { continue; }
            parse(blog);
            return loadBlog(blog);
        }
    });
}

async function loadBlog(blog) {
    const filepath = [
        "../json/library",
        blog.filepath
    ].join("/");
    return await $.get(filepath, (data, statusCode) => {
        if(statusCode == "success") { return data; }
        else { return "# Oops...\n## That hash does not exist!"; }
    });
}