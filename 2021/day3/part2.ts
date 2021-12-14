import path from 'path';
import fs from 'fs';

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8');
const bins = input
    .split('\n')
    .map((n) => n.trim())
    .filter((n) => n);

const numBits = bins[0].length;
let oxygen = [...bins];
let co2 = [...bins];
for (let b = 0; b < numBits; b++) {
    if (oxygen.length > 1) {
        const ones = oxygen.reduce((sum, bin) => sum + parseInt(bin[b]), 0);
        const mostCommon = ones >= oxygen.length / 2 ? '1' : '0';
        oxygen = oxygen.filter((o) => o[b] === mostCommon);
    }

    if (co2.length > 1) {
        const ones = co2.reduce((sum, bin) => sum + parseInt(bin[b]), 0);
        const leastCommon = ones >= co2.length / 2 ? '0' : '1';
        co2 = co2.filter((o) => o[b] === leastCommon);
    }

    if (oxygen.length === 1 && co2.length === 1) break;
}

const oxygenDecimal = parseInt(oxygen[0], 2);
const co2Decimal = parseInt(co2[0], 2);

console.log(oxygenDecimal * co2Decimal);
