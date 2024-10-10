const getBaseUrl = (...subdomain) => {
    const protocol = window.location.protocol;
    const parsedHostname = psl.parse(window.location.hostname);
    const domain = parsedHostname.domain;
    return [
        protocol,
        [...subdomain, domain].join(".")
    ].join("//");
}

const getBlogUrl = () => {
    console.log(getBaseUrl());
    return getBaseUrl("blog");
}

const getAppUrl = () => {
    return getBaseUrl("app");
}