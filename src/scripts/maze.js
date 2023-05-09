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
document.addEventListener("keydown", function(event) {
    var x = parseInt(player.style.left);
    var y = parseInt(player.style.top);

    switch(event.key) {
            case "ArrowUp":
                    if(y > 0) {
                            player.style.top = (y - 5) + "%";
                            checkWin();
                    }
                    break;
            case "ArrowDown":
                    if(y < 90) {
                            player.style.top = (y + 5) + "%";
                            checkWin();
                    }
                    break;
            case "ArrowLeft":
                    if(x > 0) {
                            player.style.left = (x - 5) + "%";
                            checkWin();
                    }
                    break;
            case "ArrowRight":
                    if(x < 90) {
                            player.style.left = (x + 5) + "%";
                            checkWin();
                    }
                    break;
    }
});

// Check if the player has reached the goal or hit a wall
function checkWin() {
    var playerX = parseInt(player.style.left);
    var playerY = parseInt(player.style.top);
    var goalX = parseInt(goal.style.left);
    var goalY = parseInt(goal.style.top);

    if(playerX == goalX && playerY == goalY) {
            // Player reached the goal
            score++;
            points.innerHTML = score;
            resetGame();
    } else {
            // Check if the player hit a wall
            for(var i = 0; i < walls.length; i++) {
                    var wallX = parseInt(walls[i].style.left);
                    var wallY = parseInt(walls[i].style.top);

                    if(playerX == wallX && playerY == wallY) {
                            // Player hit a wall
                            maze.classList.add("lose");
                            setTimeout(function() {
                                    maze.classList.remove("lose");
                                    resetGame();
                            }, 1000);
                    }
            }
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
    for(var i = 0; i < walls.length; i++) {
            walls[i].style.top = (Math.floor(Math.random() * 9)) * 10 + "%";
            walls[i].style.left = (Math.floor(Math.random() * 9)) * 10 + "%";
    }

    // Reset timer and score
    secondsLeft = 10;
    points.innerHTML = score;

    // Start the timer
    
    startTimer();
}

// Start the timer
function startTimer() {
    timer.innerHTML = "Time: <span id='time'>" + secondsLeft + "</span>";

    var countdown = setInterval(function() {
            secondsLeft--;
            timer.innerHTML = "Time: <span id='time'>" + secondsLeft + "</span>";

            if(secondsLeft == 0) {
                    // Time's up
                    clearInterval(countdown);
                    maze.classList.add("lose");
                    setTimeout(function() {
                            maze.classList.remove("lose");
                            resetGame();
                    }, 1000);
            }
    }, 1000);
}

// Start the game
resetGame();