import * as fs from 'fs';

function isVisible(h: number, i: number, j: number) {
    if (arr[i].slice(0, j).find(height => +height >= h) !== undefined) {
        if (arr[i].slice(j + 1, arr[0].length).find(height => +height >= h) !== undefined) {
            if (arr.slice(0, i).find(height => +height[j] >= h) !== undefined) {     
                if (arr.slice(i + 1, arr.length).find(height => +height[j] >= h) !== undefined) {
                    return false;
                }
            }
        }
    } return true;
}

const data = fs.readFileSync('./input.txt', 'utf-8');
const array = data.split('\r\n');
const arr: any[] = [];
array.forEach(line => {
    arr.push(line.split(''));
});
let counter = arr.length * 2 + arr[0].length * 2 - 4;


for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[0].length - 1; j++) {
        if (isVisible(+arr[i][j], i, j)) {
            counter++;
        }
    }

}
console.log(counter);