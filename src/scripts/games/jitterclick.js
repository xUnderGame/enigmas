import * as handler from "/src/scripts/games.js";
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
	contador.textContent = `Se te acabó el tiempo. Hiciste ${clics} clics en 10 segundos.`;
	if (clics < 70) {
		const body = document.body;
		body.style.backgroundImage = "url('https://emtstatic.com/2020/05/billy.jpg')";
		contador.textContent = `No llegaste al minimo de clicks....`;
		contador.style.border = "2px solid white";
		contador.style.backgroundColor = "lightblue"

	}
	else {
		const body = document.body;
		body.style.backgroundImage = "url('https://66.media.tumblr.com/a90081abbc2904051185e1e32c9a0d48/tumblr_oa488yCCps1uo42a7o1_400.gif')";
		contador.textContent = `Has ganado!!!! hiciste ${clics} clics`;
		contador.style.border = "2px solid white";
		contador.style.backgroundColor = "lightblue"
	}
}
