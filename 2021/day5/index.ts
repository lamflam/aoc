import path from 'path';
import fs from 'fs';

type Grid = number[][];

function incGrid(grid: Grid, x: number, y: number): void {
    grid[x] = grid[x] || [];
    grid[x][y] = (grid[x][y] || 0) + 1;
}

export function part1(fileName = 'input.txt') {
    const input = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .split('\n')
        .map((n) => n.trim())
        .filter((l) => l);
    const lines = input.map((l) => l.split(' -> ').map((p) => p.split(',').map((n) => parseInt(n))));
    const grid: Grid = [];

    lines.forEach((line) => {
        const [p1, p2] = line;
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        if (x1 === x2) {
            let minY = Math.min(y1, y2);
            let maxY = Math.max(y1, y2);
            for (let y = minY; y <= maxY; y++) {
                incGrid(grid, x1, y);
            }
        } else if (y1 === y2) {
            let minX = Math.min(x1, x2);
            let maxX = Math.max(x1, x2);
            for (let x = minX; x <= maxX; x++) {
                incGrid(grid, x, y1);
            }
        }
    });

    return grid.reduce((sum, row) => sum + row.reduce((rowSum, col) => rowSum + (col > 1 ? 1 : 0), 0), 0);
}

export function part2(fileName = 'input.txt') {
    const input = fs
        .readFileSync(path.join(__dirname, fileName), 'utf8')
        .split('\n')
        .map((n) => n.trim())
        .filter((l) => l);
    const lines = input.map((l) => l.split(' -> ').map((p) => p.split(',').map((n) => parseInt(n))));
    const grid: Grid = [];

    lines.forEach((line) => {
        const [p1, p2] = line;
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        if (x1 === x2) {
            let minY = Math.min(y1, y2);
            let maxY = Math.max(y1, y2);
            for (let y = minY; y <= maxY; y++) {
                incGrid(grid, x1, y);
            }
        } else if (y1 === y2) {
            let minX = Math.min(x1, x2);
            let maxX = Math.max(x1, x2);
            for (let x = minX; x <= maxX; x++) {
                incGrid(grid, x, y1);
            }
        } else {
            let startX = x1 < x2 ? x1 : x2;
            let endX = x1 < x2 ? x2 : x1;
            let y = x1 < x2 ? y1 : y2;
            let endY = x1 < x2 ? y2 : y1;
            for (let x = startX; x <= endX; x++) {
                incGrid(grid, x, y);
                if (y <= endY) y++;
                else y--;
            }
        }
    });

    return grid.reduce((sum, row) => sum + row.reduce((rowSum, col) => rowSum + (col > 1 ? 1 : 0), 0), 0);
}
