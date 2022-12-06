import * as fs from 'fs';

let res = 0;
const data = fs.readFileSync('./input.txt', 'utf-8');
const arr = data.split('');
for (let i = 3; i < arr.length; i++) {
    let temp = [arr[i-3], arr[i-2], arr[i-1], arr[i]];
    let set = Array.from(new Set(temp));
    if (set.length==temp.length) {
        res=i+1
        break;
    }
}

console.log(res);