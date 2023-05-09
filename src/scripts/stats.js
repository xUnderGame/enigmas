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
    let divNombreApellido = document.getElementById("nombreApellido");
    let divCiudad = document.getElementById("ciudad");
    const nick = document.cookie.split("; ")
        .find((row) => row.startsWith("nick="))
        ?.split("=")[1];
    divUsername.innerHTML = nick;
    divNombreApellido.innerHTML =  document.cookie.split("; ").find((row) => row.startsWith("nombre="))?.split("=")[1] + ", "+ document.cookie.split("; ").find((row) => row.startsWith("apellido="))?.split("=")[1] ;
    divCiudad.innerHTML = "Barcelona";
    //TABLA
    let tabla = document.getElementsByTagName("tbody");
    const idUsuario = document.cookie.split("; ")
        .find((row) => row.startsWith("idUsuario="))
        ?.split("=")[1];
    let url = "https://localhost:7261/api/Jugar/"+idUsuario;
    fetch(url)
        .then((response) => response.json())
        .then((usuario)=> {
            var ranking = JSON.parse(usuario);
            for (const lineaRanking of ranking) {
                if (lineaRanking.idUsuario == idUsuario) {
                    let linea = document.createElement("tr");
                    let tagJuego = document.createElement("td");
                    let contenidoJuego = document.createTextNode(lineaRanking.idjuego);
                    tagJuego.appendChild(contenidoJuego);
                    let tagVeces = document.createElement("td");
                    let contenidoVeces = document.createTextNode(lineaRanking.vecescompletado); 
                    tagVeces.appendChild(contenidoVeces);
                    let tagRanking = document.createElement("td");
                    let contenidoRanking = document.createTextNode(lineaRanking.ranking); 
                    tagRanking.appendChild(contenidoRanking);
                    linea.appendChild(tagJuego);
                    linea.appendChild(tagVeces);
                    linea.appendChild(tagRanking);
                    tabla.appendChild(linea);
                } 
            }
            
        })
})

/*function PutUsuario(response) {
    let jugador = JSON.parse(response);
    console.log(jugador)
    divUsername.innerHTML = jugador.nick;
    divUsername.innerHTML = jugador.nick;
    divNombre.innerHTML = jugador.nombre + "," + jugador.apellido;
    divCiudad.innerHTML = "A";
}*/