const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍍'];
let cards = [...symbols, ...symbols]; // Duplicating the symbols to create pairs
let flippedCards = [];
let matchedCards = [];
let timeLimit = 80; // Time limit in seconds
let countdownInterval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    shuffle(cards);

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                alert('Congratulations! You found all matches!');
                resetGame();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

    countdownInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert(`Time's up! You found ${matchedCards.length / 2} pairs.`);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    matchedCards = [];
    flippedCards = [];
    createGameBoard();
    startTimer();
}

window.onload = function() {
    createGameBoard();
    startTimer();
};

 

