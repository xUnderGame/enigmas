// On-click listeners for the buttons.
listeners = ["jugar", "stats", "ranking", "imagenUsuario"];
listeners.forEach(listener => {document.getElementById(listener).addEventListener("click", function () { changeWindow(this) })});
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

// Changes the DOM window with new content.
function changeWindow(ele) {
    if (!listeners.includes(ele.id)) pass
    let gameArea = document.getElementById("juego");

    // Switch case for button presses.
    switch (ele.id) {
        case "jugar":
            // Setup the new iframe for the game.
            var game = document.createElement("iframe");
            game.classList += "fullscreen";
            game.style.border = "none";
            game.src = "/games/jumpTheCar.html"; // game will need to be set via api request later on.

            // Edit DOM.
            document.getElementById("botones").style.display = "none";
            gameArea.appendChild(game);
            game.focus();
            break;

        case "menu":
            console.log(ele);
            let subMenu = document.getElementsByClassName('sub-menu');
            console.log(subMenu[0]);
            subMenu[0].style.display = 'inherit';
            break;
    
        // I call.
        default:
            break;
    }
}