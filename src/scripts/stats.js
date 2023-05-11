import * as handler from "/src/scripts/games.js";
if (!handler.loginCheck()) window.open("/login.html", "_self");

var tituloDiv = document.getElementById("tituloPagina");
tituloDiv.addEventListener("click", function () { window.open("index.html", "_self") });

window.addEventListener("load", function () {
    const nombre = document.cookie.split("; ")
        .find((row) => row.startsWith("nick="))
        ?.split("=")[1];
    document.getElementById("nombreUsuario").innerHTML = nombre;
})

window.addEventListener("load", () => {
    let divUsername = document.getElementById("nombreUsuario2");
    let divNombre = document.getElementById("username");
    let divNombreApellido = document.getElementById("nombreApellido");
    let divCiudad = document.getElementById("ciudad");
    const nick = document.cookie.split("; ")
        .find((row) => row.startsWith("nick="))
        ?.split("=")[1];

    divUsername.innerHTML = nick;
    divNombreApellido.innerHTML = document.cookie.split("; ")
        .find((row) => row.startsWith("nombre="))
        ?.split("=")[1] + ", " + document.cookie.split("; ")
            .find((row) => row.startsWith("apellido="))
            ?.split("=")[1];
    divCiudad.innerHTML = document.cookie.split("; ")
    .find((row) => row.startsWith("ciudad="))
    ?.split("=")[1];

    // TABLA
    let tabla = document.getElementsByTagName("tbody")[0];
    const idUsuario = document.cookie.split("; ")
        .find((row) => row.startsWith("idUsuario="))
        ?.split("=")[1];
    let url = "https://localhost:7261/api/Jugar/";
    fetch(url)
        .then((response) => response.json())
        .then((usuarios) => {
            for (const usuario of usuarios) {
                if (parseInt(usuario.idjugador) === parseInt(idUsuario)) {
                    let linea = document.createElement("tr");
                    linea.classList.add("colAPI");
                    var tagJuego = document.createElement("td");
                    tagJuego.classList.add("linea"+usuario.idjuego);

                    var contenidoJuego = document.createTextNode("");
                    tagJuego.appendChild(contenidoJuego);
                    let tagVeces = document.createElement("td");
                    let contenidoVeces = document.createTextNode(usuario.vecescompletado);
                    tagVeces.appendChild(contenidoVeces);

                    let tagRanking = document.createElement("td");
                    let contenidoRanking = document.createTextNode(usuario.ranking);

                    tagRanking.appendChild(contenidoRanking);
                    linea.appendChild(tagJuego);
                    linea.appendChild(tagVeces);
                    linea.appendChild(tagRanking);
                    tabla.appendChild(linea);

                    fetch("https://localhost:7261/api/Juegos/" + usuario.idjuego)
                    .then((response) => response.json())
                    .then((juego) => {
                        let tagJuego = document.getElementsByClassName("linea" + usuario.idjuego)[0];
                        tagJuego.innerHTML=juego.titulo;
                    })
                }
            }

        })

    
})
