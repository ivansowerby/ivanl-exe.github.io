$(window).ready(() => {
    const EMAIL_ADDRESS = atob("bWVAaXZhbi5lbmdpbmVlcg==");
    
    const contactContainer = $(".contact-container");
    email = addChild(contactContainer, "a", "contact-item");
    email.attr({
        id: "email",
        href: `mailto:${EMAIL_ADDRESS}`
    });
    email.text(EMAIL_ADDRESS);
});