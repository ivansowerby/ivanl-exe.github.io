class HeaderPlan {
    constructor(path = "json/header.json") {
        this.path = path;
    }

    async load() {
        return Object.entries(
            await $.getJSON(this.path)
                .fail(() => this.load())
        );
    } 
}

class StatusPlan {
    constructor(path = "json/status.json") {
        this.path = path;
    }

    async load() {
        return await $.getJSON(this.path)
            .fail(() => this.load());
    }
}

const CHECKING_STATUS = "checking";
const VALID_STATUS = "valid";
const INVALID_STATUS = "invalid";

class Statuses {
    constructor(elements, statusPlan) {
        this.statusPlan = statusPlan;
        const header = addElement($("body"), "div", "header", BEFORE_ELEMENT);
        const headerContainer = addElement(header, "div", "header-container");
        addArea(elements.length, () => addElement(headerContainer, "div", "status-container"));
        const statusContainers = $(".status-container");
        this.statusItems = addElement(statusContainers, "div", "status-item");
        for(const [containerSelector, [elementClass, elementsProperties]] of zip(this.statusItems, elements)) {
            const container = $(containerSelector);
            container.addClass(elementClass);
            for(const elementProperties of elementsProperties) {
                let attributes = elementProperties.attributes;
                const tag = elementProperties.tag;
                const _class = attributes.class;
                delete attributes.class;
                const element = addElement(container, tag, _class);
                element.attr(attributes);
                const content = elementProperties.content;
                element.html(content);
            }
        }
    }

    setStatus(status, ...parentClasses) {
        const selector = asJoinedClasses(...parentClasses);
        const container = this.statusItems.filter(selector);
        const statusObjects = this.statusPlan[status];
        for(const [statusClassName, statusClassProperties] of Object.entries(statusObjects)) {
            const item = container.findFrom(asJoinedClasses(statusClassName));
            item.edit(statusClassProperties)
        }
        return container;
    }
}

const styleBlogForHeader = () => {
    const header = $(".header");
    const headerHeight = header.innerHeight();
    const blogContainer = $(".blog-container");
    blogContainer.css("margin-top", `${headerHeight}px`);

    const blogItem = $(".blog-item").first();
    blogItem.addClass("top-blog-item");
}