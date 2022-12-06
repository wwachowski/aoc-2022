import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

let sum = 0;
const arr = data.split('\r\n');
arr.forEach(el => {
    const line = el.split(' ');
    const a = line[0].trim();
    const b = line[1].trim();
    if (a=='A') {
        b=='X' ? sum+=3+0 : b=='Y' ? sum+=1+3 : sum+=2+6;
    }
    if (a=='B') {
        b=='X' ? sum+=1+0 : b=='Y' ? sum+=2+3 : sum+=3+6;
    }
    if (a=='C') {
        b=='X' ? sum+=2+0 : b=='Y' ? sum+=3+3 : sum+=1+6;
    }
});

console.log(sum);