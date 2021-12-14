import path from 'path';
import fs from 'fs';


const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8');
const commands = input.split('\n').map(n => n.trim());
let h = 0;
let d = 0;
commands.forEach(c => {
    if (c.startsWith('forward ')) {
        h += parseInt(c.replace('forward ', ''));
    } else if (c.startsWith('down ')) {
        d += parseInt(c.replace('down ', ''));
    } else if (c.startsWith('up ')) {
        d -= parseInt(c.replace('up ', ''));
    }
});

console.log(h, d, h * d);
