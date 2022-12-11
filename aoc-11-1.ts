import * as fs from 'fs';

class Monkey {
    private _itemList: number[];
    private _counter: number = 0;
    private _divider: number;
    private _trueMonkeyIdx: number;
    private _falseMonkeyIdx: number;
    private _fun: Function;

    public clearItemList() {
        this._itemList = [];
    }

    public increaseCounter() {
        this._counter++;
    };

    public monkeyToPass(item: number): number {
        return this._isDivisible(item) ? this._trueMonkeyIdx : this._falseMonkeyIdx;
    }

    public changeValue(val: number) {
        return this._fun(val);
    }

    private _isDivisible(number: number): boolean {
        return number % this._divider === 0 ? true : false;
    }

    constructor(itemList: number[], divider: number, fun: Function,
        trueMonkeyIdx: number, falseMonkeyIdx: number) {
        this._itemList = itemList;
        this._divider = divider;
        this._fun = fun;
        this._trueMonkeyIdx = trueMonkeyIdx;
        this._falseMonkeyIdx = falseMonkeyIdx;
    }

    public get counter() {
        return this._counter;
    }

    public get itemList() {
        return this._itemList;
    }

    public deleteItem() {
        this._itemList.shift();
    }

    public set newItem(item: number) {
        this._itemList.push(item);
    }

}

const data = fs.readFileSync('./input.txt', 'utf-8');
const arr = data.split('\r\n');
let rounds = 20;
const monkeys: Monkey[] = [];

for (let j = 0; j < arr.length; j += 7) {
    const itemList: number[] = []
    arr[j + 1].split(' ').filter(x => x.length == 3 || x.length == 2).forEach(x => {
        itemList.push(parseInt(x[0] + x[1]));
    });
    const operation = 'return ' + arr[j + 2].split(' = ')[1];
    const fun = new Function('old', operation);
    const divider = parseInt(arr[j + 3].split('by ')[1]);
    const trueMonkey = parseInt(arr[j + 4].split('monkey ')[1]);
    const falseMonkey = parseInt(arr[j + 5].split('monkey ')[1]);
    monkeys.push(new Monkey(itemList, divider, fun, trueMonkey, falseMonkey));
}

while (rounds > 0) {
    monkeys.forEach(monkey => {
        monkey.itemList.forEach(item => {
            item = Math.floor(monkey.changeValue(item) / 3);
            const monkeyIdx: number = monkey.monkeyToPass(item);
            monkey.increaseCounter();
            monkeys[monkeyIdx].newItem = item;
        });
        monkey.clearItemList();
    })
    rounds--;
}
const counters = monkeys.map(monkey => monkey.counter).sort((n1,n2) => n1 - n2).reverse();
const monkeyBusinessLevel: number = counters[0] * counters[1];
console.log(monkeyBusinessLevel);