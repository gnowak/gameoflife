const startGame = () => {
  return createBoard();
};

const stopGame = () => {};

const resetGame = () => {};

const createBoard = () => {
  const width = 10;
  const height = 10;
  const board = Array.from({ length: height }, () => Array(width).fill(0));
};
