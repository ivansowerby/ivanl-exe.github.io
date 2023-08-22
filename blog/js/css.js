const cssUnitToFloat = (unit) => {
    let i = unit.length - 1;
    while(i >= 0 && String.prototype.isAlpha(unit.at(i))) { i--; }
    return parseFloat(unit.slice(0, i + 1))
}

const cssUnitToInt = (unit) => {
    //double-tilde
    return ~~cssUnitToFloat(unit);
}