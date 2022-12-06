// manually create lists (wacky input)
import * as fs from 'fs';

const list: any[] = [];
list.push(['N', 'B', 'D', 'T', 'V', 'G', 'Z', 'J']);
list.push(['S', 'R', 'M', 'D', 'W', 'P', 'F']);
list.push(['V', 'C', 'R', 'S', 'Z']);
list.push(['R', 'T', 'J', 'Z', 'P', 'H', 'G']);
list.push(['T', 'C', 'J', 'N', 'D', 'Z', 'Q', 'F']);
list.push(['N', 'V', 'P', 'W', 'G', 'S', 'F', 'M']);
list.push(['G', 'C', 'V', 'B', 'P', 'Q']);
list.push(['Z', 'B', 'P', 'N']);
list.push(['W', 'P', 'J']);
const data = fs.readFileSync('./input.txt', 'utf-8');

const arr = data.split('\r\n');
arr.forEach(el => {
    const arr = el.split(' ');
    let amount = parseInt(arr[1]);
    let from = parseInt(arr[3]) - 1;
    let to = parseInt(arr[5]) - 1;
    while (amount > 0) {
        list[to].push(list[from].pop());
        --amount;
    }
});

let res = '';
for (let i = 0; i < list.length; i++) {
    res += list[i].pop();
}
console.log(res);