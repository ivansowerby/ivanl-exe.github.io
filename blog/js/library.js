$().ready(() => {
    const library = new Library();
    library.load().then(() => {
        for(const book_content of library.books) {
            const book = new Book(book_content);
            const shelf = $(".shelf-container"); 
            book.shelf(onto = shelf);
        }
        scrollToFragment();
    });
})