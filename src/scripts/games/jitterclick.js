import * as handler from "/src/scripts/games.js";
if (!handler.loginCheck()) window.open("/login.html", "_self");

const boton = document.getElementById("boton");
const contador = document.getElementById("contador");

let tiempo = 10;
let clics = 0;

var span=document.getElementById("span")
function hacerClic() {
	clics++;
}


boton.addEventListener("mousedown", hacerClic);
function actualizarContador() {
	// Mostramos el tiempo restante y el número de clics en el contador
	contador.textContent = `Tiempo restante: ${tiempo} segundos | Número de clics: ${clics}`;

	// Si el tiempo ha llegado a 0, detenemos el intervalo y mostramos el mensaje final
	if (tiempo === 0) {
		clearInterval(intervalo);
		boton.disabled = true;
		contador.textContent = `Has hecho ${clics} clics en 10 segundos. GG`;
	}

	// Reduce timer
	tiempo--;
}

const intervalo = setInterval(actualizarContador, 1000);

// Establecemos un tiempo límite de 10 segundos para hacer clic en el botón
handler.noMove();
handler.runGame(theGame, 10000);

function theGame() {
	clearInterval(intervalo);
	boton.disabled = true;
	contador.textContent = `Se acabó el tiempo! Hiciste ${clics} clics en 10 segundos.`;
	if (clics < 70) handler.gameLost();
	else handler.gameWin();
}
