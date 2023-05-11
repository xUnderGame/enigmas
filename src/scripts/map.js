import * as handler from "/src/scripts/games.js";
import Session from "/src/scripts/games.js";

// Fetch the games and make a session.
fetch("https://localhost:7261/api/Juegos")
    .then((response) => response.json())
    .then((juegos) => {
        fetch("https://localhost:7261/api/Juegos")
            .then((response) => response.json())
            .then((player) => {
                // Initial stuff.
                var gameInst = new Session(player, juegos);
                var gameIds = ["gameOne", "gameTwo", "gameThree", "gameFour", "gameFive"];
                var currGame = 0;
                var changeFunct = function () { changeGame() }
                editGames();
                changeSelected(false);

                // Adds a listener for iframe events.
                window.addEventListener('message', function (e) {
                    if (document.getElementById("playArea")) document.getElementById("playArea").remove();
                    if (e.data) currGame++;
                    changeSelected();
                });

                // Loads the random minigames into the DOM.
                function editGames() {
                    for (const i of Array(5).keys()) {
                        let gameDiv = document.getElementById(gameIds[i]);
                        gameDiv.children[1].textContent = gameInst.juegos[i].titulo;
                    };
                }

                // Updates DOM with stuff.
                function changeSelected(doBefore = true) {
                    // Sets the new button.
                    let current = document.getElementById(gameIds[currGame]).children[3];
                    current.addEventListener("click", changeFunct);
                    current.id = "selected";

                    // Desctivates the old button.
                    if (!doBefore) return;
                    let before = document.getElementById(gameIds[currGame - 1]).children[3];
                    before.removeEventListener('click', changeFunct);
                    before.id = "";
                }

                // Changes game to the next one.
                function changeGame() {
                    handler.next(gameInst.juegos[currGame].enlace);
                }
            })
    })
