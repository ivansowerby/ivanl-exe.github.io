const USER_BY_ID = document.getElementById(
    "user"
);

function userChoice(alt) {
    let emoji = altToKey(alt);
    emoji = emojify(emoji);
    USER_BY_ID.innerHTML = emoji;
    playGame(alt);
    return alt;
}