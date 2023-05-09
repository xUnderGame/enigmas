import * as handler from "/src/scripts/games.js";
const boton = document.getElementById("boton");
const contador = document.getElementById("contador");

let tiempo = 10;
let clics = 0;

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
		contador.textContent = `Has hecho ${clics} clics en 10 segundos. ¡Buen trabajo!`;
	}

	// Reduce timer
	tiempo--;
}

const intervalo = setInterval(actualizarContador, 1000);

// Establecemos un tiempo límite de 10 segundos para hacer clic en el botón
// (avisame que lo porto)
// handler.noMove();
// handler.runGame(tuFuncion, 10000);
setTimeout(function () {
	clearInterval(intervalo);
	boton.disabled = true;
	contador.textContent = `Se te acabó el tiempo. Hiciste ${clics} clics en 10 segundos.`;
	if (clics < 70) {
		const body = document.body;
		body.style.backgroundImage = "url('https://emtstatic.com/2020/05/billy.jpg')";
        contador.textContent = `No llegaste al minimo de clicks....`;
        contador.style.border="2px solid white";
        contador.style.backgroundColor="lightblue"

	}
    else{
        const body = document.body;
		body.style.backgroundImage = "url('https://media.tenor.com/3OIeAOQyi_0AAAAd/da-rock-shitpost.gif')";
        contador.textContent = `Has ganado!!!! hiciste ${clics} clics`;
        contador.style.border="2px solid white";
        contador.style.backgroundColor="lightblue"
    }
}, 10000);