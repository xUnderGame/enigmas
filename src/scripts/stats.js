var tituloDiv = document.getElementById("tituloPagina");
tituloDiv.addEventListener("click", function () { window.open("index.html", "_self") });

window.addEventListener("load", function (){
    const nombre = document.cookie.split("; ")
    .find((row) => row.startsWith("nick="))
    ?.split("=")[1];
    document.getElementById("nombreUsuario").innerHTML= nombre;
})


window.addEventListener("load", () => {
    let divUsername = document.getElementById("nombreUsuario2");
    let divNombre = document.getElementById("username");
    console.log(divNombre)
    let divNombreApellido = document.getElementById("nombreApellido");
    let divCiudad = document.getElementById("ciudad");

    /*let url = "https://localhost:7261/api/Jugadores/1?id=1'";
    fetch(url)
        .then((response) => PutUsuario(response.json()))
        .catch((error) => alert(error));*/
    const nick = document.cookie.split("; ")
        .find((row) => row.startsWith("nick="))
        ?.split("=")[1];
    divUsername.innerHTML = nick;
    divNombreApellido.innerHTML =  document.cookie.split("; ").find((row) => row.startsWith("nombre="))?.split("=")[1] + ", "+ document.cookie.split("; ").find((row) => row.startsWith("apellido="))?.split("=")[1] ;
    divCiudad.innerHTML = "Barcelona";

})

/*function PutUsuario(response) {
    let jugador = JSON.parse(response);
    console.log(jugador)
    divUsername.innerHTML = jugador.nick;
    divUsername.innerHTML = jugador.nick;
    divNombre.innerHTML = jugador.nombre + "," + jugador.apellido;
    divCiudad.innerHTML = "A";
}*/