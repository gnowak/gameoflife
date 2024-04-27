// Function to randomize the gameBoard with 0s and 1s
const randomizeGameBoard = (gameBoard) => {
  return gameBoard.map((row) => row.map(() => (Math.random() < 0.33 ? 1 : 0)));
};

// Function to create an initial empty gameBoard
const createGameBoard = (width, height) => {
  const board = Array.from({ length: height }, () => Array(width).fill(0));
  console.log(board);
  return randomizeGameBoard(board);
};

// Define the initial State
let gameState = {
  board: createGameBoard(10, 10),
  isRunning: true,
};

const renderGameBoard = (gameBoard) => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const cellWidth = canvas.width / gameBoard[0].length;
  const cellHeight = canvas.height / gameBoard.length;

  for (let y = 0; y < gameBoard.length; y++) {
    for (let x = 0; x < gameBoard[y].length; x++) {
      ctx.fillStyle = gameBoard[y][x] === 1 ? "black" : "white";
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
};

// Function to get the next state of the board without mutating the current board
const getNextState = (board) => {
  return board.map((row, y) =>
    row.map((cell, x) => {
      const liveNeighbours = countLiveNeighbours(board, x, y);
      if (cell === 1) {
        return liveNeighbours === 2 || liveNeighbours === 3 ? 1 : 0;
      } else {
        return liveNeighbours === 3 ? 1 : 0;
      }
    })
  );
};

const countLiveNeighbours = (board, x, y) => {
  let count = 0;
  for (let tempY = -1; tempY <= 1; tempY++) {
    for (let tempX = -1; tempX <= 1; tempX++) {
      if (tempX === 0 && tempY === 0) continue;
      const nx = x + tempX,
        ny = y + tempY;
      if (nx >= 0 && nx < board[0].length && ny >= 0 && ny < board.length) {
        count += board[ny][nx];
      }
    }
  }
  return count;
};

const gameTick = () => {
  if (!gameState.isRunning) {
    console.log("Stopped!");
    return;
  }

  const updateBoard = getNextState(gameState.board);
  gameState.board = updateBoard; // Update the board in the state
  renderGameBoard(updateBoard);

  setTimeout(gameTick, 1000);
};

// Start the game
const startGame = () => {
  console.log("Warning, Incoming Game!");
  gameState.isRunning = true;
  renderGameBoard(gameState.board);
  gameTick();
};

const stopGame = () => {
  console.log("Game Over!");
  gameState.isRunning = false;
};

const resetGame = () => {
  console.log("Resetting game!");
  gameState.board = createGameBoard(10, 10);
  gameState.isRunning = false;
  renderGameBoard(gameState.board);
};

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);
document.getElementById("resetButton").addEventListener("click", resetGame);
