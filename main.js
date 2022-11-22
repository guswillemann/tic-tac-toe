const X_CLASS = 'x';
const O_CLASS = 'o';
const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const board = document.querySelector('[data-board]');
const cells = Array.from(document.querySelectorAll('[data-cell]'));
const endGameModal = document.querySelector('[data-end-game-modal]');
const endGameMessage = document.querySelector('#end-game-message');
const newGameBtn = document.querySelector('#new-game-btn');
const playerScoreDisplayMap = {
  x: document.querySelector('#x-score'),
  o: document.querySelector('#o-score'),
};

let isXTurn = true;

function currentPlayer() {
  return isXTurn ? X_CLASS : O_CLASS;
}

function updateBoardClass() {
  board.classList.remove(X_CLASS, O_CLASS);
  board.classList.add(currentPlayer());
}

function checkWinner() {
  const hasWinner = WIN_CONDITIONS.some((condition) => {
    return condition.every((cellIndex) => cells[cellIndex].classList.contains(currentPlayer()));
  });

  return hasWinner ? currentPlayer() : undefined;
}

function hasAllCellsMarked() {
  return cells.every((cell) => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS));
}

function endGame(winner) {
  endGameModal.classList.add('show');
  
  if (winner) {
    endGameMessage.textContent = `${winner.toUpperCase()}'s wins!`
    playerScoreDisplayMap[winner].value++;
  } else {
    endGameMessage.textContent = 'Draw.';
  }
}

function checkIsGameFinished() {
  const winner = checkWinner();
  const isGameFinished = winner || hasAllCellsMarked();

  if (isGameFinished) {
    endGame(winner);
  }

  return isGameFinished;
}

function handleCellClick({ target: cell }) {
  cell.classList.add(currentPlayer());

  const isGameFinished = checkIsGameFinished();
  isXTurn = !isXTurn;
  if (isGameFinished) return;

  updateBoardClass();
}

function initGame() {
  updateBoardClass();
  endGameModal.classList.remove('show');
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS, O_CLASS)
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
}

newGameBtn.addEventListener('click', initGame);

initGame();