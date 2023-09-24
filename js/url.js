const getBaseUrl = () => {
    return [
        window.location.protocol,
        window.location.host
    ].join("//")
}

const getBlogUrl = () => {
    return [getBaseUrl(), "blog"].join("/");
}