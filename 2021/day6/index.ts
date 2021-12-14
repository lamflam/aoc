import path from 'path';
import fs from 'fs';

type Grid = number[][];

function incGrid(grid: Grid, x: number, y: number): void {
    grid[x] = grid[x] || [];
    grid[x][y] = (grid[x][y] || 0) + 1;
}

export function part1(fileName = 'input.txt') {
    const fish = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .split(',')
        .map((n) => parseInt(n));

    for (let i = 0; i < 80; i++) {
        const numFish = fish.length;
        for (let f = 0; f < numFish; f++) {
            if (fish[f] === 0) {
                fish[f] = 6;
                fish.push(8);
            } else {
                fish[f]--;
            }
        }
    }

    return fish.length;
}

export function part2(fileName = 'input.txt') {
    const fish = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .split(',')
        .map((n) => parseInt(n));
    let fishMap = new Array(9).fill(0);
    fish.forEach((level: number) => {
        fishMap[level]++;
    });

    for (let i = 0; i < 256; i++) {
        const newFishMap = [];
        newFishMap[8] = fishMap[0]; 
        newFishMap[7] = fishMap[8];
        newFishMap[6] = fishMap[0] + fishMap[7];
        newFishMap[5] = fishMap[6];
        newFishMap[4] = fishMap[5];
        newFishMap[3] = fishMap[4];
        newFishMap[2] = fishMap[3];
        newFishMap[1] = fishMap[2];
        newFishMap[0] = fishMap[1];
        fishMap = newFishMap;
    }
    return fishMap.reduce((sum, num) => sum + num, 0);
}
