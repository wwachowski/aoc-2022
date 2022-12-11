import * as fs from 'fs';

function getViewDistance(i: number, j: number) {
    return getViewDistanceLeft(i, j) * getViewDistanceRight(i, j)
        * getViewDistanceUp(i, j) * getViewDistanceDown(i, j);
}

function getViewDistanceLeft(i: number, j: number) {
    const view = arr[i].slice(0, j).reverse().findIndex(h => +h >= +arr[i][j]) || 0;
    if (view === -1) {
        return j;
    }
    return view + 1;
}

function getViewDistanceRight(i: number, j: number) {
    const view = arr[i].slice(j + 1, arr[0].length).findIndex(h => +h >= +arr[i][j]) || 0;
    if (view === -1) {
        return arr[0].length - j - 1;
    }
    return view + 1;
}

function getViewDistanceUp(i: number, j: number) {
    const view = arr.slice(0, i).reverse().findIndex(row => +row[j] >= +arr[i][j]) || 0;
    if (view === -1) {
        return i;
    }
    return view + 1;
}

function getViewDistanceDown(i: number, j: number) {
    const view = arr.slice(i + 1, arr[0].length).findIndex(h => +h[j] >= +arr[i][j]) || 0;
    if (view === -1) {
        return arr.length - i - 1;
    }
    return view + 1;
}

const data = fs.readFileSync('./input.txt', 'utf-8');
const array = data.split('\r\n');
const arr: any[] = [];
array.forEach(line => {
    arr.push(line.split(''));
});
let dist = 0;


for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[0].length - 1; j++) {   
        const distance = getViewDistance(i, j);
        if (distance > dist) {
            dist = distance;
        }
    }
}
console.log(dist);