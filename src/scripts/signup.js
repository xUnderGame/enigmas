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
    let data = e.data.split(";");
    let stuff = ["ciudad", "longitud", "latitud"];

    for (const i of Array(3).keys()) {
        console.log(stuff[i], data[i]);
        document.cookie = `${stuff[i]}=` + data[i] + ";SameSite:Lax";
    }
});

// Actions that are run when the form is submitted.
async function submitForm() {
    var ciudad = document.cookie.split("; ").find((row) => row.startsWith("ciudad="))?.split("=")[1];
    var longitud = document.cookie.split("; ").find((row) => row.startsWith("longitud="))?.split("=")[1];
    var latitud = document.cookie.split("; ").find((row) => row.startsWith("latitud="))?.split("=")[1];
    var nick = document.getElementById("nick").value;
    
    // Creates the player object to send it to our database.
    var player = new Jugador(document.getElementById("nombre").value,
        document.getElementById("apellido").value,
        nick,
        document.getElementById("password").value,
        0,
        0,
        ciudad);

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
        .then((response) => {
            response.json();

            // Inserimos en la tabla Jugar las lineas correspondientes al Jugador.
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
                        .then((response) => response.json(), window.open("login.html","_self"))
                        .catch((error) => console.log(error));
            })
        })
        .catch((error) => console.log(error));


    // Inserimos la Ciudad
    var ciudadObj = new Ciudad(ciudad, longitud, latitud);
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