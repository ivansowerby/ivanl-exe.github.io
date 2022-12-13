const PATH = "https://ivan.engineer/game/rock-paper-scissors/json/emoji.json";
const EMOJIS = loadJSON(PATH);

emojifyDocument(document.body);

function emojify(string) {
    for(const [key, value] of Object.entries(EMOJIS)) {
        const [alt, src] = [value["alt"], value["src"]];
        const emoji = `<img alt="${alt}" src="${src}">`;
        string = string.replaceAll(
            key, emoji
        );
    }
    return string;
}

function emojifyDocument(element) {
    element.innerHTML = emojify(element.innerHTML);
}

function altToKey(alt) {
    for(const [key, value] of Object.entries(EMOJIS)) {
        if(alt == value["alt"]) {
            return key;
        } 
    }
}

function idToKey(id) {
    for(const [key, value] of Object.entries(EMOJIS)) {
        if(id == value["id"]) {
            return key;
        } 
    }
}

function altToId(alt) {
    for(const [key, value] of Object.entries(EMOJIS)) {
        if(alt == value["alt"]) {
            return value["id"];
        } 
    }
}

function keyToAlt(_key) {
    for(const [key, value] of Object.entries(EMOJIS)) {
        if(_key == key) {
            return value["alt"];
        } 
    }
}