String.prototype.insert = function(index, substring) {
    return [this.slice(0, index), substring, this.slice(index)].join("");
}

String.prototype.replaceAt = function(index, substring) {
    return this.substring(
        0, index
    ) + substring + this.substring(
        index + substring.length
    );
}

Array.prototype.swap = function(i, j) {
    let buffer = this[i];
    this[i] = this[j];
    this[j] = buffer;
}

function tick(color) {
    let glyth = new Stryle("✓");
    glyth.color(
        color,
        [0]
    );
    return glyth.export();
}