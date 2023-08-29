const fontSize = 40;
const fontFamily = "Space Grotesk";

const divisions = 100;

$().ready(() => {
    const canvas = $("#background");
    let graph = new Graph(canvas);

    const multiplier = 2;
    $(window).on("resize", () => {
        graph.resize(multiplier)
    }).trigger("resize");

    const [gradientFrom, gradientTo] = [[250, 100, 0], [255, 200, 100]];
    const gradient = new Gradient(gradientFrom, gradientTo);

    let position = 0;
    beginInterval(() => {
        const topMargin = fontSize / canvas.height() / 2;
        const equation = (x) => 1 - (Math.sin(x * 2 * Math.PI) + 1) / 2 * (1 - topMargin) - (topMargin / 2);
        const variable = {x: position / divisions};
        const color = gradient.color.toRGB();
        const style = {
            fillStyle: color,
            font: `${fontSize}px ${fontFamily}`
        };

        if(position != 0 && position % divisions == 0) {
            gradient.reverseDirection();
        }
        if(position > divisions) {
            graph = shiftGraph(graph, -1);
        }

        graph.plot(equation, variable, style);
        gradient.progress(divisions);
        position++;
        graph.clear();
        graph.draw();
    }, 1000 / 24);
});

const beginInterval = (func, interval) => {
    func();
    setInterval(func, interval);
}

class Glyph {
    constructor(glyph, [x, y], style = null) {
        this.glyph = glyph;
        this.style = style;
        [this.x, this.y] = [x, y];
    }

    moveX(dx) {
        this.x += dx;
    }

    moveY(dy) {
        this.y += dy;
    }

    move([dx, dy]) {
        this.moveX(dx);
        this.moveY(dy);
    }
}

class Graph {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.get(0).getContext("2d");
        this.glyphs = [];
    }

    plot(f, obj, style = null) {
        const key = extractCoordinate(obj);
        if(key === null) { return null; }
        const otherAxis = otherAxe(key);
        const otherValue = f(obj[key]);
        Object.assign(obj, {[otherAxis]: otherValue});
        const alphanumeric = String.prototype.randomAlphanumeric();
        const glyph = new Glyph(alphanumeric, [obj.x, obj.y], style);
        this.update(glyph);
    }

    update(...glyphs) {
        this.glyphs.push(...glyphs);
    }

    resize(multiplier) {
        this.ctx.canvas.width = multiplier * this.canvas.width();
        this.ctx.canvas.height = multiplier * this.canvas.height();
    }

    draw() {
        this.glyphs.forEach((glyph) => {
            const x = glyph.x * this.ctx.canvas.width;
            const y = glyph.y * this.ctx.canvas.height;
            if(glyph.style.constructor == Object) {
                Object.entries(glyph.style).forEach(([key, value]) => {
                    this.ctx[key] = value;
                });
            }
            this.ctx.fillText(glyph.glyph, x, y);
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

const extractCoordinate = (obj) => {
    const keys = Object.entries(obj).map(([key, value]) => {
        if(Number.prototype.isNumber(value)) { return key; }
    });
    if((keys.includes("x") ^ keys.includes("y")) && keys.length == 1) {
        return keys[0];
    }
    return null;
}

const otherAxe = (axis) => {
    if(axis == "x") { return "y"; }
    else if(axis == "y") { return "x"; }
}

const shiftGraph = (graph, change) => {
    for(let i = graph.glyphs.length; i >= 0; i--) {
        const j = i - change;
        if(j >= graph.glyphs.length) { continue; }
        graph.glyphs[j].x = graph.glyphs[i].x;
    }
    graph.glyphs.shift();
    return graph;
}