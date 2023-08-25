class Gradient {
    constructor(from, to) {
        [this.from, this.to] = [from, to];
        this.color = this.from;
        this.range = this.to.map((value, i) => value - this.from[i]);
    }

    progress(divisions) {
        this.color = this.color.map((value, i) => value + (this.range[i] / divisions));
    }

    reverseDirection() {
        [this.from, this.to] = [this.to, this.from];
        this.range = this.range.map((value) => -value);
    }
}

Array.prototype.toRGB = function() {
    return `rgb(${this.join(", ")})`;
}