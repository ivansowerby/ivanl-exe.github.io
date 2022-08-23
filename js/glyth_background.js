class GlythBackground {
    constructor(resolution, limit, blank_glyth = "~") {
        this.resolution = resolution;
        this.blank_glyth = blank_glyth;
        this.limit = parseInt(
            limit.replace(
                "%",
                ""
            )
        ) / 100;
        [this.width, this.height] = resolution;

        this.scale = 1;

        this.scene = [];
    }

    resize_height(height) {
        this.scale = height / this.height;
        this.height = height;
        this.resolution[1] = height;
            
    }

    #random_coordinates() {
        return [randrange(0, this.width), randrange(0, this.height)];
    }

    randomize(glyth) {
        let length = this.width * this.height;
        if(this.scene.length > this.limit * length) {
            this.scene.pop();
        }

        let coordinates = this.#random_coordinates();

        this.scene.unshift(new Pixel(
            glyth.export(),
            coordinates
        ));
    }

    //British alternative
    randomise(glyth) {
        this.randomize(glyth);
    }

    export(newline = "\n", gravity = 0) {
        let scene = Array(this.height).fill(null).map(
            () => Array(this.width).fill(this.blank_glyth)
        );

        for(let position = 0; position < this.scene.length; position++) {
            let pixel = this.scene[position];
            let [x, y] = pixel.coordinates;
            y = wrap(
                y + 1,
                0, this.height
            );
            
            if(x >= this.width || y >= this.height) {
                continue;
            }
            scene[y][x] = pixel.glyth;
            this.scene[position].coordinates[1] = y;
        }
        
        let canvas = "";
        for(let i = 0; i < scene.length; i++) {
            let row =  scene[i].join("");
            canvas += '<span>' + row + "</span>" + newline;
        }
        return canvas;
    }
}