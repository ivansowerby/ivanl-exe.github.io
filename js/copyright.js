const COPYRIGHT_BY_ID = document.getElementById(
    "copyright"
)
const LEGAL_BY_ID = document.getElementById(
    "legal"
)

const YEAR = new Date().getFullYear().toString();

let notice = COPYRIGHT_BY_ID.innerHTML.replace(
    "[YEAR]", YEAR
);

COPYRIGHT_BY_ID.innerHTML = notice;

let legal = LEGAL_BY_ID.innerHTML.replace(
    "[YEAR]", YEAR
);

LEGAL_BY_ID.innerHTML = legal;

function notify_license_download() {
    notify(
        "Downloading License " + tick("#ffcd83")
    );
}