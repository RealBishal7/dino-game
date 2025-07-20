const pauseBtn = document.getElementById("pauseBtn");
const playBtn = document.getElementById("playBtn");

let isPaused = false;

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const cloud = document.getElementById("cloud");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const jumpSound = document.getElementById("jumpSound");
let body = document.body;

let isJumping = false;
let position = 0;
let groundLevel = 0;
let cactusLeft = 600;
let cloudLeft = 600;
let score = 0;
let isGameOver = false;
let cactusSpeed = 10;
let cactusInterval;
let cloudInterval;
let scoreInterval;

// SPACE or tap jump
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !isJumping && !isGameOver) jump();
});
document.addEventListener("touchstart", () => {
  if (!isJumping && !isGameOver) jump();
});

// Jump logic
function jump() {
  isJumping = true;
  jumpSound.currentTime = 0;
  jumpSound.play();
  let count = 0;

  let upInterval = setInterval(() => {
    if (count >= 15) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (count <= 0 || position <= groundLevel) {
          clearInterval(downInterval);
          position = groundLevel;
          dino.style.bottom = position + "px";
          isJumping = false;
        } else {
          position -= 5;
          count--;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 5;
      count++;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

// Move cactus
function moveCactus() {
  cactusInterval = setInterval(() => {
    if (cactusLeft < -20) {
      cactusLeft = 600 + Math.random() * 300;
      if (score % 100 === 0 && cactusSpeed < 20) {
        cactusSpeed += 1;
      }
    } else {
      cactusLeft -= cactusSpeed;
    }

    cactus.style.left = cactusLeft + "px";

    // Collision detection
    if (cactusLeft > 50 && cactusLeft < 90 && position < 40) {
      gameOver();
    }
  }, 20);
}

// Move cloud
function moveCloud() {
  cloudInterval = setInterval(() => {
    cloudLeft = cloudLeft < -60 ? 600 : cloudLeft - 2;
    cloud.style.left = cloudLeft + "px";
  }, 40);
}

// Score
function startScore() {
  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.innerText = score;
  }, 200);
}

// Game over
function gameOver() {
  clearInterval(cactusInterval);
  clearInterval(cloudInterval);
  clearInterval(scoreInterval);
  isGameOver = true;
  alert("💥 Game Over! Your score: " + score);
}

// Restart
function restartGame() {
  isGameOver = false;
  isJumping = false;
  score = 0;
  position = groundLevel;
  cactusLeft = 600;
  cloudLeft = 600;
  cactusSpeed = 10;
  scoreDisplay.innerText = 0;
  dino.style.bottom = groundLevel + "px";
  cactus.style.left = cactusLeft + "px";
  cloud.style.left = cloudLeft + "px";

  moveCactus();
  moveCloud();
  startScore();
}

// Theme toggle
function toggleTheme() {
  body.classList.toggle("dark");
}

// Pause & Play
function pauseGame() {
  if (isGameOver) return;
  clearInterval(cactusInterval);
  clearInterval(cloudInterval);
  clearInterval(scoreInterval);
  isPaused = true;
  pauseBtn.style.display = "none";
  playBtn.style.display = "inline-block";
}

function playGame() {
  if (isGameOver) return;
  moveCactus();
  moveCloud();
  startScore();
  isPaused = false;
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

// Start game
restartGame();
