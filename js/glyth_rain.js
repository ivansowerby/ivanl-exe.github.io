class GlythRain {
    constructor(resolution, blank_glyth = "~") {
        this.resolution = resolution;
        this.blank_glyth = blank_glyth;
        [this.width, this.height] = resolution;

        this.scene = [];
    }
    import(glyth, position) {
        if(position === undefined) {
            position = randrange(
                0,
                this.width
            );
        }

        this.scene.push(new Item(
            new Raindrop(
                glyth
            ),
            [
                position,
                randrange(
                    0,
                    this.height
                )
            ]
        ));
    }

    fall() {
        for(let i = 0; i < this.scene.length; i++) {
            let view = this.scene[i];
            let y = view.coordinates[1];
            y = wrap(
                y + view.item["rate"],
                0,
                this.height,
            );
            view.coordinates[1] = y;
        }
    }

    export(newline = "\n", style) {
        if(style[-1] != ";") {
            style += ";";
        }

        let canvas = "";
        let scene = Array(this.height).fill(null).map(
            () => Array(this.width).fill(this.blank_glyth)
        );
        for(let i = 0; i < this.scene.length; i++) {
            let view = this.scene[i];
            let [x, y] = view.coordinates;
            scene[y][x] = view.item["glyth"];
        }

        for(let y = 0; y < this.height; y++) {
            canvas += '<span style="' + style + '">';
            for(let x = 0; x < this.width; x++) {
                canvas += scene[y][x];
            }
            canvas += "</span>" + newline;
        }
        return canvas;
    }
}

class Raindrop {
    constructor(glyth, rate = 1) {
        this.glyth = glyth;
        this.rate = rate;
    }
}

class Item {
    constructor(item, coordinates) {
        this.item = item;
        this.coordinates = coordinates;
    }
}