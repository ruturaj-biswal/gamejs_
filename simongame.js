let gameSequence = [];
let playerSequence = [];
let level = 0;
let gameStarted = false;

const colors = ["green", "red", "yellow", "blue"];
const buttons = document.querySelectorAll(".btn");
const startBtn = document.getElementById("start-btn");
const levelDisplay = document.getElementById("level");

startBtn.addEventListener("click", startGame);

buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        level = 0;
        gameSequence = [];
        playerSequence = [];
        updateLevel();
        nextSequence();
    }
}

function handleButtonClick(event) {
    if (!gameStarted) return;

    const clickedColor = event.target.id;
    playerSequence.push(clickedColor);

    flashButton(clickedColor);
    checkAnswer(playerSequence.length - 1);
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 300);
}

function checkAnswer(currentLevel) {
    if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
        if (playerSequence.length === gameSequence.length) {
            setTimeout(() => {
                playerSequence = [];
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function nextSequence() {
    playerSequence = [];
    level++;
    updateLevel();
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);

    flashSequence();
}

function flashSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(gameSequence[i]);
        i++;
        if (i === gameSequence.length) {
            clearInterval(interval);
        }
    }, 600);
}

function updateLevel() {
    levelDisplay.textContent = `Level: ${level}`;
}

function gameOver() {
    gameStarted = false;
    alert(`Game Over! You reached Level ${level}`);
    level = 0;
    gameSequence = [];
    playerSequence = [];
    updateLevel();
}
