const CONTENT_BY_ID = document.getElementById(
    "content"
);

const WIP_BY_ID = document.getElementById(
    "work-in-progress"
);

let work_in_progess = new Stryle(
    "Work In Progress"
);

work_in_progess.color(
    "#FFFFFF",
    range(
        0,
        work_in_progess.length()
    )
);

const SUFFIXES = [
    ",",
    ".",
    "...",
    "?",
    ";",
    "\\n"
];

const FONT_SIZE_SCALE = 4;

let a = 0;
let b = 0;

setInterval(async function() {
    let suffix = SUFFIXES[b];
    let text = work_in_progess.slice(0, a);
    text += suffix;

    let size = work_in_progess.length() + suffix.length;

    let font_size = Math.min(
        CONTENT_BY_ID.clientWidth / size * FONT_SIZE_SCALE,
        convert_vw_to_px(10)
    );
    WIP_BY_ID.style.fontSize = font_size.toString() + "px";

    WIP_BY_ID.innerHTML = text;
    
    if(a == size - 1) {
        a = 0;
        b = wrap(
            b + 1,
            0, SUFFIXES.length
        );
    }
    a++;
}, 200);
