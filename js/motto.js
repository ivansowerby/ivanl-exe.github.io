let reinventing = new Stryle(
    "Reinventing the Wheel"
);

reinventing.style(
    "font-style:italic;",
    range(15, 20)
);

let advocate = new Stryle(
    "Bitcoin Advocate"
);

advocate.color(
    "#FF9900",
    range(0, 6)
);

let effiency = new Stryle(
    "Effiency Maximalist"
)

effiency.style(
    "font-size:1.75em;",
    range(9, 18)
);

const MOTTOS = [
    reinventing,
    advocate,
    effiency
];

const DELAY = 3;
const MOTTO_REFRESH = 100;

let a = 0;
let b = 0;
setInterval(async function() {
    motto = MOTTOS[b];
    
    document.getElementById(
        "motto"
    ).innerHTML = motto.slice(0, a);

    if(a == motto.length() + DELAY * 1000 / MOTTO_REFRESH) {
        b = wrap(
            b + 1,
            0, MOTTOS.length
        );
        a = 0;
    }
    a++;
}, MOTTO_REFRESH);