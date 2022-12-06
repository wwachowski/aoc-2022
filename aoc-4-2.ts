import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

let sum = 0;
let array: string[] = [];
const arr = data.split('\r\n');
arr.forEach(el => {
    let pair = el.split(',');
    let first = pair[0].split('-');
    let second = pair[1].split('-');
    let str1 = parseInt(first[0]);
    let str2 = parseInt(second[0]);
    let end1 = parseInt(first[1]);
    let end2 = parseInt(second[1]);
    let arr1: number[] = [];
    let arr2: number[] = [];
    for (let i = str1; i <= end1; i++) {
        arr1.push(i);
    }
    for (let i = str2; i <= end2; i++) {
        arr2.push(i);
    }
    if (arr1.length>=arr2.length) {
        if (arr2.find(el=>arr1.includes(el))) {
            sum+=1;
        }
    } else {
        if (arr1.find(el=>arr2.includes(el))) {
            sum+=1;
        }
    }
});

console.log(sum);