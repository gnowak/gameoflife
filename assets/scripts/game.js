//function to create an initial empty game gameBoard
const createGameBoard = (width, height) => {
  return Array.from({ length: height }, () => Array(width).fill(0));
};

//function to randomize the gameBoard with 0s and 1s
const randomizeGameBoard = (gameBoard) => {
  return gameBoard.map((row) => row.map(() => (Math.random() < 0.33 ? 1 : 0)));
};
const renderGameBoard = (gameBoard) => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const cellWidth = canvas.width / gameBoard[0].length;
  const cellHeight = canvas.height / gameBoard.length;

  for (let y = 0; y < gameBoard.length; y++) {
    for (let x = 0; x < gameBoard[y].length; x++) {
      const cellValue = gameBoard[y][x];
      if (cellValue === 1) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
};

//Define the initial State
let gameState = {
  board: createGameBoard(10, 10),
  isRunning: true,
};

const gameTick = () => {
  if (!gameState.isRunning) {
    console.log("Stopped!");
    return;
  }

  const updateBoard = randomizeGameBoard(gameState.board);
  renderGameBoard(updateBoard);

  setTimeout(() => gameTick({ ...gameState, board: updateBoard }), 1000);
};
// Start the game
const startGame = () => {
  gameState.isRunning = true;
  gameTick(gameState);
};

const stopGame = () => {
  gameState.isRunning = false;
};

const resetGame = () => {
  gameState.board = createGameBoard(10, 10);
  gameState.isRunning = false;
  renderGameBoard(gameState.board);
};
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);
document.getElementById("resetButton").addEventListener("click", resetGame);
