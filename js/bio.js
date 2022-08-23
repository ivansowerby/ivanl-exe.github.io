const BIO_BY_ID = document.getElementById(
    "bio"
)

const BIRTH = {
    "day": 13,
    "month": 2,
    "year": 2007
};

const DAY = new Date().getDate();
const MONTH = new Date().getMonth();

let age = YEAR - BIRTH["year"] - 1;
let time_since = age * 12 + MONTH;

if(time_since % 12 >= BIRTH["month"]) {
    age++;
}

let bio = BIO_BY_ID.innerHTML.replace(
    "[AGE]",
    age.toString()
);

BIO_BY_ID.innerHTML = bio;