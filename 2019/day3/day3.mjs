import fs from 'fs';

function readInput(fname) {
    const content = fs.readFileSync(fname, 'utf8');
    return content
        .split('\n')
        .filter(l => l)
        .map(l => l.split(','));
}

function buildGrid(steps) {
    let x = 0;
    let y = 0;
    let numSteps = 0;
    let grid = [[true]];
    steps.forEach(step => {
        const direction = step[0];
        const distance = parseInt(step.slice(1), 10);
        Array.from(new Array(distance)).forEach(() => {
            numSteps++;
            switch (direction) {
                case 'R':
                    x++;
                    break;
                case 'L':
                    x--;
                    break;
                case 'D':
                    y--;
                    break;
                case 'U':
                    y++;
                    break;
            }
            grid[x] = grid[x] || [];
            grid[x][y] = numSteps;
        });
    });
    return grid;
}

function minIntersectionDistance(steps, grid) {
    let x = 0;
    let y = 0;
    let numSteps = 0;
    let mDistance = Infinity;
    steps.forEach(step => {
        const direction = step[0];
        const distance = parseInt(step.slice(1), 10);
        Array.from(new Array(distance)).forEach(() => {
            switch (direction) {
                case 'R':
                    x++;
                    break;
                case 'L':
                    x--;
                    break;
                case 'D':
                    y--;
                    break;
                case 'U':
                    y++;
                    break;
            }
            if (grid[x] && grid[x][y]) {
                mDistance = Math.min(mDistance, Math.abs(x) + Math.abs(y));
            }
        });
    });
    return mDistance;
}

function part1(paths) {
    console.log(paths);
    return minIntersectionDistance(paths[1], buildGrid(paths[0]))
}

function minIntersectionDelay(steps, grid) {
    let x = 0;
    let y = 0;
    let numSteps = 0;
    let mDistance = Infinity;
    let minSteps = Infinity;
    steps.forEach(step => {
        const direction = step[0];
        const distance = parseInt(step.slice(1), 10);
        Array.from(new Array(distance)).forEach(() => {
            numSteps++;
            switch (direction) {
                case 'R':
                    x++;
                    break;
                case 'L':
                    x--;
                    break;
                case 'D':
                    y--;
                    break;
                case 'U':
                    y++;
                    break;
            }
            if (grid[x] && grid[x][y]) {
                minSteps = Math.min(minSteps, grid[x][y] + numSteps);
            }
        });
    });
    return minSteps;
}

function part2(paths) {
    return minIntersectionDelay(paths[1], buildGrid(paths[0]))
}

function main() {
    const input = readInput('day3/input.txt');
    console.log('Part1: ', part1(input));
    console.log('Part2: ', part2(input));
}

main();
