const boardSize = 3;
let board = Array(boardSize * boardSize).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');

function renderBoard() {
    gameBoard.innerHTML = '';
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;
    gameBoard.style.gap = '5px';
    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.textContent = board[i] ? board[i] : '';
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell)) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diags
    ];
    return winPatterns.some(pattern =>
        pattern.every(idx => board[idx] === currentPlayer)
    );
}

function restartGame() {
    board = Array(boardSize * boardSize).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

restartBtn.addEventListener('click', restartGame);

// Initial render
restartGame();
