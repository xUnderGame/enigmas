import * as handler from "/src/scripts/games.js";

// Set up variables
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
function checkMovement(value, operation, property, x, y) {
	// Moves player to the desired direction.
	if (operation == "add") player["style"][property] = (value + 5) + "%";
	else player["style"][property] = (value - 5) + "%";

	let p = player.getBoundingClientRect();
	let isValid = true;
	let w = []
	walls.forEach(wall => { w.push(wall.getBoundingClientRect()) });

	// Checks collissions with every wall.
	w.forEach(wall => {
		if (p.top >= wall.top && p.left >= wall.left && p.right <= wall.right && p.bottom <= wall.bottom) {
			isValid = false;
			return;
		}
	});

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
			document.getElementById("countdown").innerText = "You lost!"
		}, 1000);
	}
}