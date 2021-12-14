import { part1, part2 } from '.';

describe('day4', () => {
    test('part1', () => {
        expect(part1('testInput.txt')).toBe(4512);
        console.log(part1('input.txt'));
    });

    test('part2', () => {
        expect(part2('testInput.txt')).toBe(1924);
        console.log(part2('input.txt'));
    });
});
