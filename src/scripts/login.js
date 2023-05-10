import * as actions from "/src/scripts/post.js";
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    actions.getData(e.target);
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let url = "https://localhost:7261/api/Jugadores/" + username;
    fetch(url)
        .then((response) => response.json())
        .then((jugador) => {
            if (jugador.password == password) {
                console.log("contrasenya correcta");
                document.cookie = `idUsuario=${jugador.idjugador}`;
                document.cookie = `nombre=${jugador.nombre}`;
                document.cookie = `apellido=${jugador.apellido}`;
                document.cookie = `nick=${jugador.nick}`;
                document.cookie = `password=${jugador.password}`;
                window.open("/index.html","_self");
            }
            else alert("Nombre de Usuario o contraseña incorrectos")
            console.log(jugador);
        })
});

