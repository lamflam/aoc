import path from 'path';
import fs from 'fs';

export function part1(fileName = 'input.txt') {
    const positions = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .split(',')
        .filter((l) => l)
        .map((n) => parseInt(n));

    let minCost = Number.MAX_SAFE_INTEGER;
    positions.forEach((n, i) => {
        const cost = positions.reduce((sum, m, j) => {
            return sum + (i === j ? 0 : Math.abs(n - m));
        }, 0);
        if (cost < minCost) {
            minCost = cost;
        }
    });
    return minCost;
}

export function part2(fileName = 'input.txt') {
    const positions = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .split(',')
        .filter((l) => l)
        .map((n) => parseInt(n));
    const max = Math.max(...positions);

    let minCost = Number.MAX_SAFE_INTEGER;
    for (let n = 0; n <= max; n++) {
        const cost = positions.reduce((sum, m, j) => {
            const dist = Math.abs(n - m);
            const cost = (dist * (dist + 1)) / 2;
            return sum + cost;
        }, 0);
        if (cost < minCost) {
            minCost = cost;
        }
    }
    return minCost;
}
