import * as fs from 'fs';

let res = 0;
const data = fs.readFileSync('./input.txt', 'utf-8');
const arr = data.split('');
for (let i = 13; i < arr.length; i++) {
    let temp: string[] = [];
    for (let x = 13; x >= 0; x--) {
        temp.push(arr[i-x]);
    }
    let set = Array.from(new Set(temp));
    if (set.length==temp.length) {
        res=i+1
        break;
    }
    temp=[];
}

console.log(res);