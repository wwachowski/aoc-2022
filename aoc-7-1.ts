import * as fs from 'fs';

class File {
    private _name?: string | undefined;
    private _size: number;

    public get size() {
        return this._size;
    }

    public get name() {
        return this._name;
    }

    constructor(size: number, name?: string) {
        this._name = name;
        this._size = size;
    }
}

class Dir {
    private _name: string;
    private _subdirs: Dir[];
    private _files: File[];

    public addDir(dir: Dir) {
        this._subdirs.push(dir);
    }

    public addFile(file: File) {
        this._files.push(file);
    }

    public getSubdirByName(name: string) {
        return this._subdirs.find(dir => dir._name === name);
    }

    public get subdirs(): Dir[] {
        return this._subdirs;
    }

    public get files(): File[] {
        return this._files;
    }

    public get name(): string {
        return this._name;
    }

    constructor(name: string) {
        this._name = name;
        this._subdirs = [];
        this._files = [];
    }
}

function getTotalSizeOfDir(dir: Dir): number {
    let totalSize = 0;
    function getSizeOfDir(dir: Dir) {
        let size = 0;
        dir.files.forEach(file => {
            size += file.size;
        });
        totalSize += size;
        dir.subdirs.forEach(dir => {
            getSizeOfDir(dir);
        });
    }
    getSizeOfDir(dir);
    return totalSize;
}

function getTotalSizeOfDirs(): number {
    let totalSize = 0;
    function sumSubDirs(dir: Dir) {
        const size = getTotalSizeOfDir(dir);
        if (size <= 100000) {
            totalSize += size;
        }
        dir.subdirs.forEach(dir => {
            sumSubDirs(dir);
        })
    };
    sumSubDirs(rootDir);
    return totalSize;
}

function runInput(input: string) {
    if (input[0] === '$') {
        runScript(input);
        return;
    }
    const words = input.split(' ');
    if (words[0] === 'dir') {
        createDir(input.split(' ')[1]);
        return;
    } createFile(+words[0], words[1]);
}

function runScript(command: string) {
    const words = command.split(' ');
    if (words[1] === 'cd') {
        changeDirectory(words[2]);
    }
}

function createDir(name: string) {
    currentDir?.addDir(new Dir(name));
}

function createFile(size: number, name?: string) {
    currentDir?.addFile(new File(size, name));
}

function changeDirectory(name: string) {
    if (name === '..') {
        path.pop();
        currentDir = getDir(path);
        return;
    } if (name === '/') {
        name = '';
        currentDir = rootDir;
        return;
    }
    path.push(name);
    currentDir = getDir(path);
}

function getDir(path: string[]): Dir {
    function getDirRecur(dir: Dir | undefined, path: string[]) {
        if (path.length === 0) {
            return dir;
        }
        const pathCopy = JSON.parse(JSON.stringify(path));
        let name = pathCopy.shift();
        return getDirRecur(dir!.getSubdirByName(name!), pathCopy);
    }
    return getDirRecur(rootDir, path);
}

const path: string[] = [];
const rootDir: Dir = new Dir('/');
let currentDir: Dir = rootDir;
const data = fs.readFileSync('./input.txt', 'utf-8');
const arr = data.split('\r\n');
arr.forEach(line => {
    runInput(line);
});
console.log(getTotalSizeOfDirs());