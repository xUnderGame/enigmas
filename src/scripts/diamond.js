var diamond = document.getElementById('diamond');
var ground = document.getElementById('ground');
var player = document.getElementById('player');
var cd = document.getElementById('countdown');
var time = 2000;
player.style.top += '10%';

// Game running.
async function game() {
    console.log(window.innerWidth);
    for (const iterator of Array(3).keys()) {
        cd.textContent = 3 - iterator;
        await sleep(time / 2);
    }
    setInterval(function () { movePleyer(this) }, 50);
}

// Moves the Pleyer to the left.
function movePleyer(intervalTimer) {
    let top = player.style.top.replace("%", "");
    console.log(player.style.top);
    (top < 100) ? player.style.top = (parseFloat(top) + 1.25) + "%" : clearInterval(intervalTimer);
}
function test(){
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
game();