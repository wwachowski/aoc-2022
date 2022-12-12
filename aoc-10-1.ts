import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');
const arr = data.split('\r\n');
let register = 1;
let cycles = 0;
let sum = 0;
const breakpoints = [20, 60, 100, 140, 180, 220];
arr.forEach(line => {
    cycles++;
    if (breakpoints.find(el => el === cycles) !== undefined) {
        sum+=cycles*register;
    }
    if (line.trim() === 'noop') {
        return;
    }
    cycles++;
    if (breakpoints.find(el => el === cycles) !== undefined) {
        sum+=cycles*register;
    }
    register += parseInt(line.split(' ')[1]);
});
console.log(sum);