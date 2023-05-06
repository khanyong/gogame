let board = [];
const boardSize = 19;
let currentPlayer = "A";

function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = null;
    }
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace the following credentials with the actual user authentication process
  const correctUsername = 'user';
  const correctPassword = 'pass';

  if (username === correctUsername && password === correctPassword) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('playerSelection').classList.remove('hidden');
  } else {
    alert('Invalid username or password');
  }
}

function selectPlayer(player) {
  currentPlayer = player;
  document.getElementById('playerSelection').classList.add('hidden');
  document.querySelector('.game-board').style.display = 'block';

  // Show the timer for the chosen player and start the timer
  document.getElementById(`player${currentPlayer}Timer`).classList.remove('hidden');
  startTimer();
}

function placeStone(cell) {
  const index = Array.from(cell.parentNode.children).indexOf(cell);  
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  if (board[row][col] === null) {
    board[row][col] = currentPlayer;

    const stone = document.createElement('div');
    stone.classList.add('stone');
    stone.classList.add(`player-${currentPlayer}`);
    cell.appendChild(stone);

    captureStones(row, col);

    currentPlayer = (currentPlayer === "A") ? "B" : "A";
  }
  switchPlayer();
}

function captureStones(row, col) {
  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  const opponent = (currentPlayer === "A") ? "B" : "A";
  
  neighbors.forEach(([r, c]) => {
    if (isValidCoordinate(r, c) && board[r][c] === opponent) {
      if (isCaptured(r, c)) {
        removeStones(r, c);
      }
    }
  });
}

function isValidCoordinate(row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

function isCaptured(row, col, visited = new Set()) {
  const key = `${row}-${col}`;
  if (visited.has(key)) return true;

  visited.add(key);
  
  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  const opponent = (currentPlayer === "A") ? "B" : "A";

  for (const [r, c] of neighbors) {
    if (isValidCoordinate(r, c) && !visited.has(`${r}-${c}`)) {
      if (board[r][c] === null) {
        return false;
      }
      if (board[r][c] === opponent && !isCaptured(r, c, visited)) {
        return false;
      }
    }
  }

  return true;
}

function removeStones(row, col) {
  if (!isValidCoordinate(row, col) || board[row][col] === null) {
    return;
  }

  const stone = board[row][col];
  board[row][col] = null;

  const index = row * boardSize + col;
  const cell = document.getElementsByClassName('cell')[index];
  cell.innerHTML = '';

  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  neighbors.forEach(([r, c]) => {
    if (isValidCoordinate(r, c) && board[r][c] === stone) {
      removeStones(r, c);
    }
  });
}

initializeBoard();
