import * as handler from "/src/scripts/games.js";
import Session from "/src/scripts/games.js";
import Jugador from "/src/scripts/clases/Jugador.js";
import Juego from "/src/scripts/clases/Juego.js";
import Ciudad from "/src/scripts/clases/Ciudad.js";

// Fetch the games and make a session.
var gameInst = new Session(new Jugador(1, "test", "test", "test", "test", "test", 0, 0, new Ciudad("bcn", -15.420, 122.88)), [new Juego(1, "test", "jumpTheCar", 50), new Juego(2, "test2", "jitterclick", 50)]);
var currGame = 1;
var 
console.log(gameInst);

window.addEventListener('message', function (e) {
    document.getElementById("playArea").remove();
    console.log(e.data);

    // Changes the game.
    // let ifr = document.createElement("iframe");
    // ifr.id = "playArea";
    // ifr.src = "/games/jitterclick.html"
    // document.getElementById("debug").parentNode.insertBefore(ifr, document.getElementById("debug").nextSibling);
});