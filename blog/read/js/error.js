class Error {
    constructor(parent) {
        this.parent = parent;
    }

    newMessage(...messages) {
        const errorContainer = addElement(this.parent, "div", "error-container");
        messages.forEach((message, i) => {
            const errorItem = addElement(errorContainer, "div", "error-item");
            $(errorItem[i]).text(message);
        });
    }
}