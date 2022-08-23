class GlythGraph {
    constructor(resolution, blank_glyth = "~") {
        this.resolution = resolution;
        this.blank_glyth = blank_glyth;
        [this.width, this.height] = resolution;
        this.scale = 1;
        
        this.scene = [];
    }

    resize_height(height) {
        this.scale = height / this.height;
        this.height = height;
        this.resolution[1] = height;
    }

    bounds(expression, range) {
        let [range_from, range_to] = range;
        let [x, y] = [range_from, null];
        let [min, max] = [Infinity, -Infinity];
        while(x <= range_to) {
            y = eval(expression);
            if(y < min) {
                min = y;
            }
            if(y > max) {
                max = y;
            }
            x += (range_to - range_from) / this.width;
        }
        return [min, max];
    }

    draw(position, graph, glyth, expression, range, bounds) {
        if(graph != undefined) {
            expression = graph.expression;
            range = graph.range;
        }
        
        let [range_from, range_to] = range;
        if(bounds === undefined) {
            bounds = this.bounds(
                expression,
                range
            );
        }
        let [bounds_from, bounds_to] = bounds;

        let x = (
            range_to - range_from
        ) * position / (this.width - 1) + range_from;
        let value = Math.abs((this.height - 1) - Math.round(
            (this.height - 1) * (
                eval(expression) + Math.abs(bounds_from)
            ) / (bounds_to - bounds_from)
        ));

        this.scene.push(
            new Pixel(
                glyth.export(),
                [position, value]
            )
        )
    }

    clear() {
        this.scene = [];
    }

    export(newline = "\n", style, shift) {
        if(style[-1] != ";") {
            style += ";";
        }

        let scene = Array(this.height).fill(null).map(
            () => Array(this.width).fill(this.blank_glyth)
        );

        for(let position = 0; position < this.scene.length; position++) {
            let pixel = this.scene[position];
            let [x, y] = pixel.coordinates;
            
            y = Math.min(
                y + shift,
                this.height - 1
            ) * this.scale;
            y = Math.floor(y);

            if(x >= this.width || y >= this.height) {
                continue;
            }
            scene[y][x] = pixel.glyth;
        }
        
        let canvas = "";
        for(let i = 0; i < scene.length; i++) {
            let row =  scene[i].join("");
            canvas += '<span style="' + style + '">' + row + "</span>" + newline;
        }
        return canvas;
    }
}

class Graph {
    constructor(expression, range) {
        this.expression = expression;
        this.range = range;
    }
}