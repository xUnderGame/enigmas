import * as handler from "/src/scripts/games.js";
// Variavles globales
var row = document.getElementById('row');
var red = document.getElementById('red');
var cd = document.getElementById("countdown");
var good = 0;
var perfect = 0;
// Detectar tecla
window.addEventListener("keydown", pulsePlayer);
function pulsePlayer(e) {
    if (e.code == "KeyK") {
        killPulse();
    }
}
// Rango + gamepley
function killPulse() {
    let pulses = document.getElementsByClassName('pulseRed');
    let pulseHitBox = pulses[0].getBoundingClientRect();
    let redHitBox = red.getBoundingClientRect();
    let rank = pulseHitBox.left - redHitBox.left;
    if (rank <= 5 && rank >= -5) {
        cd.textContent = "Perfect";
        row.removeChild(pulses[0]);
        perfect++;
    }
    else if ((rank <= 30 && rank >= -30) && !(rank < 5 && rank > -5)) {
        cd.textContent = "Good";
        row.removeChild(pulses[0]);
        good++;
    }
    else {
        cd.textContent = "Miss";
        row.removeChild(pulses[0]);
    }
}
// Crear el 'Pulso'
function createPulse(vez) {
    let pulse = document.createElement('div');
    pulse.classList.add('pulseRed');
    pulse.style.left = '125%';
    for (let index = 0; index < vez; index++) {
        row.appendChild(pulse);
        movePulse();
    }

}
// Mover el 'Pulso'
function movePulse() {
    let pulses = document.getElementsByClassName('pulseRed');
    for (let index = 0; index < pulses.length; index++) {
        let left = pulses[index].style.left.replace("%", "");
        pulses[index].style.left = (parseFloat(left - 1)) + "%";
        if (pulses[index].style.left.replace("%", "") <= -1.5) {
            cd.textContent = "Miss";
            row.removeChild(pulses[0]);
        }
    }
}
// Crear el patron
function music() {
    createPulse(1);
    createPulse(2);
    createPulse(1);
    createPulse(2);
    createPulse(2);
    createPulse(2);
    createPulse(2);
    createPulse(2);
    createPulse(2);
    createPulse(1);
    createPulse(1);
    createPulse(1);
    createPulse(2);
    createPulse(2);
    createPulse(1);
    createPulse(1);
}
function checkEnd(){
    let pulses = document.getElementsByClassName('pulseRed');
    if(pulses.length == 0){
        
    }
}
music();
handler.noMove();
handler.runGame(movePulse, 100);
