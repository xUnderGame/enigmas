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
    divCiudad.innerHTML = "Barcelona";

    // TABLA
    let tabla = document.getElementsByTagName("tbody")[0];
    console.log(tabla);
    const idUsuario = document.cookie.split("; ")
        .find((row) => row.startsWith("idUsuario="))
        ?.split("=")[1];
    let url = "https://localhost:7261/api/Jugar/";
    fetch(url)
        .then((response) => response.json())
        .then((usuarios) => {
            for (const usuario of usuarios) {
                if (usuario.idUsuario === idUsuario) {
                    let linea = document.createElement("tr");
                    let tagJuego = document.createElement("td");
                    let contenidoJuego = document.createTextNode(usuario.idjuego);
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
                }
            }

        })
})
