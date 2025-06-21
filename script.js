const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => handleCellClick(idx));
        boardElement.appendChild(cellDiv);
    });
}

function handleCellClick(idx) {
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    renderBoard();
    if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

resetButton.addEventListener('click', resetGame);
renderBoard();
