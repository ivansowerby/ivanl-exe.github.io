Object.prototype.keyhole = function() {
    let keys = Object.keys(this);
    let min = Math.min.apply(null, keys.map(i => this[i]));
    return keys.filter(key => this[key] === min);
}

Object.prototype.ductile = function() {
    return [Object.keys(this), Object.values(this)];
}