import * as handler from "/src/scripts/games.js";
var car = document.getElementById("car");
var player = document.getElementById("player");
var cd = document.getElementById("countdown");
var hasJumped = false;
car.style.left = "100%";

// Removes the ability to move the website when jumping.
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

document.body.addEventListener("keydown", function (e) { jump(e) });

// Moves the car to the left.
function moveCar(intervalTimer) {
    let left = car.style.left.replace("%", "");
    (left > -100) ? car.style.left = (left - 8.25) + "%" : clearInterval(intervalTimer);
    if (checkCollision()) cd.textContent = "You lost!";
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
handler.runGame(moveCar);