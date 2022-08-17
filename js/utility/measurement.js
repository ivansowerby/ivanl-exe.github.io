function convert_px_to_vw(px) {
    return px * 100 / document.documentElement.clientWidth;
}

function convert_vw_to_px(vw) {
    return vw * document.documentElement.clientWidth / 100;
}

function convert_px_to_vh(px) {
    return px * 100 / document.documentElement.clientHeight;
}

function convert_vh_to_px(vh) {
    return vh * document.documentElement.clientHeight / 100;
}