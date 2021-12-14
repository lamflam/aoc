import path from 'path';
import fs from 'fs';


const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8');
const commands = input.split('\n').map(n => n.trim());
let h = 0;
let d = 0;
let a = 0;
commands.forEach(c => {
    if (c.startsWith('forward ')) {
        const amount = parseInt(c.replace('forward ', ''));
        h += amount;
        d += a * amount;
    } else if (c.startsWith('down ')) {
        a += parseInt(c.replace('down ', ''));
    } else if (c.startsWith('up ')) {
        a -= parseInt(c.replace('up ', ''));
    }
});

console.log(h, d, h * d);
