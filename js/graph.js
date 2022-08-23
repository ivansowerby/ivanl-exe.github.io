const CONTENT_BY_ID = document.getElementById(
    "content"
);

const GRAPH_BY_ID = document.getElementById(
    "graph"
);

const GRAPHS = [
    new Graph(
        "Math.pow(x, 3)",
        range = [-5, 5]
    ),
    new Graph(
        "Math.sin(x)",
        range = [0, 2 * Math.PI]
    ),
    new Graph(
        "Math.cos(x)",
        range = [0, 2 * Math.PI]
    ),
    new Graph(
        "log(x, 2)",
        range = [1, 5]
    ),
    new Graph(
        "Math.pow(x, 2)",
        range = [0, 5]
    )
]

const GRAPH_BLANK_GLYTH = '~'
const GRAPH_NEWLINE = '<br>'

const GRAPH_MAX = 75;
const GRAPH_WIDTH = GRAPH_MAX
const GRAPH_HEIGHT = 1;

const GRAPH_RESOLUTION = [
    GRAPH_WIDTH,
    GRAPH_HEIGHT
];

let glyth_graph = new GlythGraph(
    GRAPH_RESOLUTION,
    GRAPH_BLANK_GLYTH
);

let pause = false;

let rotate = 0;
let position = 0;
setInterval(async function() {
    let font_size = CONTENT_BY_ID.clientWidth * 2 / GRAPH_WIDTH;
    GRAPH_BY_ID.style.fontSize = font_size.toString() + "px";

    let height = Math.floor(
        window.innerWidth / 1280 * 10
    ) + 16;
    glyth_graph.resize_height(
        height
    );
    
    if(pause == true) {
        return null;
    }

    let graph = GRAPHS[rotate];
    let glyth = new Stryle(
        random_alpha()
    );
    glyth.color(
        random_color(
            [255, 255],
            [180, 255],
            [0, 255],
        ),
        [0]
    );

    glyth_graph.draw(
        position,
        graph,
        glyth
    );

    let cutoff = CONTENT_BY_ID.clientHeight;
    let start = Math.floor(
        cutoff / 3
    );

    let current = window.pageYOffset;
    let shift = 0;
    if(current >= start) {
        shift = Math.floor(
            Math.min(
                (current - start) / cutoff,
                1
            ) * (height - 1)
        );
    }

    let canvas = glyth_graph.export(
        newline = GRAPH_NEWLINE,
        style = "",
        shift
    );
    GRAPH_BY_ID.innerHTML = canvas;

    position++;
    if(position == GRAPH_WIDTH) {
        position = 0;
        rotate = wrap(
            rotate + 1,
            min = 0,
            max = GRAPHS.length
        );
        if(rotate == 2) {
            return null;
        }
        glyth_graph.clear();
    }
}, 50);

const PLAY_BUTTON = document.getElementById(
    "play-graph-icon"
);
function play_graph() {
    if(pause == true) {
        pause = false;
        PLAY_BUTTON.src = "img/flaticon/pause.png";
    }
    else {
        pause = true;
        PLAY_BUTTON.src = "img/flaticon/play.png";
    }
}

const COPY_BUTTON = document.getElementById(
    "copy-graph-icon"
);
function copy_graph() {
    let clipboard = GRAPH_BY_ID.innerText;
    navigator.clipboard.writeText(
        clipboard
    );
}