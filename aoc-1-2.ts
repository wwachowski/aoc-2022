// add one newline in input file
import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

let sum = 0;
const sums: number[] = [];
const arr = data.split('\r\n');

arr.forEach(el => {
    if (el.length) {
        sum += parseInt(el);
    } else {
        sums.push(sum);
        sum = 0
    }
});

sums.sort((a, b) => b-a);
console.log(`${sums[0] + sums[1] + sums[2]}`);