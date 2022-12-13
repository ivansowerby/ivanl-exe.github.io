class Tally {
    constructor() {
        this.round = 4;
        this.score = {
            "user": 0,
            "machine": 0,
            "tie": 0
        }
        this.userRecord = {
            "rock": 1,
            "paper": 2,
            "scissors": 3
        }
        this.machineRecord = {
            "rock": 0,
            "paper": 0,
            "scissors": 0
        }
    }
}

var tally = new Tally();

const USER_SCORE_BY_ID = document.getElementById(
    "user-score"
);

const MACHINE_SCORE_BY_ID = document.getElementById(
    "machine-score"
);

const TIE_SCORE_BY_ID = document.getElementById(
    "tie-score"
);

function playGame(user) {
    tally.userRecord[user] += 1;
    
    let machine = machineChoice();
    tally.machineRecord[machine] += 1;

    let outcome;
    if(isTie(user, machine)) {
        outcome = "tie";    
    }
    else {
        outcome = winner(user, machine)
    }
    tally.score[outcome] += 1;
    let score = tally.score[outcome]; 

    let id = `${outcome}-score`;
    document.getElementById(id).innerText = score;

    let userColor = machineColor = tieColor = "#FFFFFF";
    if(outcome == "tie") {
        userColor = machineColor = "#444444";
    }
    else if(outcome == "user") {
        machineColor = tieColor = "#444444";
    }
    else {
        userColor = tieColor = "#444444";
    }
    USER_SCORE_BY_ID.style.color = userColor;
    MACHINE_SCORE_BY_ID.style.color = machineColor;
    TIE_SCORE_BY_ID.style.color = tieColor;
    barChart(tally.score);
}

function isTie(user, machine) {
    return user == machine;
}

function winner(user, machine) {
    if(
        (user == "rock" && machine == "scissors") ||
        (user == "paper" && machine == "rock") ||
        (user == "scissors" && machine == "paper")
    ) {
        console.log("user");
    }
    return "machine";
}
