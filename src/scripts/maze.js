import * as handler from "/src/scripts/games.js";

// Set up variables
var maze = document.getElementById("maze");
var player = document.getElementById("player");
var goal = document.getElementById("goal");
var walls = document.querySelectorAll(".wall");
var timer = document.getElementById("time");
var points = document.getElementById("points");

var score = 0;
var secondsLeft = 10;

// Move the player when arrow keys are pressed
document.addEventListener("keydown", function (event) {
	var x = parseInt(player.style.left);
	var y = parseInt(player.style.top);

	switch (event.key) {
		case "ArrowUp":
			if (y > 0 && checkMovement(y, "sub", "top")) player.style.top = (y - 5) + "%";
			break;
		case "ArrowDown":
			if (y < 95 && checkMovement(y, "add", "top")) player.style.top = (y + 5) + "%";
			break;
		case "ArrowLeft":
			if (x > 0 && checkMovement(x, "sub", "left")) player.style.left = (x - 5) + "%";
			break;
		case "ArrowRight":
			if (x < 95 && checkMovement(x, "add", "left")) player.style.left = (x + 5) + "%";
			break;
	}
	checkWin();
});

// ausd
function checkMovement(value, operation, property) {
	if (operation == "add") player["style"][property] = (value + 5) + "%";
	else if (operation == "sub") player["style"][property] = (value - 5) + "%";
	let p = player.getBoundingClientRect();
	let w = []
	let isValid = true;
	walls.forEach(wall => { w.push(wall.getBoundingClientRect()) });

	w.forEach(wall => {
		if (p.top >= wall.top && p.left >= wall.left && p.right <= wall.right && p.bottom <= wall.bottom) {
			isValid = false;
			return;
		}
	});
	if (!isValid) {
		if (operation == "add") player["style"][property] = (value - 5) + "%";
		else if (operation == "sub") player["style"][property] = (value + 5) + "%";
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
		console.log("win");
	}
}

// Reset the game
function resetGame() {
	// Reset player position
	player.style.top = "0%";
	player.style.left = "5%";

	// Randomize goal position
	goal.style.top = (Math.floor(Math.random() * 8) + 1) * 10 + "%";
	goal.style.left = (Math.floor(Math.random() * 8) + 1) * 10 + "%";

	// Randomize wall positions
	for (var i = 0; i < walls.length; i++) {
		walls[i].style.top = (Math.floor(Math.random() * 9)) * 10 + "%";
		walls[i].style.left = (Math.floor(Math.random() * 9)) * 10 + "%";
	}
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
			console.log("you lost!")
		}, 1000);
	}
}