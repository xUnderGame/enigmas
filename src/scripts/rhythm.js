import * as handler from "/src/scripts/games.js";
var red = document.getElementById('row');

function createPulse(vez){
    let pulse = document.createElement('div');
    pulse.classList.add('pulseRed');
    pulse.style.left = '100%';
    for (let index = 0; index < vez; index++) {
        red.appendChild(pulse);
        setInterval(console.log('test'),10000/vez);
    }

}
function movePulse(){
    let pulses = document.getElementsByClassName('pulseRed');
    for (let index = 0; index < pulses.length; index++) {
        let left = pulses[index].style.left.replace("%", "");
        pulses[index].style.left = (parseFloat(left) - 1.5) + "%";    
    }
}
function music(){
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
handler.runGame(movePulse);
music();