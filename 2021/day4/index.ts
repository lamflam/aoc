import path from 'path';
import fs from 'fs';

type Spot = {
    val: string;
    marked: boolean;
};

type Board = Spot[][];

function checkWinner(board: Board) {
    for (let col = 0; col < 5; col++) {
        if (board.every((row) => row[col].marked)) return true;
    }

    for (let row = 0; row < 5; row++) {
        if (board[row].every((col) => col.marked)) return true;
    }

    return false;
}

export function part1(fileName = 'input.txt') {
    const input = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    const lines = input.split('\n').map((n) => n.trim());
    const boards: Board[] = [];
    const numbers = lines[0].split(',');
    let winner: Board | null = null;
    let ret = 0;

    lines
        .slice(2)
        .filter((l) => l)
        .forEach((l, i) => {
            const boardNum = Math.floor(i / 5);
            const board = boards[boardNum] || [];
            if (l) {
                board.push(
                    l
                        .split(' ')
                        .filter((n) => n)
                        .map((val) => ({ val, marked: false }))
                );
                boards[boardNum] = board;
            }
        });

    numbers.forEach((num) => {
        boards.forEach((board) => {
            board.forEach((row) => {
                row.forEach((col) => {
                    if (!winner && col.val === num) col.marked = true;
                });
            });

            if (!winner && checkWinner(board)) {
                winner = board;
                const sum = board.reduce(
                    (sum, row) => sum + row.reduce((rowSum, col) => rowSum + (col.marked ? 0 : parseInt(col.val)), 0),
                    0
                );

                ret = sum * parseInt(num);
            }
        });
    });

    return ret;
}

export function part2(fileName = 'input.txt') {
    const input = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    const lines = input.split('\n').map((n) => n.trim());
    const boards: Board[] = [];
    const numbers = lines[0].split(',');
    let winners = new Set<Board>();
    let lastWinner: Board | null = null;
    let lastNum: string = '';
    let ret = 0;

    lines
        .slice(2)
        .filter((l) => l)
        .forEach((l, i) => {
            const boardNum = Math.floor(i / 5);
            const board = boards[boardNum] || [];
            if (l) {
                board.push(
                    l
                        .split(' ')
                        .filter((n) => n)
                        .map((val) => ({ val, marked: false }))
                );
                boards[boardNum] = board;
            }
        });

    numbers.forEach((num) => {
        boards.forEach((board) => {
            if (winners.has(board)) return;

            board.forEach((row) => {
                row.forEach((col) => {
                    if (col.val === num) col.marked = true;
                });
            });

            if (checkWinner(board)) {
                winners.add(board);
                lastWinner = board;
                lastNum = num;
            }
        });
    });

    if (lastWinner) {
        const sum = (lastWinner as Board).reduce(
            (sum, row) => sum + row.reduce((rowSum, col) => rowSum + (col.marked ? 0 : parseInt(col.val)), 0),
            0
        );

        ret = sum * parseInt(lastNum);
    }

    return ret;
}
