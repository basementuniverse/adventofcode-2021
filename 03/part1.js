// paste into devtools console when on input page
(() => {
  const input = document.body.innerText
    .split('\n')
    .filter(v => !!v)
    .map(v => v.split('').map(parseFloat));
  const n = input.length, m = input[0].length;

  // add vectors
  const add = (a, b) => a.map((v, i) => v + b[i]);

  // get totals for each bit position
  const bits = input.reduce(
    (a, c) => add(a, c),
    new Array(m).fill(0)
  );
  const gamma = parseInt(
    bits.map(v => v >= (n / 2) ? 1 : 0).join(''),
    2
  );
  const epsilon = parseInt(
    bits.map(v => v < (n / 2) ? 1 : 0).join(''),
    2
  );

  // power consumption = gamma * epsilon
  console.log(gamma * epsilon);
})();
