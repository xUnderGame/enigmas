export function test() {
    console.log("test")
}

export async function runGame(funct) {
    var time = 500;
    let cd = document.getElementById("countdown")
    for (const iterator of Array(3).keys()) {
        cd.textContent = 3 - iterator;
        await sleep(time / 2);
    }
    setInterval(function () { funct(this) }, 50);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}