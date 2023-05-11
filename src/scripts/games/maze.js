import * as handler from "/src/scripts/games.js";
if (!handler.loginCheck()) window.open("/login.html", "_self");

// Set up variables
var player = document.getElementById("player");
var goal = document.getElementById("goal");
var walls = document.querySelectorAll(".wall");
var timer = document.getElementById("time");
var points = document.getElementById("points");
var border = document.getElementById("walls");

var score = 0;
var secondsLeft = 10;

// Move the player when arrow keys are pressed
document.addEventListener("keydown", function (event) {
	var x = parseInt(player.style.left);
	var y = parseInt(player.style.top);

	// Game input.
	switch (event.key) {
		case "ArrowUp":
			checkMovement(y, "sub", "top", x, y)
			break;
		case "ArrowDown":
			checkMovement(y, "add", "top", x, y)
			break;
		case "ArrowLeft":
			checkMovement(x, "sub", "left", x, y)
			break;
		case "ArrowRight":
			checkMovement(x, "add", "left", x, y)
			break;
	}
	checkWin();
});

// Checks if the player can move.
function checkMovement(value, operation, property) {
	// Moves player to the desired direction.
	if (operation == "add") player["style"][property] = (value + 5) + "%";
	else player["style"][property] = (value - 5) + "%";

	let p = player.getBoundingClientRect();
	let isValid = true;
	let w = [];
	let borderHitBox = border.getBoundingClientRect();
	walls.forEach(wall => { w.push(wall.getBoundingClientRect()) });

	// Checks collissions with every wall.
	w.forEach(wall => {
		if (p.top >= wall.top && p.left >= wall.left && p.right <= wall.right && p.bottom <= wall.bottom) {
			isValid = false;
			return;
		}
	});

	// Checks collissions with the map.
	if (p.top < borderHitBox.top || p.left < borderHitBox.left || p.right > borderHitBox.right || p.bottom > borderHitBox.bottom) {
		isValid = false;
	}

	// Resets position if invalid.
	if (!isValid) {
		player["style"][property] = value + "%";
		return false;
	}
	return true;
}

// Check if the player has reached the goal or hit a wall
function checkWin() {
	var playerX = parseInt(player.style.left);
	var playerY = parseInt(player.style.top);
	var goalX = parseInt(goal.style.left);
	var goalY = parseInt(goal.style.top);

	// Player reached the goal
	if (playerX == goalX && playerY == goalY) {
		score++;
		points.innerHTML = score;
		handler.gameWin();
	}
}

// Reset the game
function resetGame() {
	// Reset player position
	player.style.top = "0%";
	player.style.left = "5%";

	// Randomize wall positions
	do{
	do {
		for (var i = 0; i < walls.length; i++) {
			walls[i].style.top = (Math.floor(Math.random() * 9)) * 10 + "%";
			walls[i].style.left = (Math.floor(Math.random() * 9)) * 10 + "%";
		}
	} while (checkSpawn(player));

	// Randomize goal position
	do {
		goal.style.top = (Math.floor(Math.random() * 8) + 1) * 10 + "%";
		goal.style.left = (Math.floor(Math.random() * 8) + 1) * 10 + "%";
	} while (checkSpawn(goal));
}while(!checkIsPossible())
}

// Check the spawn of the goal
function checkSpawn(goal) {
	let g = goal.getBoundingClientRect();
	for (var i = 0; i < walls.length; i++) {
		let w = walls[i].getBoundingClientRect();
		if (w.left <= g.left && w.right >= g.right && w.top <= g.top && w.bottom >= g.bottom) {
			return true;
		}
	}
	return false;
}

// Start the game
handler.noMove();
resetGame();
handler.runGame(startTimer, 1000);

// Timer and countdown
function startTimer() {
	secondsLeft--;
	timer.innerHTML = "<span id='time'>" + secondsLeft + "</span>";

	// Time's up!
	if (secondsLeft <= 0) {
		setTimeout(function () {
			handler.gameLost();
		}, 1000);
	}
}


// It just work, more or less, less than more
function checkIsPossible() {
	let flag = false;
	let clone = document.createElement('div');
	clone.classList.add('clone');
	clone.style.top = '0%';
	clone.style.left = '0%';
	border.appendChild(clone);
	for (let i = 0; i < 10; i++) {
		flag = cloneTheClone(i);
		if (flag) break;
	}
	let clones = document.getElementsByClassName('clone');
	for (let i = 0; i < clones.length; i++) {
		border.removeChild(clones[i]);
	}
	console.log(flag);
}

checkIsPossible();
// No lo mires que duele
function cloneTheClone(int) {

	// clone the clone to every direction.
	let clones = document.getElementsByClassName('clone');
	const length = clones.length;
	let emergencia = 0;
	for (let i = 0; i < length; i++) {
		// Creas 4 div
		let cloneYP = document.createElement('div');
		let cloneYN = document.createElement('div');
		let cloneXP = document.createElement('div');
		let cloneXN = document.createElement('div');

		// Cada div le asignas una direcion

		cloneYP.style.top = (parseFloat(clones[i].style.top.replace('%', '')) + 5) + '%';
		cloneYN.style.top = (parseFloat(clones[i].style.top.replace('%', '')) - 5) + '%';
		cloneXP.style.left = (parseFloat(clones[i].style.left.replace('%', '')) + 5) + '%';
		cloneXN.style.left = (parseFloat(clones[i].style.left.replace('%', '')) - 5) + '%';
		cloneYP.style.left = clones[i].style.left;
		cloneYN.style.left = clones[i].style.left;
		cloneXP.style.top = clones[i].style.left;
		cloneXN.style.top = clones[i].style.left;
		let newClon = [cloneYP, cloneYN, cloneXP, cloneXN];

		for (let j = 0; j < newClon.length; j++) {
			// Los insertas
			newClon[j].classList.add('clone')
			border.appendChild(newClon[j]);
			console.log(i);
			console.log(newClon[j].style.left.replace('%', '') < 0, newClon[j].style.top.replace('%', '') < 0, checkSpawn(newClon[j]), newClon[j].style.left < (5 * int), newClon[j].style.top < (5 * int))
			
			// Matar a los que no queremos
			if (newClon[j].style.left.replace('%', '') < 0 || newClon[j].style.top.replace('%', '') < 0 || checkSpawn(newClon[j])) {
				border.removeChild(newClon[j]);
				emergencia++;
				if (emergencia >= length/2) return false;
			}
			else if (newClon[j].style.left == goal.style.left && newClon[j].style.top == goal.style.left) {
				return true;
			}
		}
	}
	return false;
}