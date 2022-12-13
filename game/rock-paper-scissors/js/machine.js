const MACHINE_BY_ID = document.getElementById(
    "machine"
);

function machineChoice() {
    let id;
    let emoji;
    let alt;
    // if(tally.round <= 1) {
    id = randomRange(0, 3);
    emoji = idToKey(id);
    // }
    // else {
    //     alt = tally.userRecord.keyhole();
    //     id = altToId(alt);
    //     id = machineBinomial(id);
    //     emoji = idToKey(id);
    // }
    alt = keyToAlt(emoji);
    tally.machineRecord[alt] += 1;
    emoji = emojify(emoji);
    MACHINE_BY_ID.innerHTML = emoji;
    return alt;
}

function machineBinomial(diviser) {
    return randomBinomial(2, diviser / 2);
}

function randomRange(i, j) {
    return Math.floor((Math.random() * (j - i)) + i);
}