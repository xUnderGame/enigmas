import * as handler from "/src/scripts/games.js";
// Variavles globales
var row = document.getElementById('row');
var red = document.getElementById('red');
var cd = document.getElementById("countdown");
var good = 0;
var perfect = 0;
var miss = 0;
var distancia = 0;

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
    if (rank <= 7 && rank >= -7) {
        cd.textContent = "Perfect";
        row.removeChild(pulses[0]);
        perfect++;
    }
    else if ((rank <= 35 && rank >= -35) && !(rank < 7 && rank > -7)) {
        cd.textContent = "Good";
        row.removeChild(pulses[0]);
        good++;
    }
    else {
        cd.textContent = "Miss";
        row.removeChild(pulses[0]);
        miss++;
    }
}

// Crear el 'Pulso'
function createPulse(vez) {
    let pulse = document.createElement('div');
    pulse.classList.add('pulseRed');    
    for (let index = 0; index < vez; index++) {
        pulse.style.left = (100 + distancia) +'%';
        row.appendChild(pulse);
        distancia+=3;
    }

}

// Mover el 'Pulso'
function movePulse() {
    let pulses = document.getElementsByClassName('pulseRed');
    for (let index = 0; index < pulses.length; index++) {
        let left = pulses[index].style.left.replace("%", "");
        pulses[index].style.left = (parseFloat(left - 1.5)) + "%";
        if (pulses[index].style.left.replace("%", "") <= -2) {
            cd.textContent = "Miss";
            row.removeChild(pulses[0]);
            miss++;
        }
    }
    checkEnd();
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
    createPulse(2);
}

// Mira si el juego ha acabado
function checkEnd(){
    let pulses = document.getElementsByClassName('pulseRed');
    if(pulses.length == 0){
        cd.textContent = `Miss: ${miss}, Good: ${good}, Perfect: ${perfect}`;
        // Acabar partida no se como ira la puntuacion pero podemos hacer que cada un de una cantidad diferente por ejemplo miss = 0; good = 50; perfect = 100;
    }
}

music();
handler.noMove();
handler.runGame(movePulse, 100);
