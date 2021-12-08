const fs = require('fs');

const testInput = '3,4,3,1,2';

fs.readFile('input.txt', 'utf-8', (error, input) => {
  if (error) { throw error; }

  const isTest = process.argv[2] === 'test';
  let fish = (isTest ? testInput : input)
    .split(',')
    .map(parseFloat)
    .reduce((a, c) => ({
      ...a,
      [c]: (a[c] || 0) + 1,
    }), {});

  // simulate a day passing
  const day = () => {
    fish = {
      [0]: fish[1] || 0,
      [1]: fish[2] || 0,
      [2]: fish[3] || 0,
      [3]: fish[4] || 0,
      [4]: fish[5] || 0,
      [5]: fish[6] || 0,
      [6]: (fish[7] || 0) + (fish[0] || 0),
      [7]: fish[8] || 0,
      [8]: fish[0] || 0,
    };
  };

  // simulate n days
  const days = n => (new Array(n).fill(0)).forEach(day);

  // count total fish
  const total = () => Object.entries(fish).reduce((a, c) => a + c[1], 0);

  // part 1 - 80 days
  days(80);
  console.log('part 1', total());

  // part 2 - 256 days
  days(256 - 80);
  console.log('part 2', total());
});
