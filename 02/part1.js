// paste into devtools console when on input page
(() => {
  const p = { x: 0, y: 0 };
  document.body.innerText
    .split('\n')
    .map(line => line.split(' '))
    .map(parts => [parts[0], parseFloat(parts[1])])
    .forEach(([direction, amount]) => {
      switch (direction) {
        case 'forward': p.x += amount; break;
        case 'down': p.y += amount; break;
        case 'up': p.y -= amount; break;
      }
    });
  return p.x * p.y;
})();
