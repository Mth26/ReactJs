// Grille : 10 x 10
// Représentation : le serpent est un tableau de segments {x, y}
// mouvement avec les fleches
// Erreurs : sortie du cadre ou collision -> game over

const GRID_SIZE = 10; // 10 colonnes x 10 lignes
const START_SPEED = 200; // ms entre ticks
const MIN_SPEED = 100; // limite basse

const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const messageDiv = document.getElementById("message");

const gridArray = [];
let score = 0;

// position initiale du serpent en haut a gauche(comme demandé)
let snake = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
];

let direction = { x: 1, y: 0 };
let gameRunning = false;
let gameInterval = null;
let speedMs = START_SPEED;

for (let r = 0; r < GRID_SIZE; r++) {
  const row = document.createElement("div");
  row.classList.add("row");

  const rowArray = [];

  for (let c = 0; c < GRID_SIZE; c++) {
    const square = document.createElement("div");
    square.classList.add("square");

    row.appendChild(square);
    rowArray.push(square);
  }

  gridArray.push(rowArray);
  grid.appendChild(row);
}

function updateScore(newScore) {
  score = newScore;
  scoreDisplay.textContent = score;
}

function showMessage(text) {
  messageDiv.textContent = text;
  messageDiv.classList.remove("hidden");
}

function hideMessage() {
  messageDiv.classList.add("hidden");
}

function drawSnake() {
  gridArray.forEach((row) => {
    row.forEach((square) => {
      square.classList.remove("snake", "head");
    });
  });

  snake.forEach((segment, i) => {
    // vérifier que le segment est bien dans la grille avant d'accéder au DOM
    if (
      segment.y >= 0 &&
      segment.y < GRID_SIZE &&
      segment.x >= 0 &&
      segment.x < GRID_SIZE
    ) {
      gridArray[segment.y][segment.x].classList.add("snake");
      // la dernière entrée du tableau est la tête
      if (i === snake.length - 1)
        gridArray[segment.y][segment.x].classList.add("head");
    }
  });
}

function isOutOfBounds(pos) {
  return pos.x < 0 || pos.x >= GRID_SIZE || pos.y < 0 || pos.y >= GRID_SIZE;
}

function checkSelfCollision(head) {
  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) return true;
  }
  return false;
}

function gameOver() {
  gameRunning = false;
  clearInterval(gameInterval);
  showMessage(`💀 Game Over — score: ${score}`);
}

function placeRandomFood() {
  // enleve l'ancien fruit
  gridArray.flat().forEach((square) => square.classList.remove("food"));

  let placed = false;
  let tries = 0;
  while (!placed && tries < 1000) {
    tries++;
    // choisir une ligne et une colonne aléatoire dans la grille
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    // éviter la nourriture sur le serpent
    const occupied = snake.some(function (s) {
      return s.x === c && s.y === r;
    });
    if (!occupied) {
      gridArray[r][c].classList.add("food"); //r et c pour row et colonne
      placed = true;
    }
  }
}

function increaseSpeed() {
  // on accélère un peu le jeu à chaque pomme
  speedMs = speedMs - 15;
  if (speedMs < MIN_SPEED) speedMs = MIN_SPEED;
  if (gameInterval) {
    clearInterval(gameInterval);
    // relance la boucle avec la nouvelle vitess
    gameInterval = setInterval(moveSnake, speedMs);
  }
}

function moveSnake() {
  if (!gameRunning) return;

  const head = snake[snake.length - 1];
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };

  if (isOutOfBounds(newHead)) {
    gameOver();
    return;
  }

  if (checkSelfCollision(newHead)) {
    gameOver();
    return;
  }

  // détecte si la nouvelle case contient de la nourriture
  const onFood = gridArray[newHead.y][newHead.x].classList.contains("food");

  snake.push(newHead);

  if (onFood) {
    gridArray[newHead.y][newHead.x].classList.remove("food");
    updateScore(score + 1);
    placeRandomFood();
    increaseSpeed();
  } else {
    // déplacement normal
    snake.shift();
  }

  drawSnake();
}

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  gameRunning = true;
  hideMessage();
  // remettre la vitess de départ
  speedMs = START_SPEED;
  gameInterval = setInterval(moveSnake, speedMs);
}

restartBtn.addEventListener("click", () => {
  updateScore(0);
  snake = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ];
  direction = { x: 1, y: 0 };
  gridArray.forEach((row) =>
    row.forEach((square) => square.classList.remove("snake", "head", "food"))
  );
  hideMessage();
  drawSnake();
  placeRandomFood();
  startGame();
});

console.log("Grille créée:", gridArray);
drawSnake();
placeRandomFood();
startGame();

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  switch (e.key) {
    case "ArrowUp":
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      e.preventDefault();
      break;
    case "ArrowDown":
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      e.preventDefault();
      break;
    case "ArrowLeft":
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      e.preventDefault();
      break;
    case "ArrowRight":
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      e.preventDefault();
      break;
  }
});

