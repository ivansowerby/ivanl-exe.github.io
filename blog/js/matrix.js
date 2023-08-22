$().ready(() => {
    const canvas = $("#background");
    const canvasDOM = canvas.get(0);
    const ctx = canvasDOM.getContext("2d");

    window.matrix = new Matrix(ctx);

    $(window).on("resize", (e) => {
        //resize
        ctx.canvas.width = window.innerWidth;
        const height = ctx.canvas.height = window.innerHeight;
        //library
        const library = $(".library-container");
        const libraryWidth = cssUnitToFloat(library.css("width"));
        //regions
        const regionWidth = Math.max(ctx.canvas.width - libraryWidth, 0) / 2;
        matrix.activateRegions(
            [0, 0, regionWidth, height],
            [regionWidth + libraryWidth, 0, regionWidth, height]
        );
    }).trigger("resize");

    const animate = () => {
        // requestAnimationFrame(animate);
    }
    animate();
});

class Matrix {
    constructor(canvasCtx) {
        this.ctx = canvasCtx;
        this.glyphs = [];
        this.regions = []
    }

    activateRegions(...regions) {
        this.regions.push(regions);
    }
}

class Glyph {
    constructor(glyph, x, y) {
        this.glyph = glyph;
        [this.x, this.y] = [x, y];
    }

    moveX(dx) {
        this.x += dx;
    }

    moveY(dy) {
        this.y += dy;
    }
}