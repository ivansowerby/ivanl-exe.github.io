function wrap(n, min = 0, max) {
    if(n >= max) {
        return min;
    }
    else if(n < min) {
        return max;
    }
    return n;
}