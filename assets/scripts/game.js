// Randomize the gameBoard with 0s and 1s
const randomizeGameBoard = (gameBoard) => {
  return gameBoard.map((row) => row.map(() => (Math.random() < 0.33 ? 1 : 0)));
};

// Create an initial empty gameBoard
const createGameBoard = (width, height) => {
  const board = Array.from({ length: height }, () => Array(width).fill(0));
  console.log(board);
  return randomizeGameBoard(board);
};

//Adjustable Parameters
const sizeX = 10;
const sizeY = 10;
const tickSpeed = 1000;

// Define the initial State
let gameState = {
  board: createGameBoard(sizeX, sizeY),
  isRunning: true,
};
let timeoutId;

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

// Get the next state of the board without mutating the current board
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

// Check the neighbour cells around the current cell then count how many are still active
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
// Recursive function used to update current board state
const gameTick = () => {
  if (!gameState.isRunning) {
    console.log("Stopped!");
    return;
  }

  //Check next board state state, update and render the board
  const updateBoard = getNextState(gameState.board);
  gameState.board = updateBoard; // Update the board in the state
  renderGameBoard(updateBoard);

  timeoutId = setTimeout(gameTick, tickSpeed);
};

// Start the game, clear active gametick if is running to avoid stacking timeouts
const startGame = () => {
  console.log("Warning, Incoming Game!");
  if (gameState.isRunning) {
    clearTimeout(timeoutId);
    gameTick();
  } else {
    gameState.isRunning = true;
    gameTick();
  }
};

const stopGame = () => {
  console.log("Game Over!");
  clearTimeout(timeoutId);
  gameState.isRunning = false;
};

const resetGame = () => {
  console.log("Resetting game!");
  clearTimeout(timeoutId);
  gameState.board = createGameBoard(sizeX, sizeY);
  gameState.isRunning = false;
  renderGameBoard(gameState.board);
};

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);
document.getElementById("resetButton").addEventListener("click", resetGame);
