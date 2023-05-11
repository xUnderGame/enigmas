import * as handler from "/src/scripts/games.js";
if (!handler.loginCheck()) window.open("/login.html", "_self");

// TABLA
let url = "https://localhost:7261/api/Jugar/";
fetch(url)
    .then((response) => response.json())
    .then((usuarios) => {
        for (const usuario of usuarios) {
            let linea = document.createElement("li");
            linea.classList.add("colAPI");

            var tagUsuario = document.createElement("mark");
            tagUsuario.classList.add("user" + usuario.idjugador);
            var contenidoUsuario = document.createTextNode(usuario.idjugador);
            tagUsuario.appendChild(contenidoUsuario);

            let tagRanking = document.createElement("small");
            let contenidoRanking = document.createTextNode(usuario.ranking);
            tagRanking.appendChild(contenidoRanking);

            linea.appendChild(tagUsuario);
            linea.appendChild(tagRanking);
            document.getElementById("userRanking").appendChild(linea);

            if (document.getElementById("userRanking").children.length >= 5) return;
            fetch("https://localhost:7261/api/Jugadores/ById/" + usuario.idjugador)
            .then((response) => response.json())
            .then((jugador) => {
                tagUsuario.innerHTML = jugador.nick;
            })
        }

    })

