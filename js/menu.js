const MENU_BY_ID = document.getElementById(
    "menu"
);

const RATE = 10

let value = 80
let recorded = window.pageYOffset;
window.onscroll = function() {
    let current = window.pageYOffset;
    value = Math.min(
        Math.max(
            value + -(current - recorded) / RATE, 
            0
        ),
        80
    );
    MENU_BY_ID.style.opacity = value.toString() + "%";
    recorded = current;
}