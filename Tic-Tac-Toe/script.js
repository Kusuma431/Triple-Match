const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const dialog = document.getElementById('dialog');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

gameBoard.addEventListener('click', (event) => {
    const target = event.target;
    const index = target.dataset.index;

    if (target.classList.contains('cell') && !target.textContent && isGameActive) {
        target.textContent = currentPlayer;
        board[index] = currentPlayer;
        if (checkWin()) {
            showResult(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell)) {
            showResult('Draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

restartButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function showResult(message) {
    resultMessage.textContent = message;
    dialog.style.display = 'flex';
    isGameActive = false;
}

function resetGame() {
    board.fill(null);
    isGameActive = true;
    currentPlayer = 'X';
    Array.from(gameBoard.children).forEach(cell => cell.textContent = '');
    dialog.style.display = 'none';
}
