import fs from 'fs';

function readInput(fname) {
    const content = fs.readFileSync(fname, 'utf8');
    return content
        .split('\n')
        .filter(l => l)
        .map(l => parseInt(l, 10));
}

function calcFuel1(mass) {
    return Math.floor(mass / 3) - 2;
}

function part1(input) {
    return input.reduce((fuel, mass) => fuel + calcFuel1(mass), 0);
}

function calcFuel2(mass) {
    const fuel = Math.floor(mass / 3) - 2;
    const additional = Math.max(fuel > 0 ? calcFuel2(fuel) : 0, 0);
    return Math.max(fuel + additional, 0);
}

function part2(input) {
    return input.reduce((fuel, mass) => fuel + calcFuel2(mass), 0);
}

function main() {
    const input = readInput('day1/input.txt');
    console.log('Part1: ', part1(input));
    console.log('Part2: ', part2(input));
}

main();
