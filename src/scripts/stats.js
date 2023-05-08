var tituloDiv = document.getElementById("tituloPagina");
tituloDiv.addEventListener("click", function () { window.open("index.html", "_self") });

document.addEventListener("load", () => {
    let divUsername = document.getElementById("nombreUsuario");
    let divNombre = document.getElementById("username");
    let divNombreApellido = document.getElementById("nombreApellido");
    let divCiudad = document.getElementById("ciudad");

    let url = "https://localhost:7261/api/Jugadores/1?id=1'";
    fetch(url)
        .then((response) => PutUsuario(response.json()))
        .catch((error) => alert(error));
})

function PutUsuario(response) {
    let jugador = new Jugador(JSON.parse(response));
    console.log(jugador)
    divUsername.innerHtml = jugador.nick;
    divUsername.innerHtml = jugador.nick;
    divNombre.innerHtml = jugador.nombre + "," + jugador.apellido;
    divCiudad.innerHtml = "A";
}