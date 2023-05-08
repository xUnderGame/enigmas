if (document.cookie.split("; ").find((row) => row.startsWith("nick="))?.split("=")[1] == undefined) {
    //window.open("/login.html", "_self");
}

// On-click listeners for the buttons.
listeners = ["jugar", "stats", "ranking", "imagenUsuario"];
listeners.forEach(listener => { document.getElementById(listener).addEventListener("click", function () { changeWindow(this) }) });


window.addEventListener("load", function (){
    const nombre = document.cookie.split("; ")
    .find((row) => row.startsWith("nick="))
    ?.split("=")[1];
    document.getElementById("nombreUsuario").innerHTML= nombre;
});

// Changes the DOM window with new content.
function changeWindow(ele) {
    if (!listeners.includes(ele.id)) pass
    let gameArea = document.getElementById("juego");

    // Switch case for button presses.
    switch (ele.id) {
        case "jugar":
            // Setup the new iframe for the game.
            var game = document.createElement("iframe");
            game.classList += "fullscreen";
            game.style.border = "none";
            game.id = "game";
            game.src = "/games/jumpTheCar.html"; // game will need to be set via api request later on.

            // Edit DOM.
            document.getElementById("botones").style.display = "none";
            gameArea.appendChild(game);
            game.focus();
            break;

        case "menu":
            console.log(ele);
            let subMenu = document.getElementsByClassName('sub-menu');
            console.log(subMenu[0]);
            subMenu[0].style.display = 'inherit';
            break;

        case "imagenUsuario":
            updateGame("diamondDig"); // testing!!
            break;

        // I call.
        default:
            break;
    }
}

// Updates the iframe with a new game src.
function updateGame(src) {
    let game = document.getElementById("game");
    game.src = `/games/${src}.html`;
    game.focus();
}

// Function to end game.
function endGame() {
    let game = document.getElementById("game");
    var nextButton = document.createElement("button");
    nextButton.innerText = "Siguiente juego";
    nextButton.onclick = updateGame("diamondDig");
    gameArea.appendChild(nextButton);
}