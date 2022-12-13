function loadJSON(url) {
    let obj = syncLoad(url, "application/json");
    return JSON.parse(obj);
}

function syncLoad(url, mime) {
    let xml = new XMLHttpRequest();
    xml.open("GET", url, false);
    if(mime != null) {
        if(xml.overrideMimeType) {
            xml.overrideMimeType(mime);
        }
    }
    xml.send();
    if(xml.status == 200 && xml.readyState == 4) {
        return xml.responseText;
    }
    else {
        return null;
    }
}