const board = Array(9).fill(null);
let currentPlayer = 'X';

const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(null) ? null : 'Draw';
}

function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (!board[index]) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    const winner = checkWinner();

    if (winner) {
      statusElement.textContent = winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusElement.textContent = `${currentPlayer}'s turn`;
    }
  }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));