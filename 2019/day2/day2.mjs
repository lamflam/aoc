import fs from 'fs';

function readInput(fname) {
    const content = fs.readFileSync(fname, 'utf8');
    return content
        .split(',')
        .map(l => parseInt(l, 10));
}

function tick(mem, ip) {
    const opcode = mem[ip];
    if (opcode == 99) {
        return -1;
    } else if (opcode === 1) {
        mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
        return ip + 4;
    } else if (opcode === 2) {
        mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
        return ip + 4;
    } else {
        throw Error(`Invalid opcode "${opcode}" at position ${ip}`);
    }
}

function run(mem) {
    let ip = 0;
    while (ip >= 0) {
        ip = tick(mem, ip);
    }
    return mem[0];
}

function part1(input) {
    const mem = Array.from(input); 
    mem[1] = 12;
    mem[2] = 2;
    run(mem);
    return mem[0];
}

function part2(input, target) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const mem = Array.from(input);
            mem[1] = i;
            mem[2] = j;
            if (run(mem) === target) {
                return 100 * i + j;
            }
        }
    }
}

function main() {
    const input = readInput('day2/input.txt');
    console.log('Part1: ', part1(input));
    console.log('Part2: ', part2(input, 19690720));
}

main();
