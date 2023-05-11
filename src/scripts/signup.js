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
    document.cookie = "ciudad=" + e.data + ";SameSite:Lax";
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
    fetch(url, post)
        .then((response) => response.json() /*window.open("/login.html", "_self")*/)
        .catch((error) => console.log(error)); //alert("Este nombre de usuario ya esta en uso")

    var listaJuegos =[];
    for (let i = 1; i < 6; i++) {
        listaJuegos.push(new Jugar(player.idjugador,i,0,0));
        
    }
    console.log(JSON.stringify(listaJuegos));
    let url2= "https://localhost:7261/api/Jugar"
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
        .catch((error) => console.log(error)); //alert("Este nombre de usuario ya esta en uso")*/
}