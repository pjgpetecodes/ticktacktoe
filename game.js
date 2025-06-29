// ...existing code...
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameActive = true;

function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = board[row][col];
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (!gameActive) return;
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    if (board[row][col] !== '') return;
    board[row][col] = currentPlayer;
    renderBoard();
    const winningCells = checkWin(currentPlayer);
    if (winningCells) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCells(winningCells);
    } else if (isDraw()) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return [[i, 0], [i, 1], [i, 2]];
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            return [[0, i], [1, i], [2, i]];
        }
    }
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return [[0, 0], [1, 1], [2, 2]];
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return [[0, 2], [1, 1], [2, 0]];
    }
    return null;
}

function isDraw() {
    return board.flat().every(cell => cell !== '');
}

function highlightWinningCells(winningCells) {
    // Determine the type of win
    const [first, second, third] = winningCells;
    let lineType = '';
    
    // Check if it's a horizontal win (same row)
    if (first[0] === second[0] && second[0] === third[0]) {
        lineType = 'winning-horizontal';
    }
    // Check if it's a vertical win (same column)
    else if (first[1] === second[1] && second[1] === third[1]) {
        lineType = 'winning-vertical';
    }
    // Check if it's main diagonal (top-left to bottom-right)
    else if (first[0] === 0 && first[1] === 0) {
        lineType = 'winning-diagonal-right';
    }
    // Check if it's anti-diagonal (top-right to bottom-left)
    else if (first[0] === 0 && first[1] === 2) {
        lineType = 'winning-diagonal-left';
    }
    
    // Apply the line styling to all winning cells
    winningCells.forEach(([row, col]) => {
        const cellIndex = row * 3 + col;
        const cell = boardElement.children[cellIndex];
        cell.classList.add(lineType);
    });
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

resetButton.addEventListener('click', resetGame);
renderBoard();
// ...existing code...
