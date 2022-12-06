import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

let max = 0, sum = 0
let arr = data.split('\r\n');

arr.forEach(el => {
    if (el.length) {
        sum += parseInt(el);
        max = sum > max ? sum : max;
    } else {
        sum = 0
    }
});

console.log(max);