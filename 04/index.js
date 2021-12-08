const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (error, input) => {
  if (error) { throw error; }

  const SIZE = 5;
  input = input.split('\n');

  // parse input
  const numbers = input.shift().split(',').map(parseFloat);
  const boards = [];
  let board = [];
  input.shift();
  input.forEach(line => {
    if (!line.trim()) {
      boards.push(board);
      board = [];
      return;
    }
    board.push(...line.split(/\s+/).filter(v => !!v).map(parseFloat));
  });

  // check if an array is full of nulls
  const arrayIsNull = a => a.filter(v => v !== null).length === 0;

  // update board
  const updateBoard = (board, number) => board.map(v => v === number ? null : v);

  // get board row
  const getRow = (board, row) => board.slice(row * SIZE, row * SIZE + SIZE);

  // get board column
  const getCol = (board, col) => board.filter((_, i) => (i - col) % SIZE === 0);

  // check if a board has won
  const checkWin = board => {
    for (let i = SIZE; i--;) {
      if (
        arrayIsNull(getRow(board, i)) || arrayIsNull(getCol(board, i))
      ) {
        return true;
      }
    }
    return false;
  };

  // run games
  const wins = [];
  (() => {
    for (let n = 0; n < numbers.length; n++) {
      for (let b = 0; b < boards.length; b++) {
        boards[b] = updateBoard(boards[b], numbers[n]);
        if (checkWin(boards[b])) {
          const total = boards[b].filter(v => v !== null).reduce((a, c) => a + c, 0);
          if (!wins.some(v => v.id === b)) {
            wins.push({
              id: b,
              total: numbers[n] * total,
            });
          }
        }
      }
    }
  })();

  console.log('part 1', wins.shift().total);
  console.log('part 2', wins.pop().total);
});
