import * as handler from "/src/scripts/games.js";
var row = document.getElementById('row');
var red = document.getElementById('red');
window.addEventListener("keydown", pulsePlayer);
function pulsePlayer(e) {
    if (e.code == "KeyK" ) {
        console.log(e.code);
    }
}
function killPulse(){
    let pulses = document.getElementsByClassName('pulseRed');
    let pulseHitBox = pulses[0].getBoundingClientRect();
    let redHitBox = red.getBoundingClientRect();
    let rank = pulseHitBox.left - redHitBox.left;
    if(rank == 0){
        cd.textContent = "Perfect";
        row.removeChild(pulses[0]);
    }
    else if ((rank <=10 || rank >= 10) && rank != 0 ){
        cd.textContent = "Good";
        row.removeChild(pulses[0]);
    }
    else{
        cd.textContent = "Miss";
        row.removeChild(pulses[0]);
    }
}
function createPulse(vez){
    let pulse = document.createElement('div');
    pulse.classList.add('pulseRed');
    pulse.style.left = '100%';
    for (let index = 0; index < vez; index++) {
        row.appendChild(pulse);
        movePulse();
        setTimeout(console.log('test'),250/vez);
    }

}
function movePulse(distance = 1.5){
    let pulses = document.getElementsByClassName('pulseRed');
    console.log(pulses);
    for (let index = 0; index < pulses.length; index++) {
        console.log(pulses[index].style.left.replace("%", ""));
        let left = pulses[index].style.left.replace("%", "");
        pulses[index].style.left = (parseFloat(left) - distance) + "%";   
        console.log((parseFloat(left) - distance)); 
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
music();
handler.runGame(movePulse);
