import * as handler from "/src/scripts/games.js";

// Cookies
if (!handler.loginCheck()) window.open("/login.html", "_self");

// Load cookies on load.
window.addEventListener("load", function () {
    const nombre = document.cookie.split("; ")
        .find((row) => row.startsWith("nick="))
        ?.split("=")[1];
    document.getElementById("nombreUsuario").innerHTML = nombre;
});

// On-click listeners for the buttons.
var listeners = ["jugar", "stats", "ranking", "tema"];
listeners.forEach(listener => { document.getElementById(listener).addEventListener("click", function () { changeWindow(this) }) });

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
            game.id = "game";
            game.src = "/map.html";

            // Edit DOM.
            document.getElementById("botones").style.display = "none";
            gameArea.appendChild(game);
            game.focus();
            break;

        case "ranking":
            // Setup the new iframe for the game.
            var ranking = document.createElement("iframe");
            ranking.classList += "fullscreen";
            ranking.style.border = "none";
            ranking.id = "ranking";
            ranking.src = "/ranking.html";

            // Edit DOM.
            document.getElementById("botones").style.display = "none";
            gameArea.appendChild(ranking);
            ranking.focus();
            break;

        case "menu":
            console.log(ele);
            let subMenu = document.getElementsByClassName('sub-menu');
            console.log(subMenu[0]);
            subMenu[0].style.display = 'inherit';
            break;

        case "tema":
            const main = document.querySelector('main');
            if (main.id == "mododia") main.id = "modonoche"
            else main.id = "mododia"
            break;

        // I call.
        default:
            break;
    }
}