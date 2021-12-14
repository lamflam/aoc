import path from 'path';
import fs from 'fs';

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8');
const bins = input.split('\n').map((n) => n.trim()).filter(n => n);

const numBits = bins[0].length;
let gamma = '';
let epsilon = '';
for (let b = 0; b < numBits; b++) {
    const ones = bins.reduce((sum, bin) => sum + parseInt(bin[b]), 0);
    if (ones > bins.length / 2) {
        gamma += '1';
        epsilon += '0';
    } else {
        gamma += '0';
        epsilon += '1';
    }
}

console.log(gamma, epsilon);

const gammaDecimal = parseInt(gamma, 2);
const epsilonDecimal = parseInt(epsilon, 2);

console.log(gammaDecimal * epsilonDecimal);
