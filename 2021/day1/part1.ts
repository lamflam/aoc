import path from 'path';
import fs from 'fs';


const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8');
const depths = input.split('\n').map(n => parseInt(n.trim()));
let prev: number;
console.log(depths.reduce((sum, depth) => {
    if (prev !== undefined && depth > prev) sum++;
    prev = depth;
    return sum;
}, 0));
