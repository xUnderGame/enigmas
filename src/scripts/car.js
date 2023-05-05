var car = document.getElementById("car");
var player = document.getElementById("player");
var cd = document.getElementById("countdown");
var hasJumped = false;
var time = 2000;
car.style.left = "100%";

document.body.addEventListener("keydown", function () { jump() });

// Game loop.
async function game() {
    for (const iterator of Array(3).keys()) {
        cd.textContent = 3 - iterator;
        await sleep(time / 2);
    }
    setInterval(function () { moveCar(this) }, 50);
}

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
function jump() {
    if (hasJumped) return;
    player.style.top = 40 + "px";
    setTimeout(() => { player.style.top = null; }, 500);
    hasJumped = true;
}

// Sleeps for x seconds.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the game
game();