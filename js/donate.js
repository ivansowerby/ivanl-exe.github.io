const DONATION_URI_BY_ID = document.getElementById(
    "donation-uri"
);

const DONATION_QR_CODE_BY_ID = document.getElementById(
    "donation-qr-code"
);

const DONATE_FORM_BY_ID = document.getElementById(
    "donate-form"
);

const CRYPTO_AMOUNT_INPUT = document.getElementById(
    "cryptocurrency-amount-input"
);

const CRYPTO_CONVERSION_RATE = document.getElementById(
    "cryptocurrency-conversion-rate"
);

const BITCOIN_PRICE_API = "https://api.coindesk.com/v1/bpi/currentprice.json";

const BITCOIN_URI = "bitcoin:1DoGE1ngbSM1xxt9dikUJEy6yM7jVf5Nqr";

const QR_CODE_BASE_URL = "http://chart.apis.google.com/chart?cht=qr";

const QR_CODE_RESOLUTION = "500x500";

let QR_CODE_PARAMETERS = {
    "chs": QR_CODE_RESOLUTION,
    "chl": BITCOIN_URI
};

let url = QR_CODE_BASE_URL + "&" + serialize(
    QR_CODE_PARAMETERS
);

DONATION_QR_CODE_BY_ID.src = url;
DONATION_URI_BY_ID.href = BITCOIN_URI;
DONATE_FORM_BY_ID.action = BITCOIN_URI;

let BITCOIN_URI_PARAMETERS = {
    "amount": "",
    "label": "Ivan-Sowerby",
    "message": ""
};

const SATOSHI = 1 * Math.pow(10, -8)

let uri = "";
let previous_reading = null;

let time_since_call = 0;
let price = 0;

setInterval(async function() {
    let reading = CRYPTO_AMOUNT_INPUT.value;
    if(reading == "") {
        reading = 0;
    }
    reading = parseFloat(reading);
    if(reading != 0 && reading < SATOSHI || reading > 21000000) {
        return;
    }
    if(reading == previous_reading) {
        return;
    }
    BITCOIN_URI_PARAMETERS["amount"] = reading;
    BITCOIN_URI_PARAMETERS["message"] = "ivan.engineer"//window.location;

    let parameters = serialize(
        BITCOIN_URI_PARAMETERS,
        ampersand = "%26"
    );
    parameters = BITCOIN_URI + "?" + parameters;
    uri = parameters;
    QR_CODE_PARAMETERS["chl"] = parameters;
    url = QR_CODE_BASE_URL + "&" + serialize(
        QR_CODE_PARAMETERS
    );

    DONATION_QR_CODE_BY_ID.src = url;
    DONATION_URI_BY_ID.href = uri;
    DONATE_FORM_BY_ID.action = uri;


    let current_time = Date.now() / 1000;
    if(current_time - time_since_call > 60) {
        let response = await fetch(BITCOIN_PRICE_API);
        time_since_call = current_time;
        if(response.status != 200) {
            return;
        }

        response = await response.json();
        price = response["bpi"]["USD"]["rate_float"];
    }

    let rate = price * reading;
    if(rate >= 0.01 || rate == 0) {
        rate = rate.toFixed(2);
    }
    else {
        rate = rate.toPrecision(2);
    }
    
    CRYPTO_CONVERSION_RATE.innerHTML = " = " + "~$" + rate.toString();

    previous_reading = reading;
}, 100)

function serialize(dictionary, ampersand = "&") {
    let serial = [];
    for(let key in dictionary) {
        serial += key + "="  + dictionary[key] + ampersand;
    }
    return serial.slice(0, -ampersand.length);
}

//British alternative
function serialise(dictionary) {
    return serialize(dictionary);
}

function dictionary(json) {
    let dict = {};
    for(let i = 0; i < json.length; i++) {
        dict[json[i].id] = json[i];
    }
    return dict;
}