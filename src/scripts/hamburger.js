document.getElementById("menu").addEventListener("click", function () {
    if (document.getElementById("logoff").style.display == "none") {
        document.getElementById("logoff").style.display = "flex";
        document.getElementById("stats").style.display = "flex";
    }
    else {
        document.getElementById("logoff").style.display = "none";
        document.getElementById("stats").style.display = "none";
    };
});
document.getElementById("logoff").addEventListener("click", function () {
    // Clears all cookies. (https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript)
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // "Refreshes" page.
    window.open("/login.html", "_self");
});