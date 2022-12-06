import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');
const BreakError = {};

let sum = 0;
const arr = data.split('\r\n');
arr.forEach(el => {
    let len = el.length;
    let str1 = el.slice(0, len / 2);
    let str2 = el.slice(len / 2);
    try {
        str1.trim().split('').forEach(el => {
            if (str2.includes(el)) {
                let ascii = el.charCodeAt(0);
                let priority = ascii>=97 ? ascii-96 : ascii-38;
                sum += priority;
                throw BreakError;
            }
        });
    } catch (err) {
        if (err !== BreakError) throw err;
    }
});

console.log(sum);