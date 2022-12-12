import * as fs from 'fs';

function getPixel(pixelNumber: number): string {
    return Math.abs(spritePositionIdx - pixelNumber % rowCycles) < 2 ? '#' : '.';
}

function drawPixel(pixelNumber: number) {
    const rowIdx = Math.floor(pixelNumber / rowCycles);
    CRT[rowIdx]=CRT[rowIdx].concat(getPixel(pixelNumber));
}

const data = fs.readFileSync('./input.txt', 'utf-8');
const arr = data.split('\r\n');
let cycles = 0;
let spritePositionIdx = 1;
const rows = 6;
const rowCycles = 40;
const CRT: string[] = [];

for (let i = 0; i < rows; i++) {
    CRT.push('');
}

arr.forEach(line => {
    drawPixel(cycles);
    cycles++;
    if (line.trim() === 'noop') return;
    drawPixel(cycles);
    cycles++;
    spritePositionIdx += parseInt(line.split(' ')[1]);
});
CRT.forEach(row => console.log(row));