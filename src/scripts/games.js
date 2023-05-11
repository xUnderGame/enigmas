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
    cd.textContent = "GO!";
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

// Function that obtains a cookie's value.
export function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

// Checks for all cookies being present
export function loginCheck() {
    return true //["nick", "nombre", "apellido", "password", "idUsuario"].every(cookie => getCookie(cookie))
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
}

// Trigger a game win.
export function gameWin() {
    document.getElementById("countdown").textContent = "You win!";
    window.parent.postMessage(true, '*');
}

// Trigger a game loss.
export function gameLost() {
    document.getElementById("countdown").textContent = "You lost!";
    window.parent.postMessage(false, '*');
}

// Loads the next game.
export function next(game) {
    let ifr = document.createElement("iframe");
    ifr.id = "playArea";
    ifr.src = `/games/${game}.html`
    document.getElementById("debug").parentNode.insertBefore(ifr, document.getElementById("debug").nextSibling);
}

// Ends the game.
export function end() {
    console.log("end");
}