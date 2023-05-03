listeners = ["jugar", "stats", "ranking", "imagenUsuario", "menu"]
listeners.forEach(listener => {document.getElementById(listener).addEventListener("click", function () { test() }, false)});

function test() {
    console.log("clicked")
}