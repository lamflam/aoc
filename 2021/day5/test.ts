import { part1, part2 } from '.';

describe('day5', () => {
    test('part1', () => {
        expect(part1('testInput.txt')).toBe(5);
        console.log(part1('input.txt'));
    });

    test('part2', () => {
        expect(part2('testInput.txt')).toBe(12);
        console.log(part2('input.txt'));
    });
});
