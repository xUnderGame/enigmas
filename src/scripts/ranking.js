// TABLA
let url = "https://localhost:7261/api/Jugar/";
fetch(url)
    .then((response) => response.json())
    .then((usuarios) => {
        console.log(usuarios)
        for (const usuario of usuarios) {
            let linea = document.createElement("li");
            linea.classList.add("colAPI");

            var tagUsuario = document.createElement("mark");
            tagUsuario.classList.add("user" + usuario.idjugador);
            var contenidoUsuario = document.createTextNode(usuario.idjugador);
            tagUsuario.appendChild(contenidoUsuario);
/*
            var tagJuego = document.createElement("td");
            tagJuego.classList.add("linea" + usuario.idjuego);
            var contenidoJuego = document.createTextNode("");
            tagJuego.appendChild(contenidoJuego);
*/
            let tagRanking = document.createElement("small");
            let contenidoRanking = document.createTextNode(usuario.ranking);
            tagRanking.appendChild(contenidoRanking);

            linea.appendChild(tagUsuario);
            //linea.appendChild(tagJuego);
            linea.appendChild(tagRanking);
            document.getElementById("userRanking").appendChild(linea);

            /*fetch("https://localhost:7261/api/Juegos/" + usuario.idjuego)
                .then((response) => response.json())
                .then((juego) => {
                    let tagJuego = document.getElementsByClassName("linea" + usuario.idjuego)[0];
                    tagJuego.innerHTML = juego.titulo;
                })*/
            fetch("https://localhost:7261/api/Jugadores/ById/" + usuario.idjugador)
            .then((response) => response.json())
            .then((jugador) => {
                let tagJuego = document.getElementsByClassName("user" + usuario.idjugador)[0];
                tagUsuario.innerHTML = jugador.nick;
            })
        }

    })