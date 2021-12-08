const fs = require('fs');

const testInput = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

fs.readFile('input.txt', 'utf-8', (error, input) => {
  if (error) { throw error; }

  const points = {};
  const isTest = process.argv[2] === 'test';
  input = (isTest ? testInput : input)
    .split('\n')
    .filter(v => !!v)
    .map(line => (parts => ({
      x1: parts[0],
      y1: parts[1],
      x2: parts[2],
      y2: parts[3],
    }))(line.split(/[^\d]+/).map(parseFloat)));

  // generate hash from position
  const hash = (x, y) => `${x},${y}`;

  // create array of numbers between a and b (inclusive)
  const range = (a, b) => a < b
    ? [...Array(b - a + 1).keys()].map(v => v + a)
    : [...Array(a - b + 1).keys()].map(v => v + b).reverse();

  // zip arrays
  const zip = (a, b) => a.map((v, i) => [v, b[i]]);

  // render points map
  const render = (height = 10, width = 10) => {
    const output = [];
    for (let y = 0; y < height; y++) {
      const line = [];
      for (let x = 0; x < width; x++) {
        line.push(points[hash(x, y)] ?? '.');
      }
      output.push(line.join(''));
    }
    console.log(output.join('\n'));
  };

  // increment position in points map
  const addPoint = (x, y) => (h => h in points ? points[h]++ : points[h] = 1)(hash(x, y));

  // increment all positions along a line
  const addLine = line => {
    if (!axisAligned(line)) {
      zip(range(line.x1, line.x2), range(line.y1, line.y2)).forEach(([x, y]) => addPoint(x, y));
    } else if (line.x1 === line.x2) {
      range(line.y1, line.y2).forEach(y => addPoint(line.x1, y));
    } else if (line.y1 === line.y2) {
      range(line.x1, line.x2).forEach(x => addPoint(x, line.y1));
    }
  };

  // check if a line is axis-aligned
  const axisAligned = line => line.x1 === line.x2 || line.y1 === line.y2;

  // count points with value >= 2
  const total = () => Object.entries(points).reduce((a, c) => a + (c[1] >= 2 ? 1 : 0), 0);

  // part 1
  input.filter(axisAligned).forEach(addLine);
  console.log('part 1', total());

  // part 2
  input.filter(line => !axisAligned(line)).forEach(addLine);
  console.log('part 2', total());
});
