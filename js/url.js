const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const parsedHostname = psl.parse(window.location.hostname);
    const domain = parsedHostname.domain;
    return [protocol, domain].join("//")
}

const getBlogUrl = () => {
    return [getBaseUrl(), "blog"].join("/");
}

const getAppUrl = () => {
    return [getBaseUrl(), "app"].join("/");
}