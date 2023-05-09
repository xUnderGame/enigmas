import * as actions from "/src/scripts/post.js";
import Jugador from "/src/scripts/clases/Jugador.js";

// Adds an event that fires when the form is submitted.
var signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    actions.getData(e.target);
    await submitForm();
});

// Actions that are run when the form is submitted.
async function submitForm() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nick = document.getElementById("nick").value;
    var password = document.getElementById("password").value;
    //var localizacion = document.getElementById("localizacion").value;

    var player = new Jugador(33, nombre, apellido, nick, password, "TEST", 0, 0, "test"); //, localizacion
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
    await fetch(url, post)
        .then((response) => response.json(), window.open("/login.html","_self"))
        .catch((error) => console.log(error)); //alert("Este nombre de usuario ya esta en uso")
}