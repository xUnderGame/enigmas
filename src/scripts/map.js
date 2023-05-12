import * as handler from "/src/scripts/games.js";
import Session from "/src/scripts/games.js";
import Jugar from "/src/scripts/clases/Jugar.js";

// Fetch the games and make a session.
fetch("https://localhost:7261/api/Juegos")
    .then((response) => response.json())
    .then((juegos) => {
        juegos = juegos.sort(() => Math.random() - 0.5);
        fetch("https://localhost:7261/api/Jugadores/" + document.cookie.split("; ").find((row) => row.startsWith("nick="))?.split("=")[1])
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

                    // Update player.
                    if (e.data) {
                        currGame++;
                        let put = {
                            method: 'PUT',
                            body: JSON.stringify(new Jugar(player.idjugador, juegos[currGame].idJuego, 1, 1000)),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                        fetch("https:localhost:7261/api/Jugar", put)
                            .then((response) => response.json())
                            .catch((error) => console.log(error));
                    };

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
