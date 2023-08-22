const scrollToElement = (fragment, speed = "slow") => {
    if(String.prototype.isAlpha(fragment.at(0))) { fragment = `#${fragment}`; }
    $("html, body").animate({
        scrollTop: $(fragment).offset().top
    }, speed);
}

const scrollToFragment = () => {
    const hash = window.location.hash;
    if(hash != "" && $(document.body).has(hash).length) {
        scrollToElement(hash);
    }
}