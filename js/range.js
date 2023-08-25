function range(from, to) {
    return Array(to - from + 1).fill().map(
        (_, i) => from + i
    );
}