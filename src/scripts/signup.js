import * as actions from "/src/scripts/post.js";
import Jugador from "/src/scripts/clases/Jugador.js";
import Jugar from "/src/scripts/clases/Jugar.js";
import Ciudad from "/src/scripts/clases/Ciudad.js";

// Adds an event that fires when the form is submitted.
var signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    actions.getData(e.target);
    await submitForm();
});

// Adds a listener for iframe events.
window.addEventListener('message', function (e) {
    document.cookie = "latitud=" + e.data + ";SameSite:Lax";
    document.cookie = "longitud=" + e.data + ";SameSite:Lax";
    document.cookie = "ciudad=" + e.data + ";SameSite:Lax";
});
var longitud = document.cookie.split("; ").find((row) => row.startsWith("Longitud="))?.split("=")[1];
var latitud = document.cookie.split("; ").find((row) => row.startsWith("Latitud="))?.split("=")[1];
console.log(longitud,latitud)
// Actions that are run when the form is submitted.
async function submitForm() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nick = document.getElementById("nick").value;
    var password = document.getElementById("password").value;
    var ciudad = document.cookie.split("; ").find((row) => row.startsWith("ciudad="))?.split("=")[1];


    var player = new Jugador(nombre, apellido, nick, password, 0, 0, ciudad);
    // Método POST para enviar informacion
    let url = "https://localhost:7261/api/Jugadores";
    let post = {
        method: 'POST',
        body: JSON.stringify(player),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'accept': '*/*'
        }
    }
    fetch(url, post)
        .then((response) => response.json() /*window.open("/login.html", "_self")*/)
        .catch((error) => console.log(error));


    // Inserimos en la tabla Jugar las lineas correspondientes al Jugador
    //NO PREGUNTES UNAI,FUNCIONA (QUE ES ESTO?? -unai)
    fetch("https://localhost:7261/api/Jugadores/" + nick)
        .then(response => response.json())
        .then(jugador => {
            var listaJuegos = [];
            for (let i = 1; i < 6; i++) {
                listaJuegos.push(new Jugar(jugador.idjugador, i, 0, 0));
            }
            let url2 = "https://localhost:7261/api/Jugar"
            let post2 = {
                method: 'POST',
                body: JSON.stringify(listaJuegos),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'accept': '*/*'
                }
            }
            fetch(url2, post2)
                .then((response) => response.json())
                .catch((error) => console.log(error));
        })


    // Inserimos la Ciudad
    console.log(typeof longitud, typeof latitud,)
    var ciudadObj = new Ciudad(ciudad, longitud, latitud);
    console.log(ciudadObj)
    let url3 = "https://localhost:7261/api/Ciudad";
    let post3 = {
        method: 'POST',
        body: JSON.stringify(ciudadObj),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'accept': '*/*'
        }
    }
    fetch(url3, post3)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}