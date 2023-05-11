import * as actions from "/src/scripts/post.js";
import Jugador from "/src/scripts/clases/Jugador.js";

// Adds an event that fires when the form is submitted.
var signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    actions.getData(e.target);
    await submitForm();
});
var longitud = document.cookie.split("; ").find((row) => row.startsWith("Longitud="))?.split("=")[1];
var latitud = document.cookie.split("; ").find((row) => row.startsWith("Latitud="))?.split("=")[1];

// Actions that are run when the form is submitted.
async function submitForm() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nick = document.getElementById("nick").value;
    var password = document.getElementById("password").value;
    var ciudad = document.cookie.split("; ").find((row) => row.startsWith("ciudad="))?.split("=")[1];
    console.log(ciudad);

    var player = new Jugador(1, nombre, apellido, nick, password, 0, 0, ciudad);
    console.log(player)
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
        .then((response) => response.json() /*window.open("/login.html", "_self")*/)
        .catch((error) => console.log(error)); //alert("Este nombre de usuario ya esta en uso")

    /*let url2= "https://localhost:7261/api/Jugar"

    await fetch(url2, post)
        .then((response) => response.json(),window.open("/login.html", "_self"))
        .catch((error) => console.log(error)); //alert("Este nombre de usuario ya esta en uso")*/
}