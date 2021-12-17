const fs = require('fs');

const testInput = '16,1,2,0,4,2,7,1,2,14';

fs.readFile('input.txt', 'utf-8', (error, input) => {
  if (error) { throw error; }

  const isTest = process.argv[2] === 'test';
  const crabs = (isTest ? testInput : input).trim().split(',').map(parseFloat).sort();

  const range = (a, b) => [...Array(b - a + 1).keys()].map(v => v + a);
  const tri = n => n * (n + 1) / 2; // https://oeis.org/A000217

  const cost1 = (c, n) => c.reduce((a, v) => a + Math.abs(v - n), 0);
  const cost2 = (c, n) => c.reduce((a, v) => a + tri(Math.abs(v - n)), 0);
  const minCost = (c, f) => Math.min(...range(0, Math.max(...c)).map(n => f(c, n)));

  console.log('part 1', minCost(crabs, cost1));
  console.log('part 2', minCost(crabs, cost2));
});
