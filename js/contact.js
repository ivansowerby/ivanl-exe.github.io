

DISCORD_USERNAME = "ivan.exe#9324";

function copy_discord_username() {
    let clipboard = DISCORD_USERNAME;
    navigator.clipboard.writeText(
        clipboard
    );
    notify(
        "Discord Username Copied " + tick("#ffcd83")
    );
}