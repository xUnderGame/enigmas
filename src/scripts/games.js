import Jugador from "/src/scripts/clases/Jugador.js";
import Juego from "/src/scripts/clases/Juego.js";
import Ciudad from "/src/scripts/clases/Ciudad.js";

// Game loop.
export async function runGame(funct, delay = 50) {
    var time = 500;
    let cd = document.getElementById("countdown")
    for (const iterator of Array(3).keys()) {
        cd.textContent = 3 - iterator;
        await sleep(time / 2);
    }
    setInterval(function () { funct(this) }, delay);
}

// Sleeps for x seconds.
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Removes the ability to move the website when playing.
export function noMove() {
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}

export default class Juegos {
    jugador;
    juegos;
    puntuacion;
    multiplicador;
    constructor(jugador, juegos) {
        this.jugador = jugador; // Jugador object.
        this.juegos = juegos; // List/Array of "Juego".
        this.puntuacion = 0;
        this.multiplicador = 1.0;
    }

    // Trigger a game win.
    gameWon() {
        console.log("win");
    }

    // Trigger a game loss.
    gameLost() {
        onsole.log("lost");
    }

    // Loads the next game.
    next() {
        onsole.log("next");
    }

    // Ends the game.
    end() {
        onsole.log("end");
    }
}