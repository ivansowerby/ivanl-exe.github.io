import binomial from "binomial";

function randomRange(i, j) {
    return Math.floor((Math.random() * (j - i)) + i);
}

function randomBinomial(n, p) {
    return binomial(n, p);
}