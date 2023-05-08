//import Jugador from "/src/scripts/clases/Jugadores.js"; // maybe
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    getData(e.target);
});

// Gets the data from the sent form.
function getData(form) {
    var formData = new FormData(form);

    // Iterate through the entries.
    for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
}


async function getJugadores() {
    let url = 'localhost:5283/api/Jugadores';
    try {
        let res = await fetch(url, method = "POST");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


// Adds an event that fires when the form is submitted.
var signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async function () { await submitForm() });
console.log(signupForm);

// Actions that are run when the form is submitted.
async function submitForm() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nick = document.getElementById("nick").value;
    var password = document.getElementById("password").value;
    //var localizacion = document.getElementById("localizacion").value;

    var player = new Jugador(nombre, apellido, nick, password, localizacion)
    console.log(player);

    // Método POST para enviar informacion
    let url = "https://localhost:7261/api/Jugadores";
    let post = {
        method: 'POST',
        body: JSON.stringify(player),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, post)
        .then((response) => response.json())
        .catch((error) => alert("Este nombre de usuario ya esta en uso"));
}
// todo tuyo