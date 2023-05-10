// TABLA
let tabla = document.getElementsByTagName("tbody")[0];
let tabla2 = document.getElementById("tablaRanking");
console.log(tabla);
console.log(tabla2);
let url = "https://localhost:7261/api/Jugar/";
fetch(url)
    .then((response) => response.json())
    .then((usuarios) => {
        console.log(usuarios)
        for (const usuario of usuarios) {
            let linea = document.createElement("tr");
            linea.classList.add("colAPI");

            var tagUsuario = document.createElement("td");
            var contenidoUsuario = document.createTextNode(usuario.idjugador);
            tagUsuario.appendChild(contenidoUsuario);


            var tagJuego = document.createElement("td");
            tagJuego.classList.add("linea" + usuario.idjuego);
            var contenidoJuego = document.createTextNode("");
            tagJuego.appendChild(contenidoJuego);


            let tagRanking = document.createElement("td");
            let contenidoRanking = document.createTextNode(usuario.ranking);
            tagRanking.appendChild(contenidoRanking);

            linea.appendChild(tagUsuario);
            linea.appendChild(tagJuego);
            linea.appendChild(tagRanking);
            tabla.appendChild(linea);

            /*fetch("https://localhost:7261/api/Juegos/" + usuario.idjuego)
                .then((response) => response.json())
                .then((juego) => {
                    let tagJuego = document.getElementsByClassName("linea" + usuario.idjuego)[0];
                    tagJuego.innerHTML = juego.titulo;
                })*/
        }

    })