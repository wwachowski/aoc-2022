import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');
const BreakError = {};

let sum = 0;
let counter = 0;
let array: string[] = [];
const arr = data.split('\r\n');
arr.forEach(el => {
    array = array.concat(Array.from(new Set(el.split(''))));
    counter++;
    if (counter == 3) {
        counter = 0;
        try {
            array.forEach(el => {
                if (array.filter(x => x == el).length == 3) {
                    let ascii = el.charCodeAt(0);
                    let priority = ascii >= 97 ? ascii - 96 : ascii - 38;
                    sum += priority;
                    array = [];
                    throw BreakError;
                }
            });
        } catch (err) {
            if (err !== BreakError) throw err;
        }
    }
});

console.log(sum);