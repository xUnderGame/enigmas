var nick = document.cookie.split("; ").find((row) => row.startsWith("nick="))?.split("=")[1];

document.getElementById("ham").addEventListener("click", function () {
    if (document.getElementById("logoff").style.display == "none") {
        document.getElementById("logoff").style.display = "inline";
        document.getElementById("stats").style.display = "inline";
        document.getElementById("home").style.display = "inline";
        if (nick = "Admin") {
            document.getElementById("gestionar").style.display = "inline";
        }
        
    }
    else {
        document.getElementById("logoff").style.display = "none";
        document.getElementById("stats").style.display = "none";
        document.getElementById("home").style.display = "none";
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
document.getElementById("stats").addEventListener("click", function () {window.open("/stats.html","_self")});
document.getElementById("home").addEventListener("click", function () {window.open("/index.html","_self")}); // que es esto