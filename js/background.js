const BACKGROUND_CONTAINER_BY_ID = document.getElementById(
    "background-container"
);

const BACKGROUND_BY_ID = document.getElementById(
    "background"
);

background_refresh_rate = 500;
if(isMobile) {
    background_refresh_rate = Infinity;
    BIO_BY_ID.style.position = "static";
}

const BACKGROUND_BLANK_GLYTH = '~'
const BACKGROUND_NEWLINE = '<wbr>'

const BACKGROUND_MAX = 30;
const BACKGROUND_WIDTH = BACKGROUND_MAX;
const BACKGROUND_HEIGHT = 1;

const BACKGROUND_RESOLUTION = [
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT
];

let PIXEL_LIMIT = "5%";

let glyth_background = new GlythBackground(
    BACKGROUND_RESOLUTION,
    PIXEL_LIMIT,
    BACKGROUND_BLANK_GLYTH,
);

setInterval(async function() {
    let font_size = BACKGROUND_CONTAINER_BY_ID.clientWidth * 2 / BACKGROUND_WIDTH;
    BACKGROUND_BY_ID.style.fontSize = font_size.toString() + "px";

    let height = Math.floor(
        BIO_BY_ID.clientHeight / font_size
    ) + 4;

    glyth_background.resize_height(
        height
    );

    let glyth = new Stryle(
        random_symbol()
    );
    glyth.color(
        "#656565",
        [0]
    )
    glyth_background.randomize(
        glyth
    );

    scene = glyth_background.scene;
    let canvas = glyth_background.export(
        "<br>",
        gravity = 1
    )
    BACKGROUND_BY_ID.innerHTML = canvas;
}, background_refresh_rate);