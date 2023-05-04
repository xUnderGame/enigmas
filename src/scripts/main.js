listeners = ["jugar", "stats", "ranking", "imagenUsuario", "menu"];
listeners.forEach(listener => {document.getElementById(listener).addEventListener("click", function () { changeWindow(this) }, false)});


// Changes the DOM window with new content.
function changeWindow(ele) {
    if (!listeners.includes(ele.id)) return
    let gameArea = document.getElementById("juego");

    // Switch case for button presses.
    switch (ele.id) {
        case "jugar":
            // Setup the new iframe for the game.
            var game = document.createElement("iframe");
            game.classList += "fullscreen";
            game.style.border = "none";
            game.src = "/games/jumpTheCar.html"; // game will need to be set via api request later on.

            // Edit DOM.
            document.getElementById("botones").style.display = "none";
            gameArea.appendChild(game);
            break;

        case "menu":
            console.log(ele);
            let subMenu = document.getElementsByClassName('sub-menu');
            console.log(subMenu[0]);
            subMenu[0].style.display = 'block';
            break;
    
        default:
            break;
    }
}