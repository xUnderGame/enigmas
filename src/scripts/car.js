var car = document.getElementById("car");
var player = document.getElementById("player");
var cd = document.getElementById("countdown");
cd.style.top -= -100
car.style.left = "100%";
var time = 2000;

async function game() {
    for (const iterator of Array(3).keys()) {
        cd.textContent = 3 - iterator;
        await sleep(time / 2);
    }
    var intervalTimer = setInterval(function () { moveCar() }, 50);
}
function moveCar() {
    let left = car.style.left.replace("%", "");
    (left > -40) ? car.style.left = (left - 8.25) + "%" : clearInterval(intervalTimer); // errors, intervalTimer is not defined
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the game
game();