const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const SYMBOLS = "¬`!\"£$%^&*()_+{}~@:?></.,;'#][=-|\\"

function randrange(a, b) {
    return Math.floor(
        Math.random() * (b - a - 1)
    ) + a;
} 

function random_alpha() {
    character = ALPHABET[randrange(
        0,
        ALPHABET.length + 1
    )];
    if(Math.random() > 0.5) {
        character = character.toUpperCase();
    }
    return character;
}

function random_symbol() {
    character = SYMBOLS[randrange(
        0,
        SYMBOLS.length + 1
    )];
    return character;
}

const NONE = [0, 0];

function random_color(red, green, blue) {
    if(red === undefined) {
        red = NONE;
    }
    if(green === undefined) {
        green = NONE;
    }
    if(blue === undefined) {
        blue = NONE;
    }
    let code = [];
    let rgb = [
        red,
        green,
        blue
    ]
    for(let i = 0; i < 3; i++) {
        let [min, max] = rgb[i];
        code.push(randrange(
            min,
            max
        ));
    }
    return "rgb(" + code.join(",") + ")";
}

//British alternative
function random_colour() {
    return random_color();
}