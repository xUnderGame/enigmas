


// Clase Carretera

class Carretera {
	constructor() {
		this.elemento = document.getElementById("carretera");
		this.elemento.style.backgroundPosition = "0px 0px";
		this.canvas = document.getElementById("carretera");
		this.ctx = this.canvas.getContext("2d");
		// Dibujamos el fondo
		this.ctx.fillStyle = "#595959";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Dibujamos la carretera
		this.ctx.fillStyle = "#CDCDCD";
		this.ctx.fillRect(this.canvas.width / 2 - 50, 0, 100, this.canvas.height);

		// Dibujamos las líneas blancas de la carretera
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#FFF6D7";
		this.ctx.lineWidth = 10;
		this.ctx.moveTo(this.canvas.width / 2 - 5, 0);
		this.ctx.lineTo(this.canvas.width / 2 - 5, this.canvas.height);
		this.ctx.moveTo(this.canvas.width / 2 + 5, 0);
		this.ctx.lineTo(this.canvas.width / 2 + 5, this.canvas.height);
		this.ctx.stroke();
	}

}
// Clase Coche
class Coche {
	constructor() {
		this.elemento = document.getElementById("coche");
		
	}

	mover(x) {
		const cocheWidth = this.elemento.offsetWidth;
		const carreteraLeft = carretera.elemento.offsetLeft;
		const carreteraWidth = carretera.elemento.offsetWidth;
		const left = Math.max(Math.min(x, carreteraLeft + carreteraWidth - cocheWidth+50), carreteraLeft);
		this.elemento.style.left = left + "px";
	}

}

//Dibujamos el coche (No se por que si lo intento dibujar en el constructor de coche no funciona :c)
const canvas = document.getElementById('coche');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src="https://static.vecteezy.com/system/resources/previews/001/193/859/non_2x/sedan-car-png.png";

      img.onload = function() {
        ctx.drawImage(img, 60, 0, 200, 150);
      }

// Clase Camion no supe hacerla con canvas con la idea que tenia pensada de que sean distintos coches cada vez
class Camion {

	constructor() {
		this.posicion = -100;
		this.elemento = document.createElement("div");
		this.elemento.className = "camion";
		const carreteraLeft = carretera.elemento.offsetLeft;
		const carreteraWidth = carretera.elemento.offsetWidth;
		const maxLeft = carreteraLeft + carreteraWidth - 50;
		const minLeft = carreteraLeft;
		this.elemento.style.left = Math.floor(Math.random() * (maxLeft - minLeft)) + minLeft + "px";
		this.elemento.style.top = "-100px";
		document.body.appendChild(this.elemento);
		// Elige una imagen aleatoria del array de imágenes de camiones
		const imagenCamion = imagenesCamiones[Math.floor(Math.random() * imagenesCamiones.length)];
		this.elemento.style.backgroundImage = `url(${imagenCamion})`;
	}


	dibujar() {
		this.elemento.style.top = this.posicion + "px";
	}

	mover() {
		let y = parseInt(this.elemento.style.top) + 25;
		this.elemento.style.top = y + "px";
	}


	destruir() {
		this.elemento.parentNode.removeChild(this.elemento);
	}
}

// Variables
let carretera = new Carretera();
let coche = new Coche();
let camiones = [];
let intervaloCamiones = null;
let intervaloMovimiento = null;
let puntuacion = 0;
const carreteraLeft = carretera.offsetLeft;
const carreteraWidth = carretera.offsetWidth;
const imagenesCamiones = ["camion2.png", "camion3.png"];

// Evento de movimiento del ratón
window.addEventListener("mousemove", function (evento) {
	let x = evento.clientX;
	coche.mover(x);
});


// Loop de movimiento de los camiones
intervaloMovimiento = setInterval(function () {

	for (let i = 0; i < camiones.length; i++) {
		let camion = camiones[i];
		camion.mover();

		// Colisión con el coche
		if (colision(coche.elemento, camion.elemento)) {
			pararJuego();
			break;
		}

		// Llegada al final de la pantalla
		if (parseInt(camion.elemento.style.top) > (window.innerHeight - 75)) {
			camion.destruir();
			camiones.splice(i, 1);
			puntuacion++;
			actualizarPuntuacion();
		}
	}
}, 30);

// Creación automática de camiones
intervaloCamiones = setInterval(function () {
	let camion = new Camion();
	camiones.push(camion);
}, 300);

// Función de detener el juego
function pararJuego() {
	clearInterval(intervaloCamiones);
	clearInterval(intervaloMovimiento);
	let fondo = document.getElementById("landscape");
	fondo.style.backgroundImage = "url('https://emtstatic.com/2020/05/billy.jpg')";
	setTimeout(() => alert("Juego Terminado. Puntuación: " + puntuacion + " Volver a jugar?" ,location.reload()	), 100);

}

// Función de detección de colisión
function colision(coche, camion) {
	let cocheRect = coche.getBoundingClientRect();
	let camionRect = camion.getBoundingClientRect();
	return !(cocheRect.bottom< camionRect.top || cocheRect.top > camionRect.bottom || cocheRect.right < camionRect.left+23|| cocheRect.left > camionRect.right-25);
}

