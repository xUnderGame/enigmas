import * as handler from "/src/scripts/games.js";
import Session from "/src/scripts/games.js";
import Jugador from "/src/scripts/clases/Jugador.js";
import Juego from "/src/scripts/clases/Juego.js";
import Ciudad from "/src/scripts/clases/Ciudad.js";

// Cookies
if (document.cookie.split("; ").find((row) => row.startsWith("nick="))?.split("=")[1] == undefined) {
    //window.open("/login.html", "_self");
} else {
    var nick = document.cookie.split("; ").find((row) => row.startsWith("nick="))?.split("=")[1];
    var idJugador = document.cookie.split("; ").find((row) => row.startsWith("idjugador="))?.split("=")[1]
}

// Load cookies on load.
window.addEventListener("load", function () {
    const nombre = document.cookie.split("; ")
        .find((row) => row.startsWith("nick="))
        ?.split("=")[1];
    document.getElementById("nombreUsuario").innerHTML = nombre;
});

// On-click listeners for the buttons.
var listeners = ["jugar", "stats", "ranking", "imagenUsuario"];
listeners.forEach(listener => { document.getElementById(listener).addEventListener("click", function () { changeWindow(this) }) });

// Changes the DOM window with new content.
function changeWindow(ele) {
    if (!listeners.includes(ele.id)) pass
    let gameArea = document.getElementById("juego");

    // Switch case for button presses.
    switch (ele.id) {
        case "jugar":
            // Fetch the games and make a session.
            var gameInst = new Session(new Jugador(1, "test", "test", "test", "test", "test", 0, 0, new Ciudad("bcn", -15.420, 122.88)), [new Juego(1, "test", "jumpTheCar", 50), new Juego(2, "test2", "jitterclick", 50)])
            
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

        case "imagenUsuario":
            updateGame("diamondDig"); // testing!!
            break;

        // I call.
        default:
            break;
    }
}

// Updates the iframe with a new game src.
function updateGame(src) {
    let game = document.getElementById("game");
    game.src = `/games/${src}.html`;
    game.focus();
}

// Function to end game.
function endGame() {
    let game = document.getElementById("game");
    var nextButton = document.createElement("button");
    nextButton.innerText = "Siguiente juego";
    nextButton.onclick = updateGame("diamondDig");
    gameArea.appendChild(nextButton);
}