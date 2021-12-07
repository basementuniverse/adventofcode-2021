// paste into devtools console when on input page
document.body.innerText
    .split('\n')
    .map(parseFloat)
    .reduce(
        (acc, curr, idx, arr) => acc += curr > (arr[idx - 1] ?? +Infinity) ? 1 : 0,
        0
    )
