Array.prototype.swap = function(i, j) {
    let k = this[i];
    this[i] = this[j];
    this[j] = k;
    return this;
}