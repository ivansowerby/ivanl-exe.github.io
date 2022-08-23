const NOTIFICATION_BY_ID = document.getElementById(
    "notification"
);

function notify(text) {
    NOTIFICATION_BY_ID.innerHTML = text;
    NOTIFICATION_BY_ID.style.opacity = "100%";
}

let counter = 0;
setInterval(async function() {
    let value = NOTIFICATION_BY_ID.style.opacity;
    if(value > 0) {
        value -= 0.005;
        NOTIFICATION_BY_ID.style.opacity = value;
    }
    counter++;
}, 10)