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
    const winningPattern = checkWin();
    if (winningPattern) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        drawWinningLine(winningPattern);
    } else if (board.every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern;
        }
    }
    return null;
}

function drawWinningLine(pattern) {
    // Remove any existing winning line
    const existingLine = document.querySelector('.winning-line');
    if (existingLine) {
        existingLine.remove();
    }

    // Create line element
    const line = document.createElement('div');
    line.className = 'winning-line';
    
    // Determine line type and position
    const [a, b, c] = pattern;
    
    // Check if it's a row (horizontal line)
    if (pattern.toString() === [0,1,2].toString() || 
        pattern.toString() === [3,4,5].toString() || 
        pattern.toString() === [6,7,8].toString()) {
        line.classList.add('horizontal');
        line.style.top = `${Math.floor(a/3) * 90 + 40}px`;
    }
    // Check if it's a column (vertical line)
    else if (pattern.toString() === [0,3,6].toString() || 
             pattern.toString() === [1,4,7].toString() || 
             pattern.toString() === [2,5,8].toString()) {
        line.classList.add('vertical');
        line.style.left = `${(a % 3) * 90 + 40}px`;
    }
    // Diagonal from top-left to bottom-right
    else if (pattern.toString() === [0,4,8].toString()) {
        line.classList.add('diagonal-left');
    }
    // Diagonal from top-right to bottom-left
    else if (pattern.toString() === [2,4,6].toString()) {
        line.classList.add('diagonal-right');
    }
    
    boardElement.appendChild(line);
}

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    
    // Remove winning line
    const existingLine = document.querySelector('.winning-line');
    if (existingLine) {
        existingLine.remove();
    }
    
    renderBoard();
}

resetButton.addEventListener('click', resetGame);
renderBoard();
