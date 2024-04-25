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

// Higher-order function to start the game by creating and randomizing the gameBoard
const startGame = () => {
  const initialGameBoard = createGameBoard(10, 10);
  const randomizedGameBoard = randomizeGameBoard(initialGameBoard);
  console.log(randomizedGameBoard);
  renderGameBoard(randomizedGameBoard);
  return randomizedGameBoard;
};

const stopGame = () => {};

const resetGame = () => {};
