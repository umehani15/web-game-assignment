let score = 0;
let gameDuration = 100; // Game duration in second
let gameInterval;
let countdownInterval;


// Function to create a balloon
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    balloon.style.bottom = '0px';

    // Add event listener to pop the balloon
    balloon.addEventListener('click', popBalloon);

    document.getElementById('gameArea').appendChild(balloon);

    moveBalloon(balloon);
}

// Function to move the balloon upwards
function moveBalloon(balloon) {
    let move = setInterval(() => {
        let bottom = parseInt(balloon.style.bottom);
        bottom += 2;
        balloon.style.bottom = `${bottom}px`;

        if (bottom > window.innerHeight) {
            clearInterval(move);
            balloon.remove();
        }
    }, 20);
}

// Function to pop the balloon
function popBalloon(event) {
    event.target.remove();
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to start generating balloons
function startGame() {
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    gameInterval = setInterval(createBalloon, 1000); // Create a balloon every second
    countdownInterval = setInterval(updateTimer, 1000); // Update timer every second
    document.getElementById('gameArea').innerHTML = ''; // Clear previous balloons
}

// Function to update the timer
function updateTimer() {
    
    gameDuration--;
    document.getElementById('timer').textContent = `Time Left: ${gameDuration} seconds`;

    if (gameDuration <= 0) {
        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        alert(`Time's up! Your final score is ${score}.`);
    }
}

// Start the game when the page loads
window.onload = function() {
    document.getElementById('timer').textContent = `Time Left: ${gameDuration} seconds`;
    startGame();
};
