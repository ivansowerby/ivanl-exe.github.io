const COPYRIGHT_BY_ID = document.getElementById(
    "copyright"
);

COPYRIGHT_BY_ID.innerHTML = COPYRIGHT_BY_ID.innerHTML.replace(
    "[YEAR]",
    getYear().toString()
);