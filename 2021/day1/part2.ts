import path from 'path';
import fs from 'fs';

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8');
const depths = input.split('\n').map((n) => parseInt(n.trim()));

const windows = depths.map((d, i) => d + (depths[i - 1] || 0) + (depths[i - 2] || 0));

let increasing = 0;
windows.forEach((w, i) => {
    if (i > 2  && w > windows[i - 1]) increasing++;
});
console.log(increasing);
