// Game loop.
export async function runGame(funct, delay = 50) {
    var time = 500;
    let cd = document.getElementById("countdown")
    for (const iterator of Array(3).keys()) {
        cd.textContent = 3 - iterator;
        await sleep(time / 2);
    }
    setInterval(function () { funct(this) }, delay);
}

// Sleeps for x seconds.
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Removes the ability to move the website when playing.
export function noMove() { 
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
} 