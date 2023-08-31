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