import * as handler from "/src/scripts/games.js";
var car = document.getElementById("car");
var player = document.getElementById("player");
var cd = document.getElementById("countdown");
var hasJumped = false;
car.style.left = "100%";

document.body.addEventListener("keydown", function (e) { jump(e) });

// Moves the car to the left.
function moveCar() {
    let left = car.style.left.replace("%", "");
    if (left > -100) car.style.left = (left - 8.25) + "%";
    else if (cd.textContent != "You lost!") { 
        handler.gameWin();
    } 
    if (checkCollision()) handler.gameLost();
}

// Checks for a collsion.
function checkCollision() {
    let c = car.getBoundingClientRect();
    let p = player.getBoundingClientRect();
    return p.top >= c.top && p.left >= c.left && p.right <= c.right;
}

// Makes the player jump, only once.
function jump(e) {
    if (hasJumped || !["Space", "ArrowUp", "Enter"].includes(e.code)) return;
    player.style.top = 40 + "px";
    setTimeout(() => { player.style.top = null; }, 325);
    hasJumped = true;
}

// Start the game
handler.noMove();
handler.runGame(moveCar);