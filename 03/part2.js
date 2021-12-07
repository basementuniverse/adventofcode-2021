// paste into devtools console when on input page
(() => {
  const input = document.body.innerText
    .split('\n')
    .filter(v => !!v)
    .map(v => v.split('').map(parseFloat));

  // find most/least common bit value
  const findMCB = (arr, pos) => arr.reduce((a, c) => a + c[pos], 0) >= arr.length / 2
    ? 1
    : 0;
  const findLCB = (arr, pos) => 1 - findMCB(arr, pos);

  const MAX = input[0].length;
  let pos;

  // oxygen generator rating
  pos = 0;
  let oxy = [...input];
  while (oxy.length > 1 && pos <= MAX) {
    const mcb = findMCB(oxy, pos);
    oxy = oxy.filter(v => v[pos] === mcb);
    pos++;
  }

  // co2 scrubber rating
  pos = 0;
  let co2 = [...input];
  while (co2.length > 1 && pos <= MAX) {
    const lcb = findLCB(co2, pos);
    co2 = co2.filter(v => v[pos] === lcb);
    pos++;
  }

  // life support rating = oxy rating * co2 rating
  console.log(parseInt(oxy[0].join(''), 2) * parseInt(co2[0].join(''), 2));
})();
